import { writable } from 'svelte/store';

let roles = {
  admin: "admin",
  livreur: "livreur",
}
let auth = writable({})

const getAuth = () => {
  if (localStorage.getItem("auth") != null){
    console.log("localStorage", localStorage.getItem("auth"))
    return localStorage.getItem("auth")
  }
    
  if (sessionStorage.getItem("auth") != null){
    console.log("sessionStorage", sessionStorage.getItem("auth"))
    return sessionStorage.getItem("auth")
  }
  return null //TODO handle this case (happen right after disconnect)
}

const setAuth = (authValue, rememberMe) => {
  auth.set(authValue)
  if (rememberMe)
    localStorage.setItem("auth", authValue.role)
  else {
    sessionStorage.setItem("auth", authValue.role)
    console.log("sessionStorage", sessionStorage.getItem("auth"))
  }
}

const resetAuth = () => {
  auth.set()
  localStorage.removeItem("auth")
  sessionStorage.removeItem("auth")
}

export {getAuth, setAuth, resetAuth, auth, roles}