import { json as jsonResponse } from '@sveltejs/kit'
import { host } from '$lib/Api/config'

const apiRoute = "commandes";

/**
 * @returns {Promise<{ name: string }>}
 */
export async function getCommande() { // TODO use this in /commandes/[commande]/+page.svelte (in fetch)
  try {
      const reponse = await fetch(`${host}/${apiRoute}/3`);
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

export async function GET(){
    return getCommande();
}