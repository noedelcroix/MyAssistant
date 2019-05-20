let sendMessage = (message, from) => {
    if (from == "request") {
        $("#content").append("<div class=\"flex request\"><div class=\"data request\">" + message + "</div></div>");
    } else {
        $("#content").append("<div class=\"flex response\"><div class=\"data response\">" + message + "</div></div>");
        speech(message);
    }

    scrollBottom();
}

let scrollBottom = (object) => {
    window.scrollTo(0, document.body.scrollHeight);
}

let recognizer = (object) => {
    if (window.hasOwnProperty('webkitSpeechRecognition')) {
        var recognition = new webkitSpeechRecognition();

        recognition.lang = "fr-BE";
        recognition.start();

        recognition.onresult = function (e) {
            object.value
                = e.results[0][0].transcript;
            recognition.stop();
            traiterRequest();
        };

        recognition.onerror = function (e) {
            recognition.stop();
            console.log(e);
        }
    }
}

let speech = (text) => {
    var msg = new SpeechSynthesisUtterance(text);
    msg.lang = "fr-BE";
    window.speechSynthesis.speak(msg);
}

let traiterRequest = () => {
    let request = $("#request").val();
    if (request === "") { return false; }
    sendMessage(request, "request");
    $("#request").val("");
    var date = new Date();

    //====================REQUESTS====================\\
    if (request.includes("ouv")) {
        if(request.includes("chrome")){
            sendMessage("ouverture de chrome", "response");
        }else if(request.includes("spotify")){
            sendMessage("ouverture de spotify", "response");
        }
    }else if(request.toLowerCase().includes("salut") || request.toLowerCase().includes("bonjour") || request.toLowerCase().includes("bonsoir")){
        var heure = parseInt(date.getHours());
        console.log(heure)
        if(0 <= heure && heure < 4){
            sendMessage("Bonne nuit ! il est temps d'aller vous coucher", "response");
        }else if(4 <= heure && heure < 12){
            sendMessage("Bonjour ! passez une très bonne matinée", "response");
        }else if(12 <= heure && heure < 18){
            sendMessage("Bonne après-midi ! passez une très bonne fin de journée", "response");
        }else if(18 <= heure && heure <= 23){
            sendMessage("Bonne soirée !", "response");
        }
    }else if(request.includes("heure")){
        sendMessage("Il est "+date.getHours()+":"+date.getMinutes());        
    }else if (request.includes("*")) {
        //grossiers mots\\
        sendMessage("Soyez polis s'il vous plait", "response");
    } else if (request.includes("di")) {
        //==="Dis quelque chose"===\\
        sayResponse = request.split("di").slice(1).join("di").split(" ").slice(1).join(" ")
        sendMessage(sayResponse, "response");
    } else {
        sendMessage("Je n'ai pas compris votre demande");
    }
    //================================================\\
}

$(document).ready(() => {
    $("#mic").one("click", () => {
        speech("Salut ! Que puis-je faire pour t'aider ?")
        recognizer(document.getElementById("request"));
        $("#mic").on("click", () => {
            speech("Besoin d'autre chose ?")
            recognizer(document.getElementById("request"));
        });
    });
});