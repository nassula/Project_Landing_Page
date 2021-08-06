$('.next').on('click', function() {  
    let formName = $('#name').val()
    let formEmail = $('#email').val()
    
    if(formName == "") {
        return false;
    }

    $('.formName').html(formName)
    $('.formEmail').html(formEmail)
    $('#form_01').hide()
    $('#form_02').show()
});