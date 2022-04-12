<script>
  export let open = false;
  export let showBackdrop = true;
  export let onClosed; // this is a function exported to the parent as a prop !!!
  export let title;
  export let onSaved;

  const modalClose = () => {
    open = false;
    if (onClosed) {
      // when the modal is closed the function is called !!!
      onClosed();
    }
  };

  const modalSave = () => {
    open = false;
    if (onSaved) {
      onSaved();
    }
  };
</script>

{#if open}
  <div
    class="modal"
    id="sampleModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="sampleModalLabel"
    aria-hidden={false}
  >
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="sampleModalLabel">
            {title}<span class="post-title">
              &nbsp; &nbsp; / &nbsp; Clique em &nbsp; "+" &nbsp; para adicionar
              item
            </span>
          </h5>
          <button
            type="button"
            class="close btn btn-dark"
            data-dismiss="modal"
            aria-label="Close"
            on:click={modalClose}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body"><slot /></div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-dismiss="modal"
            on:click={modalClose}>Cancelar</button
          >
          <button type="button" class="btn btn-primary" on:click={modalSave}
            >Salvar</button
          >
        </div>
      </div>
    </div>
  </div>
  {#if showBackdrop}
    <div class="modal-backdrop show" />
  {/if}
{/if}

<style>
  .modal {
    display: block;
  }
  .modal-body {
    background-color: #212529;
  }
  .modal-header {
    background-color: #212529;
    color: whitesmoke;
  }
  .modal-footer {
    background-color: #212529;
    color: whitesmoke;
  }
  .post-title {
    font-style: italic;
    font-size: medium;
  }
</style>
