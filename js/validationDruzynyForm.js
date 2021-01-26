function validateForm() {
    const nazwaInput = document.getElementById("nazwa");
    const narodowoscInput = document.getElementById("narodowosc");
    const dataInput = document.getElementById("data");

    const errorNazwa = document.getElementById("errorNazwa");
    const errorNarodowosc = document.getElementById("errorNarodowosc");
    const errorData = document.getElementById("errorData");
    const errorsSummary = document.getElementById("errorsSummary");

    resetErrors([nazwaInput, narodowoscInput, dataInput], [errorNazwa, errorNarodowosc, errorData], errorsSummary);

    let valid = true;
    let nowDate = new Date(),
        month = '' + (nowDate.getMonth() + 1),
        day = '' + nowDate.getDate(),
        year = nowDate.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    const nowString = [year, month, day].join('-');

    if (!checkRequired(nazwaInput.value)) {
        valid = false
        nazwaInput.classList.add("error-input");
        errorNazwa.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(nazwaInput.value, 2, 60)) {
        valid = false
        nazwaInput.classList.add("error-input");
        errorNazwa.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }

    if (!checkRequired(narodowoscInput.value)) {
        valid = false
        narodowoscInput.classList.add("error-input");
        errorNarodowosc.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(narodowoscInput.value, 2, 60)) {
        valid = false
        narodowoscInput.classList.add("error-input");
        errorNarodowosc.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }

    if (!checkRequired(dataInput.value)) {
        valid = false
        dataInput.classList.add("error-input");
        errorData.innerText = "Pole jest wymagane";
    } else if (!checkDate(dataInput.value)) {
        valid = false;
        dataInput.classList.add("error-input");
        errorData.innerText = "Pole powinno zawierać datę w formacie yyyy-MM-dd (np. 2000-01-01)";
    } else if (checkDateIfAfter(dataInput.value, nowString)) {
        valid = false;
        dataInput.classList.add("error-input");
        errorData.innerText = "Data nie może być z przyszłości";
    }

    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy";
    }

    return valid;
}