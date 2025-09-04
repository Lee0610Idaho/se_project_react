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
    url: new URL("../assets/day/sunny.svg", import.meta.url).href,
    day: true,
    type: "sunny",
  },
  {
    url: new URL("src/assets/day/cloudy.svg", import.meta.url).href,
    day: true,
    type: "cloudy",
  },
  {
    url: new URL("../assets/day/fog.svg", import.meta.url).href,
    day: true,
    type: "fog",
  },
  {
    url: new URL("../assets/day/storm.svg", import.meta.url).href,
    day: true,
    type: "storm",
  },
  {
    url: new URL("../assets/day/snow.svg", import.meta.url).href,
    day: true,
    type: "snow",
  },
  {
    url: new URL("../assets/day/rain.svg", import.meta.url).href,
    day: true,
    type: "rain",
  },
  {
    url: new URL("../assets/day/sunny.svg", import.meta.url).href,
    day: false,
    type: "sunny",
  },
  {
    url: new URL("../assets/day/cloudy.svg", import.meta.url).href,
    day: false,
    type: "cloudy",
  },
  {
    url: new URL("../assets/day/fog.svg", import.meta.url).href,
    day: false,
    type: "fog",
  },
  {
    url: new URL("../assets/day/storm.svg", import.meta.url).href,
    day: false,
    type: "storm",
  },
  {
    url: new URL("../assets/day/snow.svg", import.meta.url).href,
    day: false,
    type: "snow",
  },
  {
    url: new URL("../assets/day/rain.svg", import.meta.url).href,
    day: false,
    type: "rain",
  },
];

export const APIkey = "af36a5493bf4708a24e2168aa7f08d38";

export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.wtwrtt.jumpingcrab.com"
    : "http://localhost:3001";

export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else return Promise.reject(`Error: ${res.status}`);
}

export function request(url, options) {
  return fetch(url, options).then(checkResponse);
}
