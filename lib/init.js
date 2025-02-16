'use babel'

import { existsSync } from 'fs'
import { CompositeDisposable } from 'atom'
import { execFile, exec } from 'child_process'
import { dirname } from 'path'
import frontmatter from 'frontmatter'
import targets from './targets'

const yamlKeys = {
  argsString: 'export-options',
  format: 'export-format',
  opath: 'export-path'
}

const {
  config,
  notifications,
  workspace
} = atom

const win32 = process.platform === 'win32'

module.exports = {

  config: {
    pandocBinary: {
      description: 'Path to your `pandoc` binary (optional).',
      type: 'string',
      default: ''
    },
    pandocDefaultFormat: {
      description: 'Create a file of this type when no other format/extension is specified in YAML front-matter.',
      type: 'string',
      default: 'rtf'
    }
  },

  activate () {
    if (atom.inDevMode() && !atom.inSpecMode()) {
      console.log('activate pandoc-interface-yaml')
    }

    this.subscriptions = new CompositeDisposable()

    this.subscriptions.add(atom.commands.add('atom-workspace',{
      'pandoc-interface-yaml:export': () => this.convertCommand() })
    )
  },

  deactivate () {
    this.subscriptions.dispose()
  },

  consumeSignal (registry) {
    this.provider = registry.create()
    this.subscriptions.add(this.provider)
  },

  convertCommand () {
    const editor = workspace.getActiveTextEditor()

    if (!editor) {
      return this.error(`Current item is not an editor.`)
    }

    if (editor.isModified() || !editor.getPath()) {
      return this.error(`Text is modified. Please save first.`)
    }

    const text = editor.getText()
    const parsed = frontmatter(text)
    let yamlOptions = {}

    if (parsed && parsed.data) {
      for (const key in yamlKeys) {
        yamlOptions[key] = parsed.data[yamlKeys[key]]
      }
    }

    let { format, opath, argsString } = yamlOptions
    let specifyFormat = false
    if (format && format.length > 0) specifyFormat = true
    else format = config.get('pandoc-interface-yaml.pandocDefaultFormat')
    if (!opath) {
      opath = this.defaultOuputPath(format)
      specifyFormat = true
    }

    const pandocPath = config.get('pandoc-interface-yaml.pandocBinary')
    const usePandocPath = pandocPath && pandocPath.length > 0

    const ipath = editor.getPath()

    let args = argsString ? argsString.split(' ') : []
    args.push('--standalone')
    args.push(`--output=${opath}`)
    if (specifyFormat) args.push(`--to=${format}`)
    args.push(ipath)

    if (usePandocPath && !existsSync(pandocPath)) {
      return this.error(`The specified binary location \`${pandocPath}\` does not exist. (Try clearing this field in the package settings.)`)
    }

    if (this.provider) this.provider.add(`Exporting ${ipath} with pandoc`)

    const cwd = dirname(ipath)
    const callback = this.pandocCallback.bind({ cwd, opath, success: this.success, error: this.error, provider: this.provider })

    if (usePandocPath) execFile(pandocPath, args, { cwd }, callback)
    else exec(`pandoc ${args.map(arg => arg.replace(/ /g, '\\ ')).join(' ')}`, { cwd }, callback)
  },

  pandocCallback (error, stdout, stderr) {
    if (error) {
      this.error(error.message)
    } else {
      if (stdout && stdout.length > 0) {
        stdout = stdout.replace(/([^\n])\n([^\n])/g, '$1`<br>`$2') // enforce line breaks
      }
      if (stderr && stderr.length > 0) {
        stderr = stderr.replace(/([^\n])\n([^\n])/g, '$1`<br>`$2') // enforce line breaks
        stderr = `❗️<br>\`${stderr}\``
      }
      this.success(`**Created:** \`${this.opath}\`\n${stdout}\n${stderr}`)
      if (win32) {
        exec(`explorer ${this.opath}`)
      } else {
        exec(`open -R "${this.opath}"`, { cwd: this.cwd })
      }
    }
    if (this.provider) this.provider.clear()
  },

  error (message) {
    notifications.addError(`[pandoc-interface-yaml]<br>${message}`)
  },

  success (message) {
    notifications.addSuccess(`[pandoc-interface-yaml]<br>${message}`)
  },

  defaultOuputPath (format) {
    const editor = workspace.getActiveTextEditor()

    const target = targets[format]
    if (target) {
      return `${editor.getPath()}.${target.ext}`
    } else {
      return this.error('The file format you specified is not supported.')
    }
  }
}
