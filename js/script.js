// load initial contents on document ready
$(document).ready(function () {
    //load new note box small
    $("#new_note").load("html/new-note.html #new_note_small");

    // expand new note card on click
    $(document).on("click", "#new_note_small > p", function () {
        $("#new_note").load("html/new-note.html #new_note_expanded");
        
    });

    // set max character limit on text boxes
    $(document).on("keypress paste", '[contenteditable]', function (e) {
        if (this.innerHTML.length >= this.getAttribute("max")) {
            e.preventDefault();
            return false;
        }
    });

    // move focus to note content on enter key press
    $(document).on("keydown", '#note_title_input', function(e){
        if(e.keyCode == 13) {
            e.preventDefault();
            $("#note_content_input").focus();
        }
    })

})
