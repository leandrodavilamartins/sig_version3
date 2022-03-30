<script>
  let data = [];
  async function getData() {
    db.collection("despesas")
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
    <div class="container">
      <table class="table">
        <thead>
          <tr class="table-secondary">
            <th>Fornecedor</th>
            <th>Valor ( R$ )</th>
            <th>Situação</th>
          </tr>
        </thead>
        <tbody>
          {#each data as d}
            {#if d.situação == "quitado"}
              <tr class="table-primary">
                <td>{d.fornecedor}</td>
                <td>{d.valor}</td>
                <td>{d.situação}</td>
              </tr>
            {/if}
            {#if d.situação == "aberto"}
              <tr class="table-danger">
                <td>{d.fornecedor}</td>
                <td>{d.valor}</td>
                <td>{d.situação}</td>
              </tr>
            {/if}
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
