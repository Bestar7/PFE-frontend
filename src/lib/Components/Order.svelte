<script>
  export let listItem = []
</script>

<form class="order">
  <table>
    <thead>
      <th>libellé</th>
      <th>taille</th>
      <th>caisses</th>
      <th>unités</th>
    </thead>
    <tbody>
      {#each listItem as item}
      <tr>
        <td>{item?.article?.libelle}</td>
        <td>{item?.article?.taille == undefined ? '' : item?.article?.taille}</td>
        <td>{item?.nb_caisses}</td>
        <!--TODO add input inside <tr> and bind value ???
          on:click:Sauvegarder, tout envoyer en POST en bind:value de chaque input-->
        <td>{item.nb_unites}</td> <!--TODO la meme ici-->
      </tr>
      {/each}
    </tbody>
  </table>
</form>