<script>
  import Navbar from "$lib/Components/Navbar.svelte";
  import { onMount } from "svelte";
  import { crecheStore } from "../store";
  import { get } from 'svelte/store'

  // TODO replace with content from GET/creche/defaultOrder (or other name)
  let creche = get(crecheStore)

  let crecheId = creche.id_creche;
  let crecheName = creche.nom;
  let crecheCity = creche.ville;
  let crecheStreet = creche.rue;

  let listItem = []
  onMount(()=>{
    // TODO GET all info from creche (-> lazy loading)
    getAllCrecheInfo()
  })

  let articles = []
  let crecheDefaultOrder = []
  async function getAllCrecheInfo(){// TODO separer les infos normal et lignes_par_defaut
    const data = await (await fetch(`/api/creche/${crecheId}`)).json()
    console.log("get All", data)
    listItem = data.lignes_par_defaut
  }

  function onClickSauvegarder(){
    // TODO PUT (modify) requeste or POST (create)
    // THEN
    history.back();
  }

  function onClickAnnuler(){
    history.back();
  }

  function onClickSupprimer(){
    // TODO recup l'id de la creche et supprimer via requete
    // THEN
    history.back();
  }
</script>


<Navbar /> <!--TODO au lieu de mettre dans chaque pages, le mettre UNE fois dans le +- main-->
<form>
  <div class="administrative">
    <label for="crecheName">Nom de la crèche</label><br>
    <input type="text" placeholder="Les p'tits Choux" bind:value={crecheName} id="crecheName" required><br>

    <label for="crecheCity">Ville</label><br>
    <input type="text" placeholder="Leuven" bind:value={crecheCity} id="crecheCity" required><br>

    <label for="crecheStreet">Rue</label><br>
    <input type="text" placeholder="rue des champs, 12" bind:value={crecheStreet} id="crecheStreet" required><br>
  </div><br>

  <form class="defaultOrder">
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
          <td>{item.article.libelle}</td>
          <td>{item.article.taille == undefined ? '' : item.article.taille}</td>
          <td>{item.nb_caisses}</td>
          <!--TODO add input inside <tr> and bind value ???
            on:click:Sauvegarder, tout envoyer en POST en bind:value de chaque input-->
          <td>{item.nb_unites}</td> <!--TODO la meme ici-->
        </tr>
        {/each}
      </tbody>
    </table>
  </form><br>

  <div class="cmdBtn">
    <button on:click={onClickSauvegarder} >Sauvegarder</button>
    <button on:click={onClickAnnuler}     >Annuler</button>
    <button on:click={onClickSupprimer}   >Supprimer</button>
  </div>
  
</form>