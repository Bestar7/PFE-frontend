import { json as jsonResponse } from "@sveltejs/kit";
import { host } from "$lib/Api/config";

const apiRoute = "commandes";
async function getCommandesTournee() {
  try {
    const response = await fetch(`${host}/${apiRoute}/tournee/3`);
    if (response.ok) {
      const json = await response.json();
      return jsonResponse(json)
    } else {
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.log("error in commandes/tournees/+server.ts", error) // TODO handle error
  }

}

export async function GET() {
  return getCommandesTournee();
}