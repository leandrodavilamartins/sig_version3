<script>
  import { onMount } from "svelte";

  let data = [];

  async function getData() {
    db.collection("cotacoes")
      .get()
      .then((res) => {
        let docs = res.docs;
        docs.forEach((doc) => {
          return (data = [...data, doc.data()]);
        });
      });
  }
  let promise = getData();
  $: console.log(data);
  $: objData = data[0];
  $: console.log(objData);

  function createChart() {
    const ctx = document.getElementById("myChart").getContext("2d");
    const myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: [1647451640, 1647451940, 1647452640, 1647452740],
        datasets: [
          {
            data: [20, 22, 21, 25],
            borderWidth: 2,
          },
        ],
      },
      options: {},
    });
  }
  onMount(createChart);
</script>

<div class="selection">
  <div class="selectionElement">
    <select>
      <option disabled>Escolha item</option>
      {#await promise then}
        {#each data as d}
          <option>{d.nome}</option>
        {/each}
      {/await}
    </select>
    <div>
      <button class="btn btn-warning">Gerar</button>
    </div>
  </div>
</div>

<canvas id="myChart" width="3" height="1" />

<style>
  .selectionElement {
    display: flex;
    justify-content: center;
  }
</style>
