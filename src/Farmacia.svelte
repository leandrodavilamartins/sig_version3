<script>
  let data = [];
  async function getData() {
    db.collection("farmácia")
      .get()
      .then((res) => {
        let docs = res.docs;
        docs.forEach((doc) => {
          return (data = [doc.data(), ...data]);
        });
      });
  }
  let promise = getData();
  $: console.log(data);
</script>

<div class="table-content">
  <div class="container">
    {#await promise then}
      <table class="table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Fornecedor</th>
            <th>Quantidade</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {#each data as d}
            <tr>
              <td>{d.item}</td>
              <td>{d.fornecedor}</td>
              <td>{d.quant}</td>
              <td>{d.valor}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    {/await}
  </div>
</div>

<style>
  .table-content {
    margin-left: 10%;
    margin-top: 5vh;
    margin-right: 10%;
  }
</style>
