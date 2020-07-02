<template>
  <div id="app">
    <div>
      <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand href="#"><b-icon-lightning-fill variant="warning"></b-icon-lightning-fill></b-navbar-brand>
      </b-navbar>
    </div>
    <b-container fluid>
      <b-row class="text-center pt-2">
        <b-col md="4" lg="4" class="p-3">
          <div class="mb-2">
            <b-button size="sm" v-on:click="copy('input')">
              <b-icon-files></b-icon-files> Copy
            </b-button>

            <b-button size="sm" v-on:click="reset()" variant="danger" class="ml-2">
              <b-icon-x-circle></b-icon-x-circle> Reset
            </b-button>
          </div>
          <b-form-textarea
            id="input"
            v-model="input"
            v-on:input="countInputItems"
            rows="25"
            placeholder="Enter a list of items (e.g. column of Google Spreadsheet or Sequel Pro query results)"
            no-resize
          />
          <div class="pt-2">
            Item Count: <strong>{{this.inputItemCount}}</strong>
          </div>
        </b-col>
        <b-col md="3" lg="2" class="p-3">
          <div class="mt-5">
            <b-button block v-on:click="transform" variant="info" type="button">Transform</b-button>

            <div class="mt-4">
              <b-form-checkbox v-model="removeBlanks">Remove blanks</b-form-checkbox>
              <b-form-checkbox v-model="removeDuplicates">Remove duplicates</b-form-checkbox>
            </div>
          </div>
        </b-col>
        <b-col md="5" lg="6" class="p-3">
          <div class="mb-2">
            <b-button size="sm" v-on:click="copy('output')">
              <b-icon-files></b-icon-files> Copy
            </b-button>
          </div>
          <b-form-textarea
            id="output"
            v-model="output"
            rows="25"
            no-resize
          />
          <div class="pt-2">
            Item Count: <strong>{{this.outputItemCount}}</strong>
          </div>
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
      input: '',
      inputItemCount: 0,
      output: '',
      outputItemCount: 0,
      removeBlanks: true,
      removeDuplicates: true
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
      this.inputItemCount = this.countItems(this.input, '\n');
    },

    countItems: function(input, delimiter) {
      let regex = new RegExp(delimiter, 'g');
      return input.length == 0 ? 0 : (input.match(regex) || []).length + 1;
    },

    reset: function() {
      Object.assign(this.$data, this.$options.data.apply(this));
    },

    transform: function() {
      let inputValue = this.input;

      if (inputValue !== undefined) {
        var transformed = inputValue.replace(/\n/g, ',');

        if (this.removeDuplicates === true) {
          let items = transformed.split(',');
          const uniqueSet = new Set(items);
          transformed = [...uniqueSet].join(',');
        }

        if (this.removeBlanks === true) {
          let items = transformed.split(',');
          const nonBlanks = items.filter(item => item.trim().length > 0);
          transformed = nonBlanks.join(',');
        }

        this.output = transformed;
        this.outputItemCount = this.countItems(transformed, ',');
      }
    }
  }
}
</script>
