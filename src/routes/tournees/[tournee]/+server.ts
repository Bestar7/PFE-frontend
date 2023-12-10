import { json as jsonResponse } from '@sveltejs/kit'
import { host } from '$lib/Api/config';

const apiRoute = "tournees";
const id = 7

async function getOneTournee() {
    try {
      const reponse = await fetch(`${host}/${apiRoute}/${id}`);
      if (reponse.ok) {
        const json = await reponse.json();
        return jsonResponse(json)
      } else {
        throw new Error(reponse.statusText);
      }
    } catch (error) {
      console.log("error in /supplement/+server.ts", error) // TODO handle error
    }
  }
export async function GET() {
  return getOneTournee();
}