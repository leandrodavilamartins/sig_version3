<script>
  let data = [];

  async function getData() {
    db.collection("estoque")
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
            <th>Item</th>
            <th>Estoque</th>
            <th>Un</th>
            <th>Dias em Estoque</th>
          </tr>
        </thead>
        <tbody>
          {#each data as d}
            <tr>
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

<style>
  .table-content {
    margin-top: 5vh;
    margin-left: 10%;
    margin-right: 10%;
  }
</style>
