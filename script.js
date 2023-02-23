/*script.js*/
const happyFace = document.getElementById('happyFace');
const array1 = ['https://wordpress-534321-2914341.cloudwaysapps.com/wp-content/uploads/2022/10/fireworks1.gif','https://wordpress-534321-2914341.cloudwaysapps.com/wp-content/uploads/2022/10/fireworks2.gif'];

happyFace.addEventListener('click', function() {
    const audio = new Audio('audio/Audience Clapping 1.mp3');
    audio.play();
    setTimeout(function() {
        const random = Math.floor(Math.random() * array1.length);
        const image = document.createElement('img');
        image.src = array1[random];
        image.style.width = '250px';
        image.style.display = 'block';
        image.style.margin = '0 auto';
        const imageContainer = document.getElementById('image-container');
        imageContainer.appendChild(image);
        setTimeout(function() {
            image.remove();
        }, 5000);
    }, 0000);
}); 

const sadFace = document.getElementById('sadFace');
const array2 = ['images/stopsign.png','images/stopbutton.png'];

sadFace.addEventListener('click', function() {
    const audio = new Audio('audio/trumpetsad.mp3');
    audio.play();
    setTimeout(function() {
        const random = Math.floor(Math.random() * array2.length);
        const image = document.createElement('img');
        image.src = array2[random];
        image.style.width = '250px';
        image.style.display = 'block';
        image.style.margin = '0 auto';
        const imageContainer = document.getElementById('image-container');
        imageContainer.appendChild(image);
        setTimeout(function() {
            image.remove();
        }, 5000);
    }, 0000);
}); 


const dateElement = document.querySelector(".date");

/**
 * @param {Date} date
 */
function formatDate(date) {
  const DAYS = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  return `Today is ${DAYS[date.getDay()]}, ${
    MONTHS[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()}`;
}

setInterval(() => {
  const now = new Date();

  dateElement.textContent = formatDate(now);
}, 200);

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(position => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const apiKey = '0278cde8a5832ee69a4f06aa216fa3d0';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const temperature = Math.round(data.main.temp);
        const description = data.weather[0].description;
        let emojis = '';

        if (description.includes('sun') || description.includes('clear')) {
          if (temperature >= 80) {
            emojis += '🌞😎';
          } else if (temperature >= 70) {
            emojis += '🌞😃';
          } else if (temperature >= 60) {
            emojis += '🌞😊';
          } else {
            emojis += '🌞😐';
          }
        } else if (description.includes('cloud') || description.includes('overcast')) {
          if (temperature >= 60) {
            emojis += '☁️😃';
          } else {
            emojis += '☁️😐';
          }
        } else if (description.includes('rain') || description.includes('drizzle')) {
          emojis += '🌧️☔';
        } else if (description.includes('thunderstorm')) {
          emojis += '⛈️🌩️';
        } else if (description.includes('snow') || description.includes('blizzard')) {
          emojis += '❄️☃️';
        } else {
          emojis += '🌫️😐';
        }

        document.getElementById('icon').innerHTML = emojis;
        document.getElementById('description').innerHTML = description;
        document.getElementById('temperature').innerHTML = `${temperature}°F`;
      })
      .catch(error => console.error(error));
  });
}

