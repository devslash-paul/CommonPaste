var reader = new commonmark.Parser();
var writer = new commonmark.HtmlRenderer();
var parsed = reader.parse("Hello *world*")
var result = writer.render(parsed);
var inp

document.addEventListener('DOMContentLoaded', onload, false);
document.addEventListener('keyup', update, false);

function onload() {
    document.getElementById("preview").innerHTML = result
    inp = document.getElementById("input")
}

function update() {
    result = writer.render(reader.parse(inp.value))
    document.getElementById('preview').innerHTML = result
    Prism.highlightAll();
}
