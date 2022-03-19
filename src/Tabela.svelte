<script>
  import { Jumper } from "svelte-loading-spinners";
  import { fade } from "svelte/transition";

  let isLoading = true;
  let dataObjects = [];
  $: objs = Object.values(dataObjects);
  // Converts to Date Local Format
  $: formattedObjs = objs.map((obj) => {
    //console.log(obj.data.seconds);
    let d = luxon.DateTime.fromMillis(obj.data).toUTC().toLocaleString();
    //console.log(d.toLocaleDateString());
    obj.data = d; // formata data
    let p = parseFloat(obj.preço).toFixed(2);
    obj.preço = p; // formata preço
    console.log(parseFloat(obj.preço).toFixed(2));
  });
  // get db data
  async function getCotacoes() {
    db.collection("cotacoes")
      .get()
      .then((res) => {
        let docs = res.docs;
        docs.forEach((doc) => {
          isLoading = false;
          return (dataObjects = [...dataObjects, doc.data()]);
        });
      });
  }

  let promise = getCotacoes();
  console.log(formattedObjs);
</script>

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
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Nome</th>
              <th scope="col">Data</th>
              <th scope="col">Fornecedor</th>
              <th scope="col">Preço (R$)</th>
              <th scope="col">Volume</th>
              <th scope="col">Un</th>
              <th scope="col">Entrega</th>
            </tr>
          </thead>
          <tbody>
            {#each objs as obj}
              <tr>
                <td>{obj.nome}</td>
                <td>{obj.data}</td>
                <td>{obj.fornecedor}</td>
                <td>{obj.preço}</td>
                <td>{obj.volume}</td>
                <td>{obj.un}</td>
                <td>{obj.termos}</td>
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
  }
  .loader {
    display: flex;
    justify-content: center;
  }
</style>
