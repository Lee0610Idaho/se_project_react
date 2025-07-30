export const defaultClothingItems = [
  {
    _id: 0,
    name: "Cap",
    weather: "hot",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Cap.png?etag=f3dad389b22909cafa73cff9f9a3d591",
  },
  {
    _id: 1,
    name: "Hoodie",
    weather: "warm",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Hoodie.png?etag=5f52451d0958ccb1016c78a45603a4e8",
  },
  {
    _id: 2,
    name: "Jacket",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Jacket.png?etag=f4bb188deaa25ac84ce2338be2d404ad",
  },
  {
    _id: 3,
    name: "Sneakers",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Sneakers.png?etag=3efeec41c1c78b8afe26859ca7fa7b6f",
  },
  {
    _id: 4,
    name: "T-Shirt",
    weather: "hot",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/T-Shirt.png?etag=44ed1963c44ab19cd2f5011522c5fc09",
  },
  {
    _id: 5,
    name: "Coat",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Coat.png?etag=298717ed89d5e40b1954a1831ae0bdd4",
  },
];

export const coordinates = {
  latitude: 40.249199,
  longitude: -75.646759,
};

export const weatherOptions = [
  {
    url: "src/assets/day/sunny.svg",
    day: true,
    type: "sunny",
  },
  {
    url: "src/assets/day/cloudy.svg",
    day: true,
    type: "cloudy",
  },
  { url: "src/assets/day/fog.svg", day: true, type: "fog" },
  {
    url: "src/assets/day/storm.svg",
    day: true,
    type: "storm",
  },
  {
    url: "src/assets/day/snow.svg",
    day: true,
    type: "snow",
  },
  {
    url: "src/assets/day/rain.svg",
    day: true,
    type: "rain",
  },
  {
    url: "src/assets/night/sunny.svg",
    day: false,
    type: "sunny",
  },
  {
    url: "src/assets/night/cloudy.svg",
    day: false,
    type: "cloudy",
  },
  {
    url: "src/assets/night/fog.svg",
    day: false,
    type: "fog",
  },
  {
    url: "src/assets/night/storm.svg",
    day: false,
    type: "storm",
  },
  {
    url: "src/assets/night/snow.svg",
    day: false,
    type: "snow",
  },
  {
    url: "src/assets/night/rain.svg",
    day: false,
    type: "rain",
  },
];

export const APIkey = "af36a5493bf4708a24e2168aa7f08d38";

export const BASE_URL = "http://localhost:3001";

export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else return Promise.reject(`Error: ${res.status}`);
}

export function request(url, options) {
  return fetch(url, options).then(checkResponse);
}
