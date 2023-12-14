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
    return jsonResponse('Backend error', { status: 500 })
  }
}

async function createTourneesParDefaut(nom_par_defaut: string) {
  try {
    const reponse = await fetch(`${host}/${apiRoute}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nom_par_defaut }),
    })
    if (reponse.ok) {
      const json = await reponse.json();
      return jsonResponse(json)
    } else {
      throw new Error(reponse.statusText);
    }
  } catch (error) {
    return jsonResponse('Backend error', { status: 500 })
  }
}
 
export async function GET() {
  return getTourneesParDefaut();
}

export async function POST({ request, cookies }) {
  const { nom_par_defaut } = await request.json();
  return createTourneesParDefaut(nom_par_defaut)
}