<script>
  export let listItem = []
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
        <td>{item?.libelle} {item.taille ?? ""}</td>
        <td>caisses: {item?.nb_caisses}</td>
        <!--TODO add input inside <tr> and bind value ???
          on:click:Sauvegarder, tout envoyer en POST en bind:value de chaque input-->
        <td>unités : {item?.nb_unites}</td> <!--TODO la meme ici-->
      </tr>
      {/each}
    </tbody>
  </table>
</form>