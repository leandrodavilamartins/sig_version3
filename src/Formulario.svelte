<script>
  import { produto } from "./store";
  let nome;
  let preço;
  let data;

  //$: console.log(nome);
  //$: console.log(preço);
  $: console.log(data);
  function saveData() {
    let year = data.slice(0, 4);
    let month = parseInt(data.slice(5, 7)) - 1; // there is a problem if the month is 0
    let day = data.slice(8, 10);
    let d = new Date(year, month, day);
    //let timestamp = d.getTime();
    $produto = [...$produto, { nome: nome, preço: preço }];
    db.collection("cotacoes")
      .doc()
      .set({
        nome: nome,
        preço: parseFloat(preço),
        data: d,
      })
      .then((res) => {
        console.log("Cotação salva com sucesso!");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function logger() {
    let year = data.slice(0, 4);
    let month = parseInt(data.slice(5, 7)) - 1;
    let day = data.slice(8, 10);
    let d = new Date(year, month, day);
    let timestamp = d.getTime();
  }
</script>

<div>
  <p />
  <p>Nome do item</p>
  <input type="text" bind:value={nome} />
  <p>Preço</p>
  <input type="text" bind:value={preço} />
  <p>Data</p>
  <input type="date" bind:value={data} />
  <button on:click={saveData}>Salvar Cotação</button>
</div>

<style></style>
