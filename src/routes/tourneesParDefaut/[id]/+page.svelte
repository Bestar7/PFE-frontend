<script>
  // Imports
  import Navbar from "$lib/Components/Navbar.svelte";
  import { onMount } from "svelte";
  import { GET } from "../api/tourneesParDefaut/+server";
  import { host } from "$lib/Api/config";
      import { tourneesStore } from "../store";
  
  let ListTourneesParDefaut = [];
  
  onMount(() => {
    getTourneesParDefaut();
  });
  
  
  // Function to fetch tournees par defaut
  async function getTourneesParDefaut() {
    try {
      const response = await fetch("http://localhost:9000/tourneesParDefaut");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const tourneesResponse = await response.json();
  
      ListTourneesParDefaut = tourneesResponse;
      
  
    } catch (error) {
      console.error("Error fetching tournees par defaut:", error.message);
    }
  }
  
    // Function to delete a tournee by ID
    async function deleteTournee(id) {
      try {
        const response = await fetch(`http://localhost:9000/tourneesParDefaut/${id}`, {
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
     window.location.href = `/tourneesParDefaut/${id_tournee_par_defaut}`;
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