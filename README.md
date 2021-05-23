# `pandoc-interface-yaml`

Quickly export markdown or other documents in Atom to any format supported by [Pandoc](https://pandoc.org/), using a user-installed binary and passing arguments through YAML front-matter. `pandoc-interface-yaml` is derived from `pandoc-convert-plus`. The main differences in this package are:

- File export options (path, format, other arguments) are set in-file with YAML front-matter instead of via prompts and package settings.
- User must install `pandoc` separately (performance concerns). See the upstream repository for a bundled install option.

See the [Pandoc site](https://pandoc.org/installing.html) for installation methods. Update this package's settings with the path to your `pandoc` binary (run `which pandoc` on Mac/Linux) if it differs from the default.

Add any of these optional keys to a document's front-matter prior to running `Pandoc Interface > Export`:

- `export-path` – Set the absolute or relative path for the generated document, including filename and extension. Defaults to the source document's name and directory.
- `export-format` – See lib/targets.js for supported format names. Pandoc will infer format from path; a default format set in the package settings will be used if neither is specified.
- `export-options` – Add other command line options for `pandoc`, e.g. `--filter=pandoc-citeproc`.

Example:
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

The rest of this readme is from `pandoc-convert-plus`:

---

## A plugin for the [Atom](https://atom.io/) text editor to unleash the full power of [Pandoc](https://pandoc.org/), and quickly convert your documents in style

`pandoc-convert-plus` is a fork of the `pandoc-convert` plugin for Atom that gives more flexibility to the user, by allowing them to invoke pandoc with additional arguments.

The original `pandoc-convert` plugin allowed a user to quickly use pandoc to convert their documents to many different formats with the `Ctrl + P` command in atom, as shown here :

![](./images/menu_capture.JPG)

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
