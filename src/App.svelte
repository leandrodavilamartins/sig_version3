<script>
  import Card from "./Card.svelte";
  import Formulario from "./Formulario.svelte";
  import Router from "svelte-spa-router";
  import Tabela from "./Tabela.svelte";
  import Landing from "./Landing.svelte";
  import Navbar from "./Navbar.svelte";
  import Grafico from "./Grafico.svelte";

  let isLogged = false;
  let email = "";
  let password = "";
  let loginError = false;

  let res = undefined;
  $: console.log(res);
  $: console.log(email);
  $: console.log(password);
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

<Navbar logState={isLogged} on:logout={Logout} />
<!--the state of the 'Sair' button is passed as a prop -->
<main>
  <nav class="navMenu" class:navShow={isLogged == true}>
    <a href="/#/card" on:click={(event) => event.preventDefault}
      >Notificações |</a
    >
    <a href="/#/formulario" on:click={(event) => event.preventDefault}
      >Formulário |</a
    >
    <a href="/#/tabela" on:click={(event) => event.preventDefault}>Tabela |</a>
    <a href="/#/grafico" on:click={(event) => event.preventDefault}>Gráfico </a>
  </nav>

  {#if isLogged}
    <Router
      routes={{
        "/": Landing,
        "/card": Card,
        "/formulario": Formulario,
        "/tabela": Tabela,
        "/grafico": Grafico,
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
        />
      </div>
      <div>
        <p>Senha</p>
        <input type="password" bind:value={password} />
      </div>
      <div class="loginBtn">
        <p>&nbsp;</p>
        <button class="btn btn-warning" on:click={Login}>Entrar</button>
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
  .navMenu {
    display: none;
    justify-content: center;
  }
  .navShow {
    display: flex;
  }
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
</style>
