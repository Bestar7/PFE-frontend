<script>
  import Navbar from "$lib/Components/Navbar.svelte";
  import Tournee from "$lib/Components/Tournee.svelte";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  let tournees = [];

  let admin= false;

  /**
   * @param {number} id
   */
  function supprimerTournee(id) {
    testListTournee = testListTournee.filter((tournee) => tournee.id !== id);
  }
  onMount(() => {
    getTourneesDate();
    console.log(tournees);
  });

  let currentDate = new Date();
  console.log(currentDate);
  let dateString = currentDate.toISOString().split("T")[0];
  console.log("date ", dateString);

  let datePicked =dateString;


  async function getTourneesDate() {
    const response = await fetch(`/api/tournees/date/${datePicked}`);
    console.log(response)
    const tourneesResponse = await response.json();
    tournees = tourneesResponse;
  }
  function handleDateChange(event) {
    currentDate = new Date(event.target.value);
    datePicked = currentDate.toISOString().split("T")[0];
    console.log("nouvelle date ; ", datePicked);
    getTourneesDate();
  }

  /**
   * affiche la liste des differentes commandes presentes dans la tournes (le nom des creches a livrer dans l'ordre )
   */

  /**
   * @type {string}
   */

  function handleDateSearch() {
    getTourneesDate();
    // TODO search tournee for this date GET /Tournee/{date}

    selectedTab = tabs.TourneeDate;
  }
  function handleDefault() {
    // TODO search tournee for this date GET /Tournee/{Date.Now()}
    selectedTab = tabs.TourneeDefault;
    console.log("selectedTab", selectedTab);
  }

  const tabs = {
    TourneeDate: "TourneeDate",
    TourneeDefault: "TourneeDefault",
    TourneeSupplement: "TourneeSupplement",
  };
  function eventHandler(id_tournee) {
    sessionStorage.setItem("idTournee", id_tournee);
    goto(`/tournees/${id_tournee}`);
  }
  let selectedTab = tabs.TourneeDate;

  
  function definirLivreur() {
    // Ici, vous pouvez mettre la logique pour attribuer un livreur
    // Par exemple, vous pouvez ouvrir une boîte de dialogue de sélection de livreur
    // ou effectuer une requête vers le serveur pour attribuer un livreur à une commande.
    
    // Pour cet exemple, nous allons simplement afficher un message dans la console
    console.log("Livreur attribué !");
    
    // Ensuite, mettez à jour l'état
    //isLivreurAttribue = true;
    //livreur = "Nom du livreur attribué";
  }
</script>
<div class="container">
  <Navbar />

  {#if admin}

  <!--TODO au lieu de mettre dans chaque pages, le mettre UNE fois dans le +- main-->
  <div class="centered">
    <div>
      <div>
        <form>
          <input
            type="date"
            name="dateTournee"
            on:change={handleDateChange}
            bind:value={datePicked}
          />
        </form>
      </div>
      <div class="button">
        <!--TODO Button or a:link ??-->
        <button on:click={handleDefault}>Tournées par défaut</button>
      </div>

      <h2>Tournées du {datePicked}</h2>
      
      {#each tournees as tournee (tournee)}
        <!-- warning car il n'aime pas que un div soit clickable, ok si c est un button mais alors il faut modifier CSS-->
        <table
          class="tab-infos"
          on:click={() => eventHandler(tournee.id_tournee)}
        >
          <!-- TODO affihcer la bonne nouvelle page /tournees/id-->
          <div class="left-column">
            <ul class="flex-container">
              <label for="nom"> Tournee : </label>
              <span id="nom"> {tournee.nom}</span>
            </ul>
            <ul class="flex-container">
              <label for="livreur"> Livreur : </label>
              <span id="livreur"> {tournee.prenom_livreur}</span>
            </ul>
          </div>
          <div class="left-column">
            <ul class="flex-container">
              <label for="date"> Date : </label>
              <span id="date"> {tournee.date}</span>
            </ul>
            <ul class="flex-container">
              <label for="statut"> Statut : </label>
              <span id="statut">{tournee.statut}</span>
            </ul>
          </div>
        </table>
      {/each}
    </div>
  </div>
  <button on:click={() => history.back()}>Retour</button>
{:else}
<div class="centered">
  <div>
    

    <h2>Tournées du {datePicked}</h2>
    
    {#each tournees as tournee (tournee)}
      <!-- warning car il n'aime pas que un div soit clickable, ok si c est un button mais alors il faut modifier CSS-->
      <table
        class="tab-infos"
        on:click={() => eventHandler(tournee.id_tournee)}
      >
        <!-- TODO affihcer la bonne nouvelle page /tournees/id-->
        <div class="left-column">
          <ul class="flex-container">
            <label for="nom"> Tournee : </label>
            <span id="nom"> {tournee.nom}</span>
          </ul>
        </div>
        <div class="right-column">
          <div>
              {#if tournee.prenom_livreur}
              <ul class="flex-container">
                <span id="livreur"> Prise par {tournee.nom}</span>
              </ul>  
            {:else}
              <button on:click={definirLivreur} >Prendre</button>
            {/if} 
          </div>
          
        </div>
      </table>
    {/each}
  </div>
</div>
{/if}
</div>

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
