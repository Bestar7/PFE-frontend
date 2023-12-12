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
    console.log("error in /supplement/+server.ts", error) // TODO handle error
  }
}

export async function GET() {
  return getAllArticle()
}