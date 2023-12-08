<script>
  import User from "$lib/Components/User.svelte";
  //import { writable } from "svelte/store";

  // TODO : GET /users THEN sort by Admin first then delivery
  const usersTest = [{name:"Admin", role:"admin"},{name:"Tom", role:"delivery"},{name:"Fred", role:"delivery"}]

  //$: obsCookie = document.cookie // TODO update the HTML with changes to the cookie
  //let obsCookie2 = writable(obsCookie)

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

  /** @type {string} */
  let email
  /** @type {string} */
  let password
  /** @type {boolean} */
  let rememberMe // TODO ne marche pas, genre pas un boolean ??
  function submitConnexionForm(){
    console.log("FIELDS : ", email, password, rememberMe)
  }
</script>

<form on:submit|preventDefault={submitConnexionForm}>
  <label for="email">Email</label>
  <input type="email" id="email" bind:value={email} required>

  <label for="password">Mot de passe</label>
  <input type="password" id="password" bind:value={password} required>

  <label for="rememberMe">Se souvenir de moi</label>
  <input type="checkbox" id="rememberMe" bind:value={rememberMe}>

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