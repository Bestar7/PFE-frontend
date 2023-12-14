import { host } from '$lib/Api/config';
import { json as jsonResponse } from '@sveltejs/kit'

const apiRoute = "creches";
export async function GET({params}) {
    try {
        const reponse = await fetch(`${host}/${apiRoute}/${params.id}`);
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