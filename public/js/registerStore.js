$("#email").focusout(function(){
    $.ajax({
        type: "POST",
        url: '/checkStoreEmail',
        data: {email:$(this).val()},
        success: function(data){
            if (data){
                $("#emailID_alert").html("Email Id already exists!");
                $("#emailID_alert").show();
                $("#signup").attr("disabled", true);
                
            }else {
                $("#emailID_alert").hide();
                $("#signup").attr("disabled", false);
            }
        }
    })
});
