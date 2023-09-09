<?php
session_start(); // Start the session
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


// Get data from localStorage
$selectedFlightJSON = $_POST['selectedFlight'];
$selectedFlight = json_decode($selectedFlightJSON, true);

$selectedHotelJSON = $_POST['selectedHotel'];
$selectedHotel = json_decode($selectedHotelJSON, true);

$selectedRentalCarJSON = $_POST['selectedRentalCar'];
$selectedRentalCar = json_decode($selectedRentalCarJSON, true);


// Get passenger ID from session
$passengerID = $_SESSION['username'];

// Perform the database connection
$conn = connectToDatabase();

// Insert data into the database
$flightID = $selectedFlight['flightID'];
$hotelID = $selectedHotel['hotelID'];
$carID = $selectedRentalCar['carID'];
// echo .$flightID;
$status = 'Booked'; // Set the status as 'Pending' for the new booking
$sql1 = "INSERT INTO BookingFlight (flightID, passenger_id, Status) VALUES ('$flightID', '$passengerID', '$status')";
$sql2 = "INSERT INTO BookingHotel (hotelID, passenger_id, Status) VALUES ('$hotelID', '$passengerID', '$status')";
$sql3 = "INSERT INTO BookingCar (carID, passenger_id, Status) VALUES ('$carID', '$passengerID', '$status')";
// echo "SQL Query: $sql";
echo "pass: $passengerID";
if ($conn->query($sql1) === TRUE    
    && $conn->query($sql2) === TRUE
    && $conn->query($sql3) === TRUE
) {
    echo "Order placed successfullyyyyy!";
} else {
    echo "Error placing order: yaaaa" . $conn->error;
}

$conn->close();
?>
