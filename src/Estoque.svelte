<script>
  import { Jumper } from "svelte-loading-spinners";
  let isLoading = true;
  let data = [];

  async function getData() {
    db.collection("estoque")
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
  <p>Estoque</p>
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
        <table class="table">
          <thead>
            <tr class="table-secondary">
              <th>Item</th>
              <th>Estoque</th>
              <th>Un</th>
              <th>Dias em Estoque</th>
            </tr>
          </thead>
          <tbody>
            {#each data as d}
              <tr class="table-dark">
                <td>{d.ingrediente}</td>
                <td>{d.estoque}</td>
                <td>{d.un}</td>
                <td>{d.diasEstoque}</td>
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
    margin-top: 5vh;
    margin-left: 10%;
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
