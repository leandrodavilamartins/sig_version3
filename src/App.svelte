<script>
  import Card from "./Card.svelte";
  import Formulario from "./Formulario.svelte";
  import Router from "svelte-spa-router";
  import Tabela from "./Tabela.svelte";
  import Landing from "./Landing.svelte";

  let isLogged = false;
  let email = "";
  let password = "";

  let res = undefined;
  $: console.log(res);
  $: console.log(email);
  $: console.log(password);

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
    auth.signInWithEmailAndPassword(email, password).then((r) => {
      console.log(r);
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

<main>
  <nav class="navMenu" class:navShow={isLogged == true}>
    <a href="/#/card" on:click={(event) => event.preventDefault}>Recente |</a>
    <a href="/#/formulario" on:click={(event) => event.preventDefault}
      >Formulário |</a
    >
    <a href="/#/tabela" on:click={(event) => event.preventDefault}>Tabela</a>
  </nav>

  {#if isLogged}
    <!--Logout button -->
    <div class="logoutBtn">
      <button class="btn btn-danger" on:click={Logout}>
        &nbsp;&nbsp; Sair &nbsp;&nbsp;</button
      >
    </div>
  {/if}

  {#if isLogged}
    <Router
      routes={{
        "/": Landing,
        "/card": Card,
        "/formulario": Formulario,
        "/tabela": Tabela,
      }}
    />
  {/if}
</main>

{#await promise then}
  {#if res == false}
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
        <button class="btn btn-success" on:click={Login}>Entrar</button>
      </div>
    </div>
  {/if}
{/await}

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
  }
  .logoutBtn {
    display: flex;
    justify-content: right;
    margin-right: 2em;
  }
</style>
