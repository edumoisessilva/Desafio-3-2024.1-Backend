//função de mudar imagem pelo id e pela url
function changeImage(id, url) {
  document.getElementById(id).src = url;
}
//função de mudar texto pelo id e pelo texto
function changeText(id, text) {
  document.getElementById(id).innerText = text;
}

function previousPokemon() {
  console.log("Pokemon Anterior");
  showPreviousPokemon();
}

function nextPokemon() {
  console.log("Pokemon Seguinte");
  showNextPokemon();
}

// VARIÁVEIS GLOBAIS
let currentPokemon = 1;
const maxPokemon = 1025; 

// FUNÇÃO PARA BUSCAR POKÉMON
async function getPokemon(id) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!response.ok) throw new Error("Pokémon não encontrado!");

    const data = await response.json();

    // atualiza nome e imagem do Pokémon
    changeText("name", `#${data.id} - ${data.name.toUpperCase()}`);
    changeImage("img_sprite_front_default", data.sprites.front_default);
  } catch (error) {
    console.error(error);
    changeText("name", "Erro ao carregar Pokémon!");
    changeImage("img_sprite_front_default", "../assets/missingno.png");
  }
}


// NAVEGAÇÃO
function showPreviousPokemon() {
  currentPokemon = currentPokemon > 1 ? currentPokemon - 1 : maxPokemon;
  getPokemon(currentPokemon);
}

function showNextPokemon() {
  currentPokemon = currentPokemon < maxPokemon ? currentPokemon + 1 : 1;
  getPokemon(currentPokemon);
}


// INICIALIZA COM O PRIMEIRO POKÉMON
window.onload = () => getPokemon(currentPokemon);
