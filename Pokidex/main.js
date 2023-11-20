let array = [];

function getPokemonData(url) {
    return new Promise((resolve, reject) => {
        $.ajax({
            method: 'GET',
            url: url,
            success: resolve,
            error: reject
        });
    });
}

async function fetchData() {
    try {
        const response = await $.ajax({
            method: 'GET',
            url: 'https://pokeapi.co/api/v2/pokemon?limit=200&offset=0'
        });

        array = response.results;

        // Use Promise.all to wait for all inner AJAX calls to complete
        await Promise.all(array.map(async (pokemon, i) => {
            const details = await getPokemonData(pokemon.url);
            array[i].stats = details.stats.slice(0, 6);
            array[i].sprite = details.sprites.front_default;
            array[i].order = details.order;
        }));

        console.log(array);
        buildTable(array);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchData();

function buildTable(data) {
    let table = document.getElementById('card-container');

    for (let i = 0; i < data.length; i++) {
        let str = `<div class="card">
    <img src="${array[i].sprite}" alt="Card Image">
    <div class="card-content">
      <h3>${array[i].name}</h3>
      <p>Pokemon Number #${array[i].order}</p>
      <div class="more-info" id="more-info${i}">
        <p>hp: ${array[i].stats[0].base_stat}</p>
        <p>attack: ${array[i].stats[1].base_stat}</p>
        <p>defence: ${array[i].stats[2].base_stat}</p>
        <p>special attack: ${array[i].stats[3].base_stat}</p>
        <p>special defence: ${array[i].stats[4].base_stat}</p>
        <p>speed: ${array[i].stats[5].base_stat}</p>
      </div>
      <a class="read-more" id="read-more${i}">Read More</a>
    </div>`;
        table.innerHTML += str;
    }
     $('.read-more').click(function () {
        $(this).closest('.card').find('.more-info').toggle(1000);
    });

    $('#search-bar').on('input', function () {
        const searchTerm = $(this).val().trim().toLowerCase();

        $('.card').each(function () {
            const cardName = $(this).find('h3').text().toLowerCase();
            const isVisible = cardName.includes(searchTerm);

            // Toggle visibility based on the search term
            $(this).toggle(isVisible);
        });
    });
}
