<template>
  <div class="modal-backdrop">
    <div class="modal">
      
      <header class="modal-header">
        Nouvelle personne !
      </header>

      <section class="modal-body">
        <slot name="body">
          Choisis un nom :  <br>
          <input v-model="name">
        </slot>
       </section>

      <footer class="modal-footer d-flex">
        <button
          type="button"
          class="btn-green"
          @click="addNewPlayer"
        >
          OK
        </button>
        <button
          type="button"
          class="btn-green"
          @click="close"
        >
          Fermer
        </button>
      </footer>
    </div>
  </div>
</template>


<script>
  export default {
    props: ['body', 'footer', 'numberPlayer'],
    name: 'Modal',
    data: function() {
      return {
        name: undefined
      }
    },
    methods: {
      close() {
        this.$emit('close');
      },
      addNewPlayer() {
        this.$emit('addNewPlayer', {
          name: this.name,
          numberPlayer: this.numberPlayer
        })
      }
    },
  };
</script>

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    position: relative;
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    flex-direction: column;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

  .btn-close {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    font-size: 20px;
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
  }

  .btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
  }
</style>
