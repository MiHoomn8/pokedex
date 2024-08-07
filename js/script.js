const input = document.querySelector(".input")

function getPokemon(index) {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${index}`)
}

function listPokemons() {
  Promise.all(Array.from({ length: 151 }, (_, i) => getPokemon(i + 1)))
    .then((responses) => Promise.all(responses.map((res) => res.json())))
    .then((pokemons) => {
      document.querySelector(".pokemons").innerHTML = pokemons
        .filter((pokemon) => {
          return pokemon.name.includes(input.value)
        })
        .map(
          (pokemon) => `
      <div class="box">
        <div class="box-info">
          <h2>${pokemon.name}</h2>
          ${pokemon.types
            .map((type) => `<span class="box-chips">${type.type.name}</span>`)
            .join("")}
        </div>
        <div class="box-illustration">
          <img src="${
            pokemon.sprites.other.dream_world.front_default
          }" alt="Imagem do pokemon ${pokemon.name}" />
        </div>
      </div>
    `
        )
        .join("")
    })
}

document.addEventListener("DOMContentLoaded", listPokemons)
input.addEventListener("input", () => {
  listPokemons()
})
