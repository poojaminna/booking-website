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


$rentalCars = [
    [
        "city" => "New York",
        "name" => "Car A",
        "checkInDate" => "2023-07-18",
        "checkOutDate" => "2023-07-20",
        "price" => "200"
    ],
    [
        "city" => "Los Angeles",
        "name" => "Car B",
        "checkInDate" => "2023-07-21",
        "checkOutDate" => "2023-07-25",
        "price" => "250"
    ],
    [
        "city" => "Chicago",
        "name" => "Car C",
        "checkInDate" => "2023-08-01",
        "checkOutDate" => "2023-08-05",
        "price" => "180"
    ],
    [
        "city" => "Miami",
        "name" => "Car D",
        "checkInDate" => "2023-09-10",
        "checkOutDate" => "2023-09-15",
        "price" => "300"
    ],
    [
        "city" => "San Francisco",
        "name" => "Car E",
        "checkInDate" => "2023-09-01",
        "checkOutDate" => "2023-09-05",
        "price" => "220"
    ],
    [
        "city" => "Las Vegas",
        "name" => "Car F",
        "checkInDate" => "2023-10-12",
        "checkOutDate" => "2023-10-15",
        "price" => "280"
    ],
    [
        "city" => "Orlando",
        "name" => "Car G",
        "checkInDate" => "2023-11-05",
        "checkOutDate" => "2023-11-10",
        "price" => "190"
    ],
    [
        "city" => "Seattle",
        "name" => "Car H",
        "checkInDate" => "2023-12-20",
        "checkOutDate" => "2023-12-25",
        "price" => "240"
    ],
    [
        "city" => "New York",
        "name" => "Car A",
        "checkInDate" => "2023-07-18",
        "checkOutDate" => "2023-07-20",
        "price" => "200"
    ],
    [
        "city" => "Los Angeles",
        "name" => "Car B",
        "checkInDate" => "2023-07-18",
        "checkOutDate" => "2023-07-20",
        "price" => "220"
    ]
];
foreach ($rentalCars as $car) {
    $carID = intval($car['carID']);
    $city = $car['city'];
    $carName = $car['name'];
    $checkInDate = $car['checkInDate'];
    // $departureTime = $car['departureTime'];
    $checkOutDate = $car['checkOutDate'];
    // $arrivalTime = $car['arrivalTime'];
    // $price = $car['price'];
    $price = isset($car['price']) ? floatval($car['price']) : 0.0;

    $sql = "INSERT INTO rentalcars (carID, name,city, checkInDate , checkOutDate, price)
            VALUES ('$carID','$carName', '$city','$checkInDate', '$checkOutDate',  '$price')";

    if ($conn->query($sql) === TRUE) {
        echo "car data inserted successfully.";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}
?>