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

          <b-form-checkbox v-model="removeDuplicates">Remove duplicates</b-form-checkbox>
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
          Item Count: <strong>{{this.outputItemCount}}</strong>
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
      inputItemCount: 0,
      outputItemCount: 0,
      removeDuplicates: true,
      result: ''
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
      this.inputItemCount = this.countItems(this.form['input'], '\n');
    },

    countItems: function(input, delimiter) {
      let regex = new RegExp(delimiter, 'g');
      return input.length == 0 ? 0 : (input.match(regex) || []).length + 1;
    },

    transform: function() {
      let inputValue = this.form['input'];

      if (inputValue !== undefined) {
        var inputStr = inputValue.replace(/\n/g, ',');

        if (this.removeDuplicates === true) {
          let items = inputStr.split(',');
          const uniqueSet = new Set(items);
          inputStr = [...uniqueSet].join(',')
        }

        this.result = inputStr;
        this.outputItemCount = this.countItems(inputStr, ',');
      }
    }
  }
}
</script>
