<script>
  import { fly } from "svelte/transition";

  export let show = false;
  let modal_show = false;
</script>

{#if show}
  <nav transition:fly={{ x: 250, opacity: 0 }}>
    <p />
    <br />
    <br />
    <br />
    <a href="/#/card" on:click={(event) => event.preventDefault}>Notificações</a
    >
    <a href="/#/tabela" on:click={(event) => event.preventDefault}>Cotações</a>
    <br />
    <a href="/#/formulario" on:click={(event) => event.preventDefault}
      >&nbsp; &nbsp; &nbsp; Formulário</a
    >
    <br />
    <a href="/#/grafico" on:click={(event) => event.preventDefault}
      >&nbsp; &nbsp; &nbsp; Gráfico</a
    >
    <br />
    <a href="/#/formulas" on:click={(event) => event.preventDefault}>Fórmulas</a
    >
    <div>
      <a href="#/addFormula" on:click={(event) => event.preventDefault}
        >&nbsp; &nbsp; &nbsp; &nbsp;Adicionar</a
      ><br />
      <a href="#/addFormula" on:click={(event) => event.preventDefault}
        >&nbsp; &nbsp; &nbsp; &nbsp;Editar</a
      >
    </div>
    <a href="#/financeiro">Financeiro</a>
    <div>
      <a href="/#/compras" on:click={(event) => event.preventDefault}
        >&nbsp; &nbsp; &nbsp; Compras</a
      >
      <br />
      <a href="/#/vendas" on:click={(event) => event.preventDefault}
        >&nbsp; &nbsp; &nbsp; Vendas</a
      >
      <br />
      <a href="/#/despesas" on:click={(event) => event.preventDefault}
        >&nbsp; &nbsp; &nbsp; Despesas</a
      >
      <br />
    </div>
    <a href="/#/farmacia" on:click={(event) => event.preventDefault}>Farmácia</a
    >
    <div>
      <a href="#/addCompraFarmacia ">&nbsp; &nbsp; &nbsp; Compra</a><br />
      <a href="#/addVendaFarmacia">&nbsp; &nbsp; &nbsp; Venda</a>
    </div>
    <a href="#/fabrica">Fábrica</a>
    <div>
      <a href="/#/estoque" on:click={(event) => event.preventDefault}
        >&nbsp; &nbsp; &nbsp; Estoque</a
      >
      <br />
    </div>
    <a href="/#/pendencias" on:click={(event) => event.preventDefault}
      >Pendências</a
    ><br />
    <a href="/#/manejo">Manejo</a>
    <br />
    <div>
      <a href="/#/femeaEntrada">&nbsp; &nbsp; &nbsp; Fêmeas</a>
      <br />
      <a href="/#/reproducao" on:click={(event) => event.preventDefault}
        >&nbsp; &nbsp; &nbsp; Reprodução</a
      >
      <br />
      <a href="/#/reposicao">&nbsp; &nbsp; &nbsp; Reposição</a>
      <br />
      <a href="/#/reprodEntrada">&nbsp; &nbsp; &nbsp; Morte</a>
      <br />
      <a href="/#/reprodEntrada">&nbsp; &nbsp; &nbsp; Descarte</a>
      <br />
      <a href="/#/reprodEntrada">&nbsp; &nbsp; &nbsp; Venda</a>
      <br />
      <a href="/#/reprodEntrada">&nbsp; &nbsp; &nbsp; Cio</a>
      <br />
    </div>
  </nav>
{/if}

<style>
  nav {
    color: whitesmoke;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    padding: 2rem 1rem 0.6rem;
    border-left: 1px solid #151718;
    background: #212529;
    overflow-y: auto;
    width: 10rem;
    z-index: 0;
  }
  a {
    color: whitesmoke;
    font-size: medium;
    font-family: Roboto;
  }
  a:active {
    color: goldenrod;
  }
  a:hover {
    color: gold;
  }
  a:link {
    text-decoration: none;
  }
</style>
