import '/common/CommonUtil.js'

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

    // load-api with ui
    const form = document.createElement('form');
    form.style.display = 'none';
    document.body.appendChild(form);

    const fileInput = document.createElement('input');
    fileInput.multiple = true;
    fileInput.type = 'file';
    fileInput.addEventListener('change', function() {
        // load file
        loader.loadFiles(fileInput.files);
        // load data
        const data = {};
        loadData(data);
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
    // save-api with ui
    function parseNumber(key, value) {
        var precision = 1;
        return typeof value === 'number' ? parseFloat(value.toFixed(precision)) : value;
    }

    var link = document.createElement('a');
    function save(blob, filename) {
        link.href = URL.createObjectURL(blob);
        link.download = filename || 'appRouter.json';
        link.dispatchEvent(new MouseEvent('click'));
        // URL.revokeObjectURL( url ); breaks Firefox...
    }
    function saveString(text, filename) {
        save(new Blob([text], { type: 'text/plain' }), filename);
    }
    function data2string(data) {
        let text = "";
        try {
            text = JSON.stringify(data, parseNumber, '\t');
            text = text.replace(/[\n\t]+([\d\.e\-\[\]]+)/g, '$1');
        } catch (e) {
            text = JSON.stringify(data);
        }
        return text;
    }
    function saveJSONFile(data, filename) {
        data = data2string(data);
        saveString(data, filename);
    }

    return function(jsptoolkit) {
        // save data
        const graph = jsptoolkit.exportData();
        saveJSONFile(graph);
    }
} ();

function checkPartType(a, b) {
    if (a === b) return true;
    return a.equalsIgnoreCase(b);
}
function checkType(node, major, sub, item) {
    return checkPartType(node.majorType, major)
    && checkPartType(node.subTitle, sub)
    && checkPartType(node.itemTitle, item);
}
function checkTypeWithNode(nodeA, nodeB) {
    return checkType(nodeA, nodeB.majorType, nodeB.subTitle, nodeB.itemTitle);
}

const typePathDelimiter = '/';
function makeTypePath(node, delimiter) {
    if (delimiter === undefined) delimiter = typePathDelimiter;
    const selector = [node.majorType, node.subTitle, node.itemTitle].join(delimiter);
    return selector;
}
function checkTypeByPath(node, path, delimiter) {
    if (delimiter === undefined) delimiter = typePathDelimiter;
    let [major, sub, item] = path.split(delimiter);
    return checkType(node, major, sub, item);
}

const titleCrumbDelimiter = ' / ';
const TitleCrumbMode = {
    major: 'major',
    sub: 'sub',
    major_sub: 'major_sub',
    full: 'full',
}
function makeTitleCrumb(node, mode, delimiter) {
    if (delimiter === undefined) delimiter = titleCrumbDelimiter;
    switch(mode) {
        case TitleCrumbMode.major:
            return node.majorTitle;
        case TitleCrumbMode.sub:
            if (node.subTitle) return node.subTitle;
            break;
        case TitleCrumbMode.major_sub:
            return node.subTitle ? [node.majorTitle, node.subTitle].join(delimiter) : node.majorTitle;
        case TitleCrumbMode.full:
        default:
            return [makeTitleCrumb(node, TitleCrumbMode.major_sub, delimiter), node.itemTitle].join(delimiter);
    }
}

export {
    checkPartType,
    checkTypeWithNode,
    checkTypeByPath,
    makeTypePath,
    makeTitleCrumb,
}