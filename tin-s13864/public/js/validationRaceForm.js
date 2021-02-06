function validateForm() {
    const nameInput = document.getElementById("name");
    const dataInput = document.getElementById("date");
    const okrazeniaInput = document.getElementById("laps");
    const trackInput = document.getElementById("track");

    const errorName = document.getElementById("errorName");
    const errorData = document.getElementById("errorDate");
    const errorOkrazenia = document.getElementById("errorLaps");
    const errorTrack = document.getElementById("errorTrack");
    const errorsSummary = document.getElementById("errorsSummary");

    resetErrors([nameInput, dataInput, okrazeniaInput, trackInput], [errorName, errorData, errorOkrazenia, errorTrack], errorsSummary);

    let valid = true;

    if (!checkRequired(nameInput.value)) {
        valid = false
        nameInput.classList.add("error-input");
        errorName.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(nameInput.value, 2, 60)) {
        valid = false
        nameInput.classList.add("error-input");
        errorName.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }

    if (!checkRequired(dataInput.value)) {
        valid = false
        dataInput.classList.add("error-input");
        errorData.innerText = "Pole jest wymagane";
    } else if (!checkDate(dataInput.value)) {
        valid = false;
        dataInput.classList.add("error-input");
        errorData.innerText = "Pole powinno zawierać datę w formacie yyyy-MM-dd (np. 2000-01-01)";
    }

    if (!checkRequired(okrazeniaInput.value)) {
        valid = false
        okrazeniaInput.classList.add("error-input");
        errorOkrazenia.innerText = "Pole jest wymagane";
    } else if (okrazeniaInput.value < 0) {
        valid = false
        okrazeniaInput.classList.add("error-input");
        errorOkrazenia.innerText = "Pole powinno zawierać dodatnie wartości";
    }

    if (!checkRequired(trackInput.value)) {
        valid = false
        trackInput.classList.add("error-input");
        errorTrack.innerText = "Pole jest wymagane";
    }

    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy";
    }

    return valid;
}