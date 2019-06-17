// expand new note card on click
$("#new_note p").click(function(){
    //select new note box
    var new_note = $("#new_note");

    //remove initial contents
    new_note.children().remove();
    // new_note.css("max-height","60px");

    //create new box
    var contents = `
        <div class="card-header">Header</div>
        <div class="card-body">Body</div>
        <div class="card-footer">Footer</div>
    `;
    new_note.html(contents);
    
});