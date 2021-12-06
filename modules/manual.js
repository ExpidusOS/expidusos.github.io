const path = require('path')
const { downloadRelease } = require('@terascope/fetch-github-release');
const pkg = require('../package.json');

const filterRelease = (release) => release.name === "v" + pkg.version;
const filterAsset = (asset) => asset.name === "markdown.zip";

export default function manual() {
	return downloadRelease('ExpidusOS', 'manual', path.join(__dirname, '..', 'content', 'manual', pkg.version), filterRelease, filterAsset, false, false);
}
