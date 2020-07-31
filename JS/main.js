//elements
var sendBtn = document.getElementById('sendBtn');
var textbox = document.getElementById('textbox');
var chatContainer = document.getElementById('chatContainer');
var lastMsg = {
    message: ""
};
var httpRequest;
var count = 0;

chatbotSendMessage = (messageText) => {

    var messageElement = document.createElement('div');
    messageElement.classList.add('w-100');
    messageElement.classList.add('float-left');
    messageElement.style.margin = "10px";
    messageElement.style.padding = "5px";

    messageElement.innerHTML = "<span class=" + "bot" + "><span style=" + "padding-left:5px" + ">Chatbot: </span>" +
        "<span style=" + "margin-top:10px" + ";" + "padding:10px" + ">" + messageText + "</span></span>";

    messageElement.animate([{
        easing: "ease-in",
        opacity: 0.4
    }, {
        opacity: 1
    }], {
        duration: 1000
    });
    chatContainer.appendChild(messageElement);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

getDate = () => {
    var date = new Date();
    var day = date.getDay(); //0-6
    var month = date.getMonth(); //0-11
    var dayOfMonth = date.getDate(); //0-31
    var hour = date.getHours(); //0-23
    if(hour > 12){
        hour = hour - 12;
    }
    var minute = date.getMinutes(); //0-59

    var dayArray = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    return dayArray[day] + ", " + monthArray[month] + " " + dayOfMonth + " " + hour + ":" + minute;
}

initializeOptions = () => {
    let options = [{
            number: 1,
            // choice: "Weather"
            choice: "Netflix Movies"
        },
        {
            number: 2,
            choice: "Sports"
        },
        {
            number: 3,
            choice: "News"
        },
    ];

    var messageElement = document.createElement('div');
    messageElement.classList.add('w-100');
    messageElement.classList.add('float-left');
    messageElement.style.margin = "10px";
    messageElement.style.padding = "5px";

    chatbotSendMessage("Choose 1, 2 or 3");
    for (let i = 0; i < options.length; i++) {
        messageElement.innerHTML += "<span style=" + "margin-top:10px" + ";" + "padding:10px" + ">" + options[i].number + " - " + options[i].choice + "</span></span><br>";
    }

    messageElement.animate([{
        easing: "ease-in",
        opacity: 0.4
    }, {
        opacity: 1
    }], {
        duration: 1000
    });
    chatContainer.appendChild(messageElement);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

initializeOptions();

repeatResponse = () => {
    count++;
    chatbotSendMessage("Continue?");
    var messageElement = document.createElement('div');
    messageElement.classList.add('float-left');
    messageElement.classList.add('w-100');
    messageElement.innerHTML = '<span class="bot"><span style="padding-left:5px"><button id="yes['+count+']" onclick="restart()">Yes</button><button id="no['+count+']" onclick="exit()">No</button></span></span>'
    chatContainer.appendChild(messageElement);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

restart = () => {
    initializeOptions();
    document.getElementById('yes['+count+']').disabled = true;
    document.getElementById('no['+count+']').disabled = true;
}

exit = () => {
    chatbotSendMessage("Have a good day");
    document.getElementById('yes['+count+']').disabled = true;
    document.getElementById('no['+count+']').disabled = true;
    textbox.remove();
    sendBtn.remove();
}

// handleResponse = () => {
//     if (httpRequest.readyState === XMLHttpRequest.DONE) {
//         if (httpRequest.status === 200) {
//             let result = JSON.parse(httpRequest.responseText);
//             let city = result.location.name;
//             let state = result.location.region;
//             let temp = result.current.temperature;
//             let hum = result.current.humidity;
//             let wind = result.current.wind_speed;
//             let icon = result.current.weather_icons[0];
//             let weatherDetail = "<br>";
//             weatherDetail += "<span><img src='" + icon + "'></span>";
//             weatherDetail += "<br>";
//             weatherDetail += "Location: " + city + ", " + state;
//             weatherDetail += "<br>";
//             weatherDetail += "Temperature: " + (temp * (9/5) + 32).toFixed(2) + " °F";
//             weatherDetail += "<br>";
//             weatherDetail += "Humidity: " + hum;
//             weatherDetail += "<br>";
//             weatherDetail += "Wind Speed: " + wind;
//             setTimeout(function () {
//                 chatbotSendMessage(weatherDetail);
//             }, 500);
//             setTimeout(function () {
//                 repeatResponse();
//             }, 1000);
//         } else {
//             chatbotSendMessage("Something went wrong");
//         }
//     }
// }

// getWeather = (lat, long) => {
//     httpRequest = new XMLHttpRequest();
//     httpRequest.onreadystatechange = handleResponse;
//     httpRequest.open('GET', "http://api.weatherstack.com/current?access_key=d2ca3a18c5f86b6ce46b6d575dbdb94b&query=" + lat + ',' + long);
//     httpRequest.send();
// }

// weatherLocation = () => {
//     navigator.geolocation.getCurrentPosition((pos) => {
//             let lat = pos.coords.latitude;
//             let long = pos.coords.longitude;
//             getWeather(lat, long);
//         },
//         (err) => {
//             setTimeout(function () {
//                 chatbotSendMessage("Location could not be accessed");
//             }, 500);
//             setTimeout(function () {
//                 repeatResponse();
//             }, 1000);
//         });
// }

assistantResponse = (messageText) => {
    let choice = parseInt(messageText.trim());
    switch (choice) {
        // case 1:
            // setTimeout(function () {
            //     chatbotSendMessage("Please allow the browser to access your location");
            // }, 500);
            // setTimeout(function () {
            //     weatherLocation();
            // }, 1000);
            // break;
        case 1:
            setTimeout(function () {
                chatbotSendMessage("You chose Netflix Movies");
            }, 500);
            setTimeout(function () {
                window.open('https://www.google.com/search?q=netflix-movies');
                repeatResponse();
            }, 1000);
            break;
        case 2:
            setTimeout(function () {
                chatbotSendMessage("You chose Sports");
            }, 500);
            setTimeout(function () {
                window.open('https://www.google.com/search?q=sports');
                repeatResponse();
            }, 1000);
            break;
        case 3:
            setTimeout(function () {
                chatbotSendMessage("You chose News");
            }, 500);
            setTimeout(function () {
                window.open('https://www.google.com/search?q=news');
                repeatResponse();
            }, 1000);
            break;
        default:
            setTimeout(function () {
                chatbotSendMessage("Not a valid option");
            }, 500);
            setTimeout(function () {
                repeatResponse();
            }, 1000);
    }
}

sendMessage = (messageText) => {

    var messageElement = document.createElement('div');
    messageElement.classList.add('w-50');
    messageElement.classList.add('float-right');
    messageElement.style.margin = "10px";
    messageElement.style.padding = "5px";

    messageElement.innerHTML = "<span class=" + "user" + "><span style=" + "padding-left:5px" + ">You: </span>" +
        "<span style=" + "margin-top:10px" + ";" + "padding:10px" + ">" + messageText + "</span><br>" +
        "<span style=" + "margin-top:10px" + ";" + "font-size:10px" + ";" + "padding:10px" + ">" + getDate() + "</span></span>";

    messageElement.animate([{
        easing: "ease-in",
        opacity: 0.4
    }, {
        opacity: 1
    }], {
        duration: 1000
    });
    chatContainer.appendChild(messageElement);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

send = () => {
// sendBtn.addEventListener('click', function (e) {
    let messageText = textbox.value.trim();
    sendMessage(messageText);
    textbox.value = "";
    sendBtn.disabled = true;
    lastMsg.message = messageText;
    assistantResponse(messageText);
}

textbox.addEventListener('keyup', function (e) {
    if (textbox.value != "") {
        sendBtn.disabled = false;
    } else {
        sendBtn.disabled = true;
    }
});

textbox.addEventListener('keypress', function (e) {
    if (e.which == 13) {
        if (textbox.value != "") {
            let messageText = textbox.value.trim();
            lastMsg.message = messageText;
            sendMessage(messageText);
            textbox.value = "";
            assistantResponse(messageText);
        }
    }
});