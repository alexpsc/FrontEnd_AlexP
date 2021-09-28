//get elements
const showWeather = document.querySelector(".btn1");
const showForecast = document.querySelector(".btn2");
let errorMsg = document.querySelector(".error");
let city = document.querySelector(".search");

//fetch method
const weather = function (city, type) {
  fetch(
    `https://api.openweathermap.org/data/2.5/${type}?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=${city.value}`
  )
    .then((response) => {
      if (response.status == 400) {
        throw new Error("Please enter a city name");
      }
      if (!response.ok) {
        throw new Error("No weather found.");
      }

      return response.json();
    })
    .then((data) => {
      if (!data.list) {
        renderWeather(data);
        document.querySelector(".weather_now").style.display = "flex";
      } else {
        renderForecast(data);
        document.querySelector(".weather_forecast").style.display = "flex";
      }
    })
    .catch((err) => {
      renderError(err);
    });
};

//function for display weather
showWeather.addEventListener("click", function (e) {
  errorMsg.innerText = "";

  weather(city, "weather");

  renderWeather = function (data) {
    const name = data.name;
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const currentTemp = data.main.temp;
    const humidity = data.main.humidity;
    const pressure = data.main.pressure;
    const minDay = data.main.temp_min;
    const maxDay = data.main.temp_max;

    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = Math.round(currentTemp) + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + " %";
    document.querySelector(".pressure").innerText = "Pressure: " + pressure;
    document.querySelector(".min-day").innerText = "Min of the day: " + minDay;
    document.querySelector(".max-day").innerText = "Max of the day: " + maxDay;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";

    const maps = document.querySelector("#pic");

    maps.innerHTML = `     <div class="maps">
    <iframe width="80%" height="200%" frameborder="0" style="border:0"
    src="https://maps.google.com/maps?hl=en&amp;q=${data.name},${data.sys.country}+()&amp;ie=UTF8&amp;t=&amp;z=14&amp;iwloc=B&amp;output=embed"
    </iframe>
    </div>`;
  };
});

//function for display weather forecast
showForecast.addEventListener("click", function (e) {
  weather(city, "forecast");
  renderForecast = function (data) {
    //add city name
    let forecastCity = document.querySelector("#forecast-city");
    forecastCity.innerHTML = `Weather for the next days in: ${data.city.name}`;
    //resete days
    var dayElements = document.querySelectorAll(".day");
    dayElements.forEach(function (day) {
      day.innerHTML = "";
    });

    let dayIndex = 0;
    let dateTime = data.list[0].dt_txt.split(" ");
    let day = dateTime[0];
    //add first day in first container
    dayElements[dayIndex].innerHTML += `
  <h3 class="forecast-date">${dateTime[0]}</h3>
  `;
    //create black space where is no forecast
    for (let i = 0; i < parseInt(dateTime[1]) / 3; i++) {
      dayElements[dayIndex].innerHTML =
        dayElements[dayIndex].innerHTML +
        `
      <div class="item"></div>
    `;
    }

    //create forecast
    for (let i = 0; i < data.list.length; i++) {
      let dateTime = data.list[i].dt_txt.split(" ");
      let date = dateTime[0];
      let time = dateTime[1];
      //if data is changed, move to the next container and increment the index for day
      if (day !== date) {
        dayIndex++;
        day = date;
        dayElements[dayIndex].innerHTML += `
      <h3 class="forecast-date">${date}</h3>
      `;
      }

      dayElements[dayIndex].innerHTML += `
      <div class ="item">
      <p>Time: ${time}</p>
      <div class="back flex">
        <img src="http://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png">
        <p>${data.list[i].weather[0].description}</p>
      </div>  
        
        <p>Current Temp: ${data.list[i].main.temp} &#8451</p>
       
      </div>
    `;
    }
  };
});

//function for render errors
renderError = function (err) {
  errorMsg.innerText = err;
};
