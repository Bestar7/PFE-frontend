import { json as jsonResponse } from "@sveltejs/kit";
import { host } from "$lib/Api/config";
import { get } from "svelte/store";

const apiRoute="/commandes";


async function getResumeTournee(id:number){
    try{
        const response = await fetch(`${host}/tournees/${id}/resume`);
        if (response.ok) {
            const json = await response.json();
            return jsonResponse(json)
          } else {
            throw new Error(response.statusText);
          }
        } catch (error) {
          console.log("error in tournees/resume/+server.ts", error) // TODO handle error
        }
    
}

export async function GET(){
    return getResumeTournee();

}