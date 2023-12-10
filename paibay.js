const elements = document.getElementById('elements');


function faza() {
    const userInput = document.getElementById("text").value;
    const apiUrl = updateLink(userInput);

    fetchData(apiUrl)
        .then(data => mappingBaby(data))
        .catch(error => console.error('Error:', error));
}

function updateLink(x) {
    return `https://api.spoonacular.com/recipes/complexSearch?apiKey=bc175871a9fc4f3286d71eae35314a01&query=${x}`

}

function fetchData(url) {
    return fetch(url)
        .then(response => response.json())
        .then(data => {
            return data.results || [];
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            throw error;
        });
}

async function mappingBaby(array) {
    var container = document.getElementById('recipe-results');
    container.innerHTML = "";

    for (const recipe of array) {
        var card = document.createElement('div');
        card.className = 'recipe-card';

        var u = `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=bc175871a9fc4f3286d71eae35314a01`;
        try {
            var cardData = await fetchData(u);
            console.log(u);

            card.addEventListener('click', function () {
                if (recipe.link) {
                    window.location.href = cardData.sourceUrl;
                } else {
                    console.log('no link available');
                }
            });

            var image = document.createElement('img');
            image.src = recipe.image; 
            image.alt = recipe.title;

            var contentDiv = document.createElement('div');
            contentDiv.className = 'recipe-card-content';

            contentDiv.innerHTML = `
                <h2>${recipe.title}</h2>
                
            `;

            card.appendChild(image);
            card.appendChild(contentDiv);

            container.appendChild(card);
        } catch (error) {
            console.error('Error fetching card data:', error);
        }
    }
}



