window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;

class Speech2Text{
    constructor(objet){
        const recognition = new SpeechRecognition();
        recognition.start();
        recognition.onresult = (event) => {
            const speechToText = event.results[0][0].transcript;
            objet.textContent = speechToText;
        }
    }
}