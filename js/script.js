// load initial contents on document ready
$(document).ready(function () {
    //load new note box small
    const new_note_small = `
    <!-- new note box small-->
    <div id="new_note_small" class="card-body row py-2">
        <p class="my-0">Take a note...</p>
        <i class="material-icons-outlined">check_box</i>
        <i class="material-icons-outlined">image</i>
    </div>`
    $("#new_note").html(new_note_small);

    // expand new note card on click
    $("#new_note_small > p").click(function() {
        const new_note_expanded = `
        <!-- new note box expanded -->
        <form action="" method="POST" id="new_note_expanded">
            <div class= "card-header py-1">
                <!-- The following two <div> MUST BE EMPTY to display placeholder -->
                    <!-- new note title input -->
                <div id="note_title_input" contenteditable="true" 
                    max="100" data-placeholder="Title"></div>
                <input type="hidden" name="note_title">
                <i class="icon-pushpin" style="margin-top: 5px"></i>
            </div>

            <!-- new note content -->
            <div id="note_content_input" class="card-body" contenteditable="true" 
                max="1000" data-placeholder="Take a note..." autofocus></div>
            <input type="hidden" name="note_content">

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
                    <i class="material-icons-outlined">delete</i>
                </div>
                <button>Save</button>
            </div>

        </form>`

        $("#new_note").html(new_note_expanded);
        $("#note_content_input").focus();

        // color pickers at footer
        $(".dot").each(function(index) {
            $(this).css("background-color", $(this).attr("value"));

            $(this).click(function() {
                $(this).addClass("selected_dot")
                .siblings().removeClass("selected_dot");
                
                $("#new_note").css("background-color",$(this).attr("value"));
            })
            

            if(index === 0) {
                $(this).addClass("selected_dot");
            }
        });
    });


    // set max character limit on text boxes
    $(document).on("keypress paste", '[contenteditable]', function (e) {
        if (this.innerHTML.length >= this.getAttribute("max")) {
            e.preventDefault();
            return false;
        }
    });

    // move focus to note content on enter key press
    $("#note_title_input").keydown(function(e){
        if(e.keyCode == 13) {
            e.preventDefault();
            $("#note_content_input").focus();
        }
    });

})
