let sendMessage = (message, from) => {
    if (from == "request") {
        $("body").append("<div class=\"flex request\"><div class=\"data request\">" + message + "</div></div>");
    } else {
        $("body").append("<div class=\"flex response\"><div class=\"data response\">" + message + "</div></div>");
        speech(message);
    }
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

let speech = (text)=>{
    var msg = new SpeechSynthesisUtterance(text);
    msg.lang = "fr-BE";
    window.speechSynthesis.speak(msg);
}

let traiterRequest = () => {
    let request = $("#request").val();
    if (request === "") { return false; }
    sendMessage(request, "request");
    request = request.split(" ");
    $("#request").val("");

    if (request.indexOf("ouvrir") != -1) {
        sendMessage("ouvrir", "response");
    } else if (request.indexOf("dire") != -1) {
        sendMessage("dire", "response");
    }else{
        sendMessage("Je n'ai pas compris votre demande");
    }
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