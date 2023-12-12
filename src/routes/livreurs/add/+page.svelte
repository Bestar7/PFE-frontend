<script>
    import Navbar from "$lib/Components/Navbar.svelte";
    import UserModify from "$lib/Components/UserModify.svelte";

  let newUser = {}

  function createNewUser(){
    //TODO fetch("/...") body = newUser method = POST
    console.log("createNewUser", newUser)
  }
</script>

<Navbar />
<UserModify btnSendText={"Créer utilisateur"} handleUserSend={createNewUser}/>