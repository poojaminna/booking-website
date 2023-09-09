function validateRegistrationForm(event) {
    console.log("hello");
    alert("hi");
    var passengerID = document.getElementById("passengerID").value;
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var age = document.getElementById("age").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    // Check if all fields are filled
    if (passengerID === "" || firstName === "" || lastName === "" || age === "" || email === "" || password === "" || confirmPassword === "") {
        alert("Please fill in all required fields.");
        return false;
    }

    //Check if passwords match
    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return false;
    }

    // Check password length
    if (password.length < 8) {
        alert("Password must be at least 8 characters.");
        return false;
    }

    // Check Passenger ID format
    var passengerIDPattern = /^\(\d{3}\)\s\d{3}-\d{4}$/;
    if (!passengerID.match(passengerIDPattern)) {
        alert("Passenger ID must be formatted as (ddd)md-dddd, e.g., (123)45-6789.");
        return false;
    }

    // Check Email format
    var emailPattern = /^[^\s@]+@[^@\s]+\.(edu)$/;
    if (!email.match(emailPattern)) {
        alert("Invalid email format. Email must contain @ and .edu.");
        return false;
    }

    return true;
}

function goToLogin() {
    alert("hi");
    window.location.href = 'login.html';
}

if (window.location.search.includes('registered=true')) {
        // alert("You have successfully registered. Please log in.");
        document.getElementById("registeredValidation").innerText = "You have successfully registered. Please log in.";
    // window.location.href = 'login.html';
    // alert("You have successfully registered. Please log in.");
    // setTimeout(function() {
    //     alert("You have successfully registered. Please log in.");
    // }, 100); 
}

