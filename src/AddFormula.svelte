<script>
  let todos = [];

  function add() {
    todos = [...todos, ""];
  }

  let header = false;
</script>

<div class="page-title">
  <p><br /></p>
  <p>Fórmulas</p>
</div>
{#if header}
  <div class="formula-header">
    <input type="text" /><br />
    <input type="text" /><br />
    <button>Adicionar item</button>
  </div>
{/if}
<div class="top">
  <button class="btn btn-warning" on:click={() => (header = !header)}
    >Nova Fórmula</button
  >
</div>
<div>
  {#each todos as todo, index}
    <select>
      <option>fadsçlkf</option>
      <option>façslkdjfçl</option>
      <option>dfaçlksj</option>
    </select>
    <input bind:value={todos[index]} /><br />
  {/each}
</div>

<style>
  .page-title {
    display: flex;
    width: 100%;
    justify-content: center;
    font-family: Orbitron;
    font-size: x-large;
    margin-top: 4vh;
    margin-bottom: 1vh;
  }
  .top {
    display: flex;
    justify-content: center;
  }
  .formula-header {
    display: flex;
    justify-content: center;
  }
</style>
