# Pikchr Block

This Gutenberg block renders [Pikchr](https://pikchr.org) code to SVG. 

Like the markdown block there are security considerations with allowing SVG to be embedded in
a post, so this block will only work when the current user has the `unfiltered_html` capability.
This is generally just admins of the site.

The Pikchr code is rendered using a WASM compiled version of the C library. The source for the
C library is included in this repo, for the purposes of recompilation, and includes the Zero-Clause
BSD license. Please see the [Pikchr](https://pikchr.org) site for any further information.

