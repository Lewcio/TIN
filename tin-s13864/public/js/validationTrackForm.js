function validateForm() {
    const lokalizacjaInput = document.getElementById("location");
    const dlugoscInput = document.getElementById("length");

    const errorLokalizacja = document.getElementById("errorLocation");
    const errorDlugosc = document.getElementById("errorLength");
    const errorsSummary = document.getElementById("errorsSummary");

    resetErrors([lokalizacjaInput, dlugoscInput], [errorLokalizacja, errorDlugosc], errorsSummary);

    let valid = true;

    if (!checkRequired(lokalizacjaInput.value)) {
        valid = false
        lokalizacjaInput.classList.add("error-input");
        errorLokalizacja.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(lokalizacjaInput.value, 2, 60)) {
        valid = false
        lokalizacjaInput.classList.add("error-input");
        errorLokalizacja.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }

    if (!checkRequired(dlugoscInput.value)) {
        valid = false
        dlugoscInput.classList.add("error-input");
        errorDlugosc.innerText = "Pole jest wymagane";
    } else if (dlugoscInput.value < 0) {
        valid = false
        dlugoscInput.classList.add("error-input");
        errorDlugosc.innerText = "Pole powinno zawierać dodatnie wartości";
    }

    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy";
    }

    return valid;
}