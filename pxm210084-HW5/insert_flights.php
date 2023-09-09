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

function convertTime($time) {
    return date('H:i:s', strtotime($time));
}

$flights = [
    [
        'flightID' => '23454',
        'origin' => 'New York',
        'destination' => 'Los Angeles',
        'departureDate' => '2023-07-18',
        'departureTime' => '08:00 AM',
        'arrivalDate' => '2023-07-18',
        'arrivalTime' => '11:00 AM',
        'price' => '200'
    ],
    [
        'flightID' => '29054',
        'origin' => 'New York',
        'destination' => 'Los Angeles',
        'departureDate' => '2023-07-18',
        'departureTime' => '4:30 PM',
        'arrivalDate' => '2023-07-19',
        'arrivalTime' => '12:30 PM',
        'price' => '220'
    ],
    [
        'flightID' => '90454',
        'origin' => 'New York',
        'destination' => 'Los Angeles',
        'departureDate' => '2023-07-19',
        'departureTime' => '08:00 AM',
        'arrivalDate' => '2023-07-19',
        'arrivalTime' => '11:00 AM',
        'price' => '200'
    ],
    [
        'flightID' => '23784',
        'origin' => 'New York',
        'destination' => 'Los Angeles',
        'departureDate' => '2023-07-19',
        'departureTime' => '10:00 AM',
        'arrivalDate' => '2023-07-19',
        'arrivalTime' => '01:00 PM',
        'price' => '220'
    ],
    [
        'flightID' => '89054',
        'origin' => 'New York',
        'destination' => 'Los Angeles',
        'departureDate' => '2023-07-19',
        'departureTime' => '12:00 PM',
        'arrivalDate' => '2023-07-19',
        'arrivalTime' => '03:00 PM',
        'price' => '230'
    ],
    [
        'flightID' => '27894',
        'origin' => 'New York',
        'destination' => 'Los Angeles',
        'departureDate' => '2023-07-19',
        'departureTime' => '02:00 PM',
        'arrivalDate' => '2023-07-19',
        'arrivalTime' => '05:00 PM',
        'price' => '250'
    ],
    [
        'flightID' => '23893',
        'origin' => 'New York',
        'destination' => 'Los Angeles',
        'departureDate' => '2023-07-19',
        'departureTime' => '04:00 PM',
        'arrivalDate' => '2023-07-19',
        'arrivalTime' => '07:00 PM',
        'price' => '280'
    ],
    [
        'flightID' => '23679',
        'origin' => 'New York',
        'destination' => 'Los Angeles',
        'departureDate' => '2023-07-19',
        'departureTime' => '06:00 PM',
        'arrivalDate' => '2023-07-19',
        'arrivalTime' => '09:00 PM',
        'price' => '300'
    ],
    [
        'flightID' => '13454',
        'origin' => 'New York',
        'destination' => 'Los Angeles',
        'departureDate' => '2023-07-19',
        'departureTime' => '08:00 PM',
        'arrivalDate' => '2023-07-19',
        'arrivalTime' => '11:00 PM',
        'price' => '280'
    ],
    [
        'flightID' => '23983',
        'origin' => 'New York',
        'destination' => 'Los Angeles',
        'departureDate' => '2023-07-19',
        'departureTime' => '10:00 PM',
        'arrivalDate' => '2023-07-20',
        'arrivalTime' => '01:00 AM',
        'price' => '250'
    ]
];


foreach ($flights as $flight) {
    $flightID = intval($flight['flightID']);
    $origin = $flight['origin'];
    $destination = $flight['destination'];
    $departureTime = convertTime($flight['departureTime']);
    $arrivalTime = convertTime($flight['arrivalTime']);
    $departureDate = $flight['departureDate'];
    // $departureTime = $flight['departureTime'];
    $arrivalDate = $flight['arrivalDate'];
    // $arrivalTime = $flight['arrivalTime'];
    // $price = $flight['price'];
    $price = isset($flight['price']) ? floatval($flight['price']) : 0.0;

    $sql = "INSERT INTO flight (flightID, origin, destination, departure_date, departure_time, arrival_date, arrival_time, price)
            VALUES ('$flightID','$origin', '$destination', '$departureDate', '$departureTime', '$arrivalDate', '$arrivalTime', '$price')";

    if ($conn->query($sql) === TRUE) {
        echo "Flight data inserted successfully.";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

?>