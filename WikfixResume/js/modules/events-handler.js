$(document).ready(function () {
    $('#login-form').on('submit', function (e) {
        e.preventDefault();
        var email = $('#email').val(),
            password = $('#password').val();
        $.ajax({
            method: 'POST',
            contentType: "application/json",
            dataType: 'json',
            url: 'https://resume-server-561.herokuapp.com/auth/signin',
            data: JSON.stringify({
                'email': email,
                'password': password
            }),
            success: function (result) {
                if (result) {
                    sessionStorage.setItem("token", result.token);
                    sessionStorage.setItem("user_id", result.user_id);
<<<<<<< HEAD
                    window.location.replace('form.html');
=======
                    window.location.replace('questionnaire.html');
>>>>>>> 568a83b54f60c49d3eef4d5fb98e6edce2648c0a
                }
            },
            error: function () {
                alert("Incorrect username / password!")
            }
        }).done(function (msg) {
            alert("Data Saved: " + msg);
        });
    });
    
    $('#signup-form').on('submit', function (e) {
        e.preventDefault();
        var name = $('#name').val(),
            email = $('#email').val(),
            password = $('#password').val();
        $.ajax({
            method: 'PUT',
            url: 'https://resume-server-561.herokuapp.com/auth/signup',
            dataType: 'json',
            contentType: "application/json",
            data: JSON.stringify({
                'email': email,
                'password': password,
                'name': name
            }),
            success: function (result) {
                if (result) {
                    window.location = 'login.html'
                }
                
            },
            error: function () {
                alert("Something wrong!")
            }
        }).done(function (msg) {
            alert("Data Saved: " + msg);
        });
    });
    
    var settings = {
        utilsScript: "js/modules/utils.js"
    };
    var input = document.querySelector("#contactNumber");
    if(input) {
        window.intlTelInput(input, settings);
    }
    
    $('#hrefOtherSchool').click(function (e) {
        e.preventDefault();
        if(e.target.innerHTML === "Add another school") {
            $('.other-school').removeClass('d-none');
            e.target.innerHTML = "Remove other school";
        } else if(e.target.innerHTML === "Remove other school") {
            $('.other-school').addClass('d-none');
            e.target.innerHTML = "Add another school";
            $('.other-school').find('input, select').val('');
        }
    });
    
    $('#currentWork').change(function(){
        if(this.checked) {
            $('#jobEndDate').prop('disabled', true);
        } else {
            $('#jobEndDate').prop('disabled', false);
        }
    });
    $('#currentWork1').change(function(){
        if(this.checked) {
            $('#jobEndDate1').prop('disabled', true);
        } else {
            $('#jobEndDate1').prop('disabled', false);
        }
    });
    
    $('#currentStudy').change(function(){
        if(this.checked) {
            $('#endDate').prop('disabled', true);
        } else {
            $('#endDate').prop('disabled', false);
        }
    });
    
    $('#currentStudy1').change(function(){
        if(this.checked) {
            $('#endDate1').prop('disabled', true);
        } else {
            $('#endDate1').prop('disabled', false);
        }
    });
    
    $('#currentProject').change(function(){
        if(this.checked) {
            $('#projectEndDate').prop('disabled', true);
        } else {
            $('#projectEndDate').prop('disabled', false);
        }
    });
    
    $('.next').click(function (e) {
        e.preventDefault();
        var thisForm = $(this).closest('form');
        thisForm.addClass('d-none');
        thisForm.next().removeClass('d-none');
    });
    
    $('.prev').click(function (e) {
        e.preventDefault();
        var thisForm = $(this).closest('form');
        thisForm.addClass('d-none');
        thisForm.prev().removeClass('d-none');
    });
    
});