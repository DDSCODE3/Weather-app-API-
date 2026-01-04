// Page entrance
window.addEventListener("load", () => {
  document
    .querySelector(".page-wrapper")
    .classList.remove("opacity-0", "translate-y-4");
});

// UI only interaction
const searchBtn = document.querySelector(".search-btn");
const searchInput = document.querySelector(".search-input");
const cityName = document.querySelector(".city-name");
const weatherStatusElem = document.querySelector(".weather-status");
const weatherTempElem = document.querySelector(".temp");
const humidityElem = document.querySelector(".humidity");
const windElem = document.querySelector(".wind");
const pressureElem = document.querySelector(".pressure");
const weatherIcons = document.querySelectorAll(".weather-icon");
const errorMessage = document.querySelector(".error-message");

function updateCity() {
  const apiKey = "dcf5ec72815909e6a128237940ad0edb";
  const city = searchInput.value.trim();
  if (!city) return;

  errorMessage.classList.add("hidden");
  cityName.textContent = city;
  searchInput.value = "";

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then((data) => {
      cityName.textContent = data.name;
      weatherStatusElem.textContent = data.weather[0].description;
      humidityElem.textContent = data.main.humidity;
      windElem.textContent = data.wind.speed;
      pressureElem.textContent = data.main.pressure;
      weatherTempElem.textContent = Math.round(data.main.temp);

      // Update icons
      weatherIcons.forEach((iconElem) => {
        iconElem.innerHTML = "";
      });

      const iconCode = data.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

      weatherIcons.forEach((iconElem) => {
        iconElem.innerHTML = `
          <img src="${iconUrl}" alt="Weather Icon" class="w-10 h-10">
        `;
      });
    })
    .catch((error) => {
      errorMessage.classList.remove("hidden");
      console.error("Error fetching weather data:", error);
    });
}

searchBtn.addEventListener("click", updateCity);
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") updateCity();
});
