<script>
  import { fly } from "svelte/transition";
  import Modal from "./Modal.svelte";

  export let show = false;
  let modal_show = false;
</script>

{#if show}
  <nav transition:fly={{ x: 250, opacity: 0 }}>
    <p />
    <br />
    <br />
    <a href="/#/card" on:click={(event) => event.preventDefault}>Notificações</a
    >
    <a href="/#/formulario" on:click={(event) => event.preventDefault}
      >Formulário</a
    >
    <br />
    <a href="/#/tabela" on:click={(event) => event.preventDefault}>Tabela</a>
    <br />
    <a href="/#/grafico" on:click={(event) => event.preventDefault}>Gráfico</a>
    <br />
    <a href="/#/formulas" on:click={(event) => event.preventDefault}>Fórmulas</a
    >
    <br />
    <a href="/#/compras" on:click={(event) => event.preventDefault}>Compras</a>
    <br />
    <a href="/#/vendas" on:click={(event) => event.preventDefault}>Vendas</a>
    <br />
    <a href="/#/farmacia" on:click={(event) => event.preventDefault}>Farmácia</a
    >
    <br />
    <a href="/#/estoque" on:click={(event) => event.preventDefault}>Estoque</a>
  </nav>
{/if}

<Modal bind:show={modal_show} />

<style>
  nav {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    padding: 2rem 1rem 0.6rem;
    border-left: 1px solid #aaa;
    background: #fff;
    overflow-y: auto;
    width: 10rem;
    z-index: 0;
  }
</style>
