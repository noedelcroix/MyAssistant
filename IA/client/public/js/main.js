let sendMessage = (message, from) => {
    if (from == "request") {
        $("body").append("<div class=\"flex request\"><div class=\"data request\">" + message + "</div></div>");
    } else {
        $("body").append("<div class=\"flex response\"><div class=\"data response\">" + message + "</div></div>");
    }
}

let recognizer = () => {
    if (window.hasOwnProperty('webkitSpeechRecognition')) {
        var recognition = new webkitSpeechRecognition();

        recognition.lang = "fr-BE";
        recognition.start();

        recognition.onresult = function (e) {
            document.getElementById('request').value
                = e.results[0][0].transcript;
            recognition.stop();
        };

        recognition.onerror = function (e) {
            recognition.stop();
            console.log(e);
        }
    }
}

let speech = ()=>{
    var msg = new SpeechSynthesisUtterance('Hello World 94');
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
    }
}

$(document).ready(() => {
    $("#submit").on("click", () => {
        traiterRequest();
    });

    $(document).on("keydown", (event) => {
        if (event.key === "Enter") {
            traiterRequest();
        }
    });

    $("#mic").on("click", () => {
        recognizer();
    });
});