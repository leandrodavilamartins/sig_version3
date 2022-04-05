<script>
  let todos = [];

  function add() {
    todos = [...todos, ""];
  }
  function selfRemove(index) {
    todos = [...todos.slice(0, index), ...todos.slice(index + 1)];
  }
</script>

<div class="page-title">
  <p>Pendências</p>
  <br />
</div>

<div>
  {#each todos as todo, index}
    <div class="inputForm">
      <input bind:value={todos[index]} />
      <button
        class="btn btn-danger"
        id="removeBtn"
        on:click={() => selfRemove(index)}>X</button
      >
      <button
        class="btn btn-success"
        id="saveBtn"
        on:click={() => console.log("pin button pressed ")}
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-pin"
          viewBox="0 0 16 16"
        >
          <path
            d="M4.146.146A.5.5 0 0 1 4.5 0h7a.5.5 0 0 1 .5.5c0 .68-.342 1.174-.646 1.479-.126.125-.25.224-.354.298v4.431l.078.048c.203.127.476.314.751.555C12.36 7.775 13 8.527 13 9.5a.5.5 0 0 1-.5.5h-4v4.5c0 .276-.224 1.5-.5 1.5s-.5-1.224-.5-1.5V10h-4a.5.5 0 0 1-.5-.5c0-.973.64-1.725 1.17-2.189A5.921 5.921 0 0 1 5 6.708V2.277a2.77 2.77 0 0 1-.354-.298C4.342 1.674 4 1.179 4 .5a.5.5 0 0 1 .146-.354zm1.58 1.408-.002-.001.002.001zm-.002-.001.002.001A.5.5 0 0 1 6 2v5a.5.5 0 0 1-.276.447h-.002l-.012.007-.054.03a4.922 4.922 0 0 0-.827.58c-.318.278-.585.596-.725.936h7.792c-.14-.34-.407-.658-.725-.936a4.915 4.915 0 0 0-.881-.61l-.012-.006h-.002A.5.5 0 0 1 10 7V2a.5.5 0 0 1 .295-.458 1.775 1.775 0 0 0 .351-.271c.08-.08.155-.17.214-.271H5.14c.06.1.133.191.214.271a1.78 1.78 0 0 0 .37.282z"
          />
        </svg></button
      >
    </div>
  {/each}
  <div class="addBtn">
    <br />
    <button class="btn btn-warning" id="plusBtn" on:click={add}
      >Adicionar</button
    >
  </div>
</div>

<style>
  .addBtn {
    display: flex;
    justify-content: center;
  }
  .inputForm {
    display: flex;
    justify-content: center;
  }
  #saveBtn {
    color: whitesmoke;
    font-family: Orbitron;
  }
  #removeBtn {
    font-family: Orbitron;
  }
  .page-title {
    display: flex;
    width: 100%;
    justify-content: center;
    font-family: Orbitron;
    font-size: x-large;
    margin-top: 4vh;
    margin-bottom: 1vh;
  }
  #plusBtn {
    font-family: Roboto;
  }
</style>
