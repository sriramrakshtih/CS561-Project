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
                    window.location.replace('form.html');
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
    })
});