export default class Route {
    constructor(url, title, pathHtml, authorize, pathJS = "") {
      this.url = url;
      this.title = title;
      this.pathHtml = pathHtml;
      this.pathJS = pathJS;
      this.authorize = authorize;
    }
}

/*
[] -> Tout le monde peut accéder à la page
['disconnected'] -> Page accessible uniquement aux utilisateurs non connectés
['admin'] -> Page accessible uniquement aux administrateurs, rôle 'admin'
['client'] -> Page accessible uniquement aux clients, rôle 'client'
['admin', 'client'] -> Page accessible uniquement aux utilisateurs connectés (administrateurs OU clients)
*/ 