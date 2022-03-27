<script>
  let data = [];
  let selected;
  let items = [];
  let values = [];
  let objs = [];
  let mixObjs = []; // contém os items da mistura
  let compItems = [];
  let compValues = [];

  async function getData() {
    db.collection("formulas")
      .get()
      .then((res) => {
        let docs = res.docs;
        promise = docs.map((doc) => {
          data = [doc.data(), ...data];
          return doc.data();
        });
      });
  }

  $: promise = getData();
  $: console.log(data);
  $: console.log(selected);
  $: selectedFormula = data.filter((d) => {
    return d.nome == selected;
  });
  $: console.log(selectedFormula);
  $: ingredients = selectedFormula.map((i) => {
    return i.ingredientes;
  });
  $: {
    ingredients.forEach((d) => {
      items = Object.keys(d);
      values = Object.values(d);
    });
  }
  $: console.log(items);
  $: console.log(values);
  $: {
    objs = [];
    let counter = items.length;
    for (let i = 0; i < counter; i++) {
      let obj = { items: items[i], values: values[i] };
      objs = [obj, ...objs];
    }
  }
  $: componentes = selectedFormula.map((i) => {
    return i.componentes;
  });
  $: console.log(componentes);
  $: {
    componentes.forEach((d) => {
      compItems = [Object.keys(d), ...compItems];
      compValues = [Object.values(d), ...compValues];
    });
  }
  $: console.log(compItems);
  $: console.log(compValues);
  $: {
    mixObjs = [];
    let counter = compItems.length;
    console.log(counter);
    for (let i = 0; i < counter; i++) {
      let obj = { nome: compItems[i], quantidade: compValues[i] };
      mixObjs = [obj, ...mixObjs];
    }
  }
  $: console.log(mixObjs);
</script>

{#await promise then}
  <div class="selectElement">
    <select bind:value={selected}>
      <option disabled>Escolha fórmula </option>
      {#each data as d}
        <option>{d.nome}</option>
      {/each}
    </select>
    <button class="btn btn-warning"
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-table"
        viewBox="0 0 16 16"
      >
        <path
          d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 2h-4v3h4V4zm0 4h-4v3h4V8zm0 4h-4v3h3a1 1 0 0 0 1-1v-2zm-5 3v-3H6v3h4zm-5 0v-3H1v2a1 1 0 0 0 1 1h3zm-4-4h4V8H1v3zm0-4h4V4H1v3zm5-3v3h4V4H6zm4 4H6v3h4V8z"
        />
      </svg>&nbsp;&nbsp;Gerar</button
    >
  </div>
{/await}
{#await promise then}
  <div class="table-content">
    <table class="table">
      <thead>
        <tr>
          <th>Pré-mistura</th>
          <th>Quantidade ( kg )</th>
        </tr>
      </thead>
      <tbody>
        {#each objs as obj}
          <tr>
            <td>{obj.items}</td>
            <td>{obj.values}</td>
          </tr>
        {/each}
      </tbody>
      <thead>
        <tr>
          <th>Ingrediente</th>
          <th>Quantidade</th>
        </tr>
      </thead>
      <tbody>
        {#each mixObjs as obj}
          <tr>
            <td>{obj.nome}</td>
            <td>{obj.quantidade}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{/await}

<style>
  .selectElement {
    display: flex;
    justify-content: center;
    margin-top: 5vh;
  }
  .table-content {
    display: flex;
    margin: auto;
    width: 80%;
  }
</style>
