const $input = document.querySelector("#input");
const API_URL = "https://api.tvmaze.com/search/shows?q=";
const $dataHTML = document.querySelector(".renderedData");

$input.addEventListener("input", function (e) {
  const { value } = e.target;

  fetchShowData(value);
});

function RenderShows(data) {
  const renderedData = data
    .map(
      (element) => `
<div class="show">
    <img class="show__image" src="${element.image}" alt="Image Unavailable"/>
    <p class="show__name">${element.name}</p>
    <p class="show__rating"> Score: ${element.rating}</p>
    <p class="show__genres"> Genres: ${element.genres}</p>
    <p class="show__summary">${element.summary}</p>
    </div>`
    )
    .join("");

  $dataHTML.innerHTML = renderedData;
}

async function fetchShowData(title) {
  const response = await fetch(API_URL + title);
  const data = await response.json();
  const formattedData = data.map((element) => ({
    name: element.show.name || "Name of The Show Unknown",
    genres: element.show.genres || "Genres Unknown",
    rating: element.show.rating.average || "Unknown",
    summary: element.show.summary || "Summary of The Show Unknown",
    image: element.show?.image?.medium,
  }));

  console.log(data);
  RenderShows(formattedData);
}

function getValue(num1, num2) {
  return [num1 + 2, num2 + 5];
}

console.log(getValue(5, 10));
