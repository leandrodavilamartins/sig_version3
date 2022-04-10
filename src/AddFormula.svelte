<script>
  import SegmentedButton, { Segment } from "@smui/segmented-button";
  import { Label } from "@smui/common";

  let choices = ["Mistura", "Fórmula"];
  let selected = "Mistura";

  let todos = [];
  let showButton = true;
  let showForm = false;
  let quantidade = [];
  let classe = [];
  let showOptions = false;

  function add() {
    todos = [...todos, ""];
  }
  function removeSelf(index) {
    todos = [...todos.slice(0, index), ...todos.slice(index + 1)];
    quantidade = [...quantidade.slice(0, index), ...todos.slice(index + 1)];
    classe = [...classe.slice(0, index), ...classe.slice(index + 1)];
  }

  let header = false;
  $: console.log(quantidade);
  $: console.log(classe);
  $: console.log(selected);
</script>

<div class="page-title">
  <p><br /></p>
  <p>Fórmulas</p>
</div>
<div class="formula-header">
  <input class="header-input" type="text" placeholder="Nome da Fórmula" /><br />
  <input class="header-input" type="date" placeholder="escolher data" /><br />
  {#if showButton}
    <div class="header-button">
      <button
        class="btn btn-warning"
        on:click={() => (showForm = true)}
        on:click={() => (showOptions = true)}
        on:click={() => (showButton = false)}>Criar</button
      >
    </div>
  {/if}
</div>

<!--This is the options segment-->
<div>
  {#if showOptions}
    <div class="options">
      <SegmentedButton
        segments={choices}
        let:segment
        singleSelect
        bind:selected
      >
        <!-- Note: the `segment` property is required! -->
        <Segment {segment}>
          <Label>{segment}</Label>
        </Segment>
      </SegmentedButton>
    </div>
  {/if}
</div>

<!--formulário de mistura -->
{#if selected == "Mistura"}
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
          bind:value={quantidade[index]}
          placeholder="Quantidade (kg)"
        />
        <select bind:value={classe[index]} class="item-input">
          <option class="optionMedication">Medicação</option>
          <option>Aminoácido</option>
          <option>Macronutriente</option>
        </select>
        <br />
        <button
          class="btn btn-danger"
          id="removeButton"
          on:click={() => removeSelf(index)}>X</button
        >
      </div>
    {/each}
    <br />
    <div id="addButton">
      <button class="btn btn-warning" on:click={add}>Adicionar</button>
    </div>
  </div>
{/if}

<!--formulário de fórmula -->
{#if selected == "Fórmula"}
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
          bind:value={quantidade[index]}
          placeholder="Quantidade (kg)"
        />
        <select bind:value={classe[index]} class="item-input">
          <option class="optionMedication">Medicação</option>
          <option>Aminoácido</option>
          <option>Macronutriente</option>
        </select>
        <br />
        <button
          class="btn btn-danger"
          id="removeButton"
          on:click={() => removeSelf(index)}>X</button
        >
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
    background-color: #212529;
    color: whitesmoke;
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
  .options {
    display: flex;
    justify-content: center;
  }
</style>
