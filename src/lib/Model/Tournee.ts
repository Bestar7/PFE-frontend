/**
 * @function
 * @param {number} id_livreur
 * @param {number} id_tournee
 * @param {string} nom_livreur
 * @param {string} prenom_livreur
 * @param {string} nom
 * @param {string} date 
 * @param {string} statut 
 * @returns {Tournee} - une tournee.
 */
function createTournee(
  id_livreur: number, id_tournee: number,
  nom_livreur: string, prenom_livreur: string,
  nom: string, date: string, statut: string
) {
  return {
    id_livreur,
    id_tournee,
    nom_livreur,
    prenom_livreur,
    nom,
    date,
    statut,
  };
}

interface Tournee {
  id_livreur: number,
  id_tournee: number,
  nom_livreur: string,
  prenom_livreur: string,
  nom: string,
  date: string,
  statut: string,
}

export { createTournee };
export type { Tournee };