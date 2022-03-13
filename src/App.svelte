<script>
  import Card from "./Card.svelte";
  import Formulario from "./Formulario.svelte";
  import Router from "svelte-spa-router";
  import Tabela from "./Tabela.svelte";
</script>

<main>
  <nav>
    <a href="/#/card" on:click={(event) => event.preventDefault}>Recentes |</a>
    <a href="/#/formulario" on:click={(event) => event.preventDefault}
      >Formulário |</a
    >
    <a href="/#/tabela" on:click={(event) => event.preventDefault}>Tabela</a>
  </nav>

  <Router
    routes={{
      "/card": Card,
      "/formulario": Formulario,
      "/tabela": Tabela,
    }}
  />
</main>

<style>
  nav {
    display: flex;
    justify-content: center;
  }
</style>
