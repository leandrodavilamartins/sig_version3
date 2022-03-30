<script>
  let data = [];

  async function getData() {
    db.collection("compras")
      .get()
      .then((res) => {
        let docs = res.docs;
        docs.forEach((doc) => {
          data = [doc.data(), ...data];
        });
      });
  }
  $: promise = getData();
  $: console.log(data);
</script>

<div class="table-content">
  {#await promise then}
    <div class="container">
      <table class="table">
        <thead>
          <tr class="table-secondary">
            <th>Fornecedor</th>
            <th>Valor</th>
            <th>Nota</th>
          </tr>
        </thead>
        <tbody>
          {#each data as d}
            <tr>
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

<style>
  .table-content {
    margin-left: 10%;
    margin-right: 10%;
    margin-top: 5vh;
  }
</style>
