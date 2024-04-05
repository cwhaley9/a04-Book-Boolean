let genreText = document.getElementById('book-genre');
let searchButtonActive = false;

document.addEventListener('DOMContentLoaded', () => { 
    onDomLoaded(); 
});

function onDomLoaded(){
    genreText.addEventListener('input', () => {
        alterSearchButton();
    })
}

function alterSearchButton(){
    if(genreText.value.trim() == '' && searchButtonActive){
        let searchButton = document.getElementById('search-button');
        searchButton.remove();
        searchButtonActive = false;
    }
    else{
        if(!searchButtonActive){
            let searchButton = document.createElement('button');
            searchButton.setAttribute('id', 'search-button');
            let genreContainer = document.getElementsByClassName('genre-input-container')[0];
            genreContainer.appendChild(searchButton);
            searchButtonActive = true;
        }
    }
}

// def: removes placeholder from input when in focus (when clicked on)
function removePlaceholder(){
    document.getElementById('book-genre').removeAttribute('placeholder');
}

/* 
    def: sets placeholder of an input when blurred (unclicked)

    parameters: 
        - placeholder -> string
*/

function setPlaceholder(placeholder){
    document.getElementById('book-genre').placeholder = placeholder;
}

function onGenreSearch(genre){

}