import { host } from '$lib/Api/config';
import { json as jsonResponse } from '@sveltejs/kit'

const apiRoute = "tournees";
async function getTourneesDate(date: string) {
  try {
    const reponse = await fetch(`${host}/${apiRoute}/date/${date}`);
    if (reponse.ok) {
      const json = await reponse.json();
      return jsonResponse(json)
    } else {
      throw new Error(reponse.statusText);
    }
  } catch (error) {
    console.log("error in /tournees/+server.ts", error) // TODO handle error
    return jsonResponse(null)
  }
}
 
export async function GET({params}) {
  return getTourneesDate(params.date);
}