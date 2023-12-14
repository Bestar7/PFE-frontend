<script>
  import { onMount } from "svelte";
  import UnauthorizedWrapper from "$lib/Components/UnauthorizedWrapper.svelte";
  import { roles } from "$lib/Auth/auth";
  import Navbar from "$lib/Components/Navbar.svelte";
  import { page } from '$app/stores';
  import UserModify from "$lib/Components/UserModify.svelte";

  const id = $page.params.livreur
  let livreur = {};
  onMount(async () => {
    getLivreur()
  });

  async function getLivreur(){
    livreur = await (await fetch(`/api/utilisateurs/${id}`)).json(); // TODO uncomment when backend endpoint done and open
    console.log("getLivreur", livreur)
  }

  async function onSubmitChangedUser() {
    const response = await fetch(`/api/utilisateurs/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        ...livreur
      })
    });
    console.log("Données soumises :", livreur, response);
  }
</script>

<UnauthorizedWrapper roles={[roles.admin, roles.livreur]}>
<Navbar /><!--TODO au lieu de mettre dans chaque pages, le mettre UNE fois dans le +- main-->
<h1>Hello {livreur.nom}</h1>
<UserModify btnSendText={"Enregistrer les modification"} userInfo={livreur} handleUserSend={onSubmitChangedUser} />
</UnauthorizedWrapper>

