var reader = new commonmark.Parser();
var writer = new commonmark.HtmlRenderer();
var inp;

document.addEventListener('DOMContentLoaded', onLoad, false);

function onLoad() {
    inp = document.getElementById("hiddenText")
    result = writer.render(reader.parse(inp.getAttribute("value")))
    document.getElementById('render').innerHTML = result
    $('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
    });

    document.getElementById("shorturl").addEventListener("click", onShortLink, false);
}

function onShortLink() {
    document.getElementById("popup").style.display = "block"
    var input = document.getElementById("autoselect");
    input.focus();
    input.select();
}

