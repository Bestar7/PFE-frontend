<script>
  export let listItem = [{}]
  export let saveChanges = ()=>{ console.log("Order.svelte requires a saveChanges function") }
</script>

<form class="order">
  <table>
    <thead>
      <th>libellé</th>
      <th>caisses</th>
      <th>unités</th>
    </thead>
    <tbody>
      {#each listItem as item}
      <tr>
        <td><input type="text" bind:value={item.libelle}><input type="text"  bind:value={item.taille}></td>
        <td>caisses: <input type="number" bind:value={item.nb_caisses}></td>
        <td>unités : <input type="number" bind:value={item.nb_unites}></td>
      </tr>
      {/each}
      <button on:click={saveChanges(listItem)}>Sauvegarder</button>
    </tbody>
  </table>
</form>