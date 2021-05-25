# A file converter with in-document settings

Quickly export markdown or other text files in Atom to Word, PDF, or any other format supported by [Pandoc](https://pandoc.org/). `pandoc-interface-yaml` is derived from [`pandoc-convert-plus`](https://github.com/Klemet/atom-pandoc-convert-plus). The main differences in this package are:

- File export options (path, format, and other arguments) are set in-file with YAML front-matter instead of using prompts and package settings.
- Users must install `pandoc` separately due to performance concerns. See the [upstream repository](https://github.com/Klemet/atom-pandoc-convert-plus) for a bundled install option.

## Installation

On Mac:

```
> brew install pandoc
> apm install pandoc-interface-yaml
```

See the [Pandoc site](https://pandoc.org/installing.html) for other installation methods.

## Usage

Add any of these optional keys to a document's front-matter prior to running `Pandoc Interface > Export` (available in the right-click contextual menu, Packages menu, or command palette):

- `export-path` – Set the absolute or relative path for the generated document, including filename and extension. Defaults to the source document's name and directory.
- `export-format` – See lib/targets.js for supported format names. Pandoc will infer format from path; a default format set in the package settings will be used if neither is specified.
- `export-options` – Add other command line options for `pandoc`, e.g. `--filter=pandoc-citeproc`.

For example, the start of file `draft.md` might look like:
```
---
export-path: 'blog-post.html'
export-format: 'html5'
export-options: '--filter=pandoc-citeproc'
title: 'A Well-Evidenced Screed'
bibliography: library.bib
csl: chicago-note-bibliography-with-ibid.csl
---

As has been well established...
```

## Package settings

- You can specify the path to the Pandoc binary you want to use. (If the field is left blank, the command line `pandoc` will be called.)
- Set the default file format to export when neither `export-path` nor `export-format` are defined in a document.

The rest of this readme is from `pandoc-convert-plus`:

---

## A plugin for the [Atom](https://atom.io/) text editor to unleash the full power of [Pandoc](https://pandoc.org/), and quickly convert your documents in style

`pandoc-convert-plus` is a fork of the `pandoc-convert` plugin for Atom that gives more flexibility to the user, by allowing them to invoke pandoc with additional arguments.

The original `pandoc-convert` plugin allowed a user to quickly use pandoc to convert their documents to many different formats with the `Ctrl + P` command in atom.

However, `pandoc-convert` had one limitation : it didn't allow users to use a set of arguments with the pandoc command that the plugin executed.

With pandoc-convert-plus, **you can now use any arguments that you want with pandoc**. This allows you to customize how pandoc will convert your document.

## Is there a particular syntax for the arguments ?

**No ! Just add them like you would in a Pandoc command through a terminal/command prompt.**

Here is an example of some arguments to use a bibliography file, to remove the label of figures, and to use the xelatex engine to generate `.pdf` files :

`--citeproc --bibliography=C:/User/Bibliography/Bibliography_file.bib -fmarkdown-implicit_figures --pdf-engine=xelatex`

> ⚠️ **Be careful about spaces and special characters in the file paths present in your arguments**. They might lead to issues with Pandoc.

## Some examples of useful arguments to use with pandoc-convert-plus

### Bibliography

**Do you have a single bibliography database that you use in many markdown (`.md`) notes ?**

If that's so, you can use pandoc-convert-plus to automatically use the citeproc plugin of pandoc along with a .bib file containing your bibliography for all of your conversions.

Here is an example of the arguments that you might use to that end :

`--citeproc --bibliography=C:/User/Bibliography/Bibliography_file.bib`

### Removing the label of figures

Just use `-fmarkdown-implicit_figures`, *et voila* !

### Using another pdf engine

For example, you can use `xelatex` with the argument `--pdf-engine=xelatex`.

### Other arguments

Pandoc have an incredible number of options, allowing you to use [LaTeX templates](https://pandoc.org/MANUAL.html#templates) among many other things. If you want to know more, just check the [manual of Pandoc](https://pandoc.org/MANUAL.html).

## Other infomations about the plugin

Since `pandoc-convert-plus` is just a tiny modification of the original `pandoc-convert`, please check the [repository page of `pandoc-convert`](https://github.com/josa42/atom-pandoc-convert) for more information about its functioning.
