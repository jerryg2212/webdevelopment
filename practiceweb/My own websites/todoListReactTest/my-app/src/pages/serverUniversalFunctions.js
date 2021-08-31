


// function that checks to make sure that user enters valid password for registration
exports.registrationPasswordValidation = function(password){
    return password.length > 7;
}