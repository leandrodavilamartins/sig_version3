<script>
  import { Jumper } from "svelte-loading-spinners";
  let isLoading = true;
  let data = [];

  async function getData() {
    db.collection("compras")
      .get()
      .then((res) => {
        let docs = res.docs;
        docs.forEach((doc) => {
          data = [doc.data(), ...data];
        });
        isLoading = false;
      });
  }
  $: promise = getData();
  $: console.log(data);
</script>

<div class="page-title">
  <p><br /></p>
  <p>Compras</p>
</div>

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
        <table class="table table-hover table-sm table-striped">
          <thead>
            <tr class="table-secondary">
              <th>Fornecedor</th>
              <th>Valor</th>
              <th>Nota</th>
            </tr>
          </thead>
          <tbody>
            {#each data as d}
              <tr class="table-dark">
                <td>{d.fornecedor}</td>
                <td>{d.valor}</td>
                <td>{d.nota}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/await}
  </div>
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
  .page-title {
    display: flex;
    width: 100%;
    justify-content: center;
    font-family: Orbitron;
    font-size: x-large;
    margin-top: 4vh;
    margin-bottom: 1vh;
  }
</style>
