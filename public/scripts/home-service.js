// def: removes placeholder from input when in focus (when clicked on)
function removePlaceholder(id){
    document.getElementById(id).removeAttribute('placeholder');
}

/* 
    def: sets placeholder of an input when blurred (unclicked)

    parameters: 
        - placeholder -> string
*/

function setPlaceholder(id, placeholder){
    document.getElementById(id).placeholder = placeholder;
}

function alertUser(message){

}

export default alertUser; // export function for use in other files