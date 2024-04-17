require('dotenv').config();
const axios = require('axios');
const prompts = require('prompts');

const {
    APPID,
    UNITS,
    LANGUAGE,
    URL_BASE,
    URL_BASE2
} = process.env;

let latitudeLongitude = async () => {
    const Q = await prompts({
        type: 'text',
        name: 'nome',
        message: 'Digite o nome da cidade:'
    });

    let url = `${URL_BASE}?q=${Q.nome}&appid=${APPID}`;
    let res = await axios.get(url);

    let latitude = res.data[0].lat;
    let longitude = res.data[0].lon;
    return {latitude, longitude};
}

latitudeLongitude()
.then(res => {
    console.log(`Latitude: ${res.latitude}`);
    console.log(`Longitude: ${res.longitude}`);

    let url2 = `${URL_BASE2}?lat=${res.latitude}&lon=${res.longitude}&units=${UNITS}&lang=${LANGUAGE}&appid=${APPID}`;

    axios.get(url2).then(res => {
        console.log(`Sensação térmica: ${res.data.main.feels_like}`);
        console.log(`Descrição: ${res.data.weather[0].description}`);
    });
})
.catch(res => {
    console.log('Erro. Cidade não encontrada');
})