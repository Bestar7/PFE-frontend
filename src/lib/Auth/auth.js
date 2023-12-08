// TODO + de test (console.log du contenu du cookie) + que se passe-il si on a plusieurs cookies ??? dans connexion
// TODO use localStorage && sessionStorage
import { writable } from 'svelte/store';
let authStore = writable(document.cookie);

const getAuth = () => {
  return document.cookie
}

/** @param {string} authValue */
const setAuth = (authValue) => {
  document.cookie = `auth=${authValue};`
  authStore.set(authValue)
}

const resetAuth = () => {
  document.cookie = `auth=e ; Max-Age=-99999999;`
  authStore.set("")
}

export {getAuth, setAuth, resetAuth, authStore}