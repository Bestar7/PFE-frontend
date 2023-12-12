import { json as jsonResponse } from '@sveltejs/kit'
import { host } from '$lib/Api/config'

const apiRoute = "commandes";

/**
 * @returns {Promise<{ name: string }>}
 */
export async function getCommande(id:number) { // TODO use this in /commandes/[commande]/+page.svelte (in fetch)
  try {
      const reponse = await fetch(`${host}/${apiRoute}/${id}`);
      if (reponse.ok) {
          const json = await reponse.json();
          return jsonResponse(json);
      } else {
          throw new Error(reponse.statusText);
      }
  } catch (error) {
      return jsonResponse({ name : "KO" })
  }
}

export async function updateCommande(updatedCommande:{
    new_ordre: number;
    new_statut: string;
    new_lignes_commande: {
      id_commande: number;
      id_article: number;
      new_nb_caisses: number;
      new_nb_unites: number;
    }[];
  }){
    console.log("on passe ici ");
    fetch('http://localhost:9000/commandes/2/modifier', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      new_ordre: updatedCommande.new_ordre,
      new_statut: updatedCommande.new_statut,
      new_lignes_commande: updatedCommande.new_lignes_commande.map((ligne) => ({
        id_commande: ligne.id_commande,
        id_article: ligne.id_article,
        new_nb_caisses: ligne.new_nb_caisses,
        new_nb_unites: ligne.new_nb_unites,
      })),
    }),
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
}

export async function GET(id:number){

    return getCommande(id);
}

/**
 * @returns {Promise<void>}
 */
export async function PUT({ request, cookies }) {
    console.log("on passe ici ");
    const { updatedCommande } = await request.json();
    console.log("put ", updatedCommande)
    return updateCommande(updatedCommande);
  }