<?php
session_start();
$passengerID = $_SESSION['username'];

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

$passengerID = $_SESSION['username'];
// Perform SQL queries for each table
$carBookingsQuery = "SELECT * FROM bookingcar WHERE passenger_id = '$passengerID'";
$flightBookingsQuery = "SELECT * FROM bookingflight WHERE passenger_id = '$passengerID'";
$hotelBookingsQuery = "SELECT * FROM bookinghotel WHERE passenger_id = '$passengerID'";

$carBookings = $conn->query($carBookingsQuery);
$flightBookings = $conn->query($flightBookingsQuery);
$hotelBookings = $conn->query($hotelBookingsQuery);

if ($carBookings && $flightBookings && $hotelBookings) {
    $carBookingsData = [];
    while ($row = $carBookings->fetch_assoc()) {
        $carBookingsData[] = $row;
    }

    $flightBookingsData = [];
    while ($row = $flightBookings->fetch_assoc()) {
        $flightBookingsData[] = $row;
    }

    $hotelBookingsData = [];
    while ($row = $hotelBookings->fetch_assoc()) {
        $hotelBookingsData[] = $row;
    }

    if (count($carBookingsData) > 0 && count($flightBookingsData) > 0 && count($hotelBookingsData) > 0) {
    $data = [
        'carBookings' => $carBookingsData,
        'flightBookings' => $flightBookingsData,
        'hotelBookings' => $hotelBookingsData,
    ];}else{
        echo "Please place an order first";
    }

    // echo json_encode($data);
} else {
    echo "Error retrieving order data: " . $conn->error;
}

// Return the data as JSON


header('Content-Type: application/json');
echo json_encode($data);
?>
