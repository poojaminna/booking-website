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

$sql = "SELECT * FROM rentalCars"; // Assuming your table is named "flights"
$result = $conn->query($sql);

$rentalCars = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {

        // Format date and time fields
        $row['checkIn_Date'] = date('Y-m-d', strtotime($row['checkInDate']));
        $row['checkOut_Date'] = date('Y-m-d', strtotime($row['checkOutDate']));

        // Remove original date and time fields
        unset($row['checkInDate']);
        unset($row['checkOutDate']);
        $hotels[] = $row;
    }
}

$conn->close();

header('Content-Type: application/json');
echo json_encode($hotels);
?>
