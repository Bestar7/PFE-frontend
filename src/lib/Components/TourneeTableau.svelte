<script>
  export let tournees;
  export let onSelectOne;
  export let isDefault;
</script>

<table>
  <tbody>
    {#each tournees as tournee}
    <tr on:click={()=>onSelectOne(tournee)} class="tab-infos">
      {#if isDefault}
      <td>{tournee.nom_par_defaut}</td>
      {:else}
      {#if tournee.prenom_livreur==undefined && tournee.nom_livreur==undefined}
      <td>Aucun livreur</td>
      {:else}
      <td>{tournee.prenom_livreur} {tournee.nom_livreur}</td>
      {/if}
      <td>{tournee.date}</td>
      <td>{tournee.nom}</td>
      <td>{tournee.statut}</td>
      {/if}
    </tr>
    {/each}
  </tbody>
</table>

<style>
  .tab-infos {
    border: 1px solid #ddd; /* Ajoute une bordure autour du conteneur */
    padding: 10px; /* Ajoute de l'espace intérieur pour le contenu */
    margin-bottom: 10px;
    background-color: #f2f2f2; /* Ajoute une couleur de fond grise */
    display: flex;
    justify-content: space-between;
    width: 500px;
  }

  table {
    border-collapse: collapse;
    width: 400px;
    margin: 20px;
  }
</style>