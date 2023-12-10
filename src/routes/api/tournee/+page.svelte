<script>
  import Navbar from "$lib/Components/Navbar.svelte";
  import Tournee from "$lib/Components/Tournee.svelte";
  import { tourneesStore } from "../../store";
  /**
   * @param {number} id
   */
  function supprimerTournee(id) {
    testListTournee = testListTournee.filter((tournee) => tournee.id !== id);
  }

  /**
   * @type {string}
   */
  let datePicked;
  function handleDateSearch() {
    // TODO search tournee for this date GET /Tournee/{date}
    onMount(async () => {
      const response = await fetch(
        "http://localhost:9000/tournees/date/2023-12-31"
      );
      const tournees = await response.json();
      tourneesStore.set(tournees);
    });

    console.log("tournee du 32-12", tourneesStore);
    selectedTab = tabs.TourneeDate;
    console.log("selectedTab", selectedTab, datePicked);
  }
  function handleDefault() {
    // TODO search tournee for this date GET /Tournee/{Date.Now()}
    selectedTab = tabs.TourneeDefault;
    console.log("selectedTab", selectedTab);
  }
  function handleSuppl() {
    // TODO ???
    selectedTab = tabs.TourneeSupplement;
    console.log("selectedTab", selectedTab);
  }

  const tabs = {
    TourneeDate: "TourneeDate",
    TourneeDefault: "TourneeDefault",
    TourneeSupplement: "TourneeSupplement",
  };
  function eventHandler() {
    window.location.href="/"
  }
  let selectedTab = tabs.TourneeDate;

  let testListTournee = [
    // TODO GET THIS LIST FROM THE DATABASE
    // TODO changes depending on the selected tab
    { id: 1, nomTournee: "BXL", livreur: "Tom" },
    { id: 2, nomTournee: "LLN", livreur: "Fred" },
    { id: 3, nomTournee: "Leuven", livreur: "Paul" },
  ];
</script>

<body>
  <div class="container">
    <Navbar />
    <!--TODO au lieu de mettre dans chaque pages, le mettre UNE fois dans le +- main-->
    <div class="centered">
      <div>
        <div>
          <form>
            <input
              type="date"
              name="dateTournee"
              on:change={handleDateSearch}
              bind:value={datePicked}
            />
          </form>
        </div>
        <div class="button">
          <!--TODO Button or a:link ??-->
          <button on:click={handleDefault}>Tournées par défaut</button>
        </div>

        {#if selectedTab === tabs.TourneeDefault}
          <h2>Tournée classico classique pour Date.Now()</h2>
          {#each testListTournee as tournee (tournee.id)}
            <Tournee
              {...tournee}
              supprimerTournee={() => supprimerTournee(tournee.id)}
            />
          {/each}
        {:else if selectedTab === tabs.TourneeDate}
          <h2>Tournée pour tel(todo) date</h2>

          {#each testListTournee as tournee (tournee)}
          <!-- warning car il n'aime pas que un div soit clickable, ok si c est un button mais alors il faut modifier CSS-->
            <div class="tab-infos" on:click={() =>eventHandler()}> <!-- TODO affihcer la bonne nouvelle page /tournees/id-->
              <div class="left-column">
                <ul class="flex-container">
                  <label for="nom"> Tournee : </label>
                  <span id="nom"> {tournee.nomTournee}</span>
                </ul>
                <ul class="flex-container">
                  <label for="livreur"> Livreur : </label>
                  <span id="livreur"> {tournee.livreur}</span>
                </ul>
              </div>
              <div class="left-column">
                <ul class="flex-container">
                  <label for="date"> Date : </label>
                  <span id="date"> {tournee.nomTournee}</span>
                </ul>
                <ul class="flex-container">
                  <label for="statut"> Statut : </label>
                  <span id="statut">En cours</span>
                </ul>
              </div>
            </div>
          {/each}
        {:else if selectedTab === tabs.TourneeSupplement}
          <h2>Suppléments Onion Chef !</h2>
          <!--TODO-->
        {:else}
          <p>ERROR</p>
          <!--TODO-->
        {/if}
      </div>
    </div>
    <button on:click={() => history.back()}>Retour</button>
  </div>
</body>

<foot>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Formulaire avec mise en page</title>

  <style>
    body {
      font-family: Arial, sans-serif;
      display: flex;
      justify-content: center;
      height: 100vh;
      align-items: center;
      margin: 0;
    }

    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .tab-infos {
      border: 1px solid #ddd; /* Ajoute une bordure autour du conteneur */
      padding: 10px; /* Ajoute de l'espace intérieur pour le contenu */
      margin-bottom: 10px;
      background-color: #f2f2f2; /* Ajoute une couleur de fond grise */

      display: flex;
      justify-content: space-between;
      width: 500px;
    }

    .left-column,
    .right-column {
      width: 100%;
      margin-top: 10px;
    }

    .flex-container {
      display: flex;
      justify-content: space-between;
    }

    .data-table {
      margin-bottom: 20px;
    }

    table {
      border-collapse: collapse;
      width: 400px;
      margin: 20px;
    }

    th,
    td {
      padding: 10px;
      border: 1px solid #ddd;
    }

    th {
      background-color: #333;
      color: #fff;
    }

    tr:nth-child(even) {
      background-color: #f2f2f2;
    }

    .buttons {
      display: flex;
      justify-content: space-around;
      margin-top: 20px;
    }

    .date-input {
      width: 100%;
    }

    label,
    span {
      display: inline-block;
      margin-bottom: 8px;
    }
  </style>
</foot>
