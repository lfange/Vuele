<template>
	<div class="remoteSearch">
		<el-select
    		v-model="value"
    		multiple
    		filterable
    		remote
    		reserve-keyword
			class="showCol"
			:remote-method="remoteMethod"
    		placeholder="请输入检索内容"
			style="width:180px;"
			:loading="Thisloading"
    		>
    		<el-option
      			v-for="item in Options"
      			:key="item.id"
      			:label="item.value"
      			:value="item.id">
    		</el-option>
  		</el-select>
	</div>
</template>
<script>
	export default{
		props:{
			url:{
				type:String
			},
			str:{}
		},
		data(){
			return{
				value:"",
				Thisloading:false,
				Options:[],
				list:[],
				states:[],
			}
		},
		watch:{
			value(){
				this.$emit('input', this.value);
				// if(this.value !== null){
					
				// }else{
					// this.$emit(null, this.value);
				// }
			}
		},
		methods:{
			remoteMethod:function(query){
				if (query !== '') {
						 this.Thisloading = true;
						 this.Options = [];
						 this.axios.post(this.$props.url+"&"+this.$props.str+'='+query)
							 .then(res=>{
									// this.states =res.data.data;
								this.Options =res.data.data;
								// for(var key in res.data.data){
								// 	this.states[key] =res.data.data[key]
								// 	this.list[key] =res.data.data[key]
								// }
								this.Thisloading = false;

							 }).catch((err)=>{
								 this.Thisloading = false;
								 this.Options = [];
							 })
							 
						//  setTimeout(() => {
						//    this.Thisloading = false;
						//    this.Options = this.list.filter(item => {
						// 	//    if(item.value){
						// 			return item.value.toLowerCase()
						// 			 .indexOf(query.toLowerCase()) > -1;
						// 	//    }else{
						// 	// 	   return item.value.toLowerCase()
						// 	// 		 .indexOf(query.toLowerCase()) > -1;
						// 	//    }
						//    });
						//  }, 200);
					   } else {
						 this.Options = [];
					   }
			},

		}
	}
</script>
<style scoped>
/* .showCol .el-select__tags {
	max-height: 36px;
	white-space: nowrap;
	overflow: hidden;
} */
	/* .showCol .el-input .el-input__inner {
        height: 25px !important;
    } */
</style>
