/**
 * @function
 * @param {number} id_article 
 * @param {string} libelle 
 * @param {string} taille 
 * @param {number} pourcentage 
 * @returns {Article} - an article.
 */
function createArticle(id_article: number, libelle: string, taille: string, pourcentage: number) {
  return {
    id_article,
    libelle,
    taille,
    pourcentage,
  };
}

interface Article {
  id_article: number,
  libelle: string, 
  taille: string, 
  pourcentage: number,
}

export { createArticle };
export type { Article };