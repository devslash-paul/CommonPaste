var reader = new commonmark.Parser();
var writer = new commonmark.HtmlRenderer();

var start = "//cdnjs.cloudflare.com/ajax/libs/highlight.js/8.6/styles/";

var inp;
var code_css;
var config;
var codes;

var styles = ["agate", "androidstudio", "arta", "ascetic", "atelier-cave.dark", "atelier-cave.light", "atelier-dune.dark", "atelier-dune.light", "atelier-estuary.dark", "atelier-estuary.light", "atelier-forest.dark", "atelier-forest.light", "atelier-heath.dark", "atelier-heath.light", "atelier-lakeside.dark", "atelier-lakeside.light", "atelier-plateau.dark", "atelier-plateau.light", "atelier-savanna.dark", "atelier-savanna.light", "atelier-seaside.dark", "atelier-seaside.light", "atelier-sulphurpool.dark", "atelier-sulphurpool.light", "brown_paper", "brown_papersq.png", "codepen-embed", "color-brewer", "dark", "darkula", "default", "docco", "far", "foundation", "github-gist", "github", "googlecode", "hybrid", "idea", "ir_black", "kimbie.dark", "kimbie.light", "magula", "mono-blue", "monokai", "monokai_sublime", "obsidian", "paraiso.dark", "paraiso.light", "pojoaque", "railscasts", "rainbow", "school_book", "school_book.png", "solarized_dark", "solarized_light", "sunburst", "tomorrow-night-blue", "tomorrow-night-bright", "tomorrow-night-eighties", "tomorrow-night", "tomorrow", "vs", "xcode", "zenburn"]

document.addEventListener('DOMContentLoaded', onLoad, false);
document.addEventListener('keyup', update, false);


function doShow() {
    document.getElementById("configmenu").style.display = "block";
}

function doBlur() {
    config.style.display = "none"
}

function registerBlurEvents() {
    document.getElementById("input").addEventListener("click", doBlur, false);
    document.getElementById("preview").addEventListener("click", doBlur, false);
}

function onLoad() {
    inp = document.getElementById("input");
    config = document.getElementById("configmenu");
    code_css = document.getElementById("code_style");

    document.getElementById("cog").addEventListener("click", doShow, false);

    registerBlurEvents()

    // create the select
    codes = document.getElementById("codestyle");

    codes.addEventListener("change", onSelectCode, false);

    for(var i = 0; i < styles.length; i++) {
        var op = document.createElement("option");
        op.value = styles[i];
        op.text = styles[i];
        codes.appendChild(op);
    }

    codes.value = "ir_black";
}

function onSelectCode() {
    code_css.href = start + styles[codes.selectedIndex] + ".min.css"
}

function update() {
    result = writer.render(reader.parse(inp.value))
    document.getElementById('preview').innerHTML = result
    //Prism.highlightAll();
    $('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
    });
}