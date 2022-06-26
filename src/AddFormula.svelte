<script>
  import Modal from "./Modal.svelte";

  let todosFormula = [];
  let todosMistura = [];
  let formulaItem = []; // contém os itens da fórmula
  let formulaQuant = []; // contém as quantidades dos itens da fórmula
  let misturaItem = []; // contém os itens da mistura
  let misturaQuant = []; // contém as quantidades da mistura
  let misturaClasse = [];
  let formulaClasse = [];
  let totalFormula;
  let totalMistura;
  let formulaPDFBtn = false;
  let misturaPDFBtn = false;
  let formulaBtnState = true;
  let misturaBtnState = true;
  let openModals = false;

  let formulaModalOpen = false;
  let misturaModalOpen = false;
  let formulaIsSaved = false;

  $: console.log(formulaItem);
  $: console.log(formulaQuant);
  $: console.log(misturaItem);
  $: console.log(misturaQuant);
  $: console.log(misturaClasse);
  $: console.log(formulaClasse);
  $: console.log(_.sum(formulaQuant));
  $: console.log(_.sum(misturaQuant));

  function addFormula() {
    todosFormula = [...todosFormula, ""];
  }

  function addMistura() {
    todosMistura = [...todosMistura, ""];
  }

  function selfRemoveFormula(index) {
    todosFormula = [
      ...todosFormula.slice(0, index),
      ...todosFormula.slice(index + 1),
    ];
  }

  function selfRemoveMistura(index) {
    todosMistura = [
      ...todosMistura.slice(0, index),
      ...todosMistura.slice(index + 1),
    ];
  }

  function saveFormula() {
    console.log("Fórmula salva com sucesso!");
    alert("Fórmula salva com sucesso!");
    formulaPDFBtn = true;
    formulaBtnState = false;
  }

  function saveMistura() {
    console.log("Mistura salva com sucesso!");
    alert("Mistura salva com sucesso!");
    misturaPDFBtn = true;
    misturaBtnState = false;
  }

  // Formula pdf generator function
  function createFormulaPDF() {
    let ingredientesFormula = _.zip(formulaItem, formulaQuant, formulaClasse);
    totalFormula = _.sum(formulaQuant);

    let formulaArray = [
      [
        {
          text: "RAÇÃO ALOJAMENTO",
          colSpan: 2,
          alignment: "center",
          fillColor: "#999",
        },
        {},
      ],
      [
        { text: "Matéria-prima", fillColor: "#999", alignment: "center" },
        { text: "Quantidade(kg)", fillColor: "#999", alignment: "center" },
      ],
    ];

    ingredientesFormula.forEach((d) => {
      return formulaArray.push([
        { text: d[0], fillColor: d[2] },
        { text: d[1], alignment: "center", fillColor: d[2] },
      ]);
    });

    console.log(formulaArray);
    formulaArray.push([
      { text: "Total" },
      { text: totalFormula, alignment: "center" },
    ]);

    let docDefinition = {
      content: [
        {
          layout: "lightHorizontalLines", // optional
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 2,
            widths: ["*", "*"],
            height: [200, 200],

            body: formulaArray,
          },
        },
      ],
      defaultStyle: {
        fontSize: 24,
        bold: true,
      },
    };

    pdfMake.createPdf(docDefinition).download();
  }

  //Mistura pdf generator function
  function createMisturaPDF() {
    let ingredientesMistura = _.zip(misturaItem, misturaQuant, misturaClasse);
    let totalMistura = _.sum(misturaQuant);

    console.log(ingredientesMistura);

    let misturaArray = [
      [
        {
          text: "RAÇÃO ALOJAMENTO",
          colSpan: 2,
          alignment: "center",
          fillColor: "#999",
        },
        {},
      ],
      [
        { text: "Matéria-prima", fillColor: "#999", alignment: "center" },
        { text: "Quantidade(kg)", fillColor: "#999", alignment: "center" },
      ],
    ];

    ingredientesMistura.forEach((d) => {
      return misturaArray.push([
        { text: d[0], fillColor: d[2] },
        { text: d[1], alignment: "center", fillColor: d[2] },
      ]);
    });

    misturaArray.push([
      { text: "Total" },
      { text: totalMistura, alignment: "center" },
    ]);

    let docDefinition = {
      content: [
        {
          layout: "lightHorizontalLines", // optional
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 2,
            widths: ["*", "*"],
            height: [200, 200],

            body: misturaArray,
          },
        },
      ],
      defaultStyle: {
        fontSize: 24,
        bold: true,
      },
    };

    pdfMake.createPdf(docDefinition).download();
  }
</script>

<div class="page-title">
  <p><br /></p>
  <p>Fórmulas</p>
</div>

<!--CAMPO DE INPUT DE NOVA FÓRMULA -->
<div class="formulaName">
  <input type="text" placeholder="Nome" title="Nome da fórmula" />
  <input type="date" title="Data da fórmula" />
  <button class="btn btn-warning" title="Adicionar fórmula"
    ><svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      class="bi bi-table"
      viewBox="0 0 16 16"
      on:click={() => (openModals = true)}
    >
      <path
        d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 2h-4v3h4V4zm0 4h-4v3h4V8zm0 4h-4v3h3a1 1 0 0 0 1-1v-2zm-5 3v-3H6v3h4zm-5 0v-3H1v2a1 1 0 0 0 1 1h3zm-4-4h4V8H1v3zm0-4h4V4H1v3zm5-3v3h4V4H6zm4 4H6v3h4V8z"
      />
    </svg></button
  >
</div>

{#if openModals}
  <main>
    {#if formulaBtnState}
      <button
        class="btn btn-warning"
        on:click={() => (formulaModalOpen = true)}
        title="Clique para adicionar fórmula">Nova Fórmula</button
      >
    {/if}
    {#if misturaBtnState}
      <button
        class="btn btn-warning"
        on:click={() => (misturaModalOpen = true)}
        title="Clique para adicionar mistura">Nova Mistura</button
      >
    {/if}

    <!--modal Fórmula-->
    <Modal
      open={formulaModalOpen}
      onClosed={() => (formulaModalOpen = false)}
      onSaved={() => saveFormula()}
      title="Fórmula"
    >
      {#each todosFormula as todo, index}
        <div class="form-line">
          <input
            type="text"
            placeholder="Matéria-prima"
            bind:value={formulaItem[index]}
          />
          <input
            type="number"
            placeholder="Quantidade"
            bind:value={formulaQuant[index]}
          />
          <select bind:value={formulaClasse[index]}>
            <option value="red">Medicamento</option>
            <option value="blue">Aminoácido</option>
            <option value="white">Macronutriente</option>
            <option value="yellow">Mistura</option>
          </select>
          <button
            class="btn btn-danger"
            on:click={() => selfRemoveFormula(index)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-x-lg"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"
              />
              <path
                fill-rule="evenodd"
                d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"
              />
            </svg>
          </button>
          <button class="btn btn-success"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              class="bi bi-check-lg"
              viewBox="0 0 16 16"
            >
              <path
                d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"
              />
            </svg></button
          >
        </div>
      {/each}
      <div>
        <br />
        <button class="btn btn-warning" on:click={addFormula}>
          <!-- ADD BUTTON -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-plus-lg"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
            />
          </svg>
        </button>
      </div>
    </Modal>

    <!--modal Mistura-->
    <Modal
      open={misturaModalOpen}
      onClosed={() => (misturaModalOpen = false)}
      onSaved={() => saveMistura()}
      title="Mistura"
      >{#each todosMistura as todo, index}
        <div class="form-line">
          <input
            type="text"
            placeholder="Matéria-prima"
            bind:value={misturaItem[index]}
          />
          <input
            type="number"
            placeholder="Quantidade"
            bind:value={misturaQuant[index]}
          />
          <select bind:value={misturaClasse[index]}>
            <option value="red">Medicamento</option>
            <option value="blue">Aminoácido</option>
            <option value="white">Macronutriente</option>
            <option value="yellow">Mistura</option>
          </select>
          <button
            class="btn btn-danger"
            on:click={() => selfRemoveMistura(index)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-x-lg"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"
              />
              <path
                fill-rule="evenodd"
                d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"
              />
            </svg>
          </button>
          <button class="btn btn-success"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              class="bi bi-check-lg"
              viewBox="0 0 16 16"
            >
              <path
                d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"
              />
            </svg></button
          >
        </div>
      {/each}
      <div>
        <br />
        <button class="btn btn-warning" on:click={addMistura}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-plus-lg"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
            />
          </svg>
        </button>
      </div>
    </Modal>

    <!--Formula pdf button -->
    {#if formulaPDFBtn}
      <div>
        <br />
        <br />
        <button class="btn btn-warning" on:click={createFormulaPDF}
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            class="bi bi-filetype-pdf"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM1.6 11.85H0v3.999h.791v-1.342h.803c.287 0 .531-.057.732-.173.203-.117.358-.275.463-.474a1.42 1.42 0 0 0 .161-.677c0-.25-.053-.476-.158-.677a1.176 1.176 0 0 0-.46-.477c-.2-.12-.443-.179-.732-.179Zm.545 1.333a.795.795 0 0 1-.085.38.574.574 0 0 1-.238.241.794.794 0 0 1-.375.082H.788V12.48h.66c.218 0 .389.06.512.181.123.122.185.296.185.522Zm1.217-1.333v3.999h1.46c.401 0 .734-.08.998-.237a1.45 1.45 0 0 0 .595-.689c.13-.3.196-.662.196-1.084 0-.42-.065-.778-.196-1.075a1.426 1.426 0 0 0-.589-.68c-.264-.156-.599-.234-1.005-.234H3.362Zm.791.645h.563c.248 0 .45.05.609.152a.89.89 0 0 1 .354.454c.079.201.118.452.118.753a2.3 2.3 0 0 1-.068.592 1.14 1.14 0 0 1-.196.422.8.8 0 0 1-.334.252 1.298 1.298 0 0 1-.483.082h-.563v-2.707Zm3.743 1.763v1.591h-.79V11.85h2.548v.653H7.896v1.117h1.606v.638H7.896Z"
            />
          </svg> Fórmula
        </button>
      </div>
    {/if}

    {#if misturaPDFBtn}
      <!--Mistura pdf button -->
      <div>
        <br />
        <br />
        <button class="btn btn-warning" on:click={createMisturaPDF}
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            class="bi bi-filetype-pdf"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM1.6 11.85H0v3.999h.791v-1.342h.803c.287 0 .531-.057.732-.173.203-.117.358-.275.463-.474a1.42 1.42 0 0 0 .161-.677c0-.25-.053-.476-.158-.677a1.176 1.176 0 0 0-.46-.477c-.2-.12-.443-.179-.732-.179Zm.545 1.333a.795.795 0 0 1-.085.38.574.574 0 0 1-.238.241.794.794 0 0 1-.375.082H.788V12.48h.66c.218 0 .389.06.512.181.123.122.185.296.185.522Zm1.217-1.333v3.999h1.46c.401 0 .734-.08.998-.237a1.45 1.45 0 0 0 .595-.689c.13-.3.196-.662.196-1.084 0-.42-.065-.778-.196-1.075a1.426 1.426 0 0 0-.589-.68c-.264-.156-.599-.234-1.005-.234H3.362Zm.791.645h.563c.248 0 .45.05.609.152a.89.89 0 0 1 .354.454c.079.201.118.452.118.753a2.3 2.3 0 0 1-.068.592 1.14 1.14 0 0 1-.196.422.8.8 0 0 1-.334.252 1.298 1.298 0 0 1-.483.082h-.563v-2.707Zm3.743 1.763v1.591h-.79V11.85h2.548v.653H7.896v1.117h1.606v.638H7.896Z"
            />
          </svg> Mistura
        </button>
      </div>
    {/if}
  </main>
{/if}

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
  .form-line {
    display: block;
  }
  input {
    background-color: #212529;
    color: whitesmoke;
    margin-left: 1%;
    margin-right: 1%;
  }
  select,
  option {
    background-color: #212529;
    color: whitesmoke;
    margin-left: 1%;
    margin-right: 1%;
  }
  .btn.btn-danger {
    font-family: Orbitron;
    font-weight: bolder;
  }
  .btn.btn-warning {
    font-family: Roboto;
    font-weight: 900;
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
  .formulaName {
    display: flex;
    justify-content: center;
  }
</style>
