let sendMessage = (message, from) => {
    if (from == "request") {
        $("#content").append("<div class=\"flex request\"><div class=\"data request\">" + message + "</div></div>");
    } else {
        $("#content").append("<div class=\"flex response\"><div class=\"data response\">" + message + "</div></div>");
        speech(message);
    }

    scrollBottom();
}

let scrollBottom = (object)=>{
    window.scrollTo(0,document.body.scrollHeight);
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
    $("#request").val("");

//====================REQUESTS====================\\
    if (request.includes("ouvrir")) {
        sendMessage("ouverture du programme", "response");
    } else if (request.includes("di")) {
        //==="Dis quelque chose"===\\
        sayResponse = request.split("di").slice(1).join("di").split(" ").slice(1).join(" ")
        sendMessage(sayResponse, "response");
    }else if(request.includes("*")){
        //grossiers mots\\
        sendMessage("Soyez polis s'il vous plait", "response");
    }else{
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