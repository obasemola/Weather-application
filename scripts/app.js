const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) => {
    // const cityDets = data.cityDets;
    // const weather = data.weather;

    //destructure properties
    const { cityDets, weather } = data;

    details.innerHTML = `
    <h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">

        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    `;

    //update night/day and icon images
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);


    //ternary operator
    let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';

    // let timeSrc = null;
    // if(weather.IsDayTime){
    //     timeSrc = 'img/day.svg';
    // } else {
    //     timeSrc = 'img/night.svg';
    // };

    time.setAttribute('src', timeSrc);

    //remove display-none class if present
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }
};

const updateCity = async (city) => {

    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    // return {
    //     cityDets: cityDets,
    //     weather: weather
    // };

    //Using object shorthand notation
    return { cityDets, weather };

};

cityForm.addEventListener('submit', (e) => {
    //prevent form default action
    e.preventDefault();


    //get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();


    //update UI with city typed in
    updateCity(city)
        .then((data) => {
            updateUI(data)})
        .catch((err) => {
            console.log(err);
        });


        //set local storage
        localStorage.setItem('city', city);
});

if(localStorage.city){
    updateCity(localStorage.city)
        .then((data) => {
            updateUI(data)})
        .catch((err) => {
            console.log(err)
        })
}

// localStorage.clear()

