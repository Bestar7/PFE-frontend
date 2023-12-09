<script>
    import Navbar from "$lib/Components/Navbar.svelte";
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
    function handleDateSearch(){ // TODO search tournee for this date GET /Tournee/{date}
        selectedTab = tabs.TourneeDate
        console.log("selectedTab", selectedTab, datePicked)
    }
    function handleDefault(){ // TODO search tournee for this date GET /Tournee/{Date.Now()}
        selectedTab = tabs.TourneeDefault
        console.log("selectedTab", selectedTab)
    }
    function handleSuppl(){ // TODO ???
        selectedTab = tabs.TourneeSupplement
        console.log("selectedTab", selectedTab)
    }

    const tabs = {
        TourneeDate: "TourneeDate",
        TourneeDefault: "TourneeDefault",
        TourneeSupplement : "TourneeSupplement"
    }
    let selectedTab = tabs.TourneeDate;

    let testListTournee = [ // TODO GET THIS LIST FROM THE DATABASE
        // TODO changes depending on the selected tab
        {id:1, nomTournee:"BXL", livreur:"Tom"}, 
        {id:2, nomTournee:"LLN", livreur:"Fred"}, 
        {id:3, nomTournee:"Leuven", livreur:"Paul"}
    ]
</script>

<Navbar /> <!--TODO au lieu de mettre dans chaque pages, le mettre UNE fois dans le +- main-->
<div>
    <div>
        <form>
            <input type="date" name="dateTournee" on:change={handleDateSearch} bind:value={datePicked}>
        </form>
    </div>
    <div>
        <!--TODO Button or a:link ??-->
        <button on:click={handleDefault}>Tournées par défaut</button>
    </div>
    <div>
        <!--TODO Button or a:link ??-->
        <button on:click={handleSuppl}>Suppléments</button>
    </div>
</div>

{#if selectedTab===tabs.TourneeDefault}
    <h2>Tournée classico classique pour Date.Now()</h2>
    {#each testListTournee as tournee (tournee.id)}
        <Tournee {...tournee} supprimerTournee={ () => supprimerTournee(tournee.id) }/>
    {/each}

{:else if selectedTab===tabs.TourneeDate}
    <h2>Tournée pour tel(todo) date</h2>
    {#each testListTournee as tournee (tournee.id)}
        <Tournee {...tournee} supprimerTournee={ () => supprimerTournee(tournee.id) }/>
    {/each}

{:else if selectedTab===tabs.TourneeSupplement}
    <h2>Suppléments Onion Chef !</h2><!--TODO-->
{:else}
    <p>ERROR</p><!--TODO-->
{/if}


<button on:click={() => history.back()}>Retour</button>