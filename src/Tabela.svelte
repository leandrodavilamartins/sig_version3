<script>
  let dataObjects = [];
  $: objs = Object.values(dataObjects);
  $: headers = Object.values(objs);
  $: console.log(headers);
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
</script>

<div class="container">
  {#await promise then}
    <table class="table">
      <thead>
        <tr>
          {#each headers as key}
            <th scope="col">{key}</th>
          {/each}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Mark</td>
        </tr>
      </tbody>
    </table>
  {/await}
</div>

<style></style>
