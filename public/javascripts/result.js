var reader = new commonmark.Parser();
var writer = new commonmark.HtmlRenderer();
var inp;
var popup;

document.addEventListener('DOMContentLoaded', onLoad, false);

function onLoad() {
    inp = document.getElementById("hiddenText")
    popup = document.getElementById("popup");

    result = writer.render(reader.parse(inp.getAttribute("value")))
    document.getElementById('render').innerHTML = result
    $('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
    });

    document.getElementById("shorturl").addEventListener("click", onShortLink, false);
    registerBlurEvents()
}

function onShortLink() {
    popup.style.display = "block"
    var input = document.getElementById("autoselect");
    input.focus();
    input.select();
}

function doBlur() {
    popup.style.display = "none"
}

function registerBlurEvents() {
    document.getElementById("render").addEventListener("click", doBlur, false);
}