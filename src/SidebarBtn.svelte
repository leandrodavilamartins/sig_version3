<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  function toggleSidebar() {
    dispatch("toggleSidebar");
  }
</script>

<button class="btn btn-primary" on:click={toggleSidebar}>Menu</button>

<style>
</style>
