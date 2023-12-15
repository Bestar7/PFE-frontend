<script>
    // Imports
    import Navbar from "$lib/Components/Navbar.svelte";
    import { onMount } from "svelte";
    import { GET } from "../api/tourneesParDefaut/+server";
    import { host } from "$lib/Api/config";
    import { tourneesStore } from "../store";
    import { goto } from "$app/navigation";
    
    
    let ListTourneesParDefaut = [[]];
    let newTourneeParDefaut;
    let i = 1;
    

    //Pop-up
    let isPopupOpen = false;
    const openPopup = () => {
      isPopupOpen = true;
    };
    const closePopup = () => {
      isPopupOpen = false;
    };



    onMount(() => {
      getTourneesParDefaut();
    });
    
    
    // Function to fetch tournees par defaut
    async function getTourneesParDefaut() {
      try {
        const response = await fetch(`${host}/tourneesParDefaut`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const tourneesResponse = await response.json();
    
        ListTourneesParDefaut = tourneesResponse;
        console.log("Tournees pas defaut : " + ListTourneesParDefaut)
    
      } catch (error) {
        console.error("Error fetching tournees par defaut:", error.message);
      }
    }
    
      // Function to delete a tournee by ID
      async function deleteTournee(id) {
        try {
          const response = await fetch(`${host}/tourneesParDefaut/${id}`, {
            method: 'DELETE',
          });
    
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
    
          console.log(`Tournee with ID ${id} deleted successfully.`);
          // Refresh the tournees list after deletion
          getTourneesParDefaut();
        } catch (error) {
          console.error(`Error deleting tournee with ID ${id}:`, error.message);
        }
      }
    
      function eventHandler(id_tournee_par_defaut) {
        console.log(id_tournee_par_defaut);
       goto(`/tourneesParDefaut/${id_tournee_par_defaut}`);
      }


      async function addTourneeParDefaut(nomParDefaut) {
      try {
        const response = await fetch(`${host}/tourneesParDefaut`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            nom_par_defaut: nomParDefaut
          })
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        console.log("Request successful!");
        newTourneeParDefaut=null;
        getTourneesParDefaut();
        // You can handle the response data here if needed.
      } catch (error) {
        console.error("Error:", error.message);
      }
    }
    
    
    // Lifecycle hook to fetch data when the component is mounted

    </script>
    <Navbar/>
    
    <h1> Tournees par défauts </h1>
    
    {#each ListTourneesParDefaut as tourneeParDefaut (tourneeParDefaut)}
    <table class="tab-infos">
      <div class="left-column" on:click={() =>eventHandler(tourneeParDefaut.id_tournee_par_defaut)}>
        <ul class="flex-container">
          <span id="nom"> {tourneeParDefaut.nom_par_defaut}</span>
        </ul>
      </div>
        <tbody>
            <tr>
                <td>
                  <button class="x-button" on:click={deleteTournee(tourneeParDefaut.id_tournee_par_defaut)}>
                    &#10006;
                  </button>
                </td>
            </tr>
          <!-- Add more rows as needed -->
        </tbody>
      </table>
      {/each}

      <button on:click={openPopup}>Ajouter</button>

      {#if isPopupOpen}

        <div class="overlay" on:click={closePopup}></div>
        <div class="popup">

          <form>
            <label for="nomTournee">Nom Tournee:</label>
            <input type="text" id="nomTournee" bind:value={newTourneeParDefaut} />
          </form>

            <button on:click={() => {
                addTourneeParDefaut(newTourneeParDefaut),
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
      
      <!-- This is the markup section where you define the button's HTML structure -->