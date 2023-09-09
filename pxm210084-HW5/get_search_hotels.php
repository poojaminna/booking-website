<?php
// include 'connectToDatabase.php'; // Include the code to establish a database connection
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
if ($_SERVER["REQUEST_METHOD"] === "GET") {
    // var_dump($_GET);
    $city = $_GET["city"];
    $checkInDate = date('Y-m-d', strtotime($_GET["checkInDate"]));
    $checkOutDate = date('Y-m-d', strtotime($_GET["checkOutDate"]));

    $sql = "SELECT * FROM hotel WHERE city = '$city' AND checkInDate = '$checkInDate' AND checkOutDate = '$checkOutDate' ";
    // echo "origin" .$origin;
    // echo "destination" .$destination;
    $result = $conn->query($sql);
    if (!$result) {
        echo "Error: hiii" . $sql . "<br>" . $conn->error;
        exit; // Exit the script to prevent further execution
    }
    $hotels = [];

    if($result->num_rows == 0){
        $sql = "SELECT * FROM hotel WHERE city = '$city' AND checkInDate = '$checkInDate'  ";
        $result = $conn->query($sql);
        if (!$result) {
            echo "Error: hiii" . $sql . "<br>" . $conn->error;
            exit; // Exit the script to prevent further execution
        }
    }
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


}
?>
