<script>
    import Navbar from "$lib/Components/Navbar.svelte";
    import { onMount } from "svelte";
    import { host } from "$lib/Api/config";
    import { goto } from "$app/navigation";

    
    let id_tournee_par_defaut;
    let listCreches =  [];
    let commandesParDefaut = [];
    let tourneeParDefaut;

    // Ajout de commande par défaut dans tournee par defaut
    let newIdCreche;
    let newOrdre;

    //Pop-up
    let isPopupOpen = false;
    const openPopup = () => {
      isPopupOpen = true;
    };
    const closePopup = () => {
      isPopupOpen = false;
    };
    
    onMount(() => {
        getIDTourneeParDefaut(),
        getCrechesTourneesParDefaut(id_tournee_par_defaut),
        getTourneeParDefaut(id_tournee_par_defaut)
    })

    async function getCrechesTourneesParDefaut(id_tournee_par_defaut) {
    try {
      const response = await fetch(`${host}/commandesParDefaut/tourneeParDefaut/${id_tournee_par_defaut}`);
      const data = await response.json();
      console.log(data); // Handle the fetched data as needed
      commandesParDefaut = data;
      listCreches = data.map(item => item.creche);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

    async function getIDTourneeParDefaut(){
        const currentUrl = window.location.href;
        const idTourneeParDefaut = currentUrl.split('/').pop();
        // console.log(idTourneeParDefaut);
        id_tournee_par_defaut = idTourneeParDefaut;
    }

    async function getTourneeParDefaut(idTourneeParDefaut){
        try {
      const response = await fetch(`${host}/tourneesParDefaut/${idTourneeParDefaut}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      tourneeParDefaut = await response.json();

      console.log("Tournee Par Defaut:", tourneeParDefaut);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
    }
    
    async function deleteCommandeParDefaut(id) {
    try {
      const response = await fetch(`${host}/commandesParDefaut/${id}`, {
        method: 'DELETE',
      });

      console.log("Response : " + response);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log(`Tournee with ID ${id} deleted successfully.`);
      
      // Refresh the creche list after deletion
      getCrechesTourneesParDefaut(id_tournee_par_defaut);
    } catch (error) {
      console.error(`Error deleting tournee with ID ${id}:`, error.message);
    }
  }
  

    async function addCommandeParDefaut(new_id_creche, new_ordre) {
    try {
      const response = await fetch(`http://localhost:9000/commandesParDefaut/tourneeParDefaut/${id_tournee_par_defaut}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id_creche: new_id_creche,
          ordre: new_ordre
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log("Request successful!");
      newIdCreche=null;
      newOrdre=null;
      getCrechesTourneesParDefaut(id_tournee_par_defaut);
      // You can handle the response data here if needed.
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

</script>

<Navbar/>

<h1> Tournée par défaut : {#if tourneeParDefaut}{tourneeParDefaut.nom_par_defaut}{/if}</h1>


{#each commandesParDefaut as commande (commande)}
<table class="tab-infos">
  <div class="left-column" on:click={() =>goto(`/commandesParDefaut/${commande.id_commande_par_defaut}`)}>
    <ul class="flex-container">
      <span id="nom"> {commande.creche.nom}</span>
    </ul>
  </div>
    <tbody>
        <tr>
            <td>
              <button class="x-button" on:click={() => deleteCommandeParDefaut(commande.creche.id_creche)}>
                &#10006;
              </button>
            </td>
        </tr>
    </tbody>
  </table>
  {/each}
  
  <button on:click={openPopup}>Ajouter</button>

  {#if isPopupOpen}

    <div class="overlay" on:click={closePopup}></div>
    <div class="popup">

      <form>
        <label for="newIdCreche">ID Crèche:</label>
        <input type="number" id="newIdCreche" bind:value={newIdCreche} />
        <label for="newOrdre">Ordre:</label>
        <input type="number" id="newOrdre" bind:value={newOrdre} />
      </form>

        <button on:click={() => {
            addCommandeParDefaut(newIdCreche,newOrdre),
            closePopup()
        }}>Sauvegarder</button>
        <button on:click={closePopup}>Annuler</button>
    </div>
  
  {/if}

  <style>
    /* This is the style section where you can define the button's appearance */
    .x-button {
      cursor: pointer;
      font-size: 24px;
      color: red; /* You can customize the color */
      background: none;
      border: none;
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
  </style>