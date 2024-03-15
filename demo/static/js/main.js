
(function ($) {
    "use strict";

    
    /*==================================================================
    [ Validate ]*/
    const firstname = $('.validate-input input[name="firstname"]');
    const lastname = $('.validate-input input[name="lastname"]');
    const address = $('.validate-input input[name="address"]');
    const gender = $('.validate-input input[name="gender"]');
    const email = $('.validate-input input[name="email"]');
    const dob = $('.validate-input input[name="dob"]');
    const formEl = document.getElementById('contact_info')

    $( "#clear-db" ).on( "click", function() {
        if (confirm('Deleting all contacts from database?')) {
            clearDb();
        }
      } );

    $('.validate-form').on('submit',function(event){
        event.preventDefault();
        let check = true;

        if($(firstname).val().trim() == ''){
            showValidate(firstname);
            check=false;
        }

        if($(lastname).val().trim() == ''){
            showValidate(lastname);
            check=false;
        }

        if($(address).val().trim() == ''){
            showValidate(address);
            check=false;
        }

        if($(email).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
            showValidate(email);
            check=false;
        }

        if($(dob).val().trim().match(/^(19|20)\d{2}(\/|-)(0[1-9]|1[1,2])(\/|-)(0[1-9]|[12][0-9]|3[01])$/) == null) {
            showValidate(dob);
            check=false;
        }

        if (check){
            // const data = {firstname: firstname.val(), lastname: lastname.val(), gender: gender.val(), dob: dob.val(), address: address.val(), email:email.val()}
            // console.log(data)
            // sendData(data)
        }

        if (check) {
            const data = {firstname: firstname.val(), lastname: lastname.val(), gender: gender.val(),
            dob: dob.val(), address: address.val(), address: address.val(), email: email.val()}
            sendData(data)
        }

        return check;
    });


    $('.validate-form .input1').each(function(){
        $(this).focus(function(){
           hideValidate(this);
       });
    });

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    
    function sendData(data){
        const currentUrl = window.location.href;
        const apiUrl = currentUrl+'/users/';

        const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        };

        fetch(apiUrl, requestOptions)
        .then(response => {
            if (!response.ok) {
                console.log('failure')
                showMsg('Something went wrong!')
            throw new Error('Network response was not ok');
            }
            showMsg('Contact added successfully')
            return response.json();
        })
        .then(data => {
            
        })
        .catch(error => {
            console.error

        ('Error:', error);
        });
    }

    function clearDb(){
        const currentUrl = window.location.href;
        const apiUrl = currentUrl+'/users/';

        const requestOptions = {
        method: 'DELETE'
        };

        fetch(apiUrl, requestOptions)
        .then(response => {
            if (!response.ok) {
                console.log('failure')
                showMsg('Something went wrong!')
            throw new Error('Network response was not ok');
            }
            showMsg('All contacts deleted successfully')
        })
        .then(data => {
            
        })
        .catch(error => {
            console.error

        ('Error:', error);
        });
    }

    function showMsg(msg) {
        $("#message").text(msg);
        $("#message").delay(200).fadeIn();
        $("#message").delay(2000).fadeOut();
    }

})(jQuery);