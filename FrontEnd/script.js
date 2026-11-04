const galerie = document.querySelector(".gallery");

async function recupererTravaux(){
const reponse =  await fetch("http://localhost:5678/api/works");
const travaux = await reponse.json();
for (let i = 0;i < travaux.length; i++){
    const titreGalerie= travaux[i].title
    console.log(titreGalerie)
    }
    
}
recupererTravaux()

