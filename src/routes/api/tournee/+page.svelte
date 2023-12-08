<script>
    import Tournee from "$lib/Components/Tournee.svelte";

    /**
     * @param {number} id
     */
    function supprimerTournee(id) {
        testListTournee = testListTournee.filter(tournee => tournee.id !== id);
    }

    /**
     * @type {string}
     */
     let datePicked;
    function handleDateSearch(){
        console.log(datePicked) // TODO search tournee for this date GET /Tournee/{date}
    }

    const tabs = {
        TourneeDate: "TourneeDate",
        TourneeDefault: "TourneeDefault",
        TourneeSupplement : "TourneeSupplement"
    }
    let selectedTab = tabs.TourneeDate; // TODO changer de 'tab' (if-elseif-else) avec les changements de valeur selected

    let testListTournee = [ // TODO GET THIS LIST FROM THE DATABASE
        // TODO changes depending on the selected tab
        {id:1, nomTournee:"BXL", livreur:"Tom"}, 
        {id:2, nomTournee:"LLN", livreur:"Fred"}, 
        {id:3, nomTournee:"Leuven", livreur:"Paul"}
    ]
</script>

<div>
    <div>
        <form>
            <input type="date" name="dateTournee" on:change={handleDateSearch} bind:value={datePicked}>
        </form>
    </div>
    <div>
        <!--TODO Button or a:link ??-->
        <button on:click={()=>console.log("Tournées par défaut")}>Tournées par défaut</button>
    </div>
    <div>
        <!--TODO Button or a:link ??-->
        <button on:click={()=>console.log("Suppléments")}>Suppléments</button>
    </div>
</div>

{#if selectedTab===tabs.TourneeDate || selectedTab===tabs.TourneeDefault}
    {#each testListTournee as tournee (tournee.id)}
        <Tournee {...tournee} supprimerTournee={ () => supprimerTournee(tournee.id) }/>
    {/each}
{:else if selectedTab===tabs.TourneeSupplement}
    <p>todo</p><!--TODO-->
{:else}
    <p>ERROR</p><!--TODO-->
{/if}


<button on:click={() => history.back()}>Retour</button>