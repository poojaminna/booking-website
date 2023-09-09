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
    $origin = $_GET["origin"];
    $destination = $_GET["destination"];
    // $departureDate = $_GET["departureDate"];
    $departureDate = date('Y-m-d', strtotime($_GET["departureDate"]));
    $arrivalDate = $_GET["arrivalDate"];
    $tripType = $_GET["tripType"];

    // Perform the database query based on the user's search criteria
    // You need to construct the SQL query based on the provided criteria and handle the results
    // $sql = "SELECT * FROM flight  "; // Assuming your table is named "flights"
    // AND departure_date = '$departureDate'


    $sql = "SELECT * FROM flight WHERE origin = '$origin' AND destination = '$destination' AND departure_date = '$departureDate' ";
    

   
    // echo "origin" .$origin;
    // echo "destination" .$destination;
    $result = $conn->query($sql);
    
    
    if (!$result) {
        echo "Error: hiii" . $sql . "<br>" . $conn->error;
        exit; // Exit the script to prevent further execution
    }

    
    $flights = [];

    if($result->num_rows == 0){
        $sql = "SELECT * FROM flight WHERE origin = '$origin' AND destination = '$destination' ";
        $result = $conn->query($sql);
        if (!$result) {
            echo "Error: hiii" . $sql . "<br>" . $conn->error;
            exit; // Exit the script to prevent further execution
        }
    }
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

    $flightsReturn = [];
    if ($tripType === "roundTrip") {
        $sql1 = "SELECT * FROM flight WHERE destination = '$origin' AND origin = '$destination' AND departure_date = '$arrivalDate' ";
        $result1 = $conn->query($sql1);

        if (!$result1) {
            echo "Error: hiii" . $sql . "<br>" . $conn->error;
            exit; // Exit the script to prevent further execution
        }
        if ($result1->num_rows > 0) {
            while ($row = $result1->fetch_assoc()) {

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
                
                $flightsReturn[] = $row;
            }
        }

    }

    

    $flightsAll = array(
        "flights" => $flights,
        "flightsReturn" => $flightsReturn
    );

    $conn->close();

    header('Content-Type: application/json');
    echo json_encode($flightsAll);


}
?>
