<script>
  //import { produto } from "./store";
  import { fade } from "svelte/transition";
  let nome = "";
  let preço = null;
  let data = "";
  let fornecedor = "";
  let isValid = false;
  let isSaved = false;
  let radio = "";
  let terms = "";
  let error = false;
  let volume = "";
  let unidade = "";

  // validação reativa
  $: if (
    nome !== "" &&
    preço !== null &&
    fornecedor !== "" &&
    data !== "" &&
    volume !== ""
  ) {
    isValid = true;
    console.log(isValid);
  } else {
    isValid = false;
    console.log(isValid);
  }
  $: if (radio == "1") {
    terms = "cif";
  } else if (radio == "2") {
    terms = "fob";
  } else {
    terms = "";
  }
  //$: console.log(nome);
  //$: console.log(preço);
  $: console.log(data);
  //$: console.log(isValid);
  //$: console.log(ingrediente);
  //$: console.log(fornecedor);
  //$: console.log(terms);
  $: console.log(unidade);
  //$: console.log(isSaved);
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
      error = true;
      isSaved = false;
    } else {
      let year = data.slice(0, 4);
      let month = data.slice(5, 7); // there is a problem if the month is 0
      let day = data.slice(8, 10);
      //let d = new Date(year, month, day); // date conversion using the Date library
      console.log(year, month, day);
      let luxonTime = luxon.DateTime.local(
        parseInt(year),
        parseInt(month),
        parseInt(day)
      ); // date conversion using luxon
      console.log(luxonTime);
      //console.log(luxonTime.ts);
      //let timestamp = d.getTime();
      //$produto = [...$produto, { nome: nome, preço: preço }];
      db.collection("cotacoes")
        .doc()
        .set({
          nome: nome,
          preço: preço,
          data: luxonTime.ts,
          fornecedor: fornecedor,
          termos: terms,
          volume: volume,
          un: unidade,
        })
        .then((res) => {
          console.log("Cotação salva com sucesso!");
          isSaved = true;
          error = false;
          setTimeout(() => {
            isSaved = false;
          }, 3000);
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

<div class="page-title">
  <p><br /></p>
  <p>Formulário</p>
</div>

<div class="content">
  <div class="flex-container">
    <select
      class="form-select"
      bind:value={nome}
      title="Clique para selecionar item a ser cotado"
    >
      {#await dbEstoqueData then myData}
        <option selected disabled>Escolha um item ... </option>
        {#each myData as d}
          <option value={d.ingrediente}>{d.ingrediente}</option>
        {/each}
      {/await}
    </select>

    <p>Fornecedor</p>
    <div class="flex-container" title="Clique aqui para selecionar fornecedor">
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
      <p>Preço (R$)</p>
      <input
        class="form-number"
        type="number"
        bind:value={preço}
        placeholder="Ex.: 2.70"
        title="Clique para inserir preço"
      />
    </div>
    <div class="flex-container-2">
      <div>
        <p>Volume</p>
        <input
          class="form-number"
          type="number"
          bind:value={volume}
          placeholder="Ex.: 4000"
          title="Clique para inserir volume cotado"
        />
      </div>
      <div>
        <p>&nbsp;Un</p>
        <select
          class="form-select"
          bind:value={unidade}
          title="Clique para adicionar unidade do produto"
        >
          <option selected disabled>...</option>
          <option>frasco</option>
          <option>kg</option>
          <option>ton</option>
          <option>saco</option>
        </select>
      </div>
    </div>
    <div class="flex-container-2">
      <div class="form-check" title="Clique para selecionar opção de entrega">
        <input
          class="form-check-input"
          type="radio"
          value={1}
          id="flexCheckDefault1"
          name="frete"
          bind:group={radio}
        />
        <label
          class="form-check-label"
          for="flexCheckDefault1"
          title="Clique para selecionar opção de entrega"
        >
          CIF
        </label>
      </div>
      <div class="form-check" title="Clique para selecionar opção de entrega">
        <input
          class="form-check-input"
          type="radio"
          value={2}
          id="flexCheckDefault2"
          name="frete"
          bind:group={radio}
        />
        <label class="form-check-label" for="flexCheckDefault2"> FOB </label>
      </div>
    </div>
    <input
      class="form-date"
      type="date"
      bind:value={data}
      title="Clique para selecionar data em que foi feita a cotação "
    />
    <button
      class="btn btn-warning"
      on:click={saveData}
      title="Clique para salvar cotação">Salvar Cotação</button
    >
  </div>
</div>
<div class="msg" class:showMsg={isSaved == true}>
  <p>Cotação salva com sucesso !</p>
</div>
<div class="msg" class:showErrorMsg={error == true}>
  <p>Dados inválidos</p>
</div>

<style>
  .content {
    display: flex;
    justify-content: center;
    margin-top: 5vh;
  }
  .flex-container {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
  }
  .flex-container-2 {
    display: flex;
    flex-wrap: wrap;
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
  .msg {
    display: none;
    justify-content: center;
    margin-top: 1.5vh;
  }
  .showMsg {
    display: flex;
    color: whitesmoke;
  }
  .showErrorMsg {
    display: flex;
    color: red;
  }
  .page-title {
    display: flex;
    width: 100%;
    justify-content: center;
    font-family: Orbitron;
    font-size: x-large;
    margin-top: 4vh;
    margin-bottom: 1vh;
  }
  .form-select {
    background-color: #212529;
    color: whitesmoke;
  }
  .form-number {
    background-color: #212529;
    color: whitesmoke;
  }
  .form-date {
    background-color: #212529;
    color: whitesmoke;
  }
</style>
