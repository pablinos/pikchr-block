<?php
/**
 * Plugin Name:       Pikchr
 * Description:       A block that renders Pikchr code to SVG
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Paul Bunkham
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       pikchr
 *
 * @package			  pikchr-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/writing-your-first-block-type/
 */
function pikchr_block_init() {
	register_block_type( __DIR__ );
}
add_action( 'init', 'pikchr_block_init' );
