<script>
  import { Jumper } from "svelte-loading-spinners";
  let isLoading = true;
  let data = [];
  async function getData() {
    db.collection("farmácia")
      .get()
      .then((res) => {
        let docs = res.docs;
        docs.forEach((doc) => {
          return (data = [doc.data(), ...data]);
        });
        isLoading = false;
      });
  }
  let promise = getData();
  $: console.log(data);
</script>

<div class="page-title">
  <p><br /></p>
  <p>Farmácia</p>
</div>

{#if isLoading}
  <div class="loader">
    <br /><br /><br /><br />
    <Jumper size="120" color="#FF3E00" unit="px" duration="2s" />
  </div>
{/if}
{#if !isLoading}
  <div class="table-content">
    <div class="container">
      {#await promise then}
        <table class="table table-hover table-sm table-striped">
          <thead>
            <tr class="table-secondary">
              <th>Item</th>
              <th>Fornecedor</th>
              <th>Quantidade</th>
              <th>Valor( R$ )</th>
            </tr>
          </thead>
          <tbody>
            {#each data as d}
              <tr class="table-dark">
                <td>{d.item}</td>
                <td>{d.fornecedor}</td>
                <td>{d.quant}</td>
                <td>{d.valor.toFixed(2)}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      {/await}
    </div>
  </div>
{/if}

<style>
  .table-content {
    margin-left: 10%;
    margin-top: 5vh;
    margin-right: 10%;
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
