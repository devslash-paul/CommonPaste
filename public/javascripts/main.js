var reader = new commonmark.Parser();
var writer = new commonmark.HtmlRenderer();

var start = "//cdnjs.cloudflare.com/ajax/libs/highlight.js/8.6/styles/";
const updatePaste = "Update Existing Paste";

var open = false;

var inp;
var code_css;
var config;
var codes;

var styles = ["agate", "androidstudio", "arta", "ascetic", "atelier-cave.dark", "atelier-cave.light", "atelier-dune.dark", "atelier-dune.light", "atelier-estuary.dark", "atelier-estuary.light", "atelier-forest.dark", "atelier-forest.light", "atelier-heath.dark", "atelier-heath.light", "atelier-lakeside.dark", "atelier-lakeside.light", "atelier-plateau.dark", "atelier-plateau.light", "atelier-savanna.dark", "atelier-savanna.light", "atelier-seaside.dark", "atelier-seaside.light", "atelier-sulphurpool.dark", "atelier-sulphurpool.light", "brown_paper", "brown_papersq.png", "codepen-embed", "color-brewer", "dark", "darkula", "default", "docco", "far", "foundation", "github-gist", "github", "googlecode", "hybrid", "idea", "ir_black", "kimbie.dark", "kimbie.light", "magula", "mono-blue", "monokai", "monokai_sublime", "obsidian", "paraiso.dark", "paraiso.light", "pojoaque", "railscasts", "rainbow", "school_book", "school_book.png", "solarized_dark", "solarized_light", "sunburst", "tomorrow-night-blue", "tomorrow-night-bright", "tomorrow-night-eighties", "tomorrow-night", "tomorrow", "vs", "xcode", "zenburn"]

document.addEventListener('DOMContentLoaded', onLoad, false);
document.addEventListener('keyup', updatePreview, false);


function setupSidebar() {

    $("#show").click(function () {
        if (open) {
            // Then lets submit
            $("#workform").submit()
        } else {
            toggleBar()
        }
    });
}

function setSaveButton() {
    if ($("#password").val().length > 0) {
        $("#show").html(updatePaste)
    }
    else if ($("#existingid").val()) {
        $("#show").html("Create New Paste");
    }
}
function toggleBar() {

    if (open) {
        // Make sure it says save
        $("#show").text("Save");
        $("#sidebar").css.height = ""
    } else {
        setSaveButton();
        $("#sidebar").css.height = "100%"
    }

    $("#sidebar").animate({
        right: open ? -300 : 0,
        width: open ? 380 : 300
    }, 150);
    $("#show").animate({
        width: open ? 80 : 300,
        right: 0
    }, 150);
    $("#shown").animate({
        width: open ? 80 : 0
    }, 150);
    open = !open
}

function onLoad() {

    inp = document.getElementById("input");
    config = document.getElementById("configmenu");
    code_css = document.getElementById("code_style");

    registerBlurEvents();

    // create the select
    codes = document.getElementById("codestyle");
    codes.addEventListener("change", onSelectCode, false);

    for (var i = 0; i < styles.length; i++) {
        var op = document.createElement("option");
        op.value = styles[i];
        op.text = styles[i];
        codes.appendChild(op);
    }

    codes.value = "ir_black";

    updatePreview();

    $("#update").click(onUpdate);
    $("#savenew").click(onSaveNew);

    setupSidebar();

    $("#password").keyup(function(){
        setSaveButton();
    })
}

function onUpdate() {
    // When we save new.
    $.ajax({
        url: "/submit",
        type: "post",
        data: {
            password: $("#pass").val(),
            id: $("#existingid").val(),
            data: $("#input").val()
        },
        success: function (data) {
            console.log(data.success)
            if (data.success) {
                window.location = data.location;
            }
        }
    })
}

function onSaveNew() {
    // get the form and submit it
    $("#workform").submit()
}

function onSave() {
    // If we should save it then he's where we should d o
    if ($("#existingid").val()) {
        $("#savedialog").modal('show')
    }
    else {
        $("#workform").submit();
    }
}

function onSelectCode() {
    code_css.href = start + styles[codes.selectedIndex] + ".min.css"
}

function updatePreview() {
    result = writer.render(reader.parse(inp.value))
    document.getElementById('preview').innerHTML = result
    //Prism.highlightAll();
    $('pre code').each(function (i, block) {
        hljs.highlightBlock(block);
    });
}

function doBlurConfigMenu() {
    if (open) {
        toggleBar()
    }
}

function registerBlurEvents() {
    document.getElementById("input").addEventListener("click", doBlurConfigMenu, false);
    document.getElementById("preview").addEventListener("click", doBlurConfigMenu, false);
}