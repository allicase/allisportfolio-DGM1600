async function getAPIData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

getAPIData("https://pokeapi.co/api/v2/pokemon/ditto")
.then((data) => {
    console.log(data)
}

)
