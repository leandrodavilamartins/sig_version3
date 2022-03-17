<script>
  import { onMount } from "svelte";

  let data = [];
  let selectedItem;
  let xValues = [];
  let yValues = [];
  let myChart = "";

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
  //$: console.log(data);
  //$: objData = data[0];
  //$: console.log(objData);
  //$: console.log(selectedItem);
  //$: console.log(xValues);
  //$: console.log(yValues);
  $: console.log(xValues);

  function createChart() {
    if (myChart) {
      myChart.destroy();
    }
    const ctx = document.getElementById("myChart").getContext("2d");
    myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: xValues,
        datasets: [
          {
            data: yValues,
            borderWidth: 2,
            borderColor: ["rgb(100%, 24%, 0%)"],
          },
        ],
      },
      options: {},
    });
  }
  //onMount(createChart);

  function generateGraph() {
    xValues = [];
    yValues = [];
    //let canvas = document.getElementById("myChart");
    //console.log(canvas);
    //console.log(data);
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    let filtered = data.filter((item) => {
      return item.nome == selectedItem;
    });
    //console.log(filtered);
    let timestamps = filtered.map((d) => {
      return d.data;
    });
    //console.log(timestamps);
    filtered.forEach((item) => {
      let formattedDate = luxon.DateTime.fromMillis(item.data)
        .toUTC()
        .toLocaleString();
      xValues = [formattedDate, ...xValues];
      yValues = [item.preço, ...yValues];
    });
    createChart();
  }
</script>

<div class="selection">
  <div class="selectionElement">
    <select bind:value={selectedItem}>
      <option disabled>Escolha item</option>
      {#await promise then}
        {#each data as d}
          <option>{d.nome}</option>
        {/each}
      {/await}
    </select>
    <div>
      <button class="btn btn-warning" on:click={generateGraph}>Gerar</button>
    </div>
  </div>
</div>

<canvas id="myChart" width="3" height="1" />

<style>
  .selectionElement {
    display: flex;
    justify-content: center;
    margin-top: 5vh;
  }
  #myChart {
    margin-left: 15%;
    margin-right: 10%;
  }
</style>
