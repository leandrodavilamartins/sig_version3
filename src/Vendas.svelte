<script>
  let data = [];

  async function getData() {
    db.collection("vendas")
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
  {#await promise then}
    <div>
      <table class="table">
        <thead>
          <tr>
            <th>Comprador</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {#each data as d}
            <tr>
              <td>{d.comprador}</td>
              <td>{d.valor}</td>
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
    margin-top: 5vh;
    margin-right: 10%;
  }
</style>
