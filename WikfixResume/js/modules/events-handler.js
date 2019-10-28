$(document).ready(function () {
    
    /**----------------------------- Login Form Submit -----------------------------**/
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
                    localStorage.setItem("token", result.token);
                    localStorage.setItem("user_id", result.user_id);
                    window.location.replace('questionnaire.html');
                }
            },
            error: function () {
                alert("Incorrect username / password!")
            }
        })
    });
    /**----------------------------- Login Form Submit Ends -----------------------------**/
    
    
    /**----------------------------- Signup Form Submit -----------------------------**/
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
                    window.location = 'index.html'
                }
                
            },
            error: function () {
                alert("Something wrong!")
            }
        });
    });
    /**----------------------------- Signup Form Submit Ends -----------------------------**/
    
    /**----------------------------- Clear LocalStorage on logout click -----------------------------**/
    $('#logout').click(function (e) {
        e.preventDefault();
        localStorage.setItem("token", null);
        localStorage.setItem("user_id", null);
        window.location.replace('index.html');
    });
    
    /**----------------------------- SetUp International Telephone Input -----------------------------**/
    var settings = {
        utilsScript: "js/modules/utils.js"
    };
    var input = document.querySelector("#contactNumber");
    var iti;
    if (input) {
        iti = window.intlTelInput(input, settings);
    }
    /**----------------------------- SetUp International Telephone Input Ends -----------------------------**/
    
    /**----------------------------- Questionnaire Related -----------------------------**/
    $('#hrefOtherSchool').click(function (e) {
        e.preventDefault();
        if (e.target.innerHTML === "Add another school") {
            $('.other-school').removeClass('d-none');
            e.target.innerHTML = "Remove other school";
        } else if (e.target.innerHTML === "Remove other school") {
            $('.other-school').addClass('d-none');
            e.target.innerHTML = "Add another school";
            $('.other-school').find('input, select').val('');
        }
    });
    
    $('#currentWork').change(function () {
        if (this.checked) {
            $('#jobEndDate').prop('disabled', true);
        } else {
            $('#jobEndDate').prop('disabled', false);
        }
    });
    $('#currentWork1').change(function () {
        if (this.checked) {
            $('#jobEndDate1').prop('disabled', true);
        } else {
            $('#jobEndDate1').prop('disabled', false);
        }
    });
    
    $('#currentStudy').change(function () {
        if (this.checked) {
            $('#endDate').prop('disabled', true);
        } else {
            $('#endDate').prop('disabled', false);
        }
    });
    
    $('#currentStudy1').change(function () {
        if (this.checked) {
            $('#endDate1').prop('disabled', true);
        } else {
            $('#endDate1').prop('disabled', false);
        }
    });
    
    $('#currentProject').change(function () {
        if (this.checked) {
            $('#projectEndDate').prop('disabled', true);
        } else {
            $('#projectEndDate').prop('disabled', false);
        }
    });
    
    $('#personalInfo').validate({
        highlight: function (element, errorClass) {
            $(element).addClass(errorClass);
            $(element.form).find("label[for=" + element.id + "]")
                .addClass(errorClass);
        },
        unhighlight: function (element, errorClass) {
            $(element).removeClass(errorClass);
            $(element.form).find("label[for=" + element.id + "]")
                .removeClass(errorClass);
        },
        rules: {
            name: "required",
            emailID: {
                required: true,
                email: true
            },
            contactNumber: {
                //ValidateContact: true,
                required: true,
                number: true,
            },
            mailingAddress: {
                required: true,
                minlength: 4
            }
        },
        messages: {
            name: "Please specify your full name",
            emailID: {
                required: "We need your email address for entering in your resume.",
                email: "Your email address must be in the format of name@domain.com"
            },
            contactNumber: {
                required: "Your contact number is essential."
            },
            mailingAddress: {
                required: "We need your mailing address for showing on your resume.",
                minlength: "Mailing address can't be less than 4 letters."
            }
            
        }
    });
    
    $.validator.addMethod("ValidateContact", function (value, element) {
        // Do your usual stuff here.
    }, function (params, element) {
        var value = $(element).val(),
            errorMap = ["Invalid number", "Invalid country code", "The number is too short", "The number is too long", "Invalid number"];
        if (value.trim()) {
            if (!iti.isValidNumber()) {
                var errorCode = iti.getValidationError();
                msg = errorMap[errorCode];
            }
        }
        return msg;
    });
    
    var questionnaireObject = {};
    
    $('.next').click(function (e) {
        e.preventDefault();
        var thisForm = $(this).closest('form');
        // if (thisForm.valid()) {
        thisForm.serializeArray().map(function (x) {
            questionnaireObject[x.name] = x.value;
        });
        thisForm.addClass('d-none');
        thisForm.next().removeClass('d-none');
        /* } else if(!thisForm.serializeArray()) {
             thisForm.addClass('d-none');
             thisForm.next().removeClass('d-none');
         }*/
    });
    
    $('.prev').click(function (e) {
        e.preventDefault();
        var thisForm = $(this).closest('form');
        // if (thisForm.valid()) {
        thisForm.serializeArray().map(function (x) {
            questionnaireObject[x.name] = x.value;
        });
        thisForm.addClass('d-none');
        thisForm.prev().removeClass('d-none');
        /*} else if(!thisForm.serializeArray()) {
            thisForm.addClass('d-none');
            thisForm.next().removeClass('d-none');
        }*/
    });
    
    function showPreview() {
        $.ajax({
            method: 'GET',
            //contentType: "application/json",
            //dataType: 'json',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
            },
            url: 'https://resume-server-561.herokuapp.com/data/fetch' + localStorage.getItem('user_id'),
            //data: JSON.stringify(questionnaireObject),
            success: function (result) {
                if (result) {
                    console.log(result.data);
                }
            },
            error: function (result) {
                alert("Couldn't retrieve data!")
            }
        })
    }
    
    $('#questionnaireSubmit').click(function (e) {
        e.preventDefault();
        var queryParams = '?user_id=' + localStorage.getItem('user_id') + '#payload=' + JSON.stringify(questionnaireObject);
        queryParams = queryParams.split(' ').join('%20').split('"').join('%22');
        $.ajax({
            method: 'GET',
            //contentType: "application/json",
            //dataType: 'json',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
            },
            url: 'https://resume-server-561.herokuapp.com/data/submit' + queryParams,
            //data: JSON.stringify(questionnaireObject),
            success: function (result) {
                if (result) {
                    alert(result.msg);
                    showPreview();
                }
            },
            error: function (result) {
                alert("Couldn't insert data!")
            }
        })
    });
    /**----------------------------- Questionnaire Related Ends-----------------------------**/
});