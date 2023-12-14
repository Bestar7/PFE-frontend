import { json as jsonResponse } from '@sveltejs/kit'
import { host } from '$lib/Api/config';

const apiRoute = "tournees";

async function getOneTourneeResume(idTournee: string) {
  try {
    const reponse = await fetch(`${host}/${apiRoute}/${idTournee}/resume`);
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
  return getOneTourneeResume(params.tournee);
}