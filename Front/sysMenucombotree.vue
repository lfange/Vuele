<template>
    <div class="ats-tree" v-clickoutside="handleCloseTree" ref="atsTree">
        <el-input v-model="parentModuleName" readonly class="parentModuleName" @focus="treeVisible=true" :icon="close" :on-icon-click="_handleIconClick">
        </el-input>
        <el-input v-model="form.ParentModuleId" v-show="ParentModuleIdShow"></el-input>
        <el-tree v-show="treeVisible" :data="treeData" :props="defaultProps" node-key="treeData.id" @node-click="_handleNodeClick" class="tree"></el-tree>
    </div>
</template>

<script>
import Clickoutside from "@/util/clickoutside";
export default {
    props: {
        form: {
            type: Object
        }
    },
    data() {
        return {
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            treeVisible: false,
            ParentModuleIdShow: false,
            treeData: [],
            parentModuleName: ""
        }
    },
    created: function () {
        this._loadtree();
    },
    watch: {
        form() {//监听父组件传过来的form值.解决了只调用一次生成树的数据的bug
            this._loadtree();
        }
    },
    methods: {
        _loadtree() {
            let _this = this;
            this.axios.get('/Sys/ModuleManagement/GetParentModules').then((res) => {//得到树的数据
                _this.treeData = res.data.children;
                this.getParentName(_this.treeData, _this.form.ParentModuleId);
            }).catch(function (err) {});
        },
        _handleNodeClick(node) {
            this.form.ParentModuleId = node.id;
            this.parentModuleName = node.label;
            this.treeVisible = false;
        },
        handleCloseTree(val) {
            if (val == undefined) {
                this.treeVisible = false;
            } else {
                this.treeVisible = val;
            }
        },
        getParentName(data, PID) {
            for (let key in data) {
                if (data[key].id === PID + "") {
                    this.parentModuleName = data[key].label;
                    this.icon = "close";
                    return;
                } else {
                    this.getParentName(data[key].children, PID);
                }
            }
        },
        _handleIconClick() {
            this.parentModuleName = "";
        },
    },
    computed: {
        close() {
            if (this.parentModuleName !== "") {
                return 'close';
            } else {
                return;
            }
        }
    },
    directives: { Clickoutside },
}
</script>

<style scoped>
.ats-tree {
    position: relative;
}

.parentModuleName {
    width: 180px;
}

.tree {
    width: 176px;
    height: 130px;
    overflow-y: scroll;
    position: absolute;
    top: 36px;
    left: 0;
    z-index: 100;
}
</style>
