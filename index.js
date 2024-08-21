let themeButton = document.getElementById("theme-button");

const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");
}

themeButton.addEventListener("click", toggleDarkMode);

let signNowButton = document.getElementById("sign-now-button");

let signaturesSection = document.getElementById("signatures");
let counter = document.getElementById("counter");
let count = signaturesSection.children.length;

counter.textContent = 
    `🖊️  ${count} people have signed this petition!`;

const addSignature = (person) => {

    let newSignature = document.createElement("p");
    newSignature.textContent = `🖊️ ${person.name} from ${person.area} supports this.`;
    
    signaturesSection.appendChild(newSignature);

    if (signaturesSection.children.length > 5) {
            signaturesSection.removeChild(signaturesSection.children[0]);
      }

    count++;
    counter.textContent = 
       `🖊️  ${count} people have signed this petition!`;

}

const validateForm = () => {

    let containsErrors = false;
    
    var form = document.getElementById('sign-petition');
    var inputs = form.querySelectorAll('input');

    //Clean errors
    inputs.forEach(function(input) {
        input.classList.remove('error');
    });
    
    let person = {
        name: inputs[0].value,
        area: inputs[1].value,
        email: inputs[2].value
    }

    //Validate new submission
    if (person.name.length < 2) {
        inputs[0].classList.add('error');
        containsErrors = true;
    }

    if (person.area.length < 2) {
        inputs[1].classList.add('error');
        containsErrors = true;
    }

    if (person.email.length < 2 || !email.value.includes('.com')) {
        inputs[2].classList.add('error');
        containsErrors = true;
    }   

    //If there are no errors, add signature
    if (!containsErrors){
        addSignature(person);

        inputs.forEach(function(input) {
            input.value = "";
        });

        toggleModal(person);
    }

}

signNowButton.addEventListener("click", validateForm);

let modalImage = document.getElementById("modal-image");
let modal = document.getElementById("thanks-modal");
let scaleFactor = 1;

const toggleModal = (person) => {
    let modalContent = document.getElementById("thanks-modal-content");
    modal.style.display = "flex";
    modalContent.textContent = `Thank you so much ${person.name}!`;
    
    let interval = setInterval(() => {
            scaleImage();
        }, 500)
    
    setTimeout(() => {
        modal.style.display = "none";
        clearInterval(interval);
    }, 4000)    
}

const scaleImage = () => {
    scaleFactor = scaleFactor === 1 ? 0.8 : 1;
    modalImage.style.transform = `scale(${scaleFactor})`;
}

const closeModal = () => {
    let modal = document.getElementById("thanks-modal");
    modal.style.display = "none";
}

let closeModalButton = document.getElementById("close-modal");
closeModalButton.addEventListener("click", closeModal);

let animation = {
    revealDistance: 50,
    initialOpacity: 0,
    transitionDelay: 0,
    transitionDuration: '2s',
    transitionProperty: 'all',
    transitionTimingFunction: 'ease'
}

let revealableContainers = document.querySelectorAll('.revealable');

const reveal = () => {        
    revealableContainers.forEach(function(revealable) {
        let windowHeight = window.innerHeight;
        let topOfRevealableContainer = revealable.getBoundingClientRect().top;
    
        if (topOfRevealableContainer < windowHeight - animation.revealDistance) {
            revealable.classList.add('active');
        } 
        else {
            revealable.classList.remove('active');
        }
    });
}

window.addEventListener("scroll", reveal);

let motionButton = document.getElementById("motion-button");

const reduceMotion = () => {
    animation.transitionDuration = "0s";
    animation.transitionTimingFunction = "linear";
    revealableContainers.forEach(function(revealable) {
        revealable.style.transitionDuration = animation.transitionDuration;
        revealable.style.transitionTimingFunction = animation.transitionTimingFunction;
    });
}

motionButton.addEventListener("click", reduceMotion);

