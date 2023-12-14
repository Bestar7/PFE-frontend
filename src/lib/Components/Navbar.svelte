<style>
  /* Existing styles */

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1em;
    background: var(--bg-2);
    border-radius: var(--border-radius);
    margin: 0 0 1em 0;
  }

  nav a {
    text-decoration: none;
    color: var(--fg-1);
    margin: 0 1em;
  }

  .dropdown {
    position: relative;
    display: inline-block;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    background-color: var(--bg-2);
    min-width: 160px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    z-index: 1;
  }

  .dropdown:hover .dropdown-content {
    display: block;
  }

  .dropdown-content a {
    color: var(--fg-1);
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }

  @media (max-width: 768px) {
    nav {
      flex-wrap: wrap;
    }

    nav a {
      margin: 0.5em 1em;
      flex: 1 0 45%; /* Adjust the flex property based on your design */
    }

    .dropdown {
      display: block;
      width: 100%;
      margin: 0.5em 1em;
    }

    .dropdown-content {
      width: 100%;
    }
  }
</style>

<nav>
  <a href="/tournees">Tournee</a>

  <div class="dropdown">
    <span>Plus</span>
    <div class="dropdown-content">
      <a href="/creches">Creches</a>
      <a href="/connexion">Connexion</a>
      <a href="/livreurs">Livreurs</a>
      <a href="/supplements">Supplements</a>
    </div>
  </div>
</nav>
