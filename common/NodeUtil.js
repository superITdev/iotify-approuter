function checkType(node, major, sub, item) {
    return node.majorType===major && node.subTitle===sub && node.itemTitle===item;
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
    checkTypeWithNode,
    checkTypeByPath,
    makeTypePath,
    makeTitleCrumb,
}