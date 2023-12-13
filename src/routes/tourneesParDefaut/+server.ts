import { json as jsonResponse } from "@sveltejs/kit";
import { host } from "$lib/Api/config";

const apiRoute="/commandes";
const route = "tourneesParDefaut";


async function getTourneesParDefaut(){
    try{
        const response = await fetch(`http://localhost:9000/${route}`);
        if (response.ok) {
            const json = await response.json();
            return jsonResponse(json)
          } else {
            throw new Error(response.statusText);
          }
        } catch (error) {
          console.log("error in tourneeParDefaut/+server.ts", error) // TODO handle error
        }
    
}

export async function GET(){
    return getTourneesParDefaut();

}