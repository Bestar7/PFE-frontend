<script>
  export let commandes;
  export let ouvrirDetailsCreche;
  export let supprimerCreche;
  export let livrerCreche;
</script>

<table>
  <tbody>
    {#each commandes as commande}
      <tr>
        <td>
          <button class="ligne-creche bouton-creche" on:click={() => ouvrirDetailsCreche(commande.id_commande, commande.creche.id_creche)}>
            Creche: {commande.creche.nom}{commande.statut ? "- Statut: "+commande.statut : ""}
          </button>
        </td>
        <td>
          <button class="bouton-creche" on:click={() => supprimerCreche(commande.id_commande)}>
            &#10006;
          </button>
          <button class="bouton-creche" on:click={() => livrerCreche(commande.id_commande)}>
            Livrer
          </button>
        </td>
      </tr>
    {/each}
  </tbody>
</table>

<style>
  .ligne-creche {
    cursor: pointer;
    background-color: #f2f2f2;
    padding: 10px;
    margin-bottom: 5px;
  }

  .bouton-creche {
    color: black;
    background-color: #f2f2f2;

    border: none;
    cursor: pointer;
  }
</style>