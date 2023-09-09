<?php
// Check if the form is submitted


session_start();
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

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get user input
    $username = trim($_POST["passengerID"]);
    $password = trim($_POST["password"]);

    // Perform database connection
    $conn = connectToDatabase();

    // Query to check user credentials
    $sql = "SELECT * FROM user WHERE passenger_id = '$username' AND password = '$password'";
    $result = $conn->query($sql);

    if ($result->num_rows == 1) {
        // Valid credentials
        echo "Login successful!";
        // Redirect to a welcome page or dashboard
        $_SESSION['username'] = $username; 
        header("Location: flights.html");
    } else {
        // Invalid credentials
        echo "Username: " . $username . "<br>";
        echo "Password: " . $password . "<br>";
        echo "Login failed. Please check your username and password.";
    }

    $conn->close();
}
?>
