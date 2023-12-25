import PropTypes from 'prop-types';
import React from 'react';


/**
 * The docs_page layout component
 */
const DocsPage = ({ _body, _ID, docsFor, titlePrefix, _pages }) => (
	<div className="docs-page">
		<div className="toc">
			{ Object.entries(_pages).filter(([k, v]) => k.startsWith(docsFor)).sort(([ka, va], [kb, vb]) => ka.localeCompare(kb)).map(([k, v]) => (
				<a href={v._url} className={"toc-link" + (_ID === k ? ' current' : '') + ((k.split('/').length > 3) ? ' indent' : '')}>{v.title.replace(`${titlePrefix} - `, '')}</a>
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
