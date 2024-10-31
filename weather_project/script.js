let apikey = "f1d7511c11cbb4806513d0cddcd4eae5";
let form = document.querySelector('.weatherform');
let cityinput = document.querySelector('.cityinput');
let card = document.querySelector('.card');
form.addEventListener('submit', async event => {
    event.preventDefault();
    let city = cityinput.value;
    if (!city) displayError("Please enter the city");
    try {
        let weatherdata = await getdata(city);
        displayinfo(weatherdata);
    } catch (error) {
        console.error(error);
        displayError(error)
    }
})
async function getdata(city) {
    let apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`
    let response = await fetch(apiurl);
    if (!response.ok)
        throw new Error("Could not fetch weather data")
    return await response.json();
    console.log(response)
}
function displayinfo(data) {
    let { name: city,
        main: { temp, humidity },
        weather: [{ description, id }] } = data;
    card.textContent = "";
    card.style.display = "flex";
    let cityDisplay = document.createElement('h1');
    let tempDisplay = document.createElement('p');
    let humidityDisplay = document.createElement('p');
    let descriptionDisplay = document.createElement('p');
    let watherEmoji = document.createElement('p');
    cityDisplay.textContent = city;
    card.classList.add('cityDisplay')
    card.appendChild(cityDisplay);
    tempDisplay.textContent = `${Math.floor(temp - 273.15)} C`
    tempDisplay.classList.add('temp');
    card.appendChild(tempDisplay);
    humidityDisplay.textContent = `Humidity ${humidity} %`;
    humidityDisplay.classList.add('humidity');
    card.appendChild(humidityDisplay);
    descriptionDisplay.textContent = description;
    descriptionDisplay.classList.add('desc');
    card.appendChild(descriptionDisplay);
    watherEmoji.textContent = getemoji(id);
    watherEmoji.classList.add('weatheremoji')
    card.appendChild(watherEmoji);
}
function getemoji(weather_id) {
    switch (true) {
        case (weather_id >= 200 && weather_id < 300):
            return "🌨";
        case (weather_id >= 300 && weather_id < 400):
            return "🌧";
        case (weather_id >= 500 && weather_id < 600):
            return "🌧";
        case (weather_id >= 600 && weather_id < 700):
            return "❄";
        case (weather_id >= 700 && weather_id < 800):
            return "🌫";
        case (weather_id == 800):
            return "☀";
        case (weather_id >= 800 && weather_id < 805):
            return "☁";
        default:
            return "❓";
    }
}
function displayError(message) {
    let errorDisplay = document.createElement('p');
    errorDisplay.textContent = message;
    errorDisplay.classList.add('error');
    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}