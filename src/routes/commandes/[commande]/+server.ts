import { json as jsonResponse } from '@sveltejs/kit'
import { host } from '$lib/Api/config'

const apiRoute = "articles";

/**
 * @returns {Promise<{ name: string }>}
 */
export async function GET() { // TODO use this in /commandes/[commande]/+page.svelte (in fetch)
  try {
      const reponse = await fetch(`${host}/${apiRoute}`);
      if (reponse.ok) {
          const json = await reponse.json();
          return jsonResponse({ name : json.fact })
      } else {
          throw new Error(reponse.statusText);
      }
  } catch (error) {
      return jsonResponse({ name : "KO" })
  }
}