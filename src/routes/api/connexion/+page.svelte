<script>
  import {resetAuth, setAuth, authStore} from "$lib/Auth/auth"
  $: auth = $authStore != ""

  function logout(){
    resetAuth()
    history.back()
  }

  /** @type {string} */
  let email
  /** @type {string} */
  let password
  /** @type {boolean} */
  let rememberMe // TODO ne marche pas, genre pas un boolean ??
  function login(){
    setAuth(email)// TODO take the appropriate field
    console.log("FIELDS : ", email, password, rememberMe)
  }
</script>

<form on:submit|preventDefault={login}>
  <label for="email">Email</label>
  <input type="email" id="email" bind:value={email} required>

  <label for="password">Mot de passe</label>
  <input type="password" id="password" bind:value={password} required>

  <label for="rememberMe">Se souvenir de moi</label>
  <input type="checkbox" id="rememberMe" bind:value={rememberMe}>

  <button type="submit">Connexion</button>
</form>

{#if auth} <!--TODO check this cndt (like useState) ex right after connecting-->
  <button on:click={ logout }>Se déconnecter</button>
{/if}
<button on:click={() => history.back() }>Retour</button>