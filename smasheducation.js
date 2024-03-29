
var currentUrl = window.location.href.replace(window.location.search,'')
let exerciseType = currentUrl.split("/").slice(-1)[0]
let supportedQuestions = {
    "comprension_audio": doRadioButtons, 
    "escucha_selecciona": associateAudioToImage, 
    "foto_texto_escribe": listenAndAnswerPhrase, 
    "relacionando": associateVerbs, 
    "revuelto": reorderText, 
    "ahorcado": hangmanButOnRiver, 
    "completando_texto_escribe": multipleBlanksAfterListening, 
    "completando_texto": completeText, 
    "comprension_oral_larga": doRadioButtons, 
    "comprension_escrita": writtenComprehension,
    "foto_texto_click": selectionFromImage
}

if (currentUrl.includes("smasheducation.com") && (exerciseType in supportedQuestions)) {
    var confirmation = confirm("Are you sure you want to complete this page?");

    if (confirmation == true) {
        // let retakeButton = document.getElementById("RetakeProgressControl")
        // retakeButton.click()

        executeExercise()
    }
}

function executeExercise() {
    console.log("Executing exercise... " + "Exercise type: " + exerciseType)
    if (exerciseType == "comprension_audio") {
        document.getElementsByClassName("meadiarequiered-activities-next")[0].click()
    } else if (exerciseType == "comprension_oral_larga") {
        document.getElementsByClassName("meadiarequiered-activities-next")[0].click()
        document.getElementsByClassName("ms-act-section-btn-next2 floating-right")[0].click()
    }

    supportedQuestions[exerciseType]();
}

// Radio buttons after listening to audio
function doRadioButtons() {
    for (let i = 1; i < 11; i++) {
        for (let j = 1; j <= 3; j++) {
            let element = document.querySelector(`[id="opGroup${i}"][tabindex="${j}"]`)
            let answer = element.getAttribute("data-answer")
            
            if (answer == "True") {
                document.getElementById(`${i}radio${j}`).checked = true;
            }
        }
    }

    document.getElementsByClassName("ms-act-section-btn-send floating-right")[0].click()
}

// Associate verbs(this was a pain)
function associateVerbs() {
    console.log("Associating verbs...")
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
    let sentencesCount = document.getElementsByClassName("carousel-item-wrapper").length

    for (let i = 0; i < sentencesCount; i++) {
        let currentSentence = document.getElementsByClassName("carousel-item-wrapper active")[0]
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

// Complete text after lisening
function completeText() {
    let buttons = document.getElementsByClassName("draggme")
    var buttonsArray = Array.from(buttons)

    
    let sorted = buttonsArray.sort(function(a, b) {
        // get the values of the attributes you want to sort by
        var valueA = parseInt(a.getAttribute("data-sequence"));
        var valueB = parseInt(b.getAttribute("data-sequence"));
    
        // compare the values and return the result
        if (valueA < valueB) {
            return -1;
        } else if (valueA > valueB) {
            return 1;
        } else {
            return 0;
        }
    });

    for (let i = 0; i < sorted.length; i++) {
        sorted[i].click()
    }
}

function writtenComprehension() {
    for (let i = 0; i < 3; i++) {
        let element = document.querySelector(`#masterActivity > div.activity-content.actividad > div > div:nth-child(3) > ul`).children[i]
        let answer = element.getAttribute("data-sequence")

        if (answer == "1") {
            console.log(element.children[1])
            element.children[1].click()
        }
    }
}

function selectionFromImage() {
    let children = document.getElementsByClassName("g_click")[0].children

    for (let i = 0; i < children.length; i++) {
        if (children[i].getAttribute("data-sequence") == "1") {
            children[i].children[1].click()
        }
    }
}
