<template>
  <div id="app">
    <form>
      <textarea
        rows="30"
        columns="20"
        v-model="form['input']"
      />

      <button v-on:click="transform" type="button">Transform</button>
    </form>

    <div id="foobar">
      Result:<br/>
      <textarea
        id="result"
        rows="30"
        cols="20"
        v-model="result"
      /><br/>
      <button v-on:click="copy">Copy</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: function() {
    return {
      form: {},
      result: ''
    };
  },
  methods: {
    copy: function() {
      let copyText = document.getElementById("result");
      copyText.select();
      copyText.setSelectionRange(0, 99999); // for mobile devices
      document.execCommand("copy");
    },

    transform: function() {
      let inputValue = this.form['input'];

      if (inputValue !== undefined) {
        this.result = inputValue.replace(/\n/g, ',');
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
