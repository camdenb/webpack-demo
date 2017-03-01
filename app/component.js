export default function (text = 'Okay this is super cool.') {
    const element = document.createElement('div');
    element.innerHTML = text;
    return element;
}
