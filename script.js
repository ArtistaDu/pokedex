const pokemon = document.querySelector('pokemon')
let limit = 10
let offset = 0
const maxRecords = 151


function loadPokemons(offset, limit) {
    const pokedex = document.getElementById('pokedex')
    pokeApi.getPokemons(offset, limit)
        .then((pokemonList = []) => {
            pokedex.innerHTML += pokemonList.map(pokemon => `<li onClick="openDetails(${pokemon.number})" class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map(type => `<li class="type">${type}</li>`).join('')}
                </ol>
                    
                <img class="pokemon-pic" src="${pokemon.picture}" alt="${pokemon.name}"/>
            </div>
        </li>`)
                .join('')
        })
        .catch(error => console.error(error))
}

loadPokemons(offset, limit)

function loadMorePokemons() {
    const loadMoreButton = document.getElementById('loadMore')

    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemons(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMore)
    } else {
        loadPokemons(offset, limit)
    }
}


async function openDetails(id) {
    pokeApi.getPokemonById(id)
        .then((pokemon) => {
            document.body.innerHTML = ` <div class="${pokemon.type} content_detail" id="content_pokemon">
    <div class="upper_container">
        <div class="container_back_favorite">
            <button onClick="goToPokedex()" class="back_btn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M447.1 256c0 13.25-10.76 24.01-24.01 24.01H83.9l132.7 126.6c9.625 9.156 9.969 24.41 .8125 33.94c-9.156 9.594-24.34 9.938-33.94 .8125l-176-168C2.695 268.9 .0078 262.6 .0078 256S2.695 243.2 7.445 238.6l176-168C193 61.51 208.2 61.85 217.4 71.45c9.156 9.5 8.812 24.75-.8125 33.94l-132.7 126.6h340.1C437.2 232 447.1 242.8 447.1 256z"/></svg></button>
            <button class="fav_btn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M244 84L255.1 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 0 232.4 0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84C243.1 84 244 84.01 244 84L244 84zM255.1 163.9L210.1 117.1C188.4 96.28 157.6 86.4 127.3 91.44C81.55 99.07 48 138.7 48 185.1V190.9C48 219.1 59.71 246.1 80.34 265.3L256 429.3L431.7 265.3C452.3 246.1 464 219.1 464 190.9V185.1C464 138.7 430.4 99.07 384.7 91.44C354.4 86.4 323.6 96.28 301.9 117.1L255.1 163.9z"/></svg></button>
        </div>
        <div class="pokemon_detail">
            <div class="name_types_container">
                <h1 class="pokemon_name">${pokemon.name}</h1>
                <ol class="types_detail">
                
                    ${pokemon.types.map(type => `<li class="type">${type}</li>`).join('')}
                </ol>
            </div>
            <div class="number_detail">
                #${pokemon.number}
            </div>
        </div>
        <div class="pokemon_picture_detail">
            <img src="${pokemon.picture}" alt="${pokemon.name}">
        </div>
        
    </div>
    <div class="downward_container">
        <div class="characteristics">
            <div>
                <div class="title_container">
                    <h2>About</h2>
                </div>
                <div class="grid">
                    <h3 class="stat_name">Height</h3><span class="stat_value">${pokemon.height}</span>
                    <h3 class="stat_name">Weight</h3><span class="stat_value">${pokemon.weight}</span>
                    <h3 class="stat_name">Abilities</h3><span class="stat_value">${pokemon.abilities.map(ability => ability).join(', ')}</span>
                </div>
            </div>
            <div>
                <div class="title_container">
                    <h2>Stats</h2>
                </div>
                <div class=" grid_stats">
                    ${pokemon.stats.map(stat => `<h3 class="stat_name ${stat.stat.name}">${stat.stat.name}</h3><span class="stat_value">${stat.base_stat}</span>`).join('')}
                </div>
            </div>

        </div>
    </div>
</div>`
        })
}

function goToPokedex() {
    document.body.innerHTML = `
    <section class="content">
    <h1>Pokedex</h1>
    <ol class="pokedex" id="pokedex">
        <!-- lista de pokemons -->
    </ol>

    <div class=" pagination">
        <button onClick="loadMorePokemons()" id="loadMore" type="button">
            Load More
        </button>
    </div>
</section>
    `
    loadPokemons(0, 10)
}