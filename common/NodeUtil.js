import {json2string} from '/common/CommonUtil.js'

import {Loader} from '/common/loader/Loader.js'

const loadGraph = function() {
    let jsptoolkit;
    function loadData(data) {
        jsptoolkit.clear();
        jsptoolkit.load({
            data: data
        })
    }
    const loader = new Loader(loadData);

    // load graph with ui
    const form = document.createElement('form');
    form.style.display = 'none';
    document.body.appendChild(form);

    const fileInput = document.createElement('input');
    fileInput.multiple = true;
    fileInput.type = 'file';
    fileInput.addEventListener('change', function() {
        // load file
        loader.loadFiles(fileInput.files);
        // form
        form.reset();
    });
    form.appendChild(fileInput);

    return function(toolkit) {
        jsptoolkit = toolkit;
        fileInput.click();
    }
} ();
const saveGraph = function() {
    // save graph with ui
    var link = document.createElement('a');

    function save(blob, filename) {
        link.href = URL.createObjectURL(blob);
        link.download = filename || 'appRouter.json';
        link.dispatchEvent(new MouseEvent('click'));
        // URL.revokeObjectURL( url ); breaks Firefox...
    }
    return function(jsptoolkit) {
        const graphJson = jsptoolkit.exportData();
        const txt = json2string(graphJson);
        save(new Blob([txt], { type: 'text/plain' }), null);
    }
}();

export const PathMode = {
    major: 'major',
    sub: 'sub',
    major_sub: 'major_sub',
    full: 'full',
}
const typePathDelimiter = '/';
const titleCrumbDelimiter = ' / ';

export function checkType(a, b) {
    if (a == b) return true;
    if (!a) a = '';
    if (!b) b = '';
    return a.equalsIgnoreCase(b);
}
export function checkTypeCrumb(nodeA, nodeB) {
    return checkType(nodeA.majorType, nodeB.majorType)
        && checkType(nodeA.subTitle, nodeB.subTitle)
        && checkType(nodeA.itemTitle, nodeB.itemTitle)
}

export function makeTypePath(node, delimiter) {
    if (!delimiter) delimiter = typePathDelimiter;
    const selector = [node.majorType, node.subTitle, node.itemTitle].join(delimiter);
    return selector;
}
export function checkTypePath(node, path, mode, delimiter) {
    if (!delimiter) delimiter = typePathDelimiter;

    if (typeof path != 'string' && !path instanceof String) path = makeTypePath(path, delimiter); // is node object?

    const [major, sub, item] = path.split(delimiter);
    switch(mode) {
        case PathMode.major:
            return checkType(node.majorType, major)
        case PathMode.sub:
            return checkType(node.subTitle, sub)
        case PathMode.major_sub:
            return checkType(node.majorType, major) && checkType(node.subTitle, sub)
        case PathMode.full:
        default:
            return checkType(node.majorType, major) && checkType(node.subTitle, sub) && checkType(node.itemTitle, item)
    }
}
export function makeTitlePath(node, mode, delimiter) {
    if (!delimiter) delimiter = titleCrumbDelimiter;
    switch(mode) {
        case PathMode.major:
            return node.majorTitle;
        case PathMode.sub:
            if (node.subTitle) return node.subTitle;
            break;
        case PathMode.major_sub:
            return node.subTitle ? [node.majorTitle, node.subTitle].join(delimiter) : node.majorTitle;
        case PathMode.full:
        default:
            return [makeTitlePath(node, PathMode.major_sub, delimiter), node.itemTitle].join(delimiter);
    }
}