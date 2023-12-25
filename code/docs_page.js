import PropTypes from 'prop-types';
import React from 'react';
import mmrToc from '../content/matrix-media-repo/toc.json';

const tocs = {
	"matrix-media-repo/unstable": mmrToc,
};

/**
 * The docs_page layout component
 */
const DocsPage = ({ _body, _ID, docsFor, titlePrefix, _pages }) => (
	<div className="docs-page">
		<div className="toc">
			{ Object.entries(_pages).filter(([k, v]) => k.startsWith(docsFor)).sort(([ka, va], [kb, vb]) => ka.localeCompare(kb)).sort(([ka, va], [kb, vb]) => {
				if (tocs[docsFor]) {
					const toc = tocs[docsFor];
					const ia = ka.replace(docsFor + '/', '');
					const ib = kb.replace(docsFor + '/', '');
					console.log("@@", ia, ib);
					if (toc.includes(ia) && toc.includes(ib)) {
						return toc.indexOf(ia) - toc.indexOf(ib);
					}
				}
				return 0;
			}).map(([k, v]) => (
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
