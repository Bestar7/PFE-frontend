<script>
    import Tournee from "$lib/Components/Tournee.svelte";

    let testListTournee = [ // TODO GET THIS LIST FROM THE DATABASE
        {id:1, nomTournee:"BXL", livreur:"Tom"}, 
        {id:2, nomTournee:"LLN", livreur:"Fred"}, 
        {id:3, nomTournee:"Leuven", livreur:"Paul"}
    ]

    /**
     * @param {number} id
     */
    function supprimerTournee(id) {
        testListTournee = testListTournee.filter(tournee => tournee.id !== id);
    }
</script>

{#each testListTournee as tournee (tournee.id)}
    <Tournee {...tournee} supprimerTournee={ () => supprimerTournee(tournee.id) }/>
{/each}