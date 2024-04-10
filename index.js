require('dotenv').config();
const axios = require('axios');

const {
    APPID,
    Q,
    URL_BASE
} = process.env;

let url = `${URL_BASE}?q=${Q}&appid=${APPID}`;

let latitudeLongitude = async () => {
    let res = await axios.get(url);
    let latitude = res.data[0].lat;
    let longitude = res.data[0].lon;
    return {latitude, longitude};
}

latitudeLongitude()
.then(res => {
    console.log(`Latitude: ${res.latitude}`);
    console.log(`Longitude: ${res.longitude}`);
})
.catch(res => {
    console.log('Erro. Cidade não encontrada');
})