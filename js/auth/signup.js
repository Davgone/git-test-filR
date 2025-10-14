// Implémenter le code JavaScript pour la page d'inscription

const inputNom = document.getElementById("NomInput");
const inputPrenom = document.getElementById("PrenomInput");
const inputEmail = document.getElementById("EmailInput");
const inputPassword = document.getElementById("PasswordInput");
const inputValidatePassword = document.getElementById("ValidatePasswordInput");
const btnValidation = document.getElementById("btn-validation-inscription");
const formInscription = document.getElementById("formulaireInscription");

inputNom.addEventListener("keyup", validateForm);
inputPrenom.addEventListener("keyup", validateForm);
inputEmail.addEventListener("keyup", validateForm);
inputPassword.addEventListener("keyup", validateForm);
inputValidatePassword.addEventListener("keyup", validateForm);

btnValidation.addEventListener("click", InscrireUtilisateur);


// Fonction de validation ensembledu formulaire
function validateForm() {
    const nomOK = validateRequired(inputNom);
    const prenomOK = validateRequired(inputPrenom);
    const emailOK = validateMail(inputEmail);
    const passwordOK = validatePassword(inputPassword);
    const PasswordConfirmOK = validateConfirmationPassword(inputPassword, inputValidatePassword);

    if(nomOK && prenomOK && emailOK && passwordOK && PasswordConfirmOK) {
        btnValidation.disabled = false;
    } 
    else {
        btnValidation.disabled = true;
    }
}

function validateMail(input) {
    // expression régulière pour vérifier le format de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mailUser = input.value;
    if (mailUser.match(emailRegex)) {
     // signifie que mailUser est au bon format OK
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    } 
    else {
        // signifie que mailUser est au mauvais format PAS OK
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
}
}

function validatePassword(input) {
    // expression régulière pour vérifier le format du password
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
    const passwordUser = input.value;
    if (passwordUser.match(passwordRegex)) {
     // signifie que passwordUser est au bon format OK
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    } 
    else {
        // signifie que passwordUser est au mauvais format PAS OK
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
}
}

function validateConfirmationPassword(inputPwd, inputConfirmPwd) {
    if (inputPwd.value == inputConfirmPwd.value) {
        // signifie que les mots de passe correspondent OK
        inputConfirmPwd.classList.add("is-valid");
        inputConfirmPwd.classList.remove("is-invalid");
        return true;
    } 
    else {
        // signifie que passwordUser est au mauvais format PAS OK
        inputConfirmPwd.classList.remove("is-valid");
        inputConfirmPwd.classList.add("is-invalid");
        return false;
}
}



function validateRequired(input) {
    if (input.value != ''){
        // signifie que input est rempli OK
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    } 
    else {
        // signifie que input est vide PAS OK
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}

function InscrireUtilisateur() {
let dataForm = new FormData(formInscription);


let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

let raw = JSON.stringify({
  "firstName": dataForm.get("nom"),
  "lastName": dataForm.get("prenom"),
  "email": dataForm.get("email"),
  "password": dataForm.get("mdp")
});

let requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://127.0.0.1:8000/api/registration", requestOptions)
  .then(response => response.json())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}
