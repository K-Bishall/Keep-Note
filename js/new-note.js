//load new note box small
function new_note_small() {
    const new_note_small = `
    <!-- new note box small-->
    <div id="new_note_small" class="card-body row py-2">
        <p class="my-0">Take a note...</p>
        <i class="material-icons-outlined">check_box</i>
        <i class="material-icons-outlined">image</i>
    </div>`
    $("#new_note").html(new_note_small).css("background-color","White");
};
new_note_small();

// new note expanded box
function new_note_expanded() {
    const new_note_expanded = `
    <!-- new note box expanded -->
    <form id="new_note_expanded">
        <div class= "card-header py-1">
            <!-- The following two <div> MUST BE EMPTY to display placeholder -->
                <!-- new note title input -->
            <div id="note_title_input" contenteditable="true" 
                max="100" data-placeholder="Title"></div>
            <input type="hidden" name="title">
            <i class="icon-pushpin" style="margin-top: 5px" value="false"></i>
            <input type="hidden" name="pinned">
    
        </div>
    
        <!-- new note content -->
        <div id="note_content_input" class="card-body" contenteditable="true" 
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
    
    </form>`

    $("#new_note").html(new_note_expanded);
    $("#note_content_input").focus();

    // color pickers at footer
    $("#new_note .dot").each(function(index) {
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

    // set max character limit on text boxes
    $("#new_note").on("keypress paste", '[contenteditable]', function (e) {
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

    // discard note on delete button click
    $("#new_note .delete").click(new_note_small);
};


// expand new note card on click
$("#new_note").on('click', '#new_note_small > p',new_note_expanded);



/* now time to post new note */
// variable to hold request
var request;

$("#new_note").on('submit','#new_note_expanded',function(event){
    event.preventDefault();
    
    // bind form contents to hidden elements
    $("input[name='title']",this).val($("#note_title_input").text());
    $("input[name='content']",this).val($("#note_content_input").text());
    $("input[name='color']",this).val($(".selected_dot",this).attr("value"));
    $("input[name='pinned']",this).val("false");

    // abort any pending request
    if(request) {
        request.abort();
    }
    
    // select form
    $form = $("#new_note_expanded");
    
    // cache inputs
    $inputs = $form.find("input");
    
    // serialize the data
    var serializedData = $form.serialize();

    // console.log(serializedData);

    // disable form elements for the duration of ajax request
    // disabled elements do not be serialized so serialize first and disable
    $inputs.prop("disabled", true);

    // fire Ajax request to php/create.php
    request =  $.ajax({
        url: "php/create.php",
        type: "POST",
        data: serializedData
    });

    // callback handler on success
    request.done(function(response, textStatus, jqXHR) {
        console.log(response);

        // show small bar again
        new_note_small();
    });

    // handle failure
    request.fail(function(jqXHR, textStatus, errorThrown) {
        console.log("Error - Something wrong");
    });

    request.always(function() {
        // re-enable inpurs
        $inputs.prop("disabled",false);
    })

});