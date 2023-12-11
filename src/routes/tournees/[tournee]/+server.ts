import { json as jsonResponse } from '@sveltejs/kit'
import { host } from '$lib/Api/config';

const apiRoute = "";
const id = 4

async function getOneTournee() {
    try {
      console.log("on passe bien ici ")
      const reponse = await fetch(`http://localhost:9000/tournees/1`);
      if (reponse.ok) {
        const json = await reponse.json();
        console.log("la tournee est ", json);
        return new Response(JSON.stringify(json), {
          headers: {
            'Content-Type': 'application/json'
          }
        });
      } else {
        throw new Error(reponse.statusText);
      }
    } catch (error) {
      console.log("error in /tournees/+server.ts", error) // TODO handle error
    }
  }
export async function GET() {
  return getOneTournee();
}