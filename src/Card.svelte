<script>
  import { produto } from "./store";
</script>

{#each $produto as item}
  <div class="card">
    <p>Item: &nbsp;</p>
    <p>{item.nome}</p>
    <p>&nbsp;Preço: &nbsp;</p>
    <p>{item.preço}</p>
  </div>
{/each}

<style>
  .card {
    display: flex;
    align-items: center;
  }
</style>
