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