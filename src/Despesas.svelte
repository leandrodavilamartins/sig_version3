<script>
  import { Jumper } from "svelte-loading-spinners";
  import Modal from "sv-bootstrap-modal";

  let isLoading = true;
  let data = [];
  let isOpen = false;
  let selectedObj;

  async function getData() {
    db.collection("despesas")
      .get()
      .then((res) => {
        let docs = res.docs;
        docs.forEach((doc) => {
          console.log(doc.id);
          let dataObj = doc.data();
          dataObj.id = doc.id;
          return (data = [dataObj, ...data]);
        });
        isLoading = false;
      });
  }
  function getSibling(event) {
    let parent = event.target.parentElement;
    let status = parent.parentElement.previousElementSibling.innerHTML;
    let id =
      parent.parentElement.previousElementSibling.previousElementSibling
        .previousElementSibling.previousElementSibling.innerHTML;
    console.log(id);
    console.log(status);
    selectedObj = data.filter((d) => {
      // busca pelo objeto com id correspondente à linha da tabela em que ocorreu a alteração de situação
      return d.id == id;
    });
    console.log(selectedObj);
    return selectedObj;
  }
  async function saveStatus() {
    let newStatus = "";
    let oldStatus = selectedObj[0].situação;
    if (oldStatus == "quitado") {
      // parece que o problema está nessa condição ...
      newStatus = "aberto";
    } else {
      newStatus = "quitado";
    }
    selectedObj["situação"] = newStatus;
    console.log(newStatus); // há um problema na atualização de status
    db.collection("despesas")
      .doc(selectedObj[0].id)
      .update({ situação: newStatus })
      .then((res) => {
        console.log("Documento atualizado com sucesso ! ");
        window.location.reload();
      });
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
              <th class="hidden">id</th>
              <th>Fornecedor</th>
              <th>( R$ )</th>
              <th>Status</th>
              <th>Alterar</th>
            </tr>
          </thead>
          <tbody>
            {#each data as d}
              {#if d.situação == "quitado"}
                <tr class="table-primary">
                  <td class="hidden">{d.id}</td>
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
                  <td class="hidden">{d.id}</td>
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
    <!--Status-->

    <div class="modal-footer">
      <button type="button" on:click={() => (isOpen = false)}>Cancelar</button>
      <button type="button" id="modalSaveBtn" on:click={saveStatus}
        >Salvar</button
      >
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
  .close {
    border-radius: 5px;
    padding: 0.4rem;
  }
  .hidden {
    display: none;
  }
</style>
