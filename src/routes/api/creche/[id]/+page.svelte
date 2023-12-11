<script>
  import Navbar from "$lib/Components/Navbar.svelte";
  import { onMount } from "svelte";
  import { crecheStore } from "../store";
  import { get } from 'svelte/store'

  // TODO replace with content from GET/creche/defaultOrder (or other name)
  let creche = get(crecheStore)

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
    const data = await (await fetch("")).json()
    console.log("get All", data)
    creche = data.creche
    articles = data.articles
    crecheDefaultOrder = creche.lignes_par_defaut
    
    //listItem = data.lignes_par_defaut
    console.log("listItem", listItem)
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

  <div class="defaultOrder">
    <!--TODO : add liste d'article de commande par défaut via un GET /article-->
    <!--<ItemsStock ListItems={listItem}/>-->
    {#each articles as article}
      <p><!--TODO absolument DEGEULASSE, le backend doit renvoyer le libelle de l'article dans la commande...-->
        {article.libelle} {#if article.taille != undefined}{article.taille}{/if}<br>
        {#each crecheDefaultOrder as orderSQL}
          {#if orderSQL.id_article == article.id_article}{orderSQL.nb_caisse}{/if}
        {/each}
      </p>
    {/each}
  </div><br>



  <div class="cmdBtn">
    <button on:click={onClickSauvegarder} >Sauvegarder</button>
    <button on:click={onClickAnnuler}     >Annuler</button>
    <button on:click={onClickSupprimer}   >Supprimer</button>
  </div>
  
</form>