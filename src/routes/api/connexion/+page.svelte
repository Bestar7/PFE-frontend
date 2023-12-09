<script>
  import {resetAuth, setAuth, authStore} from "$lib/Auth/auth"
  import Navbar from "$lib/Components/Navbar.svelte";
  $: auth = ($authStore != "")

  function logout(){
    resetAuth()
    history.back()
  }

  /** @type {string} */
  let email
  /** @type {string} */
  let password
  /** @type {boolean} */
  let rememberMe = false // TODO : true => localStorage / false => sessionStorage
  function login(){
    setAuth(email)// TODO take the appropriate field
    console.log("FIELDS : ", email, password, rememberMe)
  }
</script>

<Navbar /> <!--TODO au lieu de mettre dans chaque pages, le mettre UNE fois dans le +- main-->
<form on:submit|preventDefault={login}>
  <label for="email">Email</label>
  <input type="email" id="email" bind:value={email} required>

  <label for="password">Mot de passe</label>
  <input type="password" id="password" bind:value={password} required>

  <label for="rememberMe">Se souvenir de moi</label>
  <input type="checkbox" id="rememberMe" bind:checked={rememberMe}>

  <button type="submit">Connexion</button>
</form>

{#if auth}
  <button on:click={ logout }>Se déconnecter</button>
{/if}
<button on:click={() => history.back() }>Retour</button>