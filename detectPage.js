var currentUrl = window.location.href.replace(window.location.search,'')
let exerciseType = currentUrl.split("/").slice(-1)

if (currentUrl.includes("smasheducation.com")) {
    switch(exerciseType) {
        case "escucha_selecciona":
            document.getElementById("page-type").textContent = "Associate audio to image"
            break
        case "foto_texto_escribe":
            document.getElementById("page-type").textContent = "Listen and answer phrase"
            break
        case "relaciona_imagen":
            document.getElementById("page-type").textContent = "Associate text to image"
            break
        case "relacionando":
            document.getElementById("page-type").textContent = "Associate verbs"
            break
        case "palabras_recordar":
            document.getElementById("page-type").textContent = "Speak text"
            break
        case "revuelto":
            document.getElementById("page-type").textContent = "Reorder text"
            break
        case "ahorcado":
            document.getElementById("page-type").textContent = "Hangman but on river"
            break
        case "completando_texto_escribe":
            document.getElementById("page-type").textContent = "Answer multiple blanks after listening"
            break
        default:
            document.getElementById("page-type").textContent = exerciseType
    }
} else {
    document.getElementById("page-type").textContent = "This site is not smash."
}

