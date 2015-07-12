var reader = new commonmark.Parser();
var writer = new commonmark.HtmlRenderer();
var inp;

document.addEventListener('DOMContentLoaded', onLoad, false);
document.addEventListener('keyup', update, false);

function onLoad() {
    inp = document.getElementById("input");
}

function update() {
    result = writer.render(reader.parse(inp.value))
    document.getElementById('preview').innerHTML = result
    Prism.highlightAll();
}
