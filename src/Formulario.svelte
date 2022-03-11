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
  $: console.log(nome);
  $: console.log(preço);
  $: console.log(data);
  $: console.log(isValid);
  $: console.log(ingrediente);
  $: console.log(fornecedor);

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

<div>
  <p />
  {#await dbEstoqueData then myData}
    <select bind:value={nome}>
      <option selected>Escolha</option>
      {#each myData as d}
        <option value={d.ingrediente}>{d.ingrediente}</option>
      {/each}
    </select>
  {/await}
  <p>Preço</p>
  <input type="number" bind:value={preço} />
  <p>Fornecedor</p>
  <select bind:value={fornecedor}>
    {#await dbFornecedoresData then myData}
      <option selected>Escolha</option>
      {#each myData as d}
        <option value={d.nome}>{d.nome}</option>
      {/each}
    {/await}
  </select>
  <p>Data</p>
  <input type="date" bind:value={data} />
  <button on:click={saveData}>Salvar Cotação</button>
</div>

<style></style>
