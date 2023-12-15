import { json as jsonResponse } from "@sveltejs/kit";
import { host } from "$lib/Api/config";

const apiRoute = "commandes";
async function getCommandesTournee(id: string) {
  try {
    const response = await fetch(`${host}/${apiRoute}/tournee/${id}`);
    if (response.ok) {
      const json = await response.json();
      return jsonResponse(json);
    } else {
      throw new Error(response.statusText);
    }
  } catch (error) {
    return jsonResponse('Backend error', { status: 500 })
  }

}

export async function GET({params}) {
  return getCommandesTournee(params.tournee);
}