<script>
  export let tournees;
  export let onSelectOne;
  export let isDefault;
  export let deleteOne;
  export let terminerTournee;
  export let prendreTournee;
</script>

<table>
  <tbody>
    {#each tournees as tournee}
  <tr on:click={() => onSelectOne(tournee)} class="tab-infos">
    {#if isDefault}
      <td>{tournee.nom_par_defaut}</td>
    {:else}
      {#if tournee.prenom_livreur == undefined && tournee.nom_livreur == undefined}
        <td>Aucun livreur</td>
      {:else}
        <td>{tournee.prenom_livreur} {tournee.nom_livreur}</td>
      {/if}
      <td>{tournee.date}</td>
      <td>{tournee.nom}</td>
      <td>{tournee.statut}</td>
    {/if}
  </tr>
  <tr>
    <button
      class="x-button"
      on:click={() => deleteOne(tournee.id_tournee_par_defaut ?? tournee.id_tournee)}
    >
      &#10006;
    </button>
    <button
      class="x-button"
      on:click={() => terminerTournee(tournee.id_tournee_par_defaut ?? tournee.id_tournee,tournee.nom)}
    >
      terminer
    </button>
    <button
      class="x-button"
      on:click={() => prendreTournee(tournee.id_tournee_par_defaut ?? tournee.id_tournee)}
    >
      Prendre
    </button>
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
