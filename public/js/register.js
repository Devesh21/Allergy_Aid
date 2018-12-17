$("#email").focusout(function(){
    $.ajax({
        type: "POST",
        url: '/checkEmail',
        data: {email:$(this).val()},
        success: function(data){
            if (data){
                $("#emailID_alert").html("Email Id already exists!");
                $("#emailID_alert").show();
            }else {
                $("#emailID_alert").hide();
            }
        }
    })
})