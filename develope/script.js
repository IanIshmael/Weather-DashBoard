var form = document.getElementById("search-city");
var searchInput = document.getElementById("search-input");
var apiKey = "de0223923964abc11d44a8f96ef983eb";

function searchCity(event) {
    event.preventDefault()
  var cityName = searchInput.value;
  fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      getWeather(data)
    });
}

function getWeather(data){
    var lat = data[0].lat
    var lon = data[0].lon
    fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          showWeather(data)
          showCurrentWeather(data)
        });
}
function showCurrentWeather(data){
  var lat = data.city.coord.lat
  var lon = data.city.coord.lon
  var currentDate = document.getElementById('day0-date')
  var currentTemp = document.getElementById('day0-temp')
  var currentWind = document.getElementById('day0-wind')
  var currentHumidity = document.getElementById('day0-hum')
  
currentDate.textContent = data.list[0].dt_txt
currentTemp.textContent = data.list[0].main.temp
var currentTemp = data.list[0].main.temp;
currentWind.textContent = data.list[0].wind.speed
currentHumidity.textContent = data.list[0].main.humidity
}

function showWeather(data) {
  var cards = document.querySelector(".card-deck");
  cards.innerHTML = ""
  for (let index = 0; index < 41; index += 9) {
    var card = document.createElement("div");
    var cardBody = document.createElement('div')
    var date = document.createElement("p");
    var img = document.createElement("img");
    var temp = document.createElement("p");
    var wind = document.createElement("p");
    var humidity = document.createElement("p");
    date.textContent ='date: ' + data.list[3].dt_txt;
    var weatherIcon = img.src = `https://openweathermap.org/img/wn/${data.list[index]?.weather[0].icon}@2x.png`
    temp.textContent ='Temp: ' + data.list[index]?.main.temp; + '\u00B0'
    wind.textContent ='wind: ' + data.list[index]?.wind.speed;
    humidity.textContent ='Hum:' + data.list[index]?.main.humidity;
    card.setAttribute('class','card bg-dark text-light')
    cardBody.setAttribute('class','card-body')
    card.setAttribute('class','card bg-dark text-light')
    // icon.setAttribute('src',weatherIcon)
    cardBody.append(date)
    cardBody.append(img)
    cardBody.append(temp)
    cardBody.append(wind)
    cardBody.append(humidity)
    card.append(cardBody)
    cards.append(card)
  }
}
form.addEventListener("submit", searchCity);


