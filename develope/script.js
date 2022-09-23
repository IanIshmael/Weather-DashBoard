var form = document.getElementById("search-city");
var searchInput = document.getElementById("search-input");
var apiKey = "de0223923964abc11d44a8f96ef983eb";

function searchCity(event) {
    event.preventDefault()
  var cityName = searchInput.value;
  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`
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
        });
}

function showWeather(data){
    for (let index = 0; index < 41; index+=3) {
      console.log(data.list[index]);
      var card = document.createElement('div')
        var date = document.createElement('p')
        var img = document.createElement('img')
        var temp = document.createElement('p')
        var wind = document.createElement('p')
        var humidity = document.createElement('p')
        date.textContent = data.list[3].dt_txt
        //img.src = data[index].dt
        temp.textContent = data.list[index].main.temp
        wind.textContent = data.list[index].wind.speed
        humidity.textContent = data.list[index].main.humidity
        wind.appendChild(humidity)
        temp.appendChild(wind)
        date.appendChild(temp)
        card.append(date)
        document.getElementsByClassName("card-deck")
        
}
}
form.addEventListener("submit", searchCity);
