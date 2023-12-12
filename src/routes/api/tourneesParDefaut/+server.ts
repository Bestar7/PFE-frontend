import { host } from '$lib/Api/config';
import { json as jsonResponse } from '@sveltejs/kit'

const apiRoute = "tourneesParDefaut";

async function getTourneesParDefaut() {
  try {
    const reponse = await fetch(`${host}/${apiRoute}`);
    if (reponse.ok) {
      const json = await reponse.json();
      return jsonResponse(json)
    } else {
      throw new Error(reponse.statusText);
    }
  } catch (error) {
    console.log("error in /tourneesParDefaut/+server.ts", error) // TODO handle error
    return jsonResponse(null)
  }
}
 
export async function GET() {
  return getTourneesParDefaut();
}