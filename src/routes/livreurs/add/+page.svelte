<script>
  import Navbar from "$lib/Components/Navbar.svelte";
  import UserModify from "$lib/Components/UserModify.svelte";
  import UnauthorizedWrapper from "$lib/Components/UnauthorizedWrapper.svelte";
  import { roles } from "$lib/Auth/auth";
  import { host } from '$lib/Api/config';
  import { json as jsonResponse } from '@sveltejs/kit'

  let newUser = {}

  async function createNewUser() {
    newUser.role = newUser.isAdmin ? roles.admin : roles.livreur
    delete newUser.isAdmin
    console.log("okkkk", {...newUser})
    try {
      const reponse = await fetch(`${host}/utilisateurs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newUser
        }),
      })
      if (reponse.ok) {
        const json = await reponse.json();
        return jsonResponse(json)
      } else {
        throw new Error(reponse.statusText);
      }
    } catch (error) {
      console.log("error in /utilisateurs/+server.ts", error) // TODO handle error
      return jsonResponse(null)
    }

    history.back()
  }
</script>

<UnauthorizedWrapper roles={[roles.admin, roles.livreur]}>
<Navbar />
<UserModify btnSendText={"Créer utilisateur"} handleUserSend={createNewUser} userInfo={newUser}/>
</UnauthorizedWrapper>