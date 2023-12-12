<script>
  export let btnSendText;
  export let handleUserSend;
  export let userInfo = {};

  // TODO si on modifie un utilisateur, recup les info dans +page et les donner en param ici (via export let...)
</script>

<form on:submit|preventDefault={handleUserSend}>
  <label>
    Nom : <input type="text" bind:value={userInfo.lastname} required>
  </label>

  <label>
    Prénom : <input type="text" bind:value={userInfo.firstname} required>
  </label>

  <label>
    Login : <input type="text" bind:value={userInfo.login} required>
  </label>
  <label>

    Mot de passe : <input type="password" bind:value={userInfo.password} required>
  </label>

  <label>
    admin : 
    <input type="radio" bind:group={userInfo.isAdmin} value={true} />  Oui 
    <input type="radio" bind:group={userInfo.isAdmin} value={false} /> Non<!--TODO this one MUST be checked by default and working-->
  </label>
  
  <input type="submit" value={btnSendText}>
</form>