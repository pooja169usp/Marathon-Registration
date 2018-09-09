var size = 0;
$(document).ready( function() {
	$('#submit_button').bind('click', function() {
        processUpload();
    });
    $('input[name="picture"]').on('change',function(e) {
	    size = this.files[0].size;
	});        
});

function processUpload() {
        send_file();    // picture upload takes longer, get it going
        //send_form_data();
}

function send_file() {    
        var form_data = new FormData($('form')[0]);
		alert(form_data);
        var file_name = $('#photograph').val();
        if(size > 2000000) {
            $('#status').html("ERROR, image is too big");
            return;
            }
//        file_name = file_name.replace("C:\\fakepath\\",""); 
        var toDisplay = "<img src='/~jadrn017/proj3/loader3.gif' width='20px' height='auto' />";               
        $('#pic').html(toDisplay);
        var where = file_name.lastIndexOf("\\");  // this is safer!
        file_name = file_name.substring(where+1);          
        form_data.append("image", document.getElementById("photograph").files[0]);
        $.ajax( {
            url: "ajax_file_upload.php",
            type: "post",
            data: form_data,
            processData: false,
            contentType: false,
            success: function(response) {
	       if(response.startsWith("Success")) {
               	//var fname = $("#photograph").val();
               	//var toDisplay = "<img src=\"/~jadrn000/ajax_file_upload/_uploadDIR_/" + file_name + "\" />";               
               	$('#pic').html(toDisplay);
               	$('#status').css('color','blue');	       
               	$('#status').html(response);
			}
	       else {
                $('#status').css('color','red');
				$('#status').html(response);	
				$('#pic').html("&nbsp;");		       
                }
			},
            error: function(response) {
               $('#status').css('color','red');
               $('#status').html("Sorry, an upload error occurred, 2MB maximum size");
            }
            });
        }