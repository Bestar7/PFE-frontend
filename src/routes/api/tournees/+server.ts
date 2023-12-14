import { host } from '$lib/Api/config';
import { json as jsonResponse } from '@sveltejs/kit'


const apiRoute = "tournees";
async function getTourneesDate(date: String) {

  try {
    const reponse = await fetch(`${host}/${apiRoute}/date/2023-12-13`);
    if (reponse.ok) {
      const json = await reponse.json();
      console.log("les tournees sont ",json)

      return jsonResponse(json)
    } else {
      throw new Error(reponse.statusText);
    }
  } catch (error) {
    console.log("error in /tournees/+server.ts", error) // TODO handle error
  }
}

async function savePourcentage(id_article: number, nouvelleValeur: number) {
  try {
    console.log(nouvelleValeur);
    const response = await fetch(`${host}/${apiRoute}/${id_article}/modifierPourcentage`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          new_pourcentage: nouvelleValeur,
        }),
      },
    );

    console.log(response);
    console.log(response.json);

    if (response.ok) {
      console.log("Modifications sauvegardées avec succès !");
      // Mettez à jour les articles après la modification
      // updateArticles();
    } else {
      const errorText = await response.text();
      console.error("Erreur lors de la sauvegarde :", errorText);
    }
    return response
  } catch (error) {
    console.error("Erreur lors de la requête :", error);
    return jsonResponse(error) // TODO handle error
  }
  // Ajoutez ici la logique pour sauvegarder les modifications
}


 
export async function GET() {
const date= '2023-12-13';
  return getTourneesDate(date);
}

/**
 
@returns {Promise<void>}*/
export async function POST({ request, cookies }) {
  const { id_article, nouvelleValeur } = await request.json();
  return savePourcentage(id_article, nouvelleValeur)
}