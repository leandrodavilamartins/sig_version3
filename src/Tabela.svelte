<script>
  let dataObjects = [];
  $: objs = Object.values(dataObjects);
  // Converts to Date Local Format
  $: formattedObjs = objs.map((obj) => {
    //console.log(obj.data.seconds);
    let d = luxon.DateTime.fromMillis(obj.data).toUTC().toLocaleString();
    //console.log(d.toLocaleDateString());
    obj.data = d;
  });
  // get db data
  async function getCotacoes() {
    db.collection("cotacoes")
      .get()
      .then((res) => {
        let docs = res.docs;
        docs.forEach((doc) => {
          return (dataObjects = [...dataObjects, doc.data()]);
        });
      });
  }

  let promise = getCotacoes();
  console.log(formattedObjs);
</script>

<div class="container">
  {#await promise then}
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Nome</th>
          <th scope="col">Data</th>
          <th scope="col">Fornecedor</th>
          <th scope="col">Preço</th>
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

<style></style>
