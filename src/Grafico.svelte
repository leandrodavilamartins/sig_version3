<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

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
  //$: xValues = [];
  //$: yValues = [];
  $: console.log(data);
  $: console.log(sortedData);
  $: console.log(xValues);
  $: console.log(yValues);
  //$: objData = data[0];
  //$: console.log(objData);
  //$: console.log(selectedItem);
  //$: console.log(xValues);
  //$: console.log(yValues);
  //$: console.log(xValues);
  $: sortedData = _.uniqBy(data, function (e) {
    // some lodash sorcery
    return e.nome;
  });

  function createChart(selected) {
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
            label: selected,
            data: yValues,
            borderWidth: 2,
            borderColor: ["rgb(100%, 24%, 0%)"],
            backgroundColor: ["rgb(100%, 24%, 0%)"],
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
    console.log(filtered);
    // filtered returns the selected item data . This filtered data needs to be sorted before included in xValues and yValues
    let sortedByDate = _.sortBy(filtered, [
      function (o) {
        return o.data;
      },
    ]);
    let sortedByDateReversed = _.reverse(sortedByDate);
    sortedByDateReversed.forEach((item) => {
      let formattedDate = luxon.DateTime.fromMillis(item.data)
        .toUTC()
        .toLocaleString();
      xValues = [formattedDate, ...xValues];
      yValues = [item.preço, ...yValues];
    });
    createChart(selectedItem);
  }
</script>

<div class="page-title">
  <p><br /></p>
  <p>Gráfico</p>
</div>

<div class="selection">
  <div class="selectionElement" title="Clique para selecionar item ">
    <select class="form-select" bind:value={selectedItem}>
      <option disabled>Escolha item</option>
      {#await promise then}
        {#each sortedData as d}
          <option>{d.nome}</option>
        {/each}
      {/await}
    </select>
    <div>
      <button
        class="btn btn-warning"
        on:click={generateGraph}
        title="Gerar gráfico"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-graph-up-arrow"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M0 0h1v15h15v1H0V0Zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5Z"
          />
        </svg></button
      >
    </div>
  </div>
</div>

<canvas id="myChart" width="3" height="1" />

<style>
  .selectionElement {
    display: flex;
    justify-content: center;
    width: 40%;
    margin: auto;
    margin-top: 5vh;
  }
  #myChart {
    margin-left: 15%;
    margin-right: 10%;
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
</style>
