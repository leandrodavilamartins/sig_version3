<script lang="ts">
  import Tab, { Label } from "@smui/tab";
  import TabBar from "@smui/tab-bar";
  import Button from "@smui/button";

  let active = "Home";

  $: console.log(active);
</script>

<div>
  <!--
    Note: tabs must be unique. (They cannot === each other.)
  -->

  <div class="tabs" style="margin-top: 1em;">
    {#each ["Cobertura", "Repetição de Cio", "Aborto", "Falsa prenhez", "Salta cio"] as tab}
      <Button on:click={() => (active = tab)}><Label>{tab}</Label></Button>
    {/each}
  </div>
</div>

<style>
  .tabs {
    display: flex;
    justify-content: center;
  }
</style>
