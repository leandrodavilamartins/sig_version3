<script>
  //import { produto } from "./store";
  let nome = "";
  let preço = null;
  let data = "";
  let fornecedor = "";
  let isValid = false;
  let ingrediente = "";

  // validação reativa
  $: if (nome !== "" && preço !== null && fornecedor !== "") {
    isValid = true;
    console.log(isValid);
  } else {
    isValid = false;
    console.log(isValid);
  }
  //$: console.log(nome);
  //$: console.log(preço);
  //$: console.log(data);
  //$: console.log(isValid);
  //$: console.log(ingrediente);
  //$: console.log(fornecedor);

  async function getEstoqueData() {
    const resposta = await db.collection("estoque").get();
    const docs = await resposta.docs;
    const res = await docs.map((doc) => {
      return doc.data();
    });
    //console.log(res);
    return res;
  }

  async function getFornecedoresData() {
    const resposta = await db.collection("fornecedores").get();
    const docs = await resposta.docs;
    const res = await docs.map((doc) => {
      return doc.data();
    });
    return res;
  }

  function saveData() {
    if (!isValid) {
      console.log("Dados inválidos");
    } else {
      let year = data.slice(0, 4);
      let month = parseInt(data.slice(5, 7)) - 1; // there is a problem if the month is 0
      let day = data.slice(8, 10);
      let d = new Date(year, month, day);
      //let timestamp = d.getTime();
      //$produto = [...$produto, { nome: nome, preço: preço }];
      db.collection("cotacoes")
        .doc()
        .set({
          nome: nome,
          preço: preço,
          data: d,
          fornecedor: fornecedor,
        })
        .then((res) => {
          console.log("Cotação salva com sucesso!");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  /*   function logger() {
    let year = data.slice(0, 4);
    let month = parseInt(data.slice(5, 7)) - 1;
    let day = data.slice(8, 10);
    let d = new Date(year, month, day);
    //let timestamp = d.getTime();
  } */

  let dbEstoqueData = getEstoqueData();
  let dbFornecedoresData = getFornecedoresData();
</script>

<div class="content">
  <div class="flex-container">
    <p>Item</p>
    <select class="form-select" bind:value={nome}>
      {#await dbEstoqueData then myData}
        <option selected disabled>Escolha um item ... </option>
        {#each myData as d}
          <option value={d.ingrediente}>{d.ingrediente}</option>
        {/each}
      {/await}
    </select>
    <div class="flex-container">
      <p>Preço</p>
      <input class="form-number" type="number" bind:value={preço} />
    </div>
    <p>Fornecedor</p>
    <div class="flex-container">
      <select class="form-select" bind:value={fornecedor} required>
        {#await dbFornecedoresData then myData}
          <option selected disabled>Escolha uma opção ...</option>
          {#each myData as d}
            <option value={d.nome}>{d.nome}</option>
          {/each}
        {/await}
      </select>
    </div>
    <div class="flex-container">
      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          value=""
          id="flexCheckDefault1"
          name="frete"
        />
        <label class="form-check-label" for="flexCheckDefault1"> CIF </label>
      </div>
      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          value=""
          id="flexCheckDefault2"
          name="frete"
        />
        <label class="form-check-label" for="flexCheckDefault2"> FOB </label>
      </div>
    </div>
    <p>Data</p>
    <input class="form-date" type="date" bind:value={data} />
    <button class="btn btn-success" on:click={saveData}>Salvar Cotação</button>
  </div>
</div>

<style>
  .content {
    display: flex;
    justify-content: center;
  }
  .flex-container {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
  }
  .form-check {
    margin-left: 2em;
  }
  .form-select {
    width: 100%;
  }
  .form-number {
    width: 100%;
  }
  .form-date {
    width: 100%;
  }
  .btn {
    width: 100%;
  }
</style>
