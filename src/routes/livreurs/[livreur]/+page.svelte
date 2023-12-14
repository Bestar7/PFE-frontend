<script>
  import { onMount } from "svelte";
  import UnauthorizedWrapper from "$lib/Components/UnauthorizedWrapper.svelte";
  import { roles } from "$lib/Auth/auth";
  import Navbar from "$lib/Components/Navbar.svelte";
  import { page } from '$app/stores';
  import UserModify from "$lib/Components/UserModify.svelte";

  let livreurInfo = {}
  const id = $page.params.livreur
  onMount(async () => {
    getLivreurInfo()
  });

  async function getLivreurInfo(){
    //livreurs = (await fetch(`/api/livreurs/${id}`)).json(); // TODO uncomment when backend endpoint done and open
  }

  function onSubmitChangedUser() {
    //TODO fetch("/...") body = livreurInfo method = PUT/PATCH
    console.log("Données soumises :", livreurInfo);
  }
</script>

<UnauthorizedWrapper roles={[roles.admin, roles.livreur]}>
<Navbar /><!--TODO au lieu de mettre dans chaque pages, le mettre UNE fois dans le +- main-->
<UserModify btnSendText={"Enregistrer les modification"} userInfo={livreurInfo} handleUserSend={onSubmitChangedUser} />
</UnauthorizedWrapper>