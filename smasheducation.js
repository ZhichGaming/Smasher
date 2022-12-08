
var currentUrl = window.location.href.replace(window.location.search,'')
let exerciseType = currentUrl.split("/").slice(-1)[0]
let supportedQuestions = ["escucha_selecciona", "foto_texto_escribe", "relaciona_imagen", "relacionando", "palabras_recordar", "revuelto", "ahorcado", "completando_texto_escribe"]

if (currentUrl.includes("smasheducation.com") && supportedQuestions.includes(exerciseType)) {
    var confirmation = confirm("Are you sure you want to complete this page?");

    if (confirmation == true) {
        // let retakeButton = document.getElementById("RetakeProgressControl")
        // retakeButton.click()

        executeExercise()
    }
}

function executeExercise() {
    switch(exerciseType) {
        case "escucha_selecciona":
            associateAudioToImage()
            break
        case "foto_texto_escribe":
            listenAndAnswerPhrase()
            break
        case "relaciona_imagen":
            associateTextToImage()
            break
        case "relacionando":
            associateVerbs()
            break
        case "palabras_recordar":
            speakText()
            break
        case "revuelto":
            reorderText()
            break
        case "ahorcado":
            hangmanButOnRiver()
            break
        case "completando_texto_escribe":
            multipleBlanksAfterListening()
            break
    }
}

// Radio buttons after listening to audio
function doRadioButtons() {
    for (let i = 1; i <= 11; i++) {
        for (let j = 1; j <= 3; j++) {
            let element = document.querySelector(`[id="opGroup${i}"][tabindex="${j}"]`)
            let answer = element.getAttribute("data-answer")
            
            if (answer == "True") {
                document.getElementById(`${i}radio${j}`).checked = true;
            }
        }
    }
}

// Associate verbs(this was a pain)
function associateVerbs() {
    let buttonElements = document.getElementsByClassName("carousel-item-wrapper ")
    let answerElements = document.getElementsByClassName("activity-o-card-answerzone")

    // Loop through the 4 questions
    for (let i = 0; i < answerElements.length; i++) {
        // Loop through the 4 possible answers
        for (let j = 0; j < buttonElements.length; j++) {
            // If the index of the possible answer + 1 has the same value as attribute of "data-sequence" of answerElements at the question index
            if (buttonElements[j].getAttribute("data-sequence") == answerElements[i].getAttribute("data-sequence")) {
                buttonElements[j].children[0].click()
                break
            }
        }
    }
}

// Associate text to image(too hard)
function associateTextToImage() {
    alert("This is too much of a pain to automate so do it yourself.")
}

// Listen and answer singular word
function listenAndAnswerSingular() {
    let answer = document.getElementById("C_Ans").textContent
    document.getElementById("Textarea").textContent = answer
    document.getElementById("verified").click()
}

// Listen and answer phrase
function listenAndAnswerPhrase() {
    let answer = document.getElementById("C_Ans").textContent
    document.getElementById("Textarea").textContent = answer
    document.getElementById("verified").click()
}

// Associate audio to image 
function associateAudioToImage() {
    let sentences = document.getElementsByClassName("carousel-item-wrapper")

    for (let i = 0; i < sentences.length; i++) {
        let currentSentence = sentences[i]
        let currentSentenceId = currentSentence.getAttribute("data-sequence")

        document.getElementById(`resultBox_${currentSentenceId}`).click()
    }
}

// Reorder text
function reorderText() {
    let buttons = document.getElementsByClassName("draggme draggmeEvent")
    for (var i = 0; i < buttons.length; i++) {
        document.querySelector(`[class="draggme draggmeEvent fnt-sz20 hg-em-sz20 SM2-act-relItem"][sequence="${i+1}"]`).click()
    }
}

// Hangman but on river
function hangmanButOnRiver() {
    let answer = document.getElementById("ActivityContent_sequenceAnswer").getAttribute("value")
    
    for (var i = 0; i < answer.length; i++) {
        let buttonTexts = document.getElementsByClassName("ui-button-text")

        for (var j = 0; j < buttonTexts.length; j++) {
            if (buttonTexts[j].textContent.toLowerCase() == answer[i].toLowerCase()) {
                buttonTexts[j].parentElement.click()
                break
            }
        }
    }
}

// Answer multiple blanks after listening
function multipleBlanksAfterListening() {
    let textboxes = document.getElementsByClassName("respuesta cte-box-answer-container")

    for (let i = 0; i < textboxes.length; i++) {
        let answer = textboxes[i].querySelector(`[class="text hidden"]`).textContent
        document.getElementById(`Answer_${i+1}`).textContent = answer
    }

    document.getElementById("ActivityContent_sendAnswers").click()
}

// Speak text
function speakText() {
    let audio = document.querySelector("#system_smmb_wavesurfer > audio")
    alert(`This is the example audio file, you can use it to play it on speaker and press record. However, doing it yourself is prefered.`)
    window.open(audio, "_blank");
}

