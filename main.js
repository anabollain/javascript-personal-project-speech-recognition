'use strict';

//WINDOW
//Global variable that lives in the browser
//Compatibility
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//Create new object
const recognition = new SpeechRecognition();
recognition.interimResults = true;

//VARIABLES 
const speechResult = document.querySelector('.speech');
//DOM
//Variable that represents the latest spoken speech
let paragraph = document.createElement('p');
paragraph.setAttribute('class', 'paragraph');
speechResult.appendChild(paragraph);

//EVENT HANDLERS
function handleRecognition(ev) {
    //List, not an array, nested data
    //confidence => it builds up confidence over time, as it gets the content analyzed a few more times
    //transcript => what the user said, string
    //isFinal => boolean that tells us if the user is done with the sentence
    //console.log(ev.results);
    //Convert it into an array to be able to work with it
    const transcript = Array.from(ev.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');
    //console.log(transcript);

    //DOM
    paragraph.textContent = transcript;
    //Attribute to detect if the user has finished speaking
    if(ev.results[0].isFinal){
        //Any conditions you want
        if(transcript.toLowerCase().includes('perro') || transcript.toLowerCase().includes('dog')){
            const sentence = document.createElement('p');
            sentence.textContent = '🐶 🐶 🐶 🐶';
            speechResult.appendChild(sentence);
        }
        if(transcript.toLowerCase().includes('gato') || transcript.toLowerCase().includes('cat')){
            const sentence = document.createElement('p');
            sentence.textContent = '🐱 🐱 🐱 🐱';
            speechResult.appendChild(sentence);
        }
        if(transcript.toLowerCase().includes('abre google') || transcript.toLowerCase().includes('open google')){
            window.open("https://www.google.com/", "_blank");
        }
        //DOM
        paragraph = document.createElement('p');
        paragraph.setAttribute('class', 'paragraph');
        speechResult.appendChild(paragraph);
    }   
}

//EXECUTION
recognition.start();

//EVENT LISTENERS
recognition.addEventListener('result', handleRecognition);
recognition.addEventListener('end', recognition.start);