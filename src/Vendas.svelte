<script>
  import { Jumper } from "svelte-loading-spinners";
  let isLoading = true;
  let data = [];

  async function getData() {
    db.collection("vendas")
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
              <th>Comprador</th>
              <th>Valor</th>
              <th>Nota</th>
            </tr>
          </thead>
          <tbody>
            {#each data as d}
              <tr class="table-info">
                <td>{d.comprador}</td>
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
    margin-top: 5vh;
    margin-right: 10%;
  }
  .loader {
    display: flex;
    justify-content: center;
  }
</style>
