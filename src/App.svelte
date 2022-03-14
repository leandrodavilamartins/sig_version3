<script>
  import Card from "./Card.svelte";
  import Formulario from "./Formulario.svelte";
  import Router from "svelte-spa-router";
  import Tabela from "./Tabela.svelte";

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
    auth.signOut();
    isLogged = false;
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
    <button on:click={Logout}> Sair </button>
  {/if}

  <Router
    routes={{
      "/card": Card,
      "/formulario": Formulario,
      "/tabela": Tabela,
    }}
  />
</main>

{#await promise then}
  {#if res == false}
    <div class="loginForm">
      <p>Login</p>
      <input
        type="
  email"
        bind:value={email}
      />
      <p>Senha</p>
      <input type="password" bind:value={password} />
    </div>
    <button class="btn btn-success" on:click={Login}>Entrar</button>
    <div />
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
  }
</style>
