/**
 * @function
 * @param {number} id_livreur 
 * @param {string} nom 
 * @param {string} date 
 * @param {number} statut 
 * @returns {Tournee} - une tournee.
 */
function createTournee(id_livreur: number, nom: string, date: string, statut: string) {
  return {
    id_livreur,
    nom,
    date,
    statut,
  };
}

interface Tournee {
  id_livreur: number,
  nom: string, 
  date: string, 
  statut: string,
}

export { createTournee };
export type { Tournee };