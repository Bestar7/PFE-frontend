<script>
  import User from "$lib/Components/User.svelte";
  import { onMount } from "svelte";

  // TODO : GET /users THEN sort by Admin first then delivery
  const usersTest = [{name:"Admin", role:"admin"},{name:"Tom", role:"delivery"},{name:"Fred", role:"delivery"}]

  function logOut(){
    document.cookie = "auth=e ; Max-Age=-99999999;"// TODO rename?/export (auth) (in User.svelte too)
    history.back()
  }

  /**
   * @param {string} cookiedUser 
   */
   function connect(cookiedUser){ // TODO id instead ? what about admin (not in DB)?
    document.cookie = `auth=${cookiedUser} ;` // TODO rename?/export (auth) (in connexion/+page.svelte too)
    console.log(`Connecting as ${cookiedUser}`, document.cookie)
  }

  function submitConnexionForm(){
    console.log("form submitted") // TODO get values, send value rememberMe ?? cookie=... : void
  }
</script>

<form on:submit={submitConnexionForm}>
  <label for="email">Email</label>
  <input type="email" id="email" required>

  <label for="password">Mot de passe</label>
  <input type="password" id="password" required>

  <label for="rememberMe">Se souvenir de moi</label>
  <input type="checkbox" id="rememberMe">

  <button type="submit">Connexion</button>
</form>

<br><br><br><br>
<div>
  {#each usersTest as user}
    <User {...user} connectAs={() => connect(user.name)}/>
  {/each}
</div><br>

{#if document.cookie != ""} <!--TODO check this cndt (like useState) ex right after connecting-->
  <button on:click={ logOut }>logOut</button>
{/if}
<button on:click={() => history.back() }>Retour</button>
<button on:click={() => console.log(document.cookie) }>COOKIE</button>