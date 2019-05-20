<template>
    <div class="qib-box-container" :title="displayText" :width="boxWidth" ref="container"
        @mouseover="focus = true"  @mouseout="focus = false" >
        <el-input :on-icon-click="iconClick" :disabled="disabled" :placeholder="placeholder || '请输入'" ref="text" :readonly="readonly" v-model="displayText" 
            :icon="icon" @focus="selectOnFocus"/>
        <div class="qib-box-options el-select-dropdown" v-if="showSuggestions" ref="options">
            <div v-if="!loading && options.length">
                <i v-for="opt in options" :title="opt[optionLabel]" :data-quick-value="opt[optionValue]" :key="opt[optionValue]"
                    :class="options[0] == opt ? 'selected' : ''"
                >{{opt[optionLabel]}}</i>
            </div>
        </div>
    </div>
</template>
<style>
input[class="el-input__inner"]::-ms-clear {
    display:none;
}
.qib-box-container {
    display: inline-block;
}

.qib-box-options {
    z-index: 99999;
    position: absolute;
    border-radius: 2px;
    height: 200px;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 0px;
}

.qib-box-options i {
    font-style: normal;
    word-break: break-all;
    white-space: nowrap;
    padding: 3px;
    display: block;
    border-radius: 1px;
    cursor: default;
    overflow: hidden;
    line-height: 26px;
    height: 26px;
}
.qib-box-options i.selected {
    background-color: lightskyblue !important;
}

.qib-box-options i:hover {
    background-color: #e8e8e8;
}
</style>

<script>
export default {
    name: 'quick-input',
    props: {
        value: { type: [Number, String, Object] },
        text: String,
        selectable: {type: [Boolean, String], default: false},
        selectFilter: {type: String, default: '*' },
        filterName: {type: String, default: 'filter' },
        scope: {type: [String, Boolean, Number, Object, Array, Function]},
        customOptions: {type: [Function, Array, Object]},
        url: {type: String},
        textUrl: {type: String},
        placeholder: {type: String},
        readonly: {type: [String, Boolean]},
        disabled: {type: [String, Boolean]},
        optionValue: {type: String, default: 'value'},
        optionLabel: {type: String, default: 'label'},
        suggestionDelay: {type: Number, default: 400 },
        clearable: {type: [Boolean, String], default: true},
        valueDetectOnChanged: {type: Boolean, default: false}   // 是否在changed事件时检测 value == this.value
    },
    data() {
        if(!this.customOptions && !this.url){
            throw new Error('请指定 customOptions 或 url 属性.');
        }
        return {
            dropdownTimer: null,
            boxWidth: this.width,
            loading: false,
            focus: false,
            hiddenValue: this.value,
            displayText: this.text,
            showSuggestions: false,
            typing: true,  // 手工输入标志
            options: []
        };
    },
    beforeDestroy(){
        this.clear();
        if(this.$refs.options) this.$refs.options.remove(); // 清理options层，避免在session出错时仍显示
    },
    computed: {
        icon: {
            cache: false,
            get() {
                if(this.disabled) return '';
                if(this.loading) return 'loading';
                if(this.focus && this.clearable && this.hiddenValue) return 'circle-close';
                if(!this.selectable) return 'search';
                return this.showSuggestions ? 'caret-top' : 'caret-bottom';
            }
        }
    },
    watch: {
        showSuggestions(val, old){
            document.removeEventListener('keydown', this.keydown, true);
            document.removeEventListener('click', this.click, true);
            if(val) {
                document.addEventListener('keydown', this.keydown, true);
                document.addEventListener('click', this.click, true);
            }
        },
        hiddenValue(value, old) {
            if (old === value || this.valueDetectOnChanged && value == this.value/*来自属性value绑定新值时不触发事件*/) return;
            
            this.$emit('input', value, this.scope);
            this.$emit('change', value, this.options.find(_=> String(_[this.optionValue]) == value), this.scope);
            this.dispatch('ElFormItem', 'el.form.change', [value]);
            this.dispatch('ElFormItem', 'el.form.blur', [value]);
        },
        value(value, old) {
            if(this.hiddenValue == value) return;
            
            var text = value ? this.text : null;
            this.hiddenValue = value;
            this.typing = false;
            this.displayText = text;
            this.$nextTick(function(){ this.typing = true; });
        },
        text(text, old) {
            this.typing = false;
            this.displayText = text;
            this.$nextTick(function(){ this.typing = true; });
        },
        displayText(text, oldText) {
            clearTimeout(this.dropdownTimer);

            if (text === oldText) return;

            if (!this.typing) return;

            if (!text) { // 清空
                return this.clear();
            }
            this.dropdownTimer = setTimeout(this.loadSuggestions, this.suggestionDelay);
        },
        textUrl(url, oldUrl){
            var me = this;
            me.loading = true;
            this.axios.post(url).then(response => {
                me.loading = false;
                if(response.data && response.data.success) {
                    if(typeof response.data.data == 'string') {
                        me.displayText = response.data.data;
                    } else if(typeof response.data.data == 'object'){
                        me.displayText = response.data.data[me.optionLabel];
                    } else {
                        me.clear();
                    }
                } else {
                    me.clear();
                }
            }).catch(()=>me.loading = false);
        }
    },
    methods: {
        iconClick(){
            if(this.hiddenValue && this.clearable) {
                this.clear();
            } else if(this.selectable){
                this.toggleSuggestionsPopper();
            }
        },
        toggleSuggestionsPopper(){
            if(this.showSuggestions) return this.showSuggestions = false;
                
            if(this.displayText == this.selectFilter)
            {
                clearTimeout(this.dropdownTimer);
                this.dropdownTimer = setTimeout(this.loadSuggestions, this.suggestionDelay || 249);
            } else {
                this.displayText = this.selectFilter;
            }
        },
        setValue(val, text){
            this.dispatch('ElFormItem', 'el.form.change', [val]);
            this.dispatch('ElFormItem', 'el.form.blur', [val]);
            this.showSuggestions = false;
            this.typing = false;
            this.hiddenValue = val;
            this.displayText = text;
            this.$nextTick(function(){ this.typing = true; });

            if(this.$refs.options){
                this.$refs.container.appendChild(this.$refs.options);
            }
        },
        selectOnFocus(e) {
            e.target.select();
            if(this.selectable)
                this.toggleSuggestionsPopper();
        },
        scrollIntoView(el){
            el.offsetParent.scrollTop = Math.max(0, el.offsetTop - el.offsetParent.clientHeight + el.offsetHeight * 1.25);
        },
        keydown(e){
            if(!this.$refs.options) return;
            switch(e.keyCode){
                case 13:    // 回车确认
                    var el = this.$refs.options.querySelector('i.selected');
                    if(el) {
                        this.setValue(el.getAttribute('data-quick-value'), el.innerText);
                    }
                    break;
                case 38:    // 选项上移
                    var el = this.$refs.options.querySelector('i.selected');
                    if(el && el.previousElementSibling) {
                        el.previousElementSibling.className = 'selected';
                        this.scrollIntoView(el.previousElementSibling);
                        el.className = '';
                    }
                    break;
                case 40:    // 选项下移
                    var el = this.$refs.options.querySelector('i.selected');
                    if(el && el.nextElementSibling) {
                        el.nextElementSibling.className = 'selected';
                        this.scrollIntoView(el.nextElementSibling);
                        el.className = '';
                    }
                    break;
            }
        },
        clear() {
            this.options = [];
            this.setValue(null, '');
            
            document.removeEventListener('keydown', this.keydown, true);
            document.removeEventListener('click', this.click, true);
        },
        click(e) {
            var el = e.target;
            if (el.nodeName === "I" && el.hasAttribute('data-quick-value')) {
                this.setValue(el.getAttribute('data-quick-value'), el.innerText);
            } else if (el === this.$refs.container) {
                return;
            } else {
                this.clear();
            }
        },
        loadSuggestions() {
            var me = this;
            me.loading = true;
            me.options = [];
            me.showSuggestions = true;

            me.$nextTick(function () {
                var options = me.$refs.options;
                var bounding = me.$refs.container.getBoundingClientRect();

                options.style.width = (me.$refs.container.clientWidth) + 'px';
                options.style.left = bounding.left + 'px';
                options.style.top = (bounding.height + bounding.top) + 'px';
                document.body.appendChild(options);
            });
            
            if(this.url) {
                var args = ({});
                args[this.filterName] = this.displayText;
                this.axios.post(this.url, args)
                    .then((options) => {
                        me.loading = false;
                        if (options.data.success) {
                            me.options = options.data.data;
                        }
                    })
                    .catch(_ => me.loading = false);
            } else if(typeof me.customOptions == 'object' &&  me.customOptions.construcotr == Array) {
                me.options = me.customOptions;
                me.loading = false;
            } else if(typeof me.customOptions == 'function') {
                me.customOptions(me.displayText, function(options) {
                    me.loading = false;
                    if(options && options.length)
                        me.options = options;
                }, me.scope);
            }
        },
        dispatch(componentName, eventName, params) {
            this.$refs.text.dispatch(componentName, eventName, params);
        }
    }
};
</script>
