function validateForm() {
    const dataInput = document.getElementById("data");
    const okrazeniaInput = document.getElementById("okrazenia");

    const errorData = document.getElementById("errorData");
    const errorOkrazenia = document.getElementById("errorOkrazenia");
    const errorsSummary = document.getElementById("errorsSummary");

    resetErrors([dataInput, okrazeniaInput], [errorData, errorOkrazenia], errorsSummary);

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

    if (!checkRequired(okrazeniaInput.value)) {
        valid = false
        okrazeniaInput.classList.add("error-input");
        errorOkrazenia.innerText = "Pole jest wymagane";
    } else if (okrazeniaInput.value < 0) {
        valid = false
        okrazeniaInput.classList.add("error-input");
        errorOkrazenia.innerText = "Pole powinno zawierać dodatnie wartości";
    }

    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy";
    }

    return valid;
}