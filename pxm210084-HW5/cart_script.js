$(document).ready(function() {
    console.log("cart script entered ");
    var flightdiv = $("#displayedFlightDetails");
    const selectedFlightJSON = localStorage.getItem('selectedFlight');
    let selectedFlight; // Define selectedFlight in a higher scope

    if (selectedFlightJSON) {
        selectedFlight = JSON.parse(selectedFlightJSON);
        console.log("retrieved inside cart script");
        console.log(selectedFlight);
        flightdiv.html(formatCartDetails(selectedFlight));
    } else {
        flightdiv.text('No selected flight data found in localStorage.');
    }

    var hoteldiv = $("#displayedHotelDetails");
    const selectedHotelJSON = localStorage.getItem('selectedHotel');
    let selectedHotel; // Define selectedFlight in a higher scope

    if (selectedHotelJSON) {
        selectedHotel = JSON.parse(selectedHotelJSON);
        console.log("retrieved inside cart script");
        console.log(selectedHotel);
        hoteldiv.html(formatHotelCartDetails(selectedHotel));
    } else {
        hoteldiv.text('No selected flight data found in localStorage.');
    }


    var rentalCardiv = $("#displayedRentalCarDetails");
    const selectedRentalCarJSON = localStorage.getItem('selectedRentalCar');
    let selectedRentalCar; // Define selectedFlight in a higher scope

    if (selectedRentalCarJSON) {
        selectedRentalCar = JSON.parse(selectedRentalCarJSON);
        console.log("retrieved inside cart script");
        console.log(selectedRentalCar);
        rentalCardiv.html(formatCarCartDetails(selectedRentalCar));
    } else {
        rentalCardiv.text('No selected flight data found in localStorage.');
    }
    

    // Calculate and display the total price
    var totalPriceDiv = $("#totalPrice");
    const selectedFlightPrice = selectedFlight ? parseFloat(selectedFlight.price) : 0;
    const selectedHotelPrice = selectedHotel ? parseFloat(selectedHotel.price) : 0;// Calculate selected hotel price
    const selectedCarPrice = selectedRentalCar ? parseFloat(selectedRentalCar.price) : 0;// Calculate selected rental car price
    const totalPrice = selectedFlightPrice + selectedHotelPrice + selectedCarPrice;

    // totalPriceDiv.text('<strong>Total Price:</strong>  $' + totalPrice.toFixed(2));
    totalPriceDiv.html('<strong>Total Price:</strong>  $' + totalPrice.toFixed(2));

    $("#placeOrder").click(function() {
        // Check if all three items are set in localStorage
        if (!localStorage.getItem('selectedFlight') 
            || !localStorage.getItem('selectedHotel') 
            || !localStorage.getItem('selectedRentalCar')
            ) {
            alert('Please select all items before placing the order.');
        } else {
            const selectedFlightJSON = localStorage.getItem('selectedFlight');
            const selectedHotelJSON = localStorage.getItem('selectedHotel');
            const selectedRentalCarJSON = localStorage.getItem('selectedRentalCar');
            $.ajax({
                url: 'place_order.php',
                type: 'POST',
                data: {
                    selectedFlight: selectedFlightJSON,
                    selectedHotel : selectedHotelJSON,
                    selectedRentalCar : selectedRentalCarJSON
                },
                success: function(response) {
                    alert(response); // Display the response from the server
                },
                error: function(xhr, status, error) {
                    console.error('Error placing order:', error);
                }
            });

            // alert('Order placed successfully!');
        }
    });


});


function formatCartDetails(details) {
    let formattedDetails = '<div class="flight-details">';
    formattedDetails += '<strong>Flight Details:</strong><br>';
    formattedDetails += '<p>Flight ID: ' + details.flightID + '</p>';
    formattedDetails += '<p>Origin: ' + details.origin + '</p>';
    formattedDetails += '<p>Destination: ' + details.destination + '</p>';
    formattedDetails += '<p>Price: $' + details.price + '</p>';
    formattedDetails += '<p>Departure Date: ' + details.departureDate + '</p>';
    formattedDetails += '<p>Departure Time: ' + details.departureTime + '</p>';
    formattedDetails += '<p>Arrival Date: ' + details.arrivalDate + '</p>';
    formattedDetails += '<p>Arrival Time: ' + details.arrivalTime + '</p>';
    formattedDetails += '</div>';
    return formattedDetails;
}


function formatHotelCartDetails(details) {
    let formattedDetails = '<div class="hotel-details">';
    formattedDetails += '<strong>Hotel Details:</strong><br>';
    formattedDetails += '<p>Hotel ID: ' + details.hotelID + '</p>';
    formattedDetails += '<p>City: ' + details.city + '</p>';
    formattedDetails += '<p>Check In Date: ' + details.checkInDate + '</p>';
    formattedDetails += '<p>Check Out Date: ' + details.checkOutDate + '</p>';
    formattedDetails += '<p>Price: $' + details.price + '</p>';
    formattedDetails += '</div>';
    return formattedDetails;
}



function formatCarCartDetails(details) {
    let formattedDetails = '<div class="car-details">';
    formattedDetails += '<strong>Car Details:</strong><br>';
    formattedDetails += '<p>Car ID: ' + details.carID + '</p>';
    formattedDetails += '<p>City: ' + details.city + '</p>';
    formattedDetails += '<p>Check In Date: ' + details.checkInDate + '</p>';
    formattedDetails += '<p>Check Out Date: ' + details.checkOutDate + '</p>';
    formattedDetails += '<p>Price: $' + details.price + '</p>';
    formattedDetails += '</div>';
    return formattedDetails;
}