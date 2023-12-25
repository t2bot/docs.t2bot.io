import PropTypes from 'prop-types';
import React from 'react';


/**
 * The docs_page layout component
 */
const DocsPage = ({ _body, _ID, docsFor, _pages }) => (
	<div className="docs-page">
		<div className="toc">
			{ Object.entries(_pages).filter(([k, v]) => k.startsWith(docsFor)).sort(([ka, va], [kb, vb]) => ka.localeCompare(kb)).map(([k, v]) => (
				<a href={k} className={"toc-link" + (_ID === k ? ' current' : '') + ((k.split('/').length > 2) ? ' indent' : '')}>{v.title.replace(`${docsFor} - `, '')}</a>
			)) }
		</div>
		<div className="content">
			{ _body }
		</div>
	</div>
);

DocsPage.propTypes = {};

DocsPage.defaultProps = {};

export default DocsPage;
