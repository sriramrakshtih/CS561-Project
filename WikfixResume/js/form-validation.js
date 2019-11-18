// Wait for the DOM to be ready
$(function() {
    $("form[id='login-form']").validate({
        // Specify validation rules
        rules: {
            // The key name on the left side is the name attribute
            // of an input field. Validation rules are defined
            // on the right side
            //username: "required",
            //password: "required",
            email: {
                required: true,
                // Specify that email should be validated
                // by the built-in "email" rule
                email: true
            },
            password: {
                required: true,
                minlength: 5
            }
        },

        messages: {
            password: {
                required: "Please provide a password",
                minlength: "Please provide correct Password"
            },
            email: "Please enter a valid email address"
        },

        submitHandler: function(form) {
            form.submit();
        }
    });

    $("form[id='signup-form']").validate({
        // Specify validation rules
        rules: {
            name: "required",
            email: {
                required: true,
                // Email validated by the built-in "email" rule
                email: true
            },
            password: {
                required: true,
                minlength: 5
            },
            agree : {
                required: true
            }
        },
        // Specify validation error messages
        messages: {
            name: "Please enter your Name",
            email: "Please enter a valid email address",
            password: {
                required: "Please provide a password",
                minlength: "Your password must be at least 5 characters long"
            },
            agree: {
                required: "Please agree to the trems and conditions."
            }
        },
        // Make sure the form is submitted to the destination defined
        // in the "action" attribute of the form when valid
        submitHandler: function(form) {
            form.submit();
        }
    });

    $("form[id='signup-form']").validate({
        // Specify validation rules
        rules: {
            name: "required",
            email: {
                required: true,
                // Email validated by the built-in "email" rule
                email: true
            },
            password: {
                required: true,
                minlength: 5
            }
        },
        // Specify validation error messages
        messages: {
            name: "Please enter your Name",
            email: "Please enter a valid email address",
            password: {
                required: "Please provide a password",
                minlength: "Your password must be at least 5 characters long"
            }
        },
        // Make sure the form is submitted to the destination defined
        // in the "action" attribute of the form when valid
        submitHandler: function(form) {
            form.submit();
        }
    });

/*
    $("form[id='education']").validate({

        rules: {
            //endDate: { greaterThan: "#startDate" },

            gpa: {
                //lesserThan: 10
                greaterThan: 5
            },
            gpa1: { lesserThan: 10 }
        },
        // Specify validation error messages
        messages: {
            //endDate: "End Date should be greater than Start Date",
            gpa: {
                maxlength: "Cgpa should be lesser than 10"
            },
            gpa1: {
                lesserThan: "Cgpa should be lesser than 10"
            },
            endDate: {
                greaterThan: "End Date should be greater than Start Date"
            },
            endDate1: {
                greaterThan: "End Date should be greater than Start Date"
            }
        },

    });
*/

   /*
   jQuery.validator.addMethod("greaterThan",
function(value, element, params) {

    if (!/Invalid|NaN/.test(new Date(value))) {
        return new Date(value) > new Date($(params).val());
    }

    return isNaN(value) && isNaN($(params).val())
        || (Number(value) > Number($(params).val()));
},'Must be greater than {0}.');
*/

});