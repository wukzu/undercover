<template>
  <div class="modal-backdrop">
    <div class="modal">
      
      <header class="modal-header">
        Ton mot c'est
      </header>

      <section class="modal-body"  style="text-align: center;">
        {{ word == '' ? 'Mr White Hat :)' : word }}
       </section>

      <footer class="modal-footer d-flex">
        <button
          type="button"
          class="btn-green"
          @click="close"
        >
          OK
        </button>
      </footer>
    </div>
  </div>
</template>


<script>
  export default {
    props: ['word'],
    name: 'ModalWord',
    methods: {
      close() {
        this.$emit('close');
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
    width: 70%;
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
    font-size: 1.2rem;
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
    font-size: 2.5rem;
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
    padding-top: 7px;
    padding-bottom: 7px;
  }
</style>
