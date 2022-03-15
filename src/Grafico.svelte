<script>
  import { onMount } from "svelte";
  let data = [];
  let formattedData = [
    [1, 200],
    [2, 300],
  ];

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

  function createChart() {
    const ctx = document.getElementById("myChart").getContext("2d");
    const myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
          {
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
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
  </div>
</div>

<canvas id="myChart" width="3" height="1" />

<style>
  .selectionElement {
    display: flex;
    justify-content: center;
  }
</style>
