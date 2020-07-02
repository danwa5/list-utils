<template>
  <div id="app">
    <div>
      <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand href="#">List-Utils</b-navbar-brand>
      </b-navbar>
    </div>
    <b-container fluid>
      <b-row class="text-center pt-2">
        <b-col cols="5" class="p-3">
          <div class="mb-2">
            <b-button size="sm" v-on:click="copy('input')">
              <b-icon-files></b-icon-files>
            </b-button>
          </div>
          <b-form>
            <b-form-textarea
              id="input"
              v-model="form['input']"
              v-on:input="countInputItems"
              rows="25"
              placeholder="Enter a list"
              no-resize
            />
          </b-form>
          Item Count: <strong>{{this.inputItemCount}}</strong>
        </b-col>
        <b-col cols="2" class="p-3">
          <b-button v-on:click="transform" variant="info" type="button">Transform</b-button>
        </b-col>
        <b-col cols="5" class="p-3">
          <div class="mb-2">
            <b-button size="sm" v-on:click="copy('result')">
              <b-icon-files></b-icon-files>
            </b-button>
          </div>
          <b-form-textarea
            id="result"
            v-model="result"
            rows="25"
            no-resize
          />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: function() {
    return {
      form: {},
      result: '',
      inputItemCount: 0
    };
  },
  methods: {
    copy: function(elementId) {
      let copyText = document.getElementById(elementId);
      copyText.select();
      copyText.setSelectionRange(0, 99999); // for mobile devices
      document.execCommand("copy");
    },

    countInputItems: function() {
      let inputValue = this.form['input'].trim();

      if (inputValue.length == 0) {
        this.inputItemCount = 0
      } else {
        this.inputItemCount = ((inputValue.match(/\n/g) || []).length + 1);
      }
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
