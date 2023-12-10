<script>
	import Navbar from "$lib/Components/Navbar.svelte";

	const livreurs = [ // TODO remplacer par un GET /livreurs
    {
        nom: 'tom',
        tournee: '1',
    },
    {
        nom: 'john',
        tournee: '2'
    },
    {
        nom: 'jean',
        tournee: '3'
    }
];
</script>

<Navbar /><!--TODO au lieu de mettre dans chaque pages, le mettre UNE fois dans le +- main-->
<div class="centered">
	<h1>ceci est la page des livreurs</h1>

	<ul class="livreurs">
		{#each livreurs as { nom, tournee }}
			<li><a href="livreurs/{tournee}">{nom} </a> {tournee}</li>
		{/each}
	</ul>

	<form method="POST">
		<label>
			ajouter un livreur:
			<input type="text" name="nom" autocomplete="off" />
		</label>
		<button aria-label="adding">ajouter </button>
	</form>
</div>

<style>
	.centered {
		max-width: 20em;
		margin: 0 auto;
	}

	label {
		width: 100%;
	}

	input {
		flex: 1;
	}

	span {
		flex: 1;
	}

	button {
		border: none;
		background-size: 1rem 1rem;
		cursor: pointer;
		height: 100%;
		aspect-ratio: 1;
		opacity: 0.5;
		transition: opacity 0.2s;
	}

	button:hover {
		opacity: 1;
	}

	.saving {
		opacity: 0.5;
	}
</style>
