import { host } from '$lib/Api/config';
import { json as jsonResponse } from '@sveltejs/kit'

const apiRoute = "articles";

async function getAllArticle() {
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

export async function GET() {
  return getAllArticle()
}