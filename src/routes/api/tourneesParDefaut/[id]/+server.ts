import { host } from '$lib/Api/config';
import { json as jsonResponse } from '@sveltejs/kit'

const apiRoute = "tourneesParDefaut";

async function deleteTournee(id: string) {
  try {
    const response = await fetch(`${host}/${apiRoute}/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      const json = await response.json();
      return jsonResponse(json)
    } else {
      throw new Error(response.statusText);
    }
  } catch (error) {
    return jsonResponse('Backend error', { status: 500 })
  }
}

async function getTourneesParDefaut(id: string) {
  try {
    const reponse = await fetch(`${host}/commandesParDefaut/tourneeParDefaut/${id}`);
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

export async function DELETE({params}) {
  return deleteTournee(params.id);
}