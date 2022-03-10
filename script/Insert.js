export function insertComposant(id,composant, scriptTag){
    fetch(composant)
    .then(res => res.text())
    .then(text => {
        let oldelem = document.querySelector("script#"+scriptTag);
        let newelem = document.createElement("div");
        newelem.setAttribute('id',id);
        newelem.innerHTML = text;
        oldelem.parentNode.replaceChild(newelem,oldelem);
    })
}

