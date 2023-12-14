import { json as jsonResponse } from "@sveltejs/kit";
import { host } from "$lib/Api/config";

const apiRoute = "commandes";
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