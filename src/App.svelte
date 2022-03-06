<script>
  import Card from "./Card.svelte";
  import Formulario from "./Formulario.svelte";
  import Router from "svelte-spa-router";
</script>

<main>
  <nav>
    <a href="/#/card" on:click={(event) => event.preventDefault}>Cotação |</a>
    <a href="/#/formulario" on:click={(event) => event.preventDefault}
      >Formulário</a
    >
  </nav>

  <Router
    routes={{
      "/card": Card,
      "/formulario": Formulario,
    }}
  />
</main>

<style>
</style>
