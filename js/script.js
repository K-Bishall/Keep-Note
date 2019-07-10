// load initial contents on document ready
$(document).ready(function () {
    // load script for new note
    $.getScript('js/new-note.js');

    // load script for existing notes
    $.getScript('js/notes.js');

    $.getScript('js/update-note.js');
})