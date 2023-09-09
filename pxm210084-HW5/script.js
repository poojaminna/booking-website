function updateDateTime() {
  var datetimeElement = document.getElementById("datetime");
  var currentDateTime = new Date();

  datetimeElement.innerHTML = currentDateTime.toLocaleString();
}

// Update date and time every second
setInterval(updateDateTime, 1000);


//===============================================================

function validateDates() {
  event.preventDefault();
  var checkInDate = new Date(document.getElementById("checkInDate").value);
  var dateElement = document.getElementById("checkOutDate");
  var checkOutDate = new Date(dateElement.value);

   if (checkInDate >= checkOutDate) {
    displayErrorMessage(dateElement, "Check-out date must be greater than the check-in date.");
    return;
  }else{
    removeError(dateElement);
    
  }

}

//---------------------------------------------------------------------

var isFormValid = false;
var formInputs = {};
function validateForm(event) {
  var form =  document.getElementById("form");
  event.preventDefault(); // Prevent form submission
  
  var firstNameInput = document.getElementById("firstName");
  var lastNameInput = document.getElementById("lastName");
  var phoneNumberInput = document.getElementById("phoneNumber");
  var genderInputs = document.getElementsByName("gender");
  var emailInput = document.getElementById("email");
  var commentInput = document.getElementById("comment");

  // Validate First Name
  var firstName = firstNameInput.value.trim();
  if (!isValidName(firstName)) {
    displayErrorMessage(firstNameInput, "invalid fn");
    return;
  }else{
    removeError(firstNameInput);
    
  }

  // Validate Last Name
  var lastName = lastNameInput.value.trim();
  if (!isValidName(lastName)) {
    displayErrorMessage(lastNameInput, "Last name is invalid.");
    return;
  }else{
    removeError(lastNameInput);
    
  }

  // Check if First Name and Last Name are the same
  if (firstName === lastName) {
    displayErrorMessage(lastNameInput, "First name and last name can't be the same.");
    return;
  }else{
    removeError(lastNameInput);
    
  }

  // Validate Phone Number
  var phoneNumber = phoneNumberInput.value.trim();
  if (!isValidPhoneNumber(phoneNumber)) {
    displayErrorMessage(phoneNumberInput, "Phone number is invalid. Please enter in the format (123) 456-7890");
    return;
  }else{
    removeError(phoneNumberInput);
    
  }

  // Validate Gender
  var selectedGender = false;
  for (var i = 0; i < genderInputs.length; i++) {
    if (genderInputs[i].checked) {
      selectedGender = true;
      break;
    }
  }
  if (!selectedGender) {
    displayErrorMessage(genderInputs[0], "Please select a gender.");
    return;
  }else{
    removeError(genderInputs[0]);
    
  }

  // Validate Email Address
  var email = emailInput.value.trim();
  if (!isValidEmail(email)) {
    displayErrorMessage(emailInput, "Email address is invalid.");
    return;
  }else{
    removeError(emailInput);
    
  }

  // Validate Comment
  var comment = commentInput.value.trim();
  console.log(comment);
  if (comment.length < 10) {
    displayErrorMessage(commentInput, "Comment should be at least 10 characters.");
    return;
  }else{
    removeError(commentInput);
    
  }


  // Form validation successful
  isFormValid = true;
  

  formInputs.firstNameInput = firstNameInput;
  formInputs.lastNameInput = lastNameInput;
  formInputs.phoneNumberInput = phoneNumberInput;
  formInputs.genderInputs = genderInputs;
  formInputs.emailInput = emailInput;
  formInputs.commentInput = commentInput;

  alert("Form submitted successfully!");
  //form.reset();
  // Here you can add code to submit the form to the server or perform any other actions.
}

function isValidName(name) {
  var nameRegex = /^[A-Z][a-zA-Z]*$/;
  return nameRegex.test(name);
}

function isValidPhoneNumber(phoneNumber) {
  var phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
  return phoneRegex.test(phoneNumber);
}

function isValidEmail(email) {
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}


function removeError(element){
var errorDiv = element.parentNode.querySelector(".error");
  if(errorDiv){
   
   element.parentNode.removeChild(errorDiv);
  }
}
function displayErrorMessage(element, message) {
 var errorDiv = element.parentNode.querySelector(".error");
  if(!errorDiv){
  var errorMessage = document.createElement("span");
  errorMessage.className = "error";
  errorMessage.innerHTML = message;
  
  var parentElement = element.parentNode;
  parentElement.appendChild(errorMessage);
}
}

//---------------------------------------------------------------------

function createJSONObject() {
  var jsonObject = {};
  jsonObject.firstName = formInputs.firstNameInput.value.trim();
  jsonObject.lastName = formInputs.lastNameInput.value.trim();
  jsonObject.phoneNumber = formInputs.phoneNumberInput.value.trim();
  

   for (var i = 0; i < formInputs.genderInputs.length; i++) {
  if (formInputs.genderInputs[i].checked) {
    jsonObject.gender = formInputs.genderInputs[i].value;
    break; // Exit the loop since we found the selected radio button
  }
}

  jsonObject.email = formInputs.emailInput.value.trim();
  jsonObject.comment = formInputs.commentInput.value.trim();
  
  return jsonObject;
}

function onJSONButtonClick(event) {
  event.preventDefault(); // Prevent form submission
  if (isFormValid) {
    var jsonObject = createJSONObject();
    console.log(jsonObject); // Display the JSON object in the console
  } else {
    // Inform the user that the inputs are invalid
    alert("Invalid input. Please fill in all required fields correctly.");
  }
}

// Attach the JSON button click event handler
var jsonButton = document.getElementById("jsonButton");
if(jsonButton){
jsonButton.addEventListener("click", onJSONButtonClick);
}

//========================================================
function handleTripType() {
  var tripType = document.getElementById("tripType").value;
  var departureSection = document.getElementById("departureSection");
  var returnSection = document.getElementById("returnSection");

  if (tripType === "oneWay") {
    departureSection.style.display = "block";
    returnSection.style.display = "none";
  } else if (tripType === "roundTrip") {
    departureSection.style.display = "block";
    returnSection.style.display = "block";
  }
}

//======================================================================


function togglePassengerForm() {
  var passengerForm = document.getElementById("passengerForm");

  if (passengerForm.style.display === "none") {
    passengerForm.style.display = "block";
  } else {
    passengerForm.style.display = "none";
  }
}


//====================================================================

function toggleForm() {
  var form = document.getElementById("searchForm");
  if (form.style.display === "none") {
    form.style.display = "block";
  } else {
    form.style.display = "none";
  }
}

//===================================================================



//==================================================================


// Questions and corresponding options
const questions = [
  {
    question: "Have you flown on at least 10 flights in the past year?",
    options: ["Yes", "No"],
  },
  {
    question: "Are you a senior flyer?",
    options: ["Yes", "No"],
  },
  {
    question: "Do you have a special membership?",
    options: ["Yes", "No"],
  }
];

// Answers and corresponding results
const results = [
  {
    answers: ["Yes", "Yes", "No"],
    result: "You qualify for $100 off your flight, for being a loyal customer and a senior citizen!",
  },
  {
    answers: ["Yes", "No", "Yes"],
    result: "You qualify for 50% off your flight, for being a loyal customer by taking membership !",
  },
  // Add more results based on different answer combinations
];

let currentQuestionIndex = 0;
let userAnswers = [];
let startTime;

function displayQuestion() {

  startTime = new Date();
  const questionText = document.getElementById("question-text");
  const option1Label = document.getElementById("option1-label");
  const option2Label = document.getElementById("option2-label");

  const currentQuestion = questions[currentQuestionIndex];
  questionText.textContent = currentQuestion.question;
  option1Label.textContent = currentQuestion.options[0];
  option2Label.textContent = currentQuestion.options[1];
}

function nextQuestion() {
  const selectedOption = document.querySelector('input[name="answer"]:checked');
  if (selectedOption) {
    userAnswers.push(selectedOption.value);

    if (currentQuestionIndex === questions.length - 1) {
      displayResult();
    } else {
      currentQuestionIndex++;
      displayQuestion();
    }
  }
}

function skipQuestion() {
  userAnswers.push("Skipped");

  if (currentQuestionIndex === questions.length - 1) {
    displayResult();
  } else {
    currentQuestionIndex++;
    displayQuestion();
  }
}

function displayResult() {
  const questionContainer = document.getElementById("searchForm");
  const resultContainer = document.getElementById("result-container");
  const resultHeading = document.getElementById("result-heading");
  const resultText = document.getElementById("result-text");
  const timeTaken = document.getElementById("time-taken");
  const heading = document.getElementById("result-heading");
  questionContainer.style.display = "none";
  resultContainer.style.display = "block";
  resultHeading.textContent = "Congratulations!";
  var obj = findMatchingResult();
  if(obj !== null){
    resultText.textContent = obj.result;
  }else{
    heading.style.display = "none";
    resultText.textContent = "Sorry! No offers right now.";
  }
  
  const endTime = new Date();
  const timeTakenMillis = endTime - startTime;

  // Convert timeTakenMillis to a human-readable format (e.g., minutes and seconds)
  const minutes = Math.floor(timeTakenMillis / 60000);
  const seconds = ((timeTakenMillis % 60000) / 1000).toFixed(0);

  // Display the time taken in the "time-taken" element
  const timeTakenElement = document.getElementById("time-taken");
  timeTakenElement.textContent = `Time taken: ${minutes} minutes and ${seconds} seconds`;
 
}

function findMatchingResult() {
  for (let i = 0; i < results.length; i++) {
    const currentResult = results[i];
    let isMatch = true;
    for (let j = 0; j < userAnswers.length; j++) {
      if (userAnswers[j] !== currentResult.answers[j]) {
        isMatch = false;
        break;
      }
    }
    if (isMatch) {
      console.log("Matched");
      return currentResult;
    }
  }
  return null; // Return a default result or handle the case when no match is found
}



function toggleQuestion() {
  var form = document.getElementById("searchForm");
  var specialButton = document.getElementById("specialButton");
  if (form.style.display === "none") {
    displayQuestion();
    form.style.display = "block";
    specialButton.disabled= true;
  } else {
    form.style.display = "none";
  }
}


//====================================================================================

  var body = document.body;
  var offer = document.getElementById("result-text");
  var toggleBgColorButton = document.getElementById('toggle-bg-color');
  var increaseFontSizeButton = document.getElementById('increase-font-size');
  var decreaseFontSizeButton = document.getElementById('decrease-font-size');

  var isBgColorOn = false;

  toggleBgColorButton.addEventListener('click', function() {
    isBgColorOn = !isBgColorOn;
    body.style.backgroundColor = isBgColorOn ? 'lightyellow' : 'white';
  });

  if(increaseFontSizeButton !== null){
  increaseFontSizeButton.addEventListener('click', function() {
    var currentFontSize = parseFloat(getComputedStyle(offer).fontSize);
    offer.style.fontSize = (currentFontSize + 2) + 'px';
  });
  }
  if(decreaseFontSizeButton !== null){
  decreaseFontSizeButton.addEventListener('click', function() {
    var currentFontSize = parseFloat(getComputedStyle(offer).fontSize);
    offer.style.fontSize = (currentFontSize - 2) + 'px';
  });
  }


//====================================================================================

function displayExistingHotelsTable() {
  // Array of hotel information (example data)
 var hotels = [
  {
    city: 'New York',
    name: 'Hotel A',
    checkInDate: '2023-07-18',
    checkOutDate: '2023-07-20',
    price: '$200'
  },
  {
    city: 'Los Angeles',
    name: 'Hotel B',
    checkInDate: '2023-07-21',
    checkOutDate: '2023-07-25',
    price: '$250'
  },
  {
    city: 'Chicago',
    name: 'Hotel C',
    checkInDate: '2023-08-01',
    checkOutDate: '2023-08-05',
    price: '$180'
  },
  {
    city: 'Miami',
    name: 'Hotel D',
    checkInDate: '2023-09-10',
    checkOutDate: '2023-09-15',
    price: '$300'
  },
  {
    city: 'San Francisco',
    name: 'Hotel E',
    checkInDate: '2023-09-01',
    checkOutDate: '2023-09-05',
    price: '$220'
  },
  {
    city: 'Las Vegas',
    name: 'Hotel F',
    checkInDate: '2023-10-12',
    checkOutDate: '2023-10-15',
    price: '$280'
  },
  {
    city: 'Orlando',
    name: 'Hotel G',
    checkInDate: '2023-11-05',
    checkOutDate: '2023-11-10',
    price: '$190'
  },
  {
    city: 'Seattle',
    name: 'Hotel H',
    checkInDate: '2023-12-20',
    checkOutDate: '2023-12-25',
    price: '$240'
  },
  {
      city: 'New York',
      name: 'Hotel A',
      checkInDate: '2023-07-18',
      checkOutDate: '2023-07-20',
      price: '$200'
    },
    {
      city: 'Los Angeles',
      name: 'Hotel B',
      checkInDate: '2023-07-18',
      checkOutDate: '2023-07-20',
      price: '$220'
    },
];


  const tableHeaders = `
    <thead>
      <tr>
        <th>City</th>
        <th>Hotel Name</th>
        <th>Check-in Date</th>
        <th>Check-out Date</th>
        <th>Price</th>
        <th>Choose Hotel</th>
      </tr>
    </thead>
  `;

  let tableRows = $('<tbody></tbody>');
  // Loop through the hotels array and append rows to the table
  for (var i = 0; i < hotels.length; i++) {
    var hotel = hotels[i];

    var row = $('<tr></tr>');
    row.append('<td>' + hotel.city + '</td>');
    row.append('<td>' + hotel.name + '</td>');
    row.append('<td>' + hotel.checkInDate + '</td>');
    row.append('<td>' + hotel.checkOutDate + '</td>');
    row.append('<td>' + hotel.price + '</td>');
    row.append('<td><button class="choose-hotel">Choose</button></td>');

    tableRows.append(row);
  }

  // Assuming you have the existing table with the id "existingHotelsTable"
  const existingHotelsTable = $('#existingHotelsTable');

  // Set the table headers
  existingHotelsTable.html(tableHeaders);

  // Add the table rows to the existing table
  existingHotelsTable.append(tableRows);
}

//==================================================================

function showExistingHotels() {
  displayExistingHotelsTable();
}

//==================================================================

function displayExistingRentalCarsTable() {
  // Array of hotel information (example data)
 var rentalCars = [
  {
    city: 'New York',
    name: 'Car A',
    checkInDate: '2023-07-18',
    checkOutDate: '2023-07-20',
    price: '$200'
  },
  {
    city: 'Los Angeles',
    name: 'Car B',
    checkInDate: '2023-07-21',
    checkOutDate: '2023-07-25',
    price: '$250'
  },
  {
    city: 'Chicago',
    name: 'Car C',
    checkInDate: '2023-08-01',
    checkOutDate: '2023-08-05',
    price: '$180'
  },
  {
    city: 'Miami',
    name: 'Car D',
    checkInDate: '2023-09-10',
    checkOutDate: '2023-09-15',
    price: '$300'
  },
  {
    city: 'San Francisco',
    name: 'Car E',
    checkInDate: '2023-09-01',
    checkOutDate: '2023-09-05',
    price: '$220'
  },
  {
    city: 'Las Vegas',
    name: 'Car F',
    checkInDate: '2023-10-12',
    checkOutDate: '2023-10-15',
    price: '$280'
  },
  {
    city: 'Orlando',
    name: 'Car G',
    checkInDate: '2023-11-05',
    checkOutDate: '2023-11-10',
    price: '$190'
  },
  {
    city: 'Seattle',
    name: 'Car H',
    checkInDate: '2023-12-20',
    checkOutDate: '2023-12-25',
    price: '$240'
  },
  {
      city: 'New York',
      name: 'Car A',
      checkInDate: '2023-07-18',
      checkOutDate: '2023-07-20',
      price: '$200'
    },
    {
      city: 'Los Angeles',
      name: 'Car B',
      checkInDate: '2023-07-18',
      checkOutDate: '2023-07-20',
      price: '$220'
    },
];


  const tableHeaders = `
    <thead>
      <tr>
        <th>City</th>
        <th>Car Name</th>
        <th>Check-in Date</th>
        <th>Check-out Date</th>
        <th>Price</th>
        <th>Choose Car</th>
      </tr>
    </thead>
  `;

  let tableRows = $('<tbody></tbody>');
  // Loop through the cars array and append rows to the table
  for (var i = 0; i < rentalCars.length; i++) {
    var rentalCar = rentalCars[i];

    var row = $('<tr></tr>');
    row.append('<td>' + rentalCar.city + '</td>');
    row.append('<td>' + rentalCar.name + '</td>');
    row.append('<td>' + rentalCar.checkInDate + '</td>');
    row.append('<td>' + rentalCar.checkOutDate + '</td>');
    row.append('<td>' + rentalCar.price + '</td>');
    row.append('<td><button class="choose-rentalCar">Choose</button></td>');

    tableRows.append(row);
  }

  // Assuming you have the existing table with the id "existingHotelsTable"
  const existingRentalCarsTable = $('#existingRentalCarsTable');

  // Set the table headers
  existingRentalCarsTable.html(tableHeaders);

  // Add the table rows to the existing table
  existingRentalCarsTable.append(tableRows);
}


//====================================================================

function showExistingRentalCars(){
  displayExistingRentalCarsTable();
}
//=======================================================================
function displayExistingFlightsTable() {
  // Array of flight information (example data)
  var flights = [
    {
      origin: 'New York',
      destination: 'Los Angeles',
      departureDate: '2023-07-18',
      departureTime: '08:00 AM',
      arrivalDate: '2023-07-18',
      arrivalTime: '11:00 AM',
      price: '$200'
    },
    {
  origin: 'New York',
  destination: 'Los Angeles',
  departureDate: '2023-07-18',
  departureTime: '4:30 PM',
  arrivalDate: '2023-07-19',
  arrivalTime: '12:30 PM',
  price: '$220'
},  
  {
    origin: 'New York',
    destination: 'Los Angeles',
    departureDate: '2023-07-19',
    departureTime: '08:00 AM',
    arrivalDate: '2023-07-19',
    arrivalTime: '11:00 AM',
    price: '$200'
  },
  {
    origin: 'New York',
    destination: 'Los Angeles',
    departureDate: '2023-07-19',
    departureTime: '10:00 AM',
    arrivalDate: '2023-07-19',
    arrivalTime: '01:00 PM',
    price: '$220'
  },
  {
    origin: 'New York',
    destination: 'Los Angeles',
    departureDate: '2023-07-19',
    departureTime: '12:00 PM',
    arrivalDate: '2023-07-19',
    arrivalTime: '03:00 PM',
    price: '$230'
  },
  {
    origin: 'New York',
    destination: 'Los Angeles',
    departureDate: '2023-07-19',
    departureTime: '02:00 PM',
    arrivalDate: '2023-07-19',
    arrivalTime: '05:00 PM',
    price: '$250'
  },
  {
    origin: 'New York',
    destination: 'Los Angeles',
    departureDate: '2023-07-19',
    departureTime: '04:00 PM',
    arrivalDate: '2023-07-19',
    arrivalTime: '07:00 PM',
    price: '$280'
  },
  {
    origin: 'New York',
    destination: 'Los Angeles',
    departureDate: '2023-07-19',
    departureTime: '06:00 PM',
    arrivalDate: '2023-07-19',
    arrivalTime: '09:00 PM',
    price: '$300'
  },
  {
    origin: 'New York',
    destination: 'Los Angeles',
    departureDate: '2023-07-19',
    departureTime: '08:00 PM',
    arrivalDate: '2023-07-19',
    arrivalTime: '11:00 PM',
    price: '$280'
  },
  {
    origin: 'New York',
    destination: 'Los Angeles',
    departureDate: '2023-07-19',
    departureTime: '10:00 PM',
    arrivalDate: '2023-07-20',
    arrivalTime: '01:00 AM',
    price: '$250'
  }



    // Add information for the remaining flights here
    // ...
  ];
  const tableHeaders = `
      <thead>
        <tr>
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

    let tableRows = $('<tbody></tbody>');
  // Loop through the flights array and append rows to the table
  for (var i = 0; i < flights.length; i++) {
    var flight = flights[i];

    var row = $('<tr></tr>');
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
  // Assuming you have the existing table with the id "existingFlightsTable"
const existingFlightsTable = $('#existingFlightsTable');

// Set the table headers
existingFlightsTable.html(tableHeaders);

// Add the table rows to the existing table
existingFlightsTable.append(tableRows);
}


//=======================================

function showExistingFlights() {
  displayExistingFlightsTable();
}

//=================================================




//============================================

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomDepartureTime() {
  const hour = getRandomInt(1, 12);
  const minute = getRandomInt(0, 59);
  const amOrPm = Math.random() < 0.5 ? 'AM' : 'PM';

  const formattedHour = hour < 10 ? '0' + hour : hour;
  const formattedMinute = minute < 10 ? '0' + minute : minute;

  return `${formattedHour}:${formattedMinute} ${amOrPm}`;
}


function addHoursToTime(time, hoursToAdd) {
  let [timePart, meridian] = time.split(' ');
  let [hours, minutes] = timePart.split(':');
  hours = parseInt(hours);
  hours += hoursToAdd;
  if (hours > 12) {
    hours -= 12;
    meridian = meridian === 'AM' ? 'PM' : 'AM';
  }
  const formattedHour = hours < 10 ? '0' + hours : hours;
  return `${formattedHour}:${minutes} ${meridian}`;
}


//============================================

// Function to parse the flight XML string into a DOM object
function parseFlightXML(xmlString) {
  var parser = new DOMParser();
  var xmlDoc = parser.parseFromString(xmlString, "text/xml");
  return xmlDoc;
}

// Function to format the flight information in a human-readable format
function formatFlightInfo(xmlDoc) {
  var origin = xmlDoc.querySelector("origin").textContent;
  var destination = xmlDoc.querySelector("destination").textContent;
  var departureDate = xmlDoc.querySelector("departureDate").textContent;
  var departureTime = xmlDoc.querySelector("departureTime").textContent;
  var arrivalDate = xmlDoc.querySelector("arrivalDate").textContent;
  var arrivalTime = xmlDoc.querySelector("arrivalTime").textContent;
  var price = xmlDoc.querySelector("price").textContent;
localStorage.setItem("flightPrice",price);
  var formattedInfo = `
 <p> Flight Details </p>
    <p><strong>Origin:</strong> ${origin}</p>
    <p><strong>Destination:</strong> ${destination}</p>
    <p><strong>Departure Date:</strong> ${departureDate}</p>
    <p><strong>Departure Time:</strong> ${departureTime}</p>
    <p><strong>Arrival Date:</strong> ${arrivalDate}</p>
    <p><strong>Arrival Time:</strong> ${arrivalTime}</p>
    <p><strong>Price:</strong> $${price}</p>
  `;

  return formattedInfo;
}


//========================================================

function parseHotelXML(xmlString) {
  var parser = new DOMParser();
  var xmlDoc = parser.parseFromString(xmlString, "text/xml");
  return xmlDoc;
}


// Function to format the hotel information in a human-readable format
function formatHotelInfo(xmlDoc) {
  var city = xmlDoc.querySelector("city").textContent;
  var name = xmlDoc.querySelector("name").textContent;
  var checkInDate = xmlDoc.querySelector("checkInDate").textContent;
  var checkOutDate = xmlDoc.querySelector("checkOutDate").textContent;
  var price = xmlDoc.querySelector("price").textContent;
  localStorage.setItem("hotelPrice", price);
  
  var formattedInfo = `
    <p> Hotel Details </p>
    <p><strong>City:</strong> ${city}</p>
    <p><strong>Hotel Name:</strong> ${name}</p>
    <p><strong>Check-In Date:</strong> ${checkInDate}</p>
    <p><strong>Check-Out Date:</strong> ${checkOutDate}</p>
    <p><strong>Price:</strong> $${price}</p>
  `;

  return formattedInfo;
}
//===================================================

function parseRentalCarXML(xmlString) {
  var parser = new DOMParser();
  var xmlDoc = parser.parseFromString(xmlString, "text/xml");
  return xmlDoc;
}

// Function to format the rental car information in a human-readable format
function formatRentalCarInfo(xmlDoc) {
  var city = xmlDoc.querySelector("city").textContent;
  var name = xmlDoc.querySelector("name").textContent;
  var checkInDate = xmlDoc.querySelector("checkInDate").textContent;
  var checkOutDate = xmlDoc.querySelector("checkOutDate").textContent;
  var price = xmlDoc.querySelector("price").textContent;
  localStorage.setItem("rentalCarPrice", price);
  
  var formattedInfo = `
    <p> Rental Car Details </p>
    <p><strong>City:</strong> ${city}</p>
    <p><strong>Car Name:</strong> ${name}</p>
    <p><strong>Check-In Date:</strong> ${checkInDate}</p>
    <p><strong>Check-Out Date:</strong> ${checkOutDate}</p>
    <p><strong>Price:</strong> $${price}</p>
  `;

  return formattedInfo;
}


//===========================================

let gFlight = localStorage.getItem('selectedFlight') || "";
let firstTimeFlight = false;
let gHotel = localStorage.getItem('selectedHotel') || "";
let firstTimeHotel = false;
let gRentalCar = localStorage.getItem('selectedRentalCar') || "";
let firstTimeRentalCar = false;


window.onload = function(){
 var currentPagePath = window.location.pathname;
 var currentPage = currentPagePath.split("/").pop()
if(currentPage == "myCart.html"){
	//  console.log("Hi");
  //       var flightdiv = $("#displayedFlightDetails");
	// if(gFlight == ""){
  //          flightdiv.textContent = "Not Selected";
 	// }else{
	//   var flightInfo = parseFlightXML(gFlight);
  //   flightdiv.html(formatFlightInfo(flightInfo));
	// }
  
	var hoteldiv = $("#displayedHotelDetails");
	if(gHotel == ""){
           hoteldiv.textContent = "Not Selected";
 	}else{
	  var hotelInfo = parseFlightXML(gHotel);
    hoteldiv.html(formatHotelInfo(hotelInfo));
	}

	var rentalCardiv = $("#displayedRentalCarDetails");
	if(gRentalCar == ""){
           rentalCardiv.textContent = "Not Selected";
 	}else{
	  var rentalCarInfo = parseFlightXML(gRentalCar);
    rentalCardiv.html(formatRentalCarInfo(rentalCarInfo));
	}


	// Calculate and display total price
  var total = 0;
  // Assuming you have previously stored the prices for flight, hotel, and rental car in localStorage
  var flightPrice = parseInt(localStorage.getItem("flightPrice")) || 0;
  var hotelPrice = parseInt(localStorage.getItem("hotelPrice")) || 0;
  var rentalPrice = parseInt(localStorage.getItem("rentalCarPrice")) || 0;
  total = flightPrice + hotelPrice + rentalPrice;

  var totalPriceElement = $("#totalPrice");
  totalPriceElement.text("Total Price: $" + total);


 }else if(currentPage == "hotels.html"){

var hotelSelect = document.getElementById("hotel");

if (hotelSelect) {
  // Event listener for select change
  hotelSelect.addEventListener("change", function() {
    var selectedHotelCompany = hotelSelect.value;
    console.log(selectedHotelCompany);
    localStorage.setItem("selectedHotelCompany", selectedHotelCompany);
  });
}

$(document).ready(function () {
  console.log("ready");
 

  function displayHotelsTable(hotels) {
    const tableHeaders2 = `
      <thead>
        <tr>
          <th>City</th>
          <th>Hotel Name</th>
          <th>Check-In Date</th>
          <th>Check-Out Date</th>
          <th>Price</th>
          <th>Choose Hotel</th>
        </tr>
      </thead>
    `;

    let tableRows2 = '<tbody>';

    for (let i = 0; i < hotels.length; i++) {
      tableRows2 += `
        <tr>
          <td>${$(hotels[i]).find('city').text()}</td>
          <td>${$(hotels[i]).find('name').text()}</td>
          <td>${$(hotels[i]).find('checkInDate').text()}</td>
          <td>${$(hotels[i]).find('checkOutDate').text()}</td>
          <td>${$(hotels[i]).find('price').text()}</td>
          <td><input type="radio" name="hotelRadio" value="${i}"></td>
        </tr>
      `;
    }

    tableRows2 += '</tbody>';

    // Append the rows to the existing table
    $('#hotelsTable').html(`${tableHeaders2}${tableRows2}`);

    // Add event listener for radio buttons to store selected hotel in local storage
    $('input[type="radio"]').change(function () {
      if (firstTimeHotel == false) {
        firstTimeHotel = true;
        $('#cart-hotel').append('<i class="fa fa-shopping-cart" id="addToCartIcon"></i>');
      }
      $('input[type="radio"]').closest('tr').css('opacity', 1);
      const selectedHotelIndex = parseInt($(this).val());
      const selectedHotel = hotels[selectedHotelIndex];
      gHotel = selectedHotel;

      $(this).closest('tr').css('opacity', 0.5);
    });
  }
});
// $('#cart-hotel').click(function () {
//   console.log(gHotel);
//   alert('Added to cart!');
//   localStorage.setItem('selectedHotel', gHotel);
// });



} else if(currentPage == "orderstatus.html"){
 var selectedFlightCompany = localStorage.getItem("selectedFlightCompany") || "Not Selected";
  var selectedHotelCompany = localStorage.getItem("selectedHotelCompany") || "Not Selected";
  var selectedRentalCarCompany = localStorage.getItem("selectedRentalCarCompany") || "Not Selected";

  // Update the table cells with the selected data
  document.getElementById("displayedFlight").textContent = selectedFlightCompany;
  document.getElementById("displayedHotel").textContent = selectedHotelCompany;
  document.getElementById("displayedRentalCar").textContent = selectedRentalCarCompany;


}
else if(currentPage == "rentalcarsbook.html"){

var rentalCarSelect = document.getElementById("rentalCar");

if (rentalCarSelect) {
  // Event listener for select change
  rentalCarSelect.addEventListener("change", function() {
    var selectedRentalCarCompany = rentalCarSelect.value;
    console.log(selectedRentalCarCompany);
    localStorage.setItem("selectedRentalCarCompany", selectedRentalCarCompany);
  });
}

$(document).ready(function () {
  console.log("ready");
  // $('#rentalCars-form').submit(function (event) {
  //   event.preventDefault();
  //   console.log("recommended");
  //   const rentalCars = [];

  //   // Generate 10 XML strings based on user input
  //   for (let i = 1; i <= 10; i++) {
  //     const price = getRandomInt(150, 300);
  //     const rentalCarXML = `
  //       <rentalCar>
  //         <city>${$('#city').val()}</city>
  //         <name>Car ${i}</name>
  //         <checkInDate>${$('#checkInDate').val()}</checkInDate>
  //         <checkOutDate>${$('#checkOutDate').val()}</checkOutDate>
  //         <price>${price}</price>
  //       </rentalCar>
  //     `;
  //     rentalCars.push(rentalCarXML);
  //   }

  //   // Display rental cars in the existing table with radio buttons
  //   displayRentalCarsTable(rentalCars);
  // });

  function displayRentalCarsTable(rentalCars) {
    const tableHeaders3 = `
      <thead>
        <tr>
          <th>City</th>
          <th>Car Name</th>
          <th>Check-In Date</th>
          <th>Check-Out Date</th>
          <th>Price</th>
          <th>Choose Rental Car</th>
        </tr>
      </thead>
    `;

    let tableRows3 = '<tbody>';

    for (let i = 0; i < rentalCars.length; i++) {
      tableRows3 += `
        <tr>
          <td>${$(rentalCars[i]).find('city').text()}</td>
          <td>${$(rentalCars[i]).find('name').text()}</td>
          <td>${$(rentalCars[i]).find('checkInDate').text()}</td>
         
          <td>${$(rentalCars[i]).find('checkOutDate').text()}</td>
          
          <td>${$(rentalCars[i]).find('price').text()}</td>
          <td><input type="radio" name="rentalCarRadio" value="${i}"></td>
        </tr>
      `;
    }

    tableRows3 += '</tbody>';

    // Append the rows to the existing table
    $('#rentalCarsTable').html(`${tableHeaders3}${tableRows3}`);

    // Add event listener for radio buttons to store selected rental car in local storage
    $('input[type="radio"]').change(function () {
      if (firstTimeRentalCar == false) {
        firstTimeRentalCar = true;
        $('#cart-rentalCar').append('<i class="fa fa-shopping-cart" id="addToCartIcon"></i>');
      }
      $('input[type="radio"]').closest('tr').css('opacity', 1);
      const selectedRentalCarIndex = parseInt($(this).val());
      const selectedRentalCar = rentalCars[selectedRentalCarIndex];
      gRentalCar = selectedRentalCar;

      $(this).closest('tr').css('opacity', 0.5);
    });
  }
});

// $('#cart-rentalCar').click(function () {
//   console.log(gRentalCar);
//   alert('Added to cart!');
//   localStorage.setItem('selectedRentalCar', gRentalCar);
// });

}




else if(currentPage == "flights.html"){

var flightSelect = document.getElementById("flight");

if(flightSelect){
// Event listener for select change
flightSelect.addEventListener("change", function() {
  var selectedFlightCompany = flightSelect.value;
  console.log(selectedFlightCompany);
  localStorage.setItem("selectedFlightCompany", selectedFlightCompany);
  
});
}
console.log("2ns window load");
$(document).ready(function () {
  console.log("ready");
  // $('#flight-form').submit(function (event) {
  //   event.preventDefault();
  //   console.log("recommended");
  //   const flights = [];

  //   // Generate 10 XML strings based on user input
  //   for (let i = 1; i <= 10; i++) {
  //     const randomDepartureTime = generateRandomDepartureTime();
  //     const toAdd = getRandomInt(3,5);
  //     const randomArrivalTime = addHoursToTime(randomDepartureTime, toAdd);
  //     const price = getRandomInt(199,249);
  //     const flightXML = `
  //       <flight>
  //         <origin>${$('#departure').val()}</origin>
  //         <destination>${$('#destination').val()}</destination>
  //         <departureDate>${$('#departureDate').val()}</departureDate>
	//   <departureTime>${randomDepartureTime}</departureTime> 
	//   <arrivalDate>${$('#departureDate').val()}</arrivalDate>
	//   <arrivalTime>${randomArrivalTime}</arrivalTime>
  //         <price>${price}</price>
  //       </flight>
  //     `;
  //     flights.push(flightXML);
  //   }

  //   // Display flights in the existing table with radio buttons
  //   displayFlightsTable(flights);
  // });

  function displayFlightsTable(flights) {
    const tableHeaders1 = `
      <thead>
        <tr>
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
      tableRows1 += `
        <tr>
          <td>${$(flights[i]).find('origin').text()}</td>
          <td>${$(flights[i]).find('destination').text()}</td>
	  <td>${$(flights[i]).find('departureDate').text()}</td>
          <td>${$(flights[i]).find('departureTime').text()}</td>
          <td>${$(flights[i]).find('arrivalDate').text()}</td>
          <td>${$(flights[i]).find('arrivalTime').text()}</td>
          <td>${$(flights[i]).find('price').text()}</td>
          <td><input type="radio" name="flightRadio" value="${i}"></td>
        </tr>
      `;
    }

    tableRows1 += '</tbody>';

    // Append the rows to the existing table
    $('#flightsTable').html(`${tableHeaders1}${tableRows1}`);

    // Add event listener for radio buttons to store selected flight in local storage
    $('input[type="radio"]').change(function () {
      if(firstTimeFlight == false) {
	      firstTimeFlight = true;
        $('#cart-flight').append('<i class="fa fa-shopping-cart" id="addToCartIcon"></i>');
        }
      $('input[type="radio"]').closest('tr').css('opacity',1);
      const selectedFlightIndex = parseInt($(this).val());
      const selectedFlight = flights[selectedFlightIndex];
       gFlight = selectedFlight;
     
      
     $(this).closest('tr').css('opacity',0.5);
    });
  }
});
  // $('#cart-flight').click(function () {
  //     console.log(gFlight);
  //     alert('Added to cart!');
  //     localStorage.setItem('selectedFlight', gFlight);
  //   });

}}

//=======================================================================


//=======================================================================