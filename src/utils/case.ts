export default function camelToTitle(camelStr: string): string {
    if (typeof camelStr !== 'string') {
        throw new TypeError('Expected a string');
    }
    const titleStr = camelStr.replace(/([a-z])([A-Z])/g, '$1 $2');
    const titleCaseStr = titleStr.replace(/(^\w|\s\w)/g, m => m.toUpperCase());
    return titleCaseStr;
}


