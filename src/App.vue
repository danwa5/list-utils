<template>
  <div id="app">
    <form>
      <textarea
        rows=10
        v-model="form['input']"
      />

      <button v-on:click="transform" type="button">Transform</button>
    </form>

    <div id="foobar">
      Result:<br/>
      {{ result }}
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
