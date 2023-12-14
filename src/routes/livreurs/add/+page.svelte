<script>
  import Navbar from "$lib/Components/Navbar.svelte";
  import UserModify from "$lib/Components/UserModify.svelte";
  import UnauthorizedWrapper from "$lib/Components/UnauthorizedWrapper.svelte";
  import { roles } from "$lib/Auth/auth";

  let newUser = {}

  function createNewUser(){
    //TODO fetch("/...") body = newUser method = POST
    console.log("createNewUser", newUser)
  }
</script>

<UnauthorizedWrapper roles={[roles.admin, roles.livreur]}>
<Navbar />
<UserModify btnSendText={"Créer utilisateur"} handleUserSend={createNewUser}/>
</UnauthorizedWrapper>