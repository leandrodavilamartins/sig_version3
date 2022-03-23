<script>
  let data = [];
  let selected;
  async function getData() {
    db.collection("formulas")
      .get()
      .then((res) => {
        let docs = res.docs;
        docs.forEach((doc) => {
          return (data = [doc.data(), ...data]);
        });
      });
  }

  let promise = getData();
  $: console.log(data);
  //$: console.log(selected);
</script>

<div class="selectElement">
  <select bind:value={selected}>
    <option disabled>Escolha fórmula </option>
    {#each data as d}
      <option>{d.nome}</option>
    {/each}
  </select>
  <button class="btn btn-warning" on:click={promise}
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
{#await promise then}
  <div class="table-content">
    <table class="table">
      <thead>
        <tr>
          <th>Ingredientes</th>
        </tr>
      </thead>
      <tbody>
        {#each data as d}
          {#each Object.keys(d.componentes) as i}
            <tr>
              <td>{i}</td>
            </tr>
          {/each}
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
