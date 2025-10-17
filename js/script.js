const tokenCookieName = "accesstoken";
const RoleCookieName = "role";
const signoutBtn = document.getElementById("signout-Btn");

signoutBtn.addEventListener("click", signout);

function getRole(){
    return getCookie(RoleCookieName);
}


function signout(){
    eraseCookie(tokenCookieName);
    eraseCookie(RoleCookieName);
    globalThis.location.reload();
}

function setToken(token){
    setCookie(tokenCookieName, token, 7);
}

function getToken(){
    return getCookie(tokenCookieName);
}


function setCookie(name,value,days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let c of ca) {
        const trimmed = c.trimStart();
        if (trimmed.startsWith(nameEQ)) return trimmed.substring(nameEQ.length);
    }
    return null;
}

function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}


function isConnected(){
    return getToken() != null && getToken() != undefined;
}



/* Exemple d'utilisation dans une page de connexion
    disconnected
    connected (admin ou client)
    admin
    client
*/

function showAndHideElementForRole(){
    const userConnected = isConnected();
    const role = getRole();

    let allElementsToEdit = document.querySelectorAll("[data-show]");

    for (const element of allElementsToEdit) {
        switch(element.dataset.show){
        case 'disconnected':
            if(userConnected ){
                element.classList.add('d-none');
            }
            break;
        case 'connected':
            if(!userConnected ){
                element.classList.add('d-none');
            }
            break;
        case 'admin':
            if(!userConnected || role != 'admin'){
                element.classList.add('d-none');
            }
            break;
        case 'client':
            if(!userConnected || role != 'client'){
                element.classList.add('d-none');
            }
            break;
    }
}
}


function sanitizeHtml(text) {
    const tempHtml = document.createElement('div');
    tempHtml.textContent = text;
    return tempHtml.innerHTML;
}