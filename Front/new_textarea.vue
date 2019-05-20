<template>
  <div>
    <textarea @keyup="keyup_methods" class="new_textarea" @focus="textarea_focus" @blur="textarea_blur" v-model="values" placeholder="请输入">
    </textarea>
  </div>
</template>
<script>
export default {
  props: ['isReg', 'isChina', 'value', 'number','IsShort'],
  data() {
    return {
      values: null,
      value_other: null
    };
  },
  created() {
    this.values = this.value;
    // this.values = (this.value || []).join('\s');
  },
  watch: {
    value(val) {
      this.values = val;
    }
  },
  methods: {
    textarea_focus(a) {
      if(this.IsShort)
      {
        a.target.style.height = '85px';
      }else
      {
        a.target.style.height = '115px';

      }
    },
    textarea_blur(a) {
      this.keyup_methods();
      a.target.style.height = '27px';
    },
    keyup_methods(a) {
      if (this.number && this.isReg) {
        this.values = String(this.values).replace(/[^0-9|\n]/g, '');
        let nbr = this.values.lastIndexOf('\n');
        let n = this.values.split(/\n/g).length - 1;
        if (n === 0) {
          this.values = this.values.substr(0, this.number);
        } else {
          if (this.values.substr(nbr).length - 1 > this.number) {
            this.values =
              this.values.substr(0, nbr) +
              this.values.substr(nbr, this.number + 1);
          }
        }
      }
      if (!this.$props.isReg) {
        if (typeof this.values == 'object') return;
        this.values = this.values
          .replace(/[^[A-Za-z0-9_\n]/gi, '')
          .toUpperCase();
      }
      if (this.$props.isReg && this.$props.isChina) {
        this.values = this.values.toUpperCase();
      }
      var arry = [];
      this.values &&
        this.values.split('\n').map(item => {
          if (item !== '') {
            arry.push(item);
          }
        });
      // this.$props.value=arry
      this.$emit('input', this.values);
    }
  }
};
</script>
    <style scoped>
.new_textarea {
  position: absolute;
  z-index: 5;
  border: 1px solid #bfcbd9;
  outline: none;
  box-sizing: border-box;
  margin: 0;
  padding: 2px;
  height: 27px;
  border-radius: 5px;
  width: 100%;
  resize: none;
}
</style>
    