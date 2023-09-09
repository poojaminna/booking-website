$(document).ready(function () {
    var showExistingFlights = $('#showExistingFlights');
    if(showExistingFlights.length){
      showExistingFlights.click(function () {
        alert("hi");
          $.ajax({
              url: 'insert_flights.php',
              type: 'GET', // Use GET since you're executing a PHP script
              success: function (response) {
                  console.log(response); // Display the server response in the browser console
                  // Perform any additional actions or show a success message to the user
                  getFlights();
              },
              error: function (xhr, status, error) {
                  console.error('Error inserting flight data:', error);
                  // Handle the error or show an error message to the user
              }
          });
      });
    }


    var showExistingHotels = $('#showExistingHotels');
    if(showExistingHotels.length){
      showExistingHotels.click(function () {
        alert("hi");
          $.ajax({
              url: 'insert_hotels.php',
              type: 'GET', // Use GET since you're executing a PHP script
              success: function (response) {
                  console.log(response); // Display the server response in the browser console
                  // Perform any additional actions or show a success message to the user
                  getHotels();
              },
              error: function (xhr, status, error) {
                  console.error('Error inserting flight data:', error);
                  // Handle the error or show an error message to the user
              }
          });
      });
    }

    var showExistingRentalCars = $('#showExistingRentalCars');
    if(showExistingRentalCars.length){
      showExistingRentalCars.click(function () {
        alert("hi");
          $.ajax({
              url: 'insert_rentalCars.php',
              type: 'GET', // Use GET since you're executing a PHP script
              success: function (response) {
                  console.log(response); // Display the server response in the browser console
                  // Perform any additional actions or show a success message to the user
                  getRentalCars();
              },
              error: function (xhr, status, error) {
                  console.error('Error inserting flight data:', error);
                  // Handle the error or show an error message to the user
              }
          });
      });
    }

    var flightform = $('#flight-form');
    if(flightform){
        flightform.submit(function (event) {
            event.preventDefault();
            console.log("recommended");
        
            // Use AJAX to fetch flight information from the PHP file
            $.ajax({
                url: 'get_search_flights.php',
                type: 'GET',
                dataType: 'json', // Expect JSON response
                data: {
                    origin: $('#departure').val(),
                    destination: $('#destination').val(),
                    departureDate: $('#departureDate').val(),
                    arrivalDate: $('#returnDate').val(),
                    tripType: $('#tripType').val()
                },
                success: function (flightsAll) {
                    // Display flights in the existing table with radio buttons
                    displayFlightsTable(flightsAll.flights, 1);
                    if ($('#tripType').val() === "roundTrip") {
                        displayFlightsTable(flightsAll.flightsReturn, 2);
                    }
                },
                error: function (xhr, status, error) {
                    // console.error('Error fetching flight data:', error);
                    if (xhr.responseText) {
                        console.error('Error fetching flight data:', error);
                    } else {
                        console.error('Error fetching flight data: Empty response');
                    }
                }
            });
        });
    }


    var hotelform = $('#hotel-form');
    if(hotelform){
        hotelform.submit(function (event) {
            event.preventDefault();
            console.log("recommended");
        
            // Use AJAX to fetch flight information from the PHP file
            $.ajax({
                url: 'get_search_hotels.php',
                type: 'GET',
                dataType: 'json', // Expect JSON response
                data: {
                    city: $('#city').val(),
                    checkInDate: $('#checkInDate').val(),
                    checkOutDate: $('#checkOutDate').val(),
                },
                success: function (hotels) {
                    // Display flights in the existing table with radio buttons
                    displayHotelsTable(hotels);
                },
                error: function (xhr, status, error) {
                    // console.error('Error fetching flight data:', error);
                    if (xhr.responseText) {
                        console.error('Error fetching hotel data:', error);
                    } else {
                        console.error('Error fetching hotel data: Empty response');
                    }
                }
            });
        });
    }

    var rentalCarsform = $('#rentalCars-form');
    if(rentalCarsform){
        rentalCarsform.submit(function (event) {
            event.preventDefault();
            console.log("recommended");
        
            // Use AJAX to fetch flight information from the PHP file
            $.ajax({
                url: 'get_search_rentalCars.php',
                type: 'GET',
                dataType: 'json', // Expect JSON response
                data: {
                    city: $('#city').val(),
                    checkInDate: $('#checkInDate').val(),
                    checkOutDate: $('#checkOutDate').val(),
                },
                success: function (rentalCars) {
                    // Display flights in the existing table with radio buttons
                    displayRentalCarsTable(rentalCars);
                },
                error: function (xhr, status, error) {
                    // console.error('Error fetching flight data:', error);
                    if (xhr.responseText) {
                        console.error('Error fetching Rental Car data:', error);
                    } else {
                        console.error('Error fetching Rental Car data: Empty response');
                    }
                }
            });
        });
    }
});

function getFlights(){
    const tableHeaders = `
        <thead>
            <tr>
            <th>Flight ID</th>
            <th>Origin</th>
            <th>Destination</th>
            <th>Departure date</th>
            <th>Departure time</th>
            <th>Arrival date</th>
            <th>Arrival time</th>
            <th>Price</th>
            <th>Choose Flight</th>
            </tr>
        </thead>
        `;

  // Assuming you have the existing table with the id "existingFlightsTable"
  const existingFlightsTable = $('#existingFlightsTable');

  // Set the table headers
  existingFlightsTable.html(tableHeaders);

  // Fetch flight data from the PHP script
  $.ajax({
    url: 'get_existing_flights.php',
    type: 'GET',
    dataType: 'json',
    success: function (flights) {
        // console.log(flights);
      let tableRows = $('<tbody></tbody>');

      // Loop through the flights array and append rows to the table
      for (var i = 0; i < flights.length; i++) {
        var flight = flights[i];
        console.log(flight[i]);
        var row = $('<tr></tr>');
        row.append('<td>' + flight.flightID + '</td>');
        row.append('<td>' + flight.origin + '</td>');
        row.append('<td>' + flight.destination + '</td>');
        row.append('<td>' + flight.departureDate + '</td>');
        row.append('<td>' + flight.departureTime + '</td>');
        row.append('<td>' + flight.arrivalDate + '</td>');
        row.append('<td>' + flight.arrivalTime + '</td>');
        row.append('<td>' + flight.price + '</td>');
        row.append('<td><button class="choose-flight">Choose</button></td>');

        tableRows.append(row);
      }

      // Add the table rows to the existing table
      existingFlightsTable.append(tableRows);
    },
    error: function (xhr, status, error) {
      console.error(error);
    }
  });

}




function getHotels(){
    const tableHeaders = `
        <thead>
            <tr>
            <th>Hotel ID</th>
            <th>City</th>
            <th>Hotel Name</th>
            <th>Check In date</th>
            <th>Check Out date</th>
            <th>Price</th>
            <th>Choose Hotel</th>
            </tr>
        </thead>
        `;

  // Assuming you have the existing table with the id "existingFlightsTable"
  const existingHotelsTable = $('#existingHotelsTable');

  // Set the table headers
  existingHotelsTable.html(tableHeaders);

  // Fetch flight data from the PHP script
  $.ajax({
    url: 'get_existing_hotels.php',
    type: 'GET',
    dataType: 'json',
    success: function (hotels) {
        // console.log(flights);
      let tableRows = $('<tbody></tbody>');

      // Loop through the flights array and append rows to the table
      for (var i = 0; i <hotels.length; i++) {
        var hotel = hotels[i];
        console.log(hotel[i]);
        var row = $('<tr></tr>');
        row.append('<td>' + hotel.hotelID + '</td>');
        row.append('<td>' + hotel.city + '</td>');
        row.append('<td>' + hotel.hotelName + '</td>');
        row.append('<td>' + hotel.checkIn_Date + '</td>');
        row.append('<td>' + hotel.checkOut_Date + '</td>');
        row.append('<td>' + hotel.price + '</td>');
        row.append('<td><button class="choose-hotel">Choose</button></td>');

        tableRows.append(row);
      }

      // Add the table rows to the existing table
      existingHotelsTable.append(tableRows);
    },
    error: function (xhr, status, error) {
      console.error(error);
    }
  });

}


function getRentalCars(){
    const tableHeaders = `
        <thead>
            <tr>
            <th>Hotel ID</th>
            <th>Name</th>
            <th>City</th>
            <th>Check In date</th>
            <th>Check Out date</th>
            <th>Price</th>
            <th>Choose Car</th>
            </tr>
        </thead>
        `;

  // Assuming you have the existing table with the id "existingFlightsTable"
  const existingRentalCarsTable = $('#existingRentalCarsTable');

  // Set the table headers
  existingRentalCarsTable.html(tableHeaders);

  // Fetch flight data from the PHP script
  $.ajax({
    url: 'get_existing_rentalCars.php',
    type: 'GET',
    dataType: 'json',
    success: function (rentalCars) {
        // console.log(flights);
      let tableRows = $('<tbody></tbody>');

      // Loop through the flights array and append rows to the table
      for (var i = 0; i <rentalCars.length; i++) {
        var car = rentalCars[i];
        console.log(car[i]);
        var row = $('<tr></tr>');
        row.append('<td>' + car.carID + '</td>');
        row.append('<td>' + car.name + '</td>');
        row.append('<td>' + car.city + '</td>');
        row.append('<td>' + car.checkIn_Date + '</td>');
        row.append('<td>' + car.checkOut_Date + '</td>');
        row.append('<td>' + car.price + '</td>');
        row.append('<td><button class="choose-car">Choose</button></td>');

        tableRows.append(row);
      }

      // Add the table rows to the existing table
      existingRentalCarsTable.append(tableRows);
    },
    error: function (xhr, status, error) {
      console.error(error);
    }
  });

}



let globalFlight = localStorage.getItem('selectedFlight') || "";
let firstTimeFlightSelected = false;


let globalReturnFlight = localStorage.getItem('selectedReturnFlight') || "";
let firstTimeReturnFlightSelected = false;

function displayFlightsTable(flights, op) {
    const tableHeaders1 = `
      <thead>
        <tr>
          <th>Flight ID</th>
          <th>Origin</th>
          <th>Destination</th>
  	  <th>Departure date</th>
          <th>Departure time</th>
          <th>Arrival date</th>
          <th>Arrival time</th>
          <th>Price</th>
          <th>Choose Flight</th>
        </tr>
      </thead>
    `;

    let tableRows1 = '<tbody>';

    for (let i = 0; i < flights.length; i++) {
        console.log(flight[i]);
      tableRows1 += `
        <tr>
        <td>${flights[i].flightID}</td>
          <td>${flights[i].origin}</td>
          <td>${flights[i].destination}</td>
	  <td>${flights[i].departureDate}</td>
          <td>${flights[i].departureTime}</td>
          <td>${flights[i].arrivalDate}</td>
          <td>${flights[i].arrivalTime}</td>
          <td>${flights[i].price}</td>
          <td><input type="radio" name="flightRadio" value="${i}"></td>
        </tr>
      `;
    }

    tableRows1 += '</tbody>';

    // Append the rows to the existing table
    
    

    if(op==1){
        $('#flightsTable').html(`${tableHeaders1}${tableRows1}`);
        // $('#flightsTable input[type="radio"]')
        $('#flightsTable').find('input[type="radio"]').change(function () {
            if(firstTimeFlightSelected == false) {
                firstTimeFlightSelected = true;
            $('#cart-flight').append('<i class="fa fa-shopping-cart" id="addToCartIcon"></i>');
            }
            $('input[type="radio"]').closest('tr').css('opacity',1);
            const selectedFlightIndex = parseInt($(this).val());
            const selectedFlight = flights[selectedFlightIndex];
            globalFlight = selectedFlight;
        $(this).closest('tr').css('opacity',0.5);
        });
    }else if (op==2){
        $('#flightsTable-return').html(`${tableHeaders1}${tableRows1}`);
        // $('#flightsTable-return input[type="radio"]')
        $('#flightsTable-return').find('input[type="radio"]').change(function () {
            if(firstTimeReturnFlightSelected == false) {
                firstTimeReturnFlightSelected = true;
            $('#cart-flight-2').append('<i class="fa fa-shopping-cart" id="addToCartIcon"></i>');
            }
            $('input[type="radio"]').closest('tr').css('opacity',1);
            const selectedReturnFlightIndex = parseInt($(this).val());
            const selectedReturnFlight = flights[selectedReturnFlightIndex];
            globalReturnFlight = selectedReturnFlight;
        $(this).closest('tr').css('opacity',0.5);
        });
    }
}

$('#cart-flight').click(function () {
    
    alert('Added to cart!');
    
    localStorage.setItem('selectedFlight', JSON.stringify(globalFlight));

    console.log(globalFlight);

});

$('#cart-flight-2').click(function () {
    
    alert('Added to cart!');
    
    localStorage.setItem('selectedReturnFlight', JSON.stringify(globalReturnFlight));

    console.log(globalReturnFlight);

});





let globalHotel = localStorage.getItem('selectedHotel') || "";
let firstTimeHotelSelected = false;

function displayHotelsTable(hotels) {
    const tableHeaders1 = `
      <thead>
        <tr>
          <th>Hotel ID</th>
          <th>City</th>
          <th>Name</th>
  	  <th>Check In date</th>
          <th>Check Out date</th>
          <th>Price</th>
          <th>Choose hotel</th>
        </tr>
      </thead>
    `;

    let tableRows1 = '<tbody>';

    for (let i = 0; i < hotels.length; i++) {
        console.log(hotels[i]);
      tableRows1 += `
        <tr>
        <td>${hotels[i].hotelID}</td>
          <td>${hotels[i].city}</td>
          <td>${hotels[i].hotelName}</td>
	  <td>${hotels[i].checkIn_Date}</td>
          <td>${hotels[i].checkOut_Date}</td>
          <td>${hotels[i].price}</td>
          <td><input type="radio" name="hotelRadio" value="${i}"></td>
        </tr>
      `;
    }

    tableRows1 += '</tbody>';

    // Append the rows to the existing table
    $('#hotelsTable').html(`${tableHeaders1}${tableRows1}`);

    $('input[type="radio"]').change(function () {
        if(firstTimeHotelSelected == false) {
            firstTimeHotelSelected = true;
          $('#cart-hotel').append('<i class="fa fa-shopping-cart" id="addToCartIcon"></i>');
          }
        $('input[type="radio"]').closest('tr').css('opacity',1);
        const selectedHotelIndex = parseInt($(this).val());
        const selectedHotel = hotels[selectedHotelIndex];
         globalHotel = selectedHotel;
       $(this).closest('tr').css('opacity',0.5);
      });
}

$('#cart-hotel').click(function () {
    
    alert('Added to cart!');
    
    localStorage.setItem('selectedHotel', JSON.stringify(globalHotel));

    console.log(globalHotel);
    // console.log(localStorage.getItem('selectedFlight'));
    //     const selectedFlightretrieved = JSON.parse(localStorage.getItem('selectedFlight'));
    // console.log(selectedFlightretrieved);

});




let globalRentalCar = localStorage.getItem('selectedRentalCar') || "";
let firstTimeRentalCarSelected = false;

function displayRentalCarsTable(rentalCars) {
    const tableHeaders1 = `
      <thead>
        <tr>
          <th>Car ID</th>
          <th>City</th>
          <th>Name</th>
  	  <th>Check In date</th>
          <th>Check Out date</th>
          <th>Price</th>
          <th>Choose Car</th>
        </tr>
      </thead>
    `;

    let tableRows1 = '<tbody>';

    for (let i = 0; i < rentalCars.length; i++) {
        console.log(rentalCars[i]);
      tableRows1 += `
        <tr>
        <td>${rentalCars[i].carID}</td>
          <td>${rentalCars[i].city}</td>
          <td>${rentalCars[i].name}</td>
	  <td>${rentalCars[i].checkIn_Date}</td>
          <td>${rentalCars[i].checkOut_Date}</td>
          <td>${rentalCars[i].price}</td>
          <td><input type="radio" name="carRadio" value="${i}"></td>
        </tr>
      `;
    }

    tableRows1 += '</tbody>';

    // Append the rows to the existing table
    $('#rentalCarsTable').html(`${tableHeaders1}${tableRows1}`);

    $('input[type="radio"]').change(function () {
        if(firstTimeRentalCarSelected == false) {
            firstTimeRentalCarSelected = true;
          $('#cart-rentalCar').append('<i class="fa fa-shopping-cart" id="addToCartIcon"></i>');
          }
        $('input[type="radio"]').closest('tr').css('opacity',1);
        const selectedRentalCarIndex = parseInt($(this).val());
        const selectedRentalCar = rentalCars[selectedRentalCarIndex];
        globalRentalCar = selectedRentalCar;
       $(this).closest('tr').css('opacity',0.5);
      });
}

$('#cart-rentalCar').click(function () {
    
    alert('Added to cart!');
    
    localStorage.setItem('selectedRentalCar', JSON.stringify(globalRentalCar));

    console.log(globalRentalCar);
    
    // console.log(localStorage.getItem('selectedFlight'));
    //     const selectedFlightretrieved = JSON.parse(localStorage.getItem('selectedFlight'));
    // console.log(selectedFlightretrieved);

});
