export default class Banner{

    banner; 

    constructor(message, backgroundColor){

        this.banner = document.createElement('div');
        this.banner.textContent = message;
        this.banner.style.backgroundColor = backgroundColor;

        this.banner.classList.add('banner');
    }

    addToPage(){
        document.body.appendChild(banner);
    }

}
