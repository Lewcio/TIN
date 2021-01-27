function validateForm() {
    const imieInput = document.getElementById("imie");
    const nazwiskoInput = document.getElementById("nazwisko");
    const dataInput = document.getElementById("data");
    const narodowoscInput = document.getElementById("narodowosc");

    const errorImie = document.getElementById("errorImie");
    const errorNazwisko = document.getElementById("errorNazwisko");
    const errorData = document.getElementById("errorData");
    const errorNarodowosc = document.getElementById("errorNarodowosc");
    const errorsSummary = document.getElementById("errorsSummary");

    resetErrors([imieInput, nazwiskoInput, dataInput, narodowoscInput], [errorImie, errorNazwisko, errorData, errorNarodowosc], errorsSummary);

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

    if (!checkRequired(imieInput.value)) {
        valid = false
        imieInput.classList.add("error-input");
        errorImie.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(imieInput.value, 2, 60)) {
        valid = false
        imieInput.classList.add("error-input");
        errorImie.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }

    if (!checkRequired(nazwiskoInput.value)) {
        valid = false
        nazwiskoInput.classList.add("error-input");
        errorNazwisko.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(nazwiskoInput.value, 2, 60)) {
        valid = false
        nazwiskoInput.classList.add("error-input");
        errorNazwisko.innerText = "Pole powinno zawierać od 2 do 60 znaków";
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

    if (!checkRequired(narodowoscInput.value)) {
        valid = false
        narodowoscInput.classList.add("error-input");
        errorNarodowosc.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(narodowoscInput.value, 2, 60)) {
        valid = false
        narodowoscInput.classList.add("error-input");
        errorNarodowosc.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }

    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy";
    }

    return valid;
}