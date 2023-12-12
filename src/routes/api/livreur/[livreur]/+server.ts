import { host } from "$lib/Api/config";
import { json as jsonResponse } from '@sveltejs/kit'

const apiRoute = "utilisateurs";

async function getLivreurInfo(id: string){
  try {
    const reponse = await fetch(`${host}/${apiRoute}/${id}`);
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
export async function GET({params}) {
  return getLivreurInfo(params.livreur)
}