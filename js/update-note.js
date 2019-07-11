function update_box() {
    const update_box = `
    <!-- new note box expanded -->
    <form id="update_note">
        <input type="hidden" name="id">
        <div class= "card-header py-1">
            <!-- The following two <div> MUST BE EMPTY to display placeholder -->
                <!-- new note title input -->
            <div id="update_title" contenteditable="true" 
                max="100" data-placeholder="Title"></div>
            <input type="hidden" name="title">
            <i class="icon-pushpin" style="margin-top: 5px" value="false"></i>
            <input type="hidden" name="pinned">
    
        </div>
    
        <!-- new note content -->
        <div id="update_content" class="card-body" contenteditable="true" 
            max="1000" data-placeholder="Take a note..." autofocus></div>
        <input type="hidden" name="content">
    
        <!-- new note box footer -->
        <div class="card-footer">
            <div class="icons">
                <i class="dot" value="White"></i>
                <i class="dot" value="peachpuff"></i>
                <i class="dot" value="thistle"></i>
                <i class="dot" value="khaki"></i>
                <i class="dot" value="aquamarine"></i>
                <i class="dot" value="lightgreen"></i>
                <i class="material-icons-outlined">check_box</i>
                <i class="material-icons-outlined">image</i>
                <i class="material-icons-outlined delete">delete</i>
            </div>
            <input type="hidden" name="color">
            <button>Save</button>
        </div>
    
    </form>`;

    $("#update_note_box").html(update_box);
    $("#update_content").focus();

    // color pickers at footer
    $("#update_note .dot").each(function (index) {
        $(this).css("background-color", $(this).attr("value"));

        $(this).click(function () {
            $(this).addClass("selected_dot")
                .siblings().removeClass("selected_dot");

            $("#update_note_box").css("background-color", $(this).attr("value"));
        })


        if (index === 0) {
            $(this).addClass("selected_dot");
        }
    });

    // set max character limit on text boxes
    $("#update_note_box").on("keypress paste", '[contenteditable]', function (e) {
        if (this.innerHTML.length >= this.getAttribute("max")) {
            e.preventDefault();
            return false;
        }
    });

    // move focus to note content on enter key press
    $("#update_title").keydown(function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            $("#update_content").focus();
        }
    });
}
update_box();

// show update box modal on click of note
$("#existing_notes").on('click', '.note_title, .note_content', function () {

    $modal = $("#update_modal");
    $modal.modal("show");

    // select the note
    $note = $(this).parent();
    $id = $note.attr("id");
    $title = $note.children(".note_title").text();
    $content = $note.children(".note_content").text();
    $color = $note.attr("data-color");

    // fill value to update modal
    $("#update_title").text($title);
    $("#update_content").text($content);
    $("#update_note input[name='id']").val($id);

    // change color accordingly
    $modal.find(".dot").each(function () {
        if ($(this).attr("value") == $color) {
            $(this).addClass("selected_dot")
                .siblings().removeClass("selected_dot");

            $("#update_note_box").css("background-color", $(this).attr("value"));
        }
    });

    // update on save button click
    $modal.on('submit', "#update_note", function (event) {
        event.preventDefault();

        // bind form contents to hidden elements
        
        // $("input[name='id']", this).val($id);
        $("input[name='title']", this).val($("#update_title").html());
        $("input[name='content']", this).val($("#update_content").html());
        $("input[name='color']", this).val($(".selected_dot", this).attr("value"));
        $("input[name='pinned']", this).val("false");

        // select form
        $form = $("#update_note");

        // cache inputs
        $inputs = $form.find("input");

        // serialize the data
        var serializedData = $form.serialize();

        // console.log(serializedData);

        // disable form elements for the duration of ajax request
        // disabled elements do not be serialized so serialize first and disable
        $inputs.prop("disabled", true);

        // fire Ajax request to php/update.php
        var request = $.ajax({
            url: "php/update.php",
            type: "POST",
            data: serializedData
        });

        // callback handler on success
        request.done(function (response, textStatus, jqXHR) {
            response = JSON.parse(response);
            $modal.modal("hide");

            // update note on DOM
            $note.children(".note_title").html(response['title']);
            $note.children(".note_content").html(response['content']);
            $note.attr("data-color",response['color']);
            $note.attr("data-lastModified",response['last_modified']);
            $note.attr("style","background-color:"+response['color']);
            $note.hide().prependTo("#existing_notes").fadeIn(1000);
        });

        request.always(function() {
            $inputs.prop("disabled",false);
        });
    });


});