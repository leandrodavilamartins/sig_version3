<script>
  let data = [];
  let selected = "";
  db.collection("formulas")
    .get()
    .then((res) => {
      let docs = res.docs;
      docs.forEach((doc) => {
        return (data = [doc.data(), ...data]);
      });
    });

  //$: console.log(data);
  $: console.log(selected);
</script>

<div class="selectElement">
  <select bind:value={selected}>
    <option disabled>Escolha uma fórmula </option>
    {#each data as d}
      <option>{d.nome}</option>
    {/each}
  </select>
  <button class="btn btn-success">Selecionar</button>
</div>

<style>
  .selectElement {
    display: flex;
    justify-content: center;
    margin-top: 5vh;
  }
</style>
