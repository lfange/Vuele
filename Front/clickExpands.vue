<template>
	<div class="clickExpands inline-block">
		<el-input type="textarea"
						:rows="1"
						placeholder="请输入"
						v-model="valData"
						resize="none"
						class="el-input-180 s"
						@focus="txtHeight($event)"
						@blur="txtYheight"
            :disabled="disabled"
            >
		</el-input>
	</div>
</template>

<script>
export default {
  props: {
    value: {},
    disabled:{type:Boolean,default:false}
  },
  data() {
    return {
      valData: ""
    };
  },
  watch: {
    valData() {
      this.$emit("input", this.valData);
      // this.$emit("clickExpands", this.valData);
    },
    value(val) {
      this.valData = val;
    }
  },
  created () {
          this.valData = this.value 
        },
  methods: {
    txtHeight: function(event) {
      let el = event.currentTarget;
      $(el)
        .parent()
        .css("position", "relative");
      $(el).css({
        height: "115px",
        position: "absolute",
        top: "-25px",
        left: "0",
        "z-index": "99",
        "vertical-align": "middle"
      });
      this.$emit('focus')
    },
    txtYheight: function() {
      $(".s").css("position", "relative");
      $(".s textarea").css({"height":"25px","z-index":"0"});
      this.$emit('blur');
      this.$emit("change", this.valData);
    }
  }
};
</script>

<style scoped>
.inline-block {
  display: inline-block;
}
</style>
<style>
.clickExpands .el-textarea .el-textarea__inner {
  height: 25px;
  padding: 1px 0 0 5px;
  word-wrap: break-word;
  white-space: normal;
}
</style>


