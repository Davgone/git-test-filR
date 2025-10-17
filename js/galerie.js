const galerieImage = document.getElementById("allImages");

// Récupérer les images depuis une API ou une base de données 
let monImage = getImages("Titre", "/images/restaurant-939436_1280.jpg");


// Ajouter les images à la galerie
galerieImage.innerHTML = monImage;





function getImages(titre, urlImage){
    titre = sanitizeHtml(titre);
    urlImage = sanitizeHtml(urlImage);
    return    ` <div class="col p-3">
                        <div class="image-card text-white">
                            <img src="${urlImage}" class="rounded w-100" alt="restaurant"/>
                            <p class="titre-image">${titre}</p>
                                <div class="action-image-buttons" data-show="admin">
                                    <button data-show="admin" type="button" class="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#EditionPhotoModal"><i class="bi bi-pencil-square"></i></button>
                                    <button data-show="admin" type="button" class="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#DeletePhotoModal"><i class="bi bi-trash"></i></button>
                                </div>    
                        </div>
                    </div>
                </div>`;
    }