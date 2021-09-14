import { isEmpty } from 'lodash';

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps, PlainText } from '@wordpress/block-editor';
import { useRef, useEffect, useState, RawHTML } from '@wordpress/element';
import { Notice } from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

import pikchrLib from '../lib/pikchr.js';
import pikchrModule from '../lib/pikchr.wasm';

const pikchr = pikchrLib( {
	locateFile(path) {
		if(path.endsWith('.wasm')) {
			return pikchrModule;
		}
		return path;
	}
})

async function compilePikchr( srcStr ) {
	const { lengthBytesUTF8, stringToUTF8, _malloc, _free, _pikchr, UTF8ToString } = await pikchr;

	const srcLen = lengthBytesUTF8( srcStr ) + 1; 
	const src = _malloc( srcLen );

	stringToUTF8( srcStr, src, srcLen );

	const compiled = _pikchr( src, "pikchr-wasm", 0, 0, 0 ); 

	_free( src );
	_free( compiled );

	return UTF8ToString( compiled );
}

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( props ) {
	const { 
		isSelected,
		setAttributes,
		attributes
	} = props;

	const input = useRef( null );

	const [ errorMsg, setErrorMsg ] = useState( '' );
	const [ pikchrContent, setPikchr ] = useState( attributes.pikchr );

	useEffect( () => {
		if ( isSelected ) {
			input.current?.textarea?.focus();
		} else {
			setPikchr( attributes.pikchr );
		}
	}, [ isSelected ] );


	useEffect( () => {
		! isEmpty( pikchrContent ) && compilePikchr( pikchrContent )
			.then( content => {
				setAttributes( { content } );
				setErrorMsg( '' );
			} )
			.catch( error => {
				setErrorMsg( error.errorMsg )
			} );
	}, [ pikchrContent ] );

	const blockProps = useBlockProps();
	const preview =  ! isEmpty( errorMsg )
		? <> 
			<Notice status="error">An error occurred generating the preview: { errorMsg }</Notice>
			<pre>{ attributes.content }</pre>
		</>
		: <RawHTML>{ attributes.content }</RawHTML>;

		return <div {...blockProps}>
			{ isSelected ?
			<PlainText 
				ref={ input }
				onChange={ ( pikchr ) => setAttributes( { pikchr } ) }
				value={ attributes.pikchr }
			/>
		: preview
			}
		</div>;
}
