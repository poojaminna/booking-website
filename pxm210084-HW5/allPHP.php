<?php

function connectToDatabase() {
    // Assuming you have a MySQL database set up with appropriate credentials
    $servername = "localhost";
    $username = "project_user";
    $password = "AHSUNA5051r!";
    $dbname = "bookings";

    // Create a connection to the database
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check the connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    return $conn;
}

$conn = connectToDatabase();


// Assuming you have a form with fields named 'name', 'email', 'message'
$firstName = $_POST['firstName'];
$lastName = $_POST['lastName'];
$passengerID = $_POST['passengerID'];
$email = $_POST['email'];
$password = $_POST['password'];
$age = $_POST['age'];
echo "Age (Before Insert): " . $age; // Debugging output

// Prepare your SQL query to insert the data into the table
$sql = "INSERT INTO user (passenger_id, first_name, last_name, age, email, password ) VALUES ('$passengerID', '$firstName', '$lastName','$age', '$email', '$password')";

// Execute the query
if ($conn->query($sql) === TRUE) {
    // alert("Registered successfully! You're now logged in.");
    header("Location: index.html?registered=true");
    exit; 
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// Close the database connection
$conn->close();



ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

?>
