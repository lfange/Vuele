<template>
  <div
    class="sk-ctrl-organization-selector-container"
    :style="{width: width ? (width + 'px'): '' }"
  >
    <el-dropdown
      ref="dropdown"
      v-if="!disabled"
      :style="{ 
                width: width ? (width + 'px') : '100%',
                height: '100%',
                position: 'absolute',
                left: '0px',
                bottom: '5px'
            }"
      @visible-change="onVisible"
      trigger="click"
      class="sk-ctrl-organization-selector"
      menu-align="start"
    >
      <span></span>
      <el-dropdown-menu
        slot="dropdown"
        :style="{ width: popoverWidth + 'px', overflow: 'auto'}"
        class="sk-ctrl-organization-selector-dropdown"
      >
        <el-dropdown-item
          :style="{ 'min-height': dropdownHeight + 'px', 'max-height': dropdownMaxHeight + 'px' }"
        >
          <div style="text-align: center" v-if="loading">加载中...</div>
          <el-tree
            ref="tree"
            v-else
            @node-expand="onExpand"
            @node-click="clickCheck"
            @check-change="nodeCheckChange"
            node-key="id"
            :render-content="renderContent"
            :check-strictly="true"
            :show-checkbox="true"
            :accordion="accordion"
            :expand-on-click-node="true"
            :data="treeSource || []"
            :default-checked-keys="value || []"
          />
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-popover
      ref="selections"
      placement="bottom-start"
      :visible-arrow="false"
      :width="popoverWidth - 20"
      :disabled="!usePopper || dropdownVisible || !Boolean(popovers.length)"
      :open-delay="350"
      trigger="hover"
      @show="computePopoverWidth"
    >
      <div class="sk-ctrl-organization-selector-selections">
        <el-tag
          v-for="opt in popovers"
          :key="opt.id"
          :title="opt.label"
          size="mini"
          closable
          @close="cancelSelection(opt.id)"
        >{{opt.label}}</el-tag>
        <div v-if="usePopperButtons" style="float: right">
          共
          <b>{{popovers.length}}</b>项
          <el-button type="text" @click="clear">清空</el-button>
          <el-button type="primary" @click="showPopper">选择</el-button>
        </div>
      </div>
    </el-popover>
    <el-input
      :icon="icon"
      ref="input"
      v-popover:selections
      @mouseover.native="hover=true"
      @mouseout.native="hover=false"
      :disabled="disabled"
      :placeholder="placeholder"
      :on-icon-click="iconClick"
      @click.native="inputClick"
      @focus="selectOnFocus"
      v-model="text"
    />
  </div>
</template>
<style>
.sk-ctrl-organization-selector-selections {
  max-height: 200px;
  overflow-y: auto;
  cursor: default;
}
.sk-ctrl-organization-selector-selections .el-tag {
  background-color: transparent !important;
  border: 1px solid #20a0ff;
  color: #20a0ff;
  margin: 2px 8px;
}

.sk-ctrl-organization-selector-selections .el-tag:hover {
  background-color: #20a0ff !important;
  color: white;
}

.sk-ctrl-organization-selector-container {
  display: inline-block;
  position: relative;
  height: 30px;
  overflow: hidden;
}

.sk-ctrl-organization-selector-container input {
  cursor: pointer;
}

.sk-ctrl-organization-selector .el-input__icon {
  right: 0px;
}

.sk-ctrl-organization-selector .el-button {
  height: 25px !important;
  padding: 1px;
}

.sk-ctrl-organization-selector-dropdown.el-dropdown-menu {
  padding: 0px;
}
.sk-ctrl-organization-selector-dropdown.el-dropdown-menu
  .el-dropdown-menu__item,
.sk-ctrl-organization-selector-dropdown.el-dropdown-menu
  .el-dropdown-menu__item:not(.is-disabled):hover {
  padding: 0px;
  background-color: transparent;
}

.sk-ctrl-organization-selector-dropdown.el-dropdown-menu .el-tree {
  border: none;
}

.sk-ctrl-organization-selector-dropdown.el-dropdown-menu
  .el-tree-node__content
  > .el-tree-node__expand-icon {
  padding: 0px;
}
.sk-ctrl-organization-selector-dropdown.el-dropdown-menu
  .el-tree-node
  > .el-tree-node__children {
  overflow: visible;
}
</style>
<script>
import {
  OrganizationSource,
  OrganizationSourceOptions
} from "@/plugins/organization-selector/source.js";

export default {
  props: {
    accordion: Boolean,
    placeholder: { type: String, default: "请选择" },
    disabled: Boolean,
    visibleSwitch: { type: Boolean, default: true }, // 可见性控制，true 时仅加载组织机构中 IS_SHOW = 1 的数据， 否则全部
    rootLevel: Number, // 根层级，默认显示有权限的节点
    type: { type: String, default: "Number" },
    usePopper: { type: Boolean, default: true }, // 悬停时是否显示选中项
    usePopperButtons: { type: Boolean, default: true }, // 悬停时是否显示选中项
    useIcon: { type: Boolean, default: true },
    useClickCheck: { type: Boolean, default: false }, // 点击时选中切换
    value: { type: Array },
    width: { type: [Number, String], default: 200 },
    selectedLevels: Array, // 可选级别，不指定全部可选
    cascade: { type: Boolean, default: false }, // 级联关联，选择上级后，下级将被判定为级联选择，并清空已选择下级，并取消加载下级数据节点
    levelDepth: Number, // 展开深度，默认全部
    dropdownWidth: { type: [Number, String], default: "" },
    dropdownHeight: { type: [Number, String], default: 220 },
    dropdownMaxHeight: { type: [Number, String], default: 220 },
    suggestionSize: { type: Number, default: 30 }, // 过滤时可使用的项数量
    validateEvent: { type: Boolean, default: true },
    clearable: { type: [Boolean, String], default: true },
    options: Object,
    uri: { type: String }, // 源Uri 将覆盖到 options.sourceUri 中,
    selectionMode: { type: [Boolean, String, Number], default: false } // id = value, code = '', name = label, formatLabel = name
  },
  data() {
    return {
      text: "",
      emitting: 0,
      assignText: 0,
      current: null,
      hover: false,
      popovers: [],
      treeSource: null,
      loading: false,
      typing: false,
      popoverWidth: 100,
      dropdownVisible: false,
      source: new OrganizationSource()
    };
  },
  created() {
    if (this.options || this.uri || this.selectionMode) {
      let options = Object.assign(
        new OrganizationSourceOptions(),
        this.options || {}
      );
      options.sourceUri = this.uri || options.sourceUri;
      if (this.selectionMode) {
        options.id = (this.options && this.options.id) || "value";
        options.name = (this.options && this.options.name) || "label";
        options.formatDisplayLabel =
          (this.options && this.options.formatDisplayLabel) ||
          (item => item.name);
      }
      this.source.options = options;
    }
    this.transcoding();
  },
  mounted() {},
  computed: {
    icon() {
      if (this.loading) return "loading";
      if (!this.useIcon || this.disabled) return "";
      if (this.clearable && this.hover && this.current && this.current.length)
        return "circle-close";
      return this.dropdownVisible ? "caret-top" : "caret-bottom";
    }
  },
  watch: {
    text(val) {
      if (!this.assignText) this.onTextChange(val);
    },
    value(val) {
      this.transcoding();
      if (!this.emitting && JSON.stringify(val) !== JSON.stringify(this.curent))
        this.$nextTick(() => this.complete(val));
    }
  },
  methods: {
    renderContent(h, options) {
      return h("span", {
        class: "el-tree-node__label",
        domProps: {
          title: options.data.label,
          innerHTML: options.data.label
        }
      });
    },
    computePopoverWidth() {
      let minWidth = (this.dropdownWidth && Number(this.dropdownWidth)) || 100;
      this.popoverWidth = Math.max(
        minWidth,
        (this.$refs.input && this.$refs.input.$el.clientWidth - 12) || 0
      );
    },
    clear() {
      this.treeSource = [];
      this.popovers = [];
      this.complete([]);
    },
    cancelSelection(v) {
      this.current && this.complete(this.current.filter(_ => _ != v));
    },
    setText(text) {
      this.assignText++;
      try {
        this.text = text;
      } finally {
        this.$nextTick(() => this.assignText--);
      }
    },
    selectOnFocus(e) {
      e.target.select();
    },
    iconClick() {
      if (this.clearable && this.hover && this.current && this.current.length) {
        this.clear();
      } else {
        this.showPopper();
      }
    },
    inputClick(e) {
      if (e && e.target && e.target.nodeName === "INPUT") this.showPopper();
    },
    showPopper() {
      if (this.$refs.dropdown) {
        if (this.dropdownVisible) {
          this.$refs.dropdown.hide();
        } else {
          this.$refs.dropdown.show();
          this.loading = true;
          this.source
            .getRoots(this.rootLevel, this.visibleSwitch)
            .then(roots => {
              this.treeSource = roots.map(this.createLazyNodes);
              this.$nextTick(() => {
                this.value &&
                  this.$refs.tree &&
                  this.$refs.tree.setCheckedKeys(this.value);
                this.loading = false;
              });
            });
        }
      }
    },
    onTextChange(val) {
      if (val) {
        this.typing = true;
        this.loading = true;
        this.current = [];
        this.$refs.dropdown.show();
        this.filterOrganizations().then(orgs => {
          this.treeSource = orgs.map(this.createLazyNodes);
          this.$nextTick(() => {
            this.$refs.tree && this.$refs.tree.setCheckedKeys([]);
            this.loading = false;
          });
        });
      } else {
        this.clear();
      }
    },
    transcoding() {
      if (this.value && this.value.length) {
        let values = this.value.filter(
          _ => _ !== null && _ !== undefined && _ !== ""
        );
        if (values.length) {
          this.loading = !Boolean(this.emitting);
          this.source.getDictionary().then(dictionary => {
            let selectedLevels = this.selectedLevels || [];
            this.popovers = values
              .map(_ => dictionary[_])
              .filter(_ => Boolean(_))
              .filter(_ => !this.levelDepth || _.level <= this.levelDepth)
              .filter(
                _ =>
                  !selectedLevels.length || selectedLevels.indexOf(_.level) >= 0
              );
            if (this.popovers.length !== values.length) {
              // 存在不符合选择级别筛选的数据
              this.complete(this.popovers.map(_ => _.id));
            } else {
              this.current = values;
              this.setText(this.popovers.map(_ => _.label).join("，"));
            }
            this.$nextTick(() => (this.loading = false));
          });
          return; // break
        }
        this.clear(); // 由于筛查被清空, 清空控件以触发回调事件
      }

      this.popovers = [];
      this.setText("");
    },
    filterOrganizations() {
      return this.source
        .getFilterSource(
          this.rootLevel,
          this.selectedLevels,
          this.visibleSwitch
        )
        .then(filterSource => {
          let orgs = new Array();
          let filters = (this.text || "")
            .replace(/^\s*(\S)\s*$/g, "$1")
            .toUpperCase()
            .split(/\s+/g);
          for (
            let v = 0;
            v < filters.length && orgs.length < this.suggestionSize;
            v++
          ) {
            var val = filters[v];
            if (!val) continue;
            for (
              let i = 0;
              i < filterSource.length && orgs.length < this.suggestionSize;
              i++
            ) {
              let org = filterSource[i];
              if (this.levelDepth && org.level > this.levelDepth) continue;
              if (val == "*" || org.match(val))
                orgs.push({ id: org.id, label: org.label, level: org.level });
            }
          }

          return orgs;
        });
    },
    onVisible(visible) {
      this.dropdownVisible = visible;
      if (!visible) {
        if (this.typing) {
          this.typing = false;
        }
        this.complete(this.current);
        this.$nextTick(() => (this.treeSource = null));
      } else {
        this.computePopoverWidth();
      }
    },
    createLazyNodes(e, node) {
      node =
        e == null && node && node.id
          ? node
          : { id: e.id, label: e.label, level: e.level, children: [] };
      if (this.cascade) {
        // 处理级联选中
        node.cascaded = this.value && this.value.indexOf(node.id) >= 0;
        if (node.cascaded) return node;
      }
      node.disabled =
        this.selectedLevels &&
        this.selectedLevels.length &&
        !Boolean(this.selectedLevels.find(_ => _ == node.level));
      if (!this.levelDepth || node.level < this.levelDepth) {
        // 深度层级过滤
        this.source.getChildren(node.id, this.visibleSwitch).then(children => {
          node.children = children && children.length ? [false] : [];
        });
      }
      return node;
    },
    onExpand(node) {
      if (node.children && node.children.length && node.children[0] === false) {
       
        this.source.getChildren(node.id, this.visibleSwitch).then(children => {
          if (node.level === 2) {        //   将第三层级的数据过滤，直接显示第四层级的数据
            let childrens = children.map(this.createLazyNodes);
            let level3 = childrens.map(this.createLazyNodes);
            level3.map((_,index)=>{
                this.source.getChildren(_.id, this.visibleSwitch).then(children =>{
                    let level4 = children.map(this.createLazyNodes);
                    if(level4.length !== 0){
                        node.children.push(level4[0])
                    }
                })
                            
            })
            node.children.splice(0,1)   //删除第一个值为false;
          } else {
              node.children = children.map(this.createLazyNodes);
          }
          this.$nextTick(
            () =>
              this.current &&
              this.$refs.tree &&
              this.$refs.tree.setCheckedKeys(this.current)
          );
        });
      }
    },
    clickCheck(node) {
      if (this.useClickCheck && !node.disabled) {
        // click toggle check status
        this.nodeCheckChange( node, !Boolean((this.current || []).find(_ => _ == node.id)) );
        this.$nextTick(
          () =>
            this.current &&
            this.$refs.tree &&
            this.$refs.tree.setCheckedKeys(this.current)
        );
      }
    },
    nodeCheckChange(node, checked) {
      if (this.cascade) {
        this.$nextTick(() => {
          if (checked) {
            node.cascaded = true;
            node.children = [];
            let tree = this.$refs.tree;
            if (tree && tree.$children) {
              // collapsed current checked node
              function collapsed(children, val) {
                var el = children.find(_ => _ && _.node && _.node.data === val);
                if (el) {
                  return (
                    el.node && el.node.expanded && (el.node.expanded = false)
                  );
                }
                for (let i = 0; i < children.length; i++) {
                  collapsed(children[i].$children, val);
                }
              }
              collapsed(tree.$children, node);
            }
          } else if (node.cascaded) {
            this.createLazyNodes(null, node);
          }
        });
      }

      var current = this.current || [];
      var exists = current.find(_ => _ == node.id) !== undefined;
      if (!checked && exists) {
        // 取消存在
        this.complete(current.filter(_ => _ != node.id));
      } else if (checked && !exists) {
        // 追加选择
        this.complete([node.id].concat(current));
      }
    },
    getSelectionNodes() {
      return this.popovers;
    },
    complete(val) {
      this.current = val || [];
      val =
        val &&
        val
          .filter(_ => _ !== "" && _ !== null && _ !== undefined)
          .map(_ => (this.type == "string" ? String(_) : Number(_)));
      this.emitting++;
      this.$emit("input", val);
      this.$emit("change", val);
      this.$emit("blur");
      if (this.validateEvent && this.$refs.input) {
        this.$refs.input.dispatch("ElFormItem", "el.form.change", [val]);
        this.$refs.input.dispatch("ElFormItem", "el.form.blur", [val]);
      }
      this.$nextTick(() => this.emitting--);
    }
  }
};
</script>