
var inp;
var popup;
var edit;

var md;

document.addEventListener('DOMContentLoaded', onLoad, false);

function updateRenderer() {
    md = window.markdownit('commonmark', {
        html: true,
        linkify: true,
    });

    if(ext.indexOf('emoji') >= 0) {
        md.use(window.markdownitEmoji);

        md.renderer.rules.emoji = function (token, idx) {
            return window.twemoji.parse(token[idx].content);
        };
    }
    if(ext.indexOf('tables') >= 0)
    {
        md.enable('table')
    }
}

function onLoad() {
    updateRenderer();

    inp = document.getElementById("hiddenText")
    popup = document.getElementById("popup");
    edit = document.getElementById("password");

    result = md.render(inp.getAttribute("value"));
    document.getElementById('render').innerHTML = result
    $('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
    });

    document.getElementById("shorturl").addEventListener("click", onShortLink, false);
    document.getElementById("edit").addEventListener("click", onEdit, false);

    registerBlurEvents()
}

function onShortLink() {
    popup.style.display = "block"
    var input = document.getElementById("autoselect");
    input.focus();
    input.select();
}

function onEdit() {
    edit.style.display = "block"
}

function doBlur() {
    popup.style.display = "none"
    edit.style.display = "none"
}

function registerBlurEvents() {
    document.getElementById("render").addEventListener("click", doBlur, false);
}