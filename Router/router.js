import Route from "./Route.js";
import { allRoutes, websiteName } from "./allRoutes.js";

// Création d'une route pour la page 404 (page introuvable)
const route404 = new Route("404", "Page introuvable", "/pages/404.html", []);

// Fonction pour récupérer la route correspondant à une URL donnée
const getRouteByUrl = (url) => {
  let currentRoute = null;
  // Parcours de toutes les routes pour trouver la correspondance
  for (const element of allRoutes) {
    if (element.url == url) {
      currentRoute = element;
    }
  }
  // Si aucune correspondance n'est trouvée, on retourne la route 404
  if (currentRoute === null) {
    return route404;
  } else {
    return currentRoute;
  }
};

// Fonction pour charger le contenu de la page
const LoadContentPage = async () => {
  const path = globalThis.location.pathname;
  // Récupération de l'URL actuelle
  const actualRoute = getRouteByUrl(path);

  // Vérifier les droits d'accès à la page
  const allRolesArray = actualRoute.authorize;

  if (allRolesArray.length > 0) {
    if (allRolesArray.includes("disconnected")) {
      if (isConnected()) {
        // Rediriger vers la page d'accueil si l'utilisateur est connecté
        globalThis.location.replace("/");
      }
    }
    else {
      const roleUser = getRole();
      if (!allRolesArray.includes(roleUser)) {
        // Rediriger vers la page d'accueil si l'utilisateur n'a pas les droits
        globalThis.location.replace("/");
      }
  }
}

  // Récupération du contenu HTML de la route
  const html = await fetch(actualRoute.pathHtml).then((data) => data.text());
  // Ajout du contenu HTML à l'élément avec l'ID "main-page"
  document.getElementById("main-page").innerHTML = html;

  // Ajout du contenu JavaScript
  if (actualRoute.pathJS != "") {
    // Création d'une balise script
    const scriptTag = document.createElement("script");
    scriptTag.setAttribute("type", "text/javascript");
    scriptTag.setAttribute("src", actualRoute.pathJS);

    // Ajout de la balise script au corps du document
    document.querySelector("body").appendChild(scriptTag);
  }

  // Changement du titre de la page
  document.title = actualRoute.title + " - " + websiteName;

// Afficher et cacher les éléments en fonction du rôle
showAndHideElementForRole();
};

// Fonction pour gérer les événements de routage (clic sur les liens)
const routeEvent = (event) => {
  event.preventDefault();
  // Mise à jour de l'URL dans l'historique du navigateur
  globalThis.history.pushState({}, "", event.target.href);
  // Chargement du contenu de la nouvelle page
  LoadContentPage();
};

// Gestion de l'événement de retour en arrière dans l'historique du navigateur
globalThis.onpopstate = LoadContentPage;
// Assignation de la fonction routeEvent à la propriété route de la fenêtre
globalThis.route = routeEvent;
// Chargement du contenu de la page au chargement initial
LoadContentPage();
