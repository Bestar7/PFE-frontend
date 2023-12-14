import { host } from '$lib/Api/config';
import { json as jsonResponse } from '@sveltejs/kit'

const apiRoute = "commandesParDefaut";

async function deleteCommandeParDefaut(id: string) {
  try {
    const response = await fetch(`${host}/${apiRoute}/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      const json = await response.json();
      return jsonResponse(json)
    } else {
      throw new Error(response.statusText);
    }
  } catch (error) {
    return jsonResponse('Backend error', { status: 500 })
  }
}

export async function DELETE({params}) {
  return deleteCommandeParDefaut(params.commande);
}