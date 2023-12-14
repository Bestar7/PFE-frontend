import { json as jsonResponse } from "@sveltejs/kit";
import { host } from "$lib/Api/config";

const apiRoute = "commandes";

async function createTournees(id: string) {
  try {
    const reponse = await fetch(`${host}/${apiRoute}/${id}`);
    if (reponse.ok) {
      const json = await reponse.json();
      return jsonResponse(json)
    } else {
      throw new Error(reponse.statusText);
    }
  } catch (error) {
    console.log("error in commandesParDefaut/tourneesParDefaut/[id]/+server.ts", error) // TODO handle error
    return jsonResponse(null)
  }
}

async function getCommandesTournee(id: string) {
  try {
    const response = await fetch(`${host}/${apiRoute}/${id}`);
    if (response.ok) {
      const json = await response.json();
      return jsonResponse(json)
    } else {
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.log("error in commandes/[commande]/+server.ts", error) // TODO handle error
    return jsonResponse("KO")
  }

}

export async function GET({params}) {
  return getCommandesTournee(params.commande);
}

export async function POST({params}) {
  return createTournees(params.commande);
}