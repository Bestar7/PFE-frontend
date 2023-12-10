/**
 * @function
 * @param {number} id_utilisateur 
 * @param {string} nom 
 * @param {string} prenom 
 * @param {string} identifiant 
 * @param {string} password 
 * @param {string} role 
 * @returns {User} - a user.
 */
function createUser(id_utilisateur: number, nom: string, prenom: string, identifiant: string, password: string, role: string,) {
  return {
    id_utilisateur,
    nom,
    prenom,
    identifiant,
    password,
    role
  };
}

interface User {
  id_utilisateur: number,
  nom: string, 
  prenom: string, 
  identifiant: string,
  password: string,
  role: string,
}

export { createUser };
export type { User };