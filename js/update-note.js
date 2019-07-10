function update_box() {
    const update_box = `
    <!-- new note box expanded -->
    <form id="update_note">
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
    $("#update_note .dot").each(function(index) {
        $(this).css("background-color", $(this).attr("value"));

        $(this).click(function() {
            $(this).addClass("selected_dot")
            .siblings().removeClass("selected_dot");
            
            $("#update_note_box").css("background-color",$(this).attr("value"));
        })
        

        if(index === 0) {
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
    $("#update_title").keydown(function(e){
        if(e.keyCode == 13) {
            e.preventDefault();
            $("#update_content").focus();
        }
    });
}
update_box();