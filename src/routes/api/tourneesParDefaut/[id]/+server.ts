import { host } from '$lib/Api/config';
import { json as jsonResponse } from '@sveltejs/kit'

const apiRoute = "commandesParDefaut/tourneeParDefaut";
async function getTourneesParDefaut(id: string) {
  try {
    const reponse = await fetch(`${host}/${apiRoute}/1`); // TODO remove hardcode
    if (reponse.ok) {
      const json = await reponse.json();
      return jsonResponse(json)
    } else {
      throw new Error(reponse.statusText);
    }
  } catch (error) {
    console.log("error in /tourneesParDefaut/[id]/+server.ts", error) // TODO handle error
    return jsonResponse(null)
  }
}
 
export async function GET({params}) {
  return getTourneesParDefaut(params.id);
}