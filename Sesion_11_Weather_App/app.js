const showWeather = document.querySelector(".btn1");
const showForecast = document.querySelector(".btn2");
let errorMsg = document.querySelector(".error");
let city = document.querySelector(".search");

showWeather.addEventListener("click", function (e) {
  errorMsg.innerText = "";

  const weather = function (city) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=${city.value}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => {
        renderWeather(data);
        document.querySelector(".weather_now").style.display = "flex";
      })
      .catch((err) => {
        renderError(err);
      });
  };

  weather(city);

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

    // Descriere, Umiditate, Presiune, Temperatura curenta, Minima zilei, Maxima zilei, Prognoza meteo
  };

  renderError = function (err) {
    errorMsg.innerText = err;
  };
});

showForecast.addEventListener("click", function (e) {
  const forecast = function (city) {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=${city.value}`
    )
      .then((response) => response.json())
      .then((data) => renderForecast(data));
    document.querySelector(".weather_forecast").style.display = "flex";
  };
  forecast(city);
  renderForecast = function (data) {
    //adaug numele orasului + tara
    let forecastCity = document.querySelector("#forecast-city");
    forecastCity.innerHTML = `Weather for the next days in: ${data.city.name}`;
    //resetez continutul casutelor de zi
    var dayElements = document.querySelectorAll(".day");
    dayElements.forEach(function (day) {
      day.innerHTML = "";
    });

    let dayIndex = 0;
    let dateTime = data.list[0].dt_txt.split(" ");
    console.log(dateTime);
    let day = dateTime[0];
    //adaug prima data in prima casuta a zilei
    dayElements[dayIndex].innerHTML += `
  <h3 class="forecast-date">${dateTime[0]}</h3>
  `;
    //creez spatii goale in div day pentru a alinia casutele de forecast orar
    for (let i = 0; i < parseInt(dateTime[1]) / 3; i++) {
      dayElements[dayIndex].innerHTML =
        dayElements[dayIndex].innerHTML +
        `
      <div class="item"></div>
    `;
    }

    //desenez continutul forecastului
    for (let i = 0; i < data.list.length; i++) {
      let dateTime = data.list[i].dt_txt.split(" ");
      let date = dateTime[0];
      let time = dateTime[1];
      //daca se schimba data, schimb containerul pentru zi si adaug data + incrementez indexul pentru zi
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
