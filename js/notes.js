// delete note when user clicks on delete button

$(".saved_note").on('click', '.delete', function(event) {
    // get id of the note
    $id = $(this).parents(".saved_note").attr("id");

    // console.log($id);

    // send ajax request to delete selected item
    $request = $.ajax({
        url: "php/delete.php?id="+$id,
        type: "DELETE",
    });

    // callback handler on success
    $request.done(function(response, textStatus, jqXHR) {
        if(response == 1) {
            // remove note element from DOM
            $("#"+$id).remove();
        }
    });

    $request.fail(function(jqXHR, textStatus, errorThrown) {

    });
});