import { host } from "$lib/Api/config";
import { json as jsonResponse } from '@sveltejs/kit'

const apiRoute = "utilisateurs";

async function getAllLivreurs(){
  try {
    const reponse = await fetch(`${host}/${apiRoute}`);
    if (reponse.ok) {
        const json = await reponse.json();
        return jsonResponse( json )
    } else {
        throw new Error(reponse.statusText);
    }
  } catch (error) {
      return jsonResponse("KO") // TODO handle error
  }
}

/**
 * @returns {Promise<{}>}
 */
export async function GET() {
  return getAllLivreurs()
}