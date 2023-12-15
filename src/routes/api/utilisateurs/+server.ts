import { host } from '$lib/Api/config';
import { json as jsonResponse } from '@sveltejs/kit'

const apiRoute = "utilisateurs";
async function connexion(identifiant: string, mot_de_passe: string) {
  try {
    const reponse = await fetch(`${host}/${apiRoute}/connexion`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "identifiant": identifiant,
        "mot_de_passe" : mot_de_passe,
      }),
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
 
export async function POST({request}) {
  let body = await request.json()
  if (!body)
    return jsonResponse('No data provided', { status: 400 })
  if (!body.identifiant)
    return jsonResponse('Identifiant missing', { status: 400 })
  if (!body.mot_de_passe)
    return jsonResponse('Password missing', { status: 400 })
  return connexion(body.identifiant, body.mot_de_passe);
}