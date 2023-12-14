import { json as jsonResponse } from '@sveltejs/kit'
import { host } from '$lib/Api/config';

const apiRoute = "tournees";

async function deleteOne(idTournee: string) {
  try {
    const reponse = await fetch(`${host}/${apiRoute}/${idTournee}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
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

async function getOneTournee(idTournee: string) {
  try {
    const reponse = await fetch(`${host}/${apiRoute}/${idTournee}`);
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

export async function GET({ params }) {
  return getOneTournee(params.tournee);
}

export async function DELETE({ params }) {
  return deleteOne(params.tournee);
}