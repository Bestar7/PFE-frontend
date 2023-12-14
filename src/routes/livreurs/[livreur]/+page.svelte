<script>
  import { onMount } from "svelte";
  import UnauthorizedWrapper from "$lib/Components/UnauthorizedWrapper.svelte";
  import { roles } from "$lib/Auth/auth";
  import Navbar from "$lib/Components/Navbar.svelte";
  import { page } from '$app/stores';
  import UserModify from "$lib/Components/UserModify.svelte";
  import { host } from "$lib/Api/config";

  let livreurInfo = {}
  const id = $page.params.livreur
  let livreur = {};
  onMount(async () => {
    getLivreur()
  });

  /*
  async function getLivreurInfo(){
    livreurs = (await fetch(`/api/livreurs/${id}`)).json(); // TODO uncomment when backend endpoint done and open
  }
  */

  async function getLivreur(){
    try {
      // Make a GET request to the backend API
      const response = await fetch(`${host}/utilisateurs/${id}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Parse the JSON response
      livreur = await response.json();
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  function onSubmitChangedUser() {
    //TODO fetch("/...") body = livreurInfo method = PUT/PATCH
    console.log("Données soumises :", livreurInfo);
  }
</script>

<UnauthorizedWrapper roles={[roles.admin, roles.livreur]}>
<Navbar /><!--TODO au lieu de mettre dans chaque pages, le mettre UNE fois dans le +- main-->
<h1>Hello {livreur.nom}</h1>
<UserModify btnSendText={"Enregistrer les modification"} userInfo={livreurInfo} handleUserSend={onSubmitChangedUser} />
</UnauthorizedWrapper>

