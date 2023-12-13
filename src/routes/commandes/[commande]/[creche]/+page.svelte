<script>
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import Navbar from "$lib/Components/Navbar.svelte";
  import Order from "$lib/Components/Order.svelte";

  const idCommande = $page.params.commande;
  const idCreche = $page.params.creche;
  let listItem = [{}]

  onMount(async ()=>{
    await getOneOrder(idCommande)
    console.log("cleanListItem", listItem)
  })

  async function getOneOrder(idCommande){// TODO separer les infos normal et lignes_par_defaut
    const response = await (await fetch(`/api/commandes/${idCommande}`)).json()
    console.log("getOneOrder", listItem)
    listItem = response.lignes_commande
  }
</script>

<Navbar />
<div class="container">
  <Order {listItem}/>
</div>