String.prototype.equalsIgnoreCase = function(compareString) {
    return this.toLowerCase() === compareString.toLowerCase();
};
Number.prototype.format = function() {
    return this.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

function parseNumber(key, value) {
    var precision = 1;
    return typeof value === 'number' ? parseFloat(value.toFixed(precision)) : value;
}
export function json2string(data) {
    let text = "";
    try {
        text = JSON.stringify(data, parseNumber, '\t');
        text = text.replace(/[\n\t]+([\d\.e\-\[\]]+)/g, '$1');
    } catch (e) {
        text = JSON.stringify(data);
    }
    return text;
}
