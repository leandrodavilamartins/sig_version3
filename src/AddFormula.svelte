<script>
  let todos = [];
  let showButton = true;
  let showForm = false;

  function add() {
    todos = [...todos, ""];
  }

  let header = false;
</script>

<div class="page-title">
  <p><br /></p>
  <p>Fórmulas</p>
</div>
<div class="formula-header">
  <input class="header-input" type="text" placeholder="Nome da Fórmula" /><br />
  <input class="header-input" type="date" /><br />
  {#if showButton}
    <div class="header-button">
      <button
        class="btn btn-warning"
        on:click={() => (showForm = true)}
        on:click={() => (showButton = false)}>Criar</button
      >
    </div>
  {/if}
</div>
{#if showForm}
  <div class="container">
    <p>&nbsp;</p>
    {#each todos as todo, index}
      <div class="addForm">
        <input
          class="item-input"
          bind:value={todos[index]}
          placeholder="Matéria-prima"
        />
        <input
          class="item-input"
          bind:value={todos[index]}
          placeholder="Quantidade (kg)"
        />
        <input
          class="item-input"
          bind:value={todos[index]}
          placeholder="Classe"
        /><br />
        <button class="btn btn-danger" id="removeButton">X</button>
      </div>
    {/each}
    <br />
    <div id="addButton">
      <button class="btn btn-warning" on:click={add}>Adicionar</button>
    </div>
  </div>
{/if}

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

  .formula-header {
    display: flex;
    justify-content: center;
  }
  .header-input {
    margin-left: 2px;
    margin-right: 2px;
  }
  .addForm {
    display: flex;
    justify-content: center;
    margin-bottom: 2vh;
  }
  .item-input {
    margin-left: 3px;
    margin-right: 3px;
    background-color: #212529;
    color: whitesmoke;
  }
  #addButton {
    display: flex;
    justify-content: center;
  }

  #removeButton {
    font-family: Orbitron;
    font-weight: bolder;
  }
</style>
