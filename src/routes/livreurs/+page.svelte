<script>
  import { goto } from "$app/navigation";
	import Navbar from "$lib/Components/Navbar.svelte";
	import { onMount } from "svelte";

	let livreurs = ["ok","ok"];
	onMount(async () => {
    getAllLivreurs()
  });

  async function getAllLivreurs(){
    //livreurs = (await fetch("/api/livreurs")).json(); // TODO uncomment when backend endpoint done and open
  }

	function addLivreur(){
		goto("/livreurs/add")
	}
</script>

<Navbar /><!--TODO au lieu de mettre dans chaque pages, le mettre UNE fois dans le +- main-->
<div class="centered">
	<h1>ceci est la page des livreurs</h1>
	<ul class="livreurs">
		{#each livreurs as livreur}
			<li><a href="livreurs/1">nom </a> tournee</li>
		{/each}
	</ul>

	<button on:click={addLivreur}>Ajouter</button>
</div>

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
