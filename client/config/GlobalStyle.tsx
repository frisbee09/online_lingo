import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

    /* 
        http://meyerweb.com/eric/tools/css/reset/ 
        v2.0 | 20110126
        License: none (public domain)
        
        A lot of CJ tweaks
    */

	/*
        Generic Resets
    */

    html,
	body,
	div,
	span,
	applet,
	object,
	iframe,
	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
	p,
	blockquote,
	pre,
	a,
	abbr,
	acronym,
	address,
	big,
	cite,
	code,
	del,
	dfn,
	em,
	img,
	ins,
	kbd,
	q,
	s,
	samp,
	small,
	strike,
	strong,
	sub,
	sup,
	tt,
	var,
	b,
	u,
	i,
	center,
	dl,
	dt,
	dd,
	ol,
	ul,
	li,
	fieldset,
	form,
	label,
	legend,
	table,
	caption,
	tbody,
	tfoot,
	thead,
	tr,
	th,
	td,
	article,
	aside,
	canvas,
	details,
	embed,
	figure,
	figcaption,
	footer,
	header,
	hgroup,
	menu,
	nav,
	output,
	ruby,
	section,
	summary,
	time,
	mark,
	audio,
	video,
	input,
	button {
		box-sizing: border-box;

		margin: 0;
		padding: 0;
		border: 0;

		font-style: normal;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica,
			Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
			'Segoe UI Symbol';
		/* Overwrite the default font-family list with Lato now that we're using it */
		font-family: 'Lato', 'Apple Color Emoji', 'Segoe UI Emoji',
			'Segoe UI Symbol', sans-serif;
		font-size: inherit;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		vertical-align: baseline;

	}

	/* HTML5 display-role reset for older browsers */
	article,
	aside,
	details,
	figcaption,
	figure,
	footer,
	header,
	hgroup,
	menu,
	nav,
	section {
		display: block;
	}

	/* HTML5 hidden-attribute fix for newer browsers */
	*[hidden] {
		display: none;
	}

    html {
        font-size: 62.5%
    }

    body {
		height: 100vh;
        background: #5BC0EB;
        color: #404E4D;

		font-size: 1.6rem;
        line-height: 1.4;
    }

    ol,
	ul {
		list-style: default;
	}
	li {
		list-style-type: none;
	}
	blockquote,
	q {
		quotes: none;
	}
	blockquote:before,
	blockquote:after,
	q:before,
	q:after {
		content: '';
		content: none;
	}
	table {
		border-collapse: collapse;
		border-spacing: 0;
	}
	select {
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
	}
	#hover-root {
		> * {
			position: absolute;
			z-index: 1500;
		}
	}

	#modal-root {
		position: relative;
		z-index: 2000;
	}
`;
