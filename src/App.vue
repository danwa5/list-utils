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
            rows="24"
            placeholder="Enter a list of items (e.g. column of Google Spreadsheet or Sequel Pro query results)"
            no-resize
          />
          <div class="pt-2">
            Item Count: <span class="inputItemCount"><strong>{{this.inputItemCount}}</strong></span>
          </div>
        </b-col>
        <b-col md="3" lg="2" class="p-3">
          <div class="mt-5">
            <b-button block v-on:click="transform" variant="info" type="button">Transform</b-button>

            <div class="mt-4">
              <b-form-select id="delimiter" v-model="selectedDelimiter" :options="delimiterOptions" size="sm" class="my-1"></b-form-select>
              <b-form-checkbox id="removeBlanks" v-model="removeBlanks" class="py-1">Remove blanks</b-form-checkbox>
              <b-form-checkbox id="removeDuplicates" v-model="removeDuplicates" class="py-1">Remove duplicates</b-form-checkbox>
              <b-form-checkbox id="encloseInQuotes" v-model="encloseInQuotes" class="py-1">Enclose in quotes</b-form-checkbox>
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
            rows="24"
            no-resize
          />
          <div class="pt-2">
            Item Count: <span class="outputItemCount"><strong>{{this.outputItemCount}}</strong></span>
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
      selectedDelimiter: 'comma',
      delimiterOptions: [
        { value: 'comma', text: 'Delimiter: comma' },
        { value: 'newline', text: 'Delimiter: newline' },
        { value: 'semicolon', text: 'Delimiter: semicolon' }
      ],
      removeBlanks: true,
      removeDuplicates: true,
      encloseInQuotes: false
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
        const delimiters = {
          'comma': ',',
          'newline': '\n',
          'semicolon': ';'
        }

        const delimiter = delimiters[this.selectedDelimiter];

        // no need to replace delimiter if it hasn't changed
        var transformed = this.selectedDelimiter === 'newline' ? inputValue : inputValue.replace(/\n/g, delimiter);

        if (this.removeDuplicates === true) {
          let items = transformed.split(delimiter);
          const uniqueSet = new Set(items);
          transformed = [...uniqueSet].join(delimiter);
        }

        if (this.removeBlanks === true) {
          let items = transformed.split(delimiter);
          transformed = items.filter(item => item.trim().length > 0).join(delimiter);
        }

        if (this.encloseInQuotes === true) {
          let items = transformed.split(delimiter);
          transformed = items.map(item => `'${item}'`).join(delimiter);
        }

        this.output = transformed;
        this.outputItemCount = this.countItems(transformed, delimiter);
      }
    }
  }
}
</script>
