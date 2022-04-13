<script>
  let list = [];
  let note = "";
  $: console.log(list);

  db.collection("pendencias").onSnapshot((snapData) => {
    list = snapData.docs;
  });

  function addItem() {
    let date = new Date();
    db.collection("pendencias").add({ todo: note, pos: date.getTime() });
    note = "";
  }
  function deleteItem(itemId) {
    db.collection("pendencias").doc(itemId).delete();
  }
</script>

<div class="page-title">
  <p>Pendências</p>
  <br />
</div>

<div>
  {#each list as listItem, index}
    <div class="listOfTasks">
      <div class="card">
        <p>&nbsp;&nbsp;{listItem.data().todo}</p>
      </div>
      <div id="deleteBtnDiv">
        <button
          class=" close btn btn-danger"
          id="deleteBtn"
          on:click={() => deleteItem(listItem.id)}>X</button
        >
      </div>
    </div>
  {/each}
  <br />
</div>

<div>
  <div class="inputForm">
    <input class="form-control" bind:value={note} />
    <button class="btn btn-warning" id="saveBtn" on:click={addItem}
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
</div>

<style>
  .inputForm {
    display: flex;
    justify-content: center;
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

  .form-control {
    width: 30%;
    background-color: #212529;
    color: whitesmoke;
  }

  .card {
    display: flex;
    width: 40%;
    justify-content: center;
    color: whitesmoke;
    background-color: #212529;
    margin-right: 3px;
    align-self: flex-start;
  }
  .listOfTasks {
    display: flex;
    justify-content: center;
    margin-bottom: 1vh;
    align-items: center;
  }
  #deleteBtn {
    font-family: Orbitron;
    font-weight: bolder;
  }
  #deleteBtnDiv {
    align-self: flex-end;
  }
</style>
