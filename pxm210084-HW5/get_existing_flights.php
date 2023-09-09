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

$sql = "SELECT * FROM flight"; // Assuming your table is named "flights"
$result = $conn->query($sql);

$flights = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {

        // Format date and time fields
        $row['departureDate'] = date('Y-m-d', strtotime($row['departure_date']));
        $row['departureTime'] = date('h:i A', strtotime($row['departure_time']));
        $row['arrivalDate'] = date('Y-m-d', strtotime($row['arrival_date']));
        $row['arrivalTime'] = date('h:i A', strtotime($row['arrival_time']));

        // Remove original date and time fields
        unset($row['departure_date']);
        unset($row['departure_time']);
        unset($row['arrival_date']);
        unset($row['arrival_time']);
        
        $flights[] = $row;
    }
}

$conn->close();

header('Content-Type: application/json');
echo json_encode($flights);
?>
