import { json as jsonResponse } from '@sveltejs/kit'
import { host } from '$lib/Api/config';

const apiRoute = "tournees";
const id = 7
/**
 * @returns {Promise<{ name: string }>}
 */
export async function GET() {
  try {
      const reponse = await fetch(`${host}/${apiRoute}/${id}`);
      console.log("response", reponse);
      if (reponse.ok) {
          const json = await reponse.json();
          return jsonResponse({ name : json.fact })
      } else {
          throw new Error(reponse.statusText);
      }
  } catch (error) {
      return jsonResponse({ name : "KO" })
  }
}