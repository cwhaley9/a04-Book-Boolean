// def: remove placeholder from input when in focus (when clicked on)
function removePlaceholder(id){
    document.getElementById(id).removeAttribute('placeholder');
}

/* 
    def: set placeholder of an input when blurred (unclicked)

    parameters: 
        - placeholder -> string
*/

function setPlaceholder(id, placeholder){
    document.getElementById(id).placeholder = placeholder;
}

/*
    def: create basic pop-up to display message to user. 

    parameters:
        - message -> string
*/
