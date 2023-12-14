import { host } from '$lib/Api/config';
import { json as jsonResponse } from '@sveltejs/kit'

const apiRoute = "utilisateurs";
async function getUser(id: string) {
  try {
    const reponse = await fetch(`${host}/${apiRoute}/${id}`)
    if (reponse.ok) {
      const json = await reponse.json();
      return jsonResponse(json)
    } else {
      throw new Error(reponse.statusText);
    }
  } catch (error) {
    console.log("error in /utilisateurs/+server.ts", error) // TODO handle error
    return jsonResponse(null)
  }
}

async function modifyUser(id: string, user: {}) {
  try {
    const reponse = await fetch(`${host}/${apiRoute}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...user
      }),
    })
    if (reponse.ok) {
      const json = await reponse.json();
      return jsonResponse(json)
    } else {
      throw new Error(reponse.statusText);
    }
  } catch (error) {
    console.log("error in /utilisateurs/+server.ts", error) // TODO handle error
    return jsonResponse(null)
  }
}
 
export async function GET({params}) {
  return getUser(params.id);
}

export async function PUT({params, request}) {
  return modifyUser(params.id, await request.json()); // TODO verif param.id == request.id
}