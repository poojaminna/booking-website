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

$hotels = [
    [
        'city' => 'New York',
        'name' => 'Hotel A',
        'checkInDate' => '2023-07-18',
        'checkOutDate' => '2023-07-20',
        'price' => '200'
    ],
    [
        'city' => 'Los Angeles',
        'name' => 'Hotel B',
        'checkInDate' => '2023-07-21',
        'checkOutDate' => '2023-07-25',
        'price' => '250'
    ],
    [
        'city' => 'Chicago',
        'name' => 'Hotel C',
        'checkInDate' => '2023-08-01',
        'checkOutDate' => '2023-08-05',
        'price' => '180'
    ],
    [
        'city' => 'Miami',
        'name' => 'Hotel D',
        'checkInDate' => '2023-09-10',
        'checkOutDate' => '2023-09-15',
        'price' => '300'
    ],
    [
        'city' => 'San Francisco',
        'name' => 'Hotel E',
        'checkInDate' => '2023-09-01',
        'checkOutDate' => '2023-09-05',
        'price' => '220'
    ],
    [
        'city' => 'Las Vegas',
        'name' => 'Hotel F',
        'checkInDate' => '2023-10-12',
        'checkOutDate' => '2023-10-15',
        'price' => '280'
    ],
    [
        'city' => 'Orlando',
        'name' => 'Hotel G',
        'checkInDate' => '2023-11-05',
        'checkOutDate' => '2023-11-10',
        'price' => '190'
    ],
    [
        'city' => 'Seattle',
        'name' => 'Hotel H',
        'checkInDate' => '2023-12-20',
        'checkOutDate' => '2023-12-25',
        'price' => '240'
    ],
    [
        'city' => 'New York',
        'name' => 'Hotel A',
        'checkInDate' => '2023-07-18',
        'checkOutDate' => '2023-07-20',
        'price' => '200'
    ],
    [
        'city' => 'Los Angeles',
        'name' => 'Hotel B',
        'checkInDate' => '2023-07-18',
        'checkOutDate' => '2023-07-20',
        'price' => '220'
    ]
];


foreach ($hotels as $hotel) {
    $hotelID = intval($hotel['hotelID']);
    $city = $hotel['city'];
    $hotelName = $hotel['name'];
    $checkInDate = $hotel['checkInDate'];
    // $departureTime = $hotel['departureTime'];
    $checkOutDate = $hotel['checkOutDate'];
    // $arrivalTime = $hotel['arrivalTime'];
    // $price = $hotel['price'];
    $price = isset($hotel['price']) ? floatval($hotel['price']) : 0.0;

    $sql = "INSERT INTO hotel (hotelID, city, hotelName, checkInDate , checkOutDate, price)
            VALUES ('$hotelID','$city', '$hotelName', '$checkInDate', '$checkOutDate',  '$price')";

    if ($conn->query($sql) === TRUE) {
        echo "hotel data inserted successfully.";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

?>