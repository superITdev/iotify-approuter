import {Loader} from './loader/Loader.js'

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

export {loadGraph, saveGraph}