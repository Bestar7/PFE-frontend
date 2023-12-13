// TODO + de test (console.log du contenu du cookie) + que se passe-il si on a plusieurs cookies ??? dans connexion
// TODO use localStorage && sessionStorage
import { writable } from 'svelte/store';

let auth = writable({})

const getAuth = () => {
  return localStorage.getItem("auth") ?? sessionStorage.getItem("auth");
}

const setAuth = (authValue, rememberMe) => {
  auth.set(authValue)
  if (rememberMe)
    localStorage.setItem("auth", authValue)
  else
    sessionStorage.setItem("auth", authValue)
}

const resetAuth = () => {
  auth.set()
  localStorage.removeItem("auth")
  sessionStorage.removeItem("auth")
}

export {getAuth, setAuth, resetAuth, auth}