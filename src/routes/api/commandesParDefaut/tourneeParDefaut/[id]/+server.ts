import { host } from '$lib/Api/config';
import { json as jsonResponse } from '@sveltejs/kit'

const apiRoute = "commandesParDefaut/tourneeParDefaut";
async function getTourneesParDefaut(id: string) {
  try {
    const reponse = await fetch(`${host}/${apiRoute}/${id}`);
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

async function createTourneesParDefaut(id: string) {
  try {
    const reponse = await fetch(`${host}/${apiRoute}/${id}`);
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
 
export async function GET({params}) {
  return getTourneesParDefaut(params.id);
}

export async function POST({params}) {
  return createTourneesParDefaut(params.id);
}