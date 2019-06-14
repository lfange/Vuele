<template>
    <span>{{ loading ? '...' : displayText}}
        <span v-if="loading" class="el-icon-loading"></span>
    </span>
</template>
<script>
import {MemoryCache} from '@/util/cache.js';
const cache = new MemoryCache.getDefaultCache();

export default {
    name: 'transcoding',
    props: ["source", "valueColumn", "value", "display", "seperator", "display2", 'errorText', 'emptyText'],
    data(){
        return {
            displayText: '',
            sourceValue: '',
            loading: false
        }
    },
    created() { this.transcoding(); },
    watch: {
        value(v){ this.transcoding(); }
    },
    methods: {
        transcoding(){
            if(this.value !== this.sourceValue) {
                this.sourceValue = this.value;
                if(!this.sourceValue) return this.displayText = this.emptyText;

                var cacheKey = JSON.stringify({
                        a: this.source && this.source.toUpperCase(),
                        b: this.valueColumn && this.valueColumn.toUpperCase(),
                        c: this.value,
                        d: this.display && this.display.toUpperCase(),
                        e: this.seperator,
                        f: this.display2 && this.display2.toUpperCase()
                });
                this.loading = true;
                cache.getOrAdd(cacheKey, (complete, error)=>
                        this.axios.post('/Common/Transcoding/' 
                                    + (this.source && this.source.toUpperCase())
                                    + '/' +  (this.valueColumn || '').toUpperCase()
                                    + '/' +  this.value
                                    + '/' +  (this.display || '').toUpperCase()
                                    + (this.display2 && ('/' + (this.seperator || '_')) || '')
                                    + (this.display2 && ('/' +  this.display2) || ''),
                            )
                            .then(response => complete(response.data.data))
                            .catch(e => error('转码失败：' + e))
                        , 600
                    )
                    .then(text => {
                        this.loading = false;
                        this.$emit('complete', text, this.value, this.scope);
                        this.displayText = text || this.emptyText;
                    })
                    .catch(e => {
                        console.log(e)
                        this.loading = false;
                        this.$emit('error', this.value, this.scope);
                        this.displayText = this.errorText || this.value;
                    });
                    // test
            }
        }
    }
};
</script>
