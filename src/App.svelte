<script>
  import Card from "./Card.svelte";
  import Formulario from "./Formulario.svelte";
  import Router from "svelte-spa-router";
  import Tabela from "./Tabela.svelte";
  import Landing from "./Landing.svelte";
  import Navbar from "./Navbar.svelte";
  import Grafico from "./Grafico.svelte";
  import Sidebar from "./Sidebar.svelte";
  import Formulas from "./Formulas.svelte";
  import Compras from "./Compras.svelte";
  import Vendas from "./Vendas.svelte";
  import Farmacia from "./Farmacia.svelte";
  import Estoque from "./Estoque.svelte";
  import Despesas from "./Despesas.svelte";
  import AddFormula from "./AddFormula.svelte";
  import Pendencias from "./Pendencias.svelte";
  import Reproducao from "./Reproducao.svelte";

  let sidebar_show = false;
  let isLogged = false;
  let email = "";
  let password = "";
  let loginError = false;

  let res = undefined;
  //$: console.log(res);
  //$: console.log(email);
  //$: console.log(password);
  $: console.log(loginError);
  $: if (isLogged) {
    loginError = false;
  }

  async function authenticationState() {
    auth.onAuthStateChanged((user) => {
      if (user == null) {
        //alert("Usuário não logado");
        res = false;
      } else {
        isLogged = true;
        res = true;
      }
    });
    return res;
  }

  function Login() {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((r) => {
        console.log(r);
      })
      .catch((err) => {
        loginError = true;
      });
  }

  function Logout() {
    auth.signOut().then((r) => {
      window.location.replace("localhost:8080"); // It doesn't work
    });
    return (isLogged = false);
  }

  let promise = authenticationState();
</script>

{#if isLogged}
  <!--the sidebar only shows when logged in -->
  <!-- <button on:click={() => (sidebar_show = !sidebar_show)}>Toggle Sidebar</button> -->
  <Sidebar
    bind:show={sidebar_show}
    on:click={() => (sidebar_show = !sidebar_show)}
  />
{/if}

<Navbar
  logState={isLogged}
  on:logout={Logout}
  on:toggleSidebar={() => (sidebar_show = !sidebar_show)}
/>
<!--the state of the 'Sair' button is passed as a prop -->
<!-- old nav router -->
<main>
  <!--   <div class="flex-container">
    <nav class="navMenu" class:navShow={isLogged == true}>
      <a href="/#/card" on:click={(event) => event.preventDefault}
        >Notificações |</a
      >
      <a href="/#/formulario" on:click={(event) => event.preventDefault}
        >Formulário |</a
      >
      <a href="/#/tabela" on:click={(event) => event.preventDefault}>Tabela |</a
      >
      <a href="/#/grafico" on:click={(event) => event.preventDefault}
        >Gráfico
      </a>
    </nav>
  </div> -->

  {#if isLogged}
    <Router
      routes={{
        "/": Landing,
        "/card": Card,
        "/formulario": Formulario,
        "/tabela": Tabela,
        "/grafico": Grafico,
        "/formulas": Formulas,
        "/compras": Compras,
        "/vendas": Vendas,
        "/farmacia": Farmacia,
        "/estoque": Estoque,
        "/despesas": Despesas,
        "/addFormula": AddFormula,
        "/pendencias": Pendencias,
        "/reproducao": Reproducao,
      }}
    />
  {/if}
</main>

{#await promise then}
  {#if res == false}
    <div>
      <p>&nbsp;</p>
      <p>&nbsp;</p>
      <p>&nbsp;</p>
    </div>
    <div class="loginForm">
      <div>
        <p>Login</p>
        <input
          type="
  email"
          bind:value={email}
          class="form-control"
        />
      </div>
      <div>
        <p>Senha</p>
        <input type="password" bind:value={password} class="form-control" />
      </div>
      <div class="loginBtn">
        <p>&nbsp;</p>
        <button class="btn btn-warning" on:click={Login}
          >&nbsp;&nbsp; Entrar &nbsp;&nbsp;</button
        >
      </div>
    </div>
  {/if}
{/await}

{#if loginError}
  <div class="failedLogin">
    <p>Login e/ou senha inválidos</p>
  </div>
{/if}

<style>
  /*  .flex-container {
    display: flex;
    flex-direction: column;
  }
  .navMenu {
    display: none;
    justify-content: center;
  }
  .navShow {
    display: flex;
  } */
  .loginForm {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    font-family: Roboto;
  }

  .failedLogin {
    display: flex;
    justify-content: center;
    color: red;
  }
  .form-control {
    background-color: #212529;
    color: whitesmoke;
  }
</style>
