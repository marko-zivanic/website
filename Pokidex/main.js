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
            url: 'https://pokeapi.co/api/v2/pokemon?limit=100&offset=0'
        });

        array = response.results;

        // Use Promise.all to wait for all inner AJAX calls to complete
        await Promise.all(array.map(async (pokemon, i) => {
            const details = await getPokemonData(pokemon.url);
            array[i].stats = details.stats.slice(0, 3);
        }));

        console.log(array);
        buildTable(array);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchData();

function buildTable(data) {
    let table = document.getElementById('tableBody');

    for (let i = 0; i < data.length; i++) {
        let str = `<tr>
            <td>${data[i].name}</td>
            <td>${data[i].stats[0].base_stat}</td>
            <td>${data[i].stats[1].base_stat}</td>
            <td>${data[i].stats[2].base_stat}</td>
        </tr>`;
        table.innerHTML += str;
    }
}
