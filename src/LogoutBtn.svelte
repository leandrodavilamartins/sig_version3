<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  function logout() {
    dispatch("logout");
  }
</script>

<div>
  <button class="btn btn-primary" on:click={logout}>&nbsp;Sair&nbsp;</button>
</div>
