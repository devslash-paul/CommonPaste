var reader = new commonmark.Parser();
var writer = new commonmark.HtmlRenderer();
var inp;

document.addEventListener('DOMContentLoaded', onLoad, false);

function onLoad() {
    inp = document.getElementById("hiddenText")
    result = writer.render(reader.parse(inp.innerHTML))
    document.getElementById('render').innerHTML = result
    Prism.highlightAll();
}
