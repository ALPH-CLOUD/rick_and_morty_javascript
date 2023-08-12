// Traer el input de búsqueda
const txtCharacter = document.getElementById('txt-character');
//Traer el contenedor donde se van a renderizar las cards
const containerCards = document.getElementById('containerCards');

const URL1 = 'https://rickandmortyapi.com/api/character';
const URL2 = 'https://rickandmortyapi.com/api/character/?name=';

const addedCards = []; // Lista para hacer seguimiento de las cartas agregadas

const getApi = async (URL) => {
    const response = await fetch(URL);
    const data = await response.json();
    //array
    return data.results;
}

const createCards = (character) => {
    if (!addedCards.includes(character.id)) { // Verificar si la carta ya se agregó
        addedCards.push(character.id); // Agregar el ID de la carta a la lista

        const card = document.createElement('div');
        card.classList.add('card-character');

        const imgCard = document.createElement('img');
        imgCard.setAttribute('src', character.image);
        imgCard.setAttribute('alt', character.name);

        const containerDescription = document.createElement('div');
        containerDescription.classList.add('description-card');

        const nameCharacter = document.createElement('h2');
        nameCharacter.textContent = character.name;
        const genderCharacter = document.createElement('p');
        genderCharacter.textContent = "Gender: " + character.gender;

        containerCards.appendChild(card);

        card.appendChild(imgCard);
        card.appendChild(containerDescription);

        containerDescription.appendChild(nameCharacter);
        containerDescription.appendChild(genderCharacter);
    }
}

const generateAllCharacters = async () => {
    const data = await getApi(URL1);
    data.map(character => createCards(character));
}

const getCharacterByName = async (event) => {
    containerCards.innerHTML = "";
    addedCards.length = 0; // Limpiar la lista de cartas agregadas

    const data = await getApi(URL2 + event.target.value);

    data.map(character => createCards(character));
}

window.addEventListener('DOMContentLoaded', generateAllCharacters);

txtCharacter.addEventListener('keyup', getCharacterByName);
