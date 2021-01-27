const iconMeteo = {
    "Rain": "wi wi-day-rain",
    "Clouds": "wi wi-day-cloudy",
    "Clear": "wi wi-day-sunny",
    "Snow": "wi wi-day-snow",
    "Drizzle": "wi wi-day-sleet",
    "Mist": "wi wi-day-fog",
}

function capitalize(str){
    return str[0].toUpperCase() + str.slice(1);
}

async function main() {
    const ip = await fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(json => json.ip)
    const ville = await fetch('https://freegeoip.app/json/' + ip)
        .then(response => response.json())
        .then(json => json.city)
    const meteo = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=Lyon&appid=4ad9a7d98e7786aa4d371ded50913c45&lang=fr&units=metric`)
        .then(response => response.json())
        .then(json => json)
    console.log(meteo)
    infosMeteo(meteo)
}

function infosMeteo(data){
    const name = data.name;
    const temperature = data.main.temp;
    const conditions = data.weather[0].main;
    const description = data.weather[0].description;

    document.querySelector('#ville').textContent = name;
    document.querySelector('#temperature').textContent = Math.round(temperature);
    document.querySelector('#conditions').textContent = capitalize(description);
    document.querySelector('i.wi').className = iconMeteo[conditions]
}

main()



