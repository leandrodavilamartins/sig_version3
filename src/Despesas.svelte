<script>
  import { Jumper } from "svelte-loading-spinners";
  import Modal from "sv-bootstrap-modal";

  let isLoading = true;
  let data = [];
  let isOpen = false;

  async function getData() {
    db.collection("despesas")
      .get()
      .then((res) => {
        let docs = res.docs;
        docs.forEach((doc) => {
          return (data = [doc.data(), ...data]);
        });
        isLoading = false;
      });
  }
  function getSibling(event) {
    let parent = event.target.parentElement;
    console.log(parent.parentElement);
  }
  let promise = getData();
  $: console.log(data);
</script>

{#if isLoading}
  <div class="loader">
    <br /><br /><br /><br />
    <Jumper size="120" color="#FF3E00" unit="px" duration="2s" />
  </div>
{/if}
{#if !isLoading}
  <div class="table-content">
    {#await promise then}
      <div class="container">
        <table class="table">
          <thead>
            <tr class="table-secondary">
              <th>Fornecedor</th>
              <th>Valor ( R$ )</th>
              <th>Status</th>
              <th>Alterar</th>
            </tr>
          </thead>
          <tbody>
            {#each data as d}
              {#if d.situação == "quitado"}
                <tr class="table-primary">
                  <td>{d.fornecedor}</td>
                  <td>{d.valor}</td>
                  <td>{d.situação}</td>
                  <td
                    ><button
                      class="btn btn-warning"
                      on:click={() => (isOpen = true)}
                      on:click={getSibling}
                      ><svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        class="bi bi-check2-square"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5H3z"
                        />
                        <path
                          d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"
                        />
                      </svg></button
                    ></td
                  >
                </tr>
              {/if}
              {#if d.situação == "aberto"}
                <tr class="table-danger">
                  <td>{d.fornecedor}</td>
                  <td>{d.valor}</td>
                  <td>{d.situação}</td>
                  <td
                    ><button
                      class="btn btn-warning"
                      on:click={() => (isOpen = true)}
                      ><svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        class="bi bi-check2-square"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5H3z"
                        />
                        <path
                          d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"
                        />
                      </svg></button
                    ></td
                  >
                </tr>
              {/if}
            {/each}
          </tbody>
        </table>
      </div>
    {/await}
  </div>
{/if}
{#if isOpen}
  <!-- Modal -->
  <Modal bind:open={isOpen}>
    <div class="modal-header">
      <h5 class="modal-title">Alterar Status</h5>
      <button type="button" class="close" on:click={() => (isOpen = false)}>
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">Deseja alterar situação do item selecionado ?</div>
    <div class="modal-footer">
      <button type="button" on:click={() => (isOpen = false)}>Cancelar</button>
      <button type="button" id="modalSaveBtn">Salvar</button>
    </div>
  </Modal>
{/if}

<style>
  .table-content {
    margin-left: 10%;
    margin-right: 10%;
    margin-top: 5vh;
  }
  .loader {
    display: flex;
    justify-content: center;
  }
  .btn {
    padding: 1px !important;
    margin: 0 !important;
  }
  #modalSaveBtn {
    background-color: #0d6efd;
    border-radius: 5px;
    color: whitesmoke;
  }
</style>
