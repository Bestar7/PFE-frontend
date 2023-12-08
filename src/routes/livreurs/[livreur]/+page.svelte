<script> 
  import Livreur from '$lib/Components/Livreur.svelte';
import {currentLivreur } from '../../../store';
import {error} from '@sveltejs/kit';
import {livreurs} from '../data';

  import HelloWorld from "$lib/Components/HelloWorld.svelte";
  import { onMount } from "svelte";
  import ItemLine from '$lib/Components/ItemLine.svelte';


  export function load({ params }) {
	const livreur = livreurs.find((livreur) => livreur.nom === params.nom);

	if (!livreur) throw error(404);

	return {
		livreur
	};


}
  
  let name = "loadin...";
  onMount(async () => {
      const response = await fetch('/api/livreur');
      const json = await response.json();
      name = json.name
  })

  let livreur = {
    nom: "Nom existant",
    login: "Login existant",
    motDePasse: "MotDePasse existant",
    isAdmin: false,
  };


  function handleSubmit() {
    // Vous pouvez traiter les données ici (envoyer à un serveur, mettre à jour la base de données, etc.)
    console.log("Données soumises :", livreur);
  }

</script>
<Livreur {name}/>

<form on:submit|preventDefault={handleSubmit}>
  <label>
    Nom :
    <input bind:value={livreur.nom} type="text" />
  </label>

  <label>
    Login :
    <input bind:value={livreur.login} type="text" />
  </label>

  <label>
    Mot de passe :
    <input bind:value={livreur.motDePasse} type="password" />
  </label>

  <label>
    Admin :
    <input type="radio" bind:group={livreur.isAdmin} value={true} /> Oui
    <input type="radio" bind:group={livreur.isAdmin} value={false} /> Non
  </label>


  <button type="submit">Soumettre</button>
</form>



