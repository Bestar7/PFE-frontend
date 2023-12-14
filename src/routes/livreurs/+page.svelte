<script>
  import { goto } from "$app/navigation";
	import Navbar from "$lib/Components/Navbar.svelte";
	import { onMount } from "svelte";
	import UnauthorizedWrapper from "$lib/Components/UnauthorizedWrapper.svelte";
  import { roles } from "$lib/Auth/auth";
    import { host } from "$lib/Api/config";

	let livreurs = [];
	onMount(async () => {
    getAllLivreurs()
  });

  /*
  async function getAllLivreurs(){
    livreurs = (await fetch("/api/livreurs")).json(); // TODO uncomment when backend endpoint done and open
  }
  */

  async function getAllLivreurs(){
	try {
      // Make a GET request to the backend API
      const response = await fetch(`${host}/utilisateurs/role/livreur`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Parse the JSON response
      const data = await response.json();
	  livreurs = data;

      // Update the component state with the retrieved data
      users = data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }



	function addLivreur(){
		goto("/livreurs/add")
	}
</script>

<UnauthorizedWrapper roles={[roles.admin, roles.livreur]}>
<Navbar /><!--TODO au lieu de mettre dans chaque pages, le mettre UNE fois dans le +- main-->
<div class="centered">
	<h1>ceci est la page des livreurs</h1>
	<ul class="livreurs">
		{#each livreurs as livreur}
			<li><a href="livreurs/{livreur.id_utilisateur}">{livreur.nom}</a></li>
		{/each}
	</ul>

	<button on:click={addLivreur}>Ajouter</button>
</div>
</UnauthorizedWrapper>

<style>
	.centered {
		max-width: 20em;
		margin: 0 auto;
	}

	button {
		border: none;
		background-size: 1rem 1rem;
		cursor: pointer;
		opacity: 100.5;
		transition: opacity 0.2s;
	}

	button:hover {
		opacity: 1;
	}
</style>
