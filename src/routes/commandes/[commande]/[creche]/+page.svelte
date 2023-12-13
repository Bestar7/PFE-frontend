<script>
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import Navbar from "$lib/Components/Navbar.svelte";
  import Order from "$lib/Components/Order.svelte";
  import UnauthorizedWrapper from "$lib/Components/UnauthorizedWrapper.svelte";
  import { roles } from "$lib/Auth/auth";

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

<UnauthorizedWrapper roles={[roles.admin, roles.livreur]}>
<Navbar />
<div class="container">
  <Order {listItem}/>
</div>
</UnauthorizedWrapper>