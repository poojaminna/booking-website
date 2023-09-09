$(document).ready(function() {
    $.ajax({
        url: 'order_status.php',
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            console.log(data);
            populateTable('carBookings', data.carBookings, 'carID'); // Adjust field name
            populateTable('flightBookings', data.flightBookings, 'flightID'); // Adjust field name
            populateTable('hotelBookings', data.hotelBookings, 'hotelID'); // Adjust field name
        },
        error: function() {
            console.error('Error fetching order status data');
        }
    });
});

function populateTable(divId, bookings, idField) {
    var table = $('#' + divId + ' table');
    var tableBody = table.find('tbody');
    // tableBody.empty();

    bookings.forEach(function(booking) {
        var row = '<tr>' +
            '<td>' + booking.BookID + '</td>' +
            '<td>' + booking[idField] + '</td>' + // Use the parameter for field name
            '<td>' + booking.Status + '</td>' +
            '</tr>';
        tableBody.append(row);
    });
}


// function populateTable(divId, bookings, idField) {
//     var table = $('#' + divId + ' table');
//     var tableBody = table.find('tbody');
//     var tableHeader = table.find('thead');

//     // tableBody.empty();
//     // tableHeader.empty(); // Clear previous headers

//     // Add table headers
//     var headerRow = '<tr>' +
//         '<th>BookID</th>' +
//         '<th>' + idField + '</th>' +
//         '<th>Status</th>' +
//         '</tr>';
//     tableHeader.append(headerRow);

//     // Add table rows
//     bookings.forEach(function(booking) {
//         var row = '<tr>' +
//             '<td>' + booking.BookID + '</td>' +
//             '<td>' + booking[idField] + '</td>' +
//             '<td>' + booking.Status + '</td>' +
//             '</tr>';
//         tableBody.append(row);
//     });
// }

