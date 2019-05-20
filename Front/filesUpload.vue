<template>
  <div class="filesUple">
    <el-row :gutter="4" v-if="showAll">
      <el-col :span="18" :xs="6">
        <el-input v-model="filesUpleNum" disabled v-show="!onlyshowButton" class="filesUpleInput"></el-input>
      </el-col>
      <el-col :span="6" :xs="6">
        <el-button type="primary" @click.stop="dialogVisible = true" v-if="Boolean(FileTableData.length)&&Boolean(FileTableData[0].keyId!==null)">附件</el-button>
        <el-button type="primary" @click.stop="dialogVisible = true" class="orange" v-else>附件</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="4" v-else>
      <el-col :span="24" :xs="24">
        <span @click.stop="reloadFile" class="detail_trigger">查看</span>
      </el-col>
    </el-row>
    <!--模态窗-->
    <transition name="fade">
      <div id="modelWrapper" v-sky-device-drag v-show="dialogVisible" v-sky-loading="loading">
        <div class="model">
          <div class="head">
            <label class="title">附件管理</label>
            <span class="el-icon-close close" @click="ButtonClose"></span>
          </div>
          <hr class="dialog-hr">
          <div class="modelBody">
            <el-row v-show="showAll">
              <el-col :span="4" :xs="4" :offset="20">
                <el-button type="primary" v-show="canHandler" ref="files" icon="upload">上传</el-button>
                <el-button type="primary" v-show="canHandler" @click.stop="ButtonClose">确定</el-button>
              </el-col>
            </el-row>
            <el-row :gutter="0">
              <el-col :span="24" :xs="24">
                <el-table :data="FileTableData" height="200" border stripe style="width: 100%">
                  <el-table-column width="60" header-align="center" align="center" label="序号">
                    <template scope="scoped">
                      <label>{{scoped.$index+1}}</label>
                    </template>
                  </el-table-column>
                  <el-table-column prop="FileName" header-align="center" align="left" label="文件名">
                    <template scope="scope">
                      <span @mouseenter="mouseenter(scope.row)" @mouseout="mouseout">{{scope.row.FileName}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="Length" width="100" header-align="center" align="right" label="大小(KB)">
                  </el-table-column>
                  <el-table-column prop="CreateTime" width="140" header-align="center" align="center" label="创建时间">
                    <template scope="scope">
                      <label>{{scope.row.CreateTime | date}}</label>
                    </template>
                  </el-table-column>
                  <el-table-column header-align="center" width="100" align="center" label="操作">
                    <template scope="scope">
                      <span @click="fileDownload(scope.row)" class="detail_trigger">下载</span>
                      <span @click="deleteRow(scope.$index, FileTableData)" class="detail_trigger" v-if="showAll&&canHandler">删除</span>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <!-- v-sky-device-drag -->
      <div id="viewPicture" v-show="viewPicture">
        <div class="model">
          <div class="head">
            <label class="title">图片预览</label>
            <span class="el-icon-close close" @click="PictureClose"></span>
          </div>
          <hr class="dialog-hr">
          <div class="img-content">
            <img v-lazy='viewPictureUrl' class="img" ref="photo">
          </div>
        </div>
      </div>
    </transition>
    <!--模态窗-->
  </div>
</template>
<script>
  import plupload from 'plupload';
  require('./../util/ImageView.js')
  import { successMessage, errorMessage, warningMessage, infoMessage } from '@/util/message.js';
  export default {
    name: "filesUple",
    props: {
      showAll: {//显示全部（输入框和查看）
        type: Boolean,
        default: true
      },
      onlyshowButton: {//仅仅显示按钮
        type: Boolean,
        default: false
      },
      queryFileParms: {//附件查询条件
        type: Object
      },
      multionFiles: {//控制上传多个
        type: Boolean,
        default: true
      },
      currentRow: {
        type: Object
      },
      canHandler: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        dialogVisible: false,
        FileTableData: [],//表格数据集合,
        filesUpleNum: "",//输入框展示的文字信息
        plupload: null,
        viewPicture: false,
        viewPictureUrl: null,
        loading: false//遮罩层
      }
    },
    created() {
      this.getFilesFromServer();
    },
    mounted: function () {
      $("#modelWrapper .model").css({ "width": 800 });
      $("#modelWrapper .model").css({ "height": 320 });
      $("#modelWrapper .model").css({ "position": "absolute" });
      $("#modelWrapper .model").css({ "top": '50%', "left": "50%", "margin": "-160px 0 0 -400px" });
      let that = this;
      this.uploader = new plupload.Uploader({
        browse_button: that.$refs.files.$el,//触发文件dom元素
        url: 'Common/Attachment/Upload',//后端请求地址
        multipart: true,//为true时将以multipart/form-data的形式来上传文件
        runtimes: 'html5,flash,silverlight,html4',
        filters: {//上传文件限制
          max_file_size: '2mb', //最大只能上传2mb的文件
          prevent_duplicates: true, //是否允许选取重复的文件，为true时表示不允许，为false时表示允许，默认为false。如果两个文件的文件名和大小都相同，则会被认为是重复的文件
          prevent_empty: false//是否允许传递空文件
        },
        multi_selection: that.multionFiles,
        //地址必须指向flash文件
        flash_swf_url: './../../../static/Moxie.swf',
        silverlight_xap_url: './../../static/Moxie.xap',
        init: {
          //选着文件
          FilesAdded: function (up, file) {
            up.start();//发送附件
            that.loading = true;//遮罩开启
          },
          Error: function (up, errObject) {
            that.loading = false;//遮罩关闭
            if (errObject.code == -600) {
              errorMessage("当前上传的文件大小超过2MB，上传失败！")
              up.stop();
            }
          },
          //发送之前
          BeforeUpload: function (up, file) {
            up.getOption().multipart_params = { fileid: file.id };
          },
          //上传成功回调
          FileUploaded: function (up, file, res) {
            that.loading = false;//关闭遮罩
            let responseDataObj = eval(`(${res.response})`);
            if (responseDataObj.success) {
              that.FileTableData.push({ "keyId": responseDataObj.data[0].KeyId, "fileId": responseDataObj.data[0].fileId, "FileName": responseDataObj.data[0].Name, "Length": parseInt(responseDataObj.data[0].Length / 1024 > 1 ? responseDataObj.data[0].Length / 1024 : 1), "Hashcode": responseDataObj.data[0].Hashcode, "CreateTime": responseDataObj.data[0].CreateTime });
            }
          }
        }
      })
      this.uploader.init()
      
    },
    methods: {
      //取服务器
      getFilesFromServer: function () {
        if (this.queryFileParms.tableName && this.queryFileParms.tableKey) {//有表名和key才去请求
          this.$emit("filesLoading", true);//派发遮罩事件
          this.queryFiles(this.queryFileParms).then(_ => {
            if (_.data.success) {
              _.data.data.map((item, index) => {
                item.Length = parseInt(item.Length / 1024 > 1 ? item.Length / 1024 : 1)
                this.$set(this.FileTableData, index, item);
              })
              this.$emit("filesLoading", false);//派发关闭遮罩事件
              this.$emit("InServerFilesObj", this.FileTableData, this.currentRow);//派发后端返回的数据
              this.filesUpleNum = this.FileTableData.length > 0 ? `共有${this.FileTableData.length}个附件` : "";
            }
          }).catch(() => {
            this.$emit("filesLoading", false);
          })
        } else {//不请求
          this.$emit("filesLoading", false);//派发挂壁遮罩
        }
      },
      ButtonClose: function () {
        if (!this.multionFiles && this.FileTableData.length > 1) {
          warningMessage("本业务仅允许上传一个附件");
          return
        }
        this.dialogVisible = false;
        if (this.FileTableData.length) {
          this.FileTableData.map((item, index) => {
            if (item.keyId == null) {
              this.FileTableData.splice(index, 1)
            }
          })
          this.filesUpleNum = this.FileTableData.length > 0 ? `共有${this.FileTableData.length}个附件` : "";
          this.$emit("InServerFilesObj", this.FileTableData, this.currentRow);
        } else {
          this.filesUpleNum = "";
          this.$emit("InServerFilesObj", [{ "keyId": null, "fileId": null, "FileName": null, "Length": null, "CreateTime": null }], this.currentRow);
        }
      },
      //删除队列附件和服务器附件
      deleteRow: function (index, dataSource) {
        this.$confirm('此操作将删除该附件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => { dataSource.splice(index, 1) }).catch(() => { infoMessage("已取消删除") });
      },
      //查看
      reloadFile() {
        this.$emit("filesLoading", true);//派发遮罩事件
        this.queryFiles(this.queryFileParms).then(_ => {
          if (_.data.success) {
            this.FileTableData = [];
            _.data.data.map((item, index) => {
              item.Length = parseInt(item.Length / 1024 > 1 ? item.Length / 1024 : 1)
              this.$set(this.FileTableData, index, item);
            })
            this.dialogVisible = true;//打开弹窗
            this.$emit("filesLoading", false);//派发遮罩事件
          }
        })
      },
      //下载附件
      fileDownload(row) {
        if (row.keyId) {
          window.open(`Common/Attachment/Download?keyId=${row.keyId}`, "download-container");
        }
      },
      //查询服务器的附件
      queryFiles(parms) {
        return this.axios.post('Common/Attachment/QueryAttachment', parms)
      },
      //关闭图片预览
      PictureClose() {
        this.viewPicture = false;
      },
      //鼠标移入
      mouseenter(row) {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          if (/\.(png|jpe?g|gif|svg|ico)\s*$/i.test(row.FileName)) {
            this.viewPicture = true;
            this.viewPictureUrl = `Common/Attachment/Download?keyId=${row.keyId}`;
            this.createSaleObj();
          }
        }, 500)
      },
      mouseout(){
          clearTimeout(this.timer)
      },
      createSaleObj(){
        let imageview = new ImageView(this.$refs.photo, {
            movingCheck: false, // 可选， 当移动的时候，是否检查边界，达到的效果就是当到边界的时候，
                                // 可不可以继续拖拽等效果 实验下就明白了 默认true
            scaleNum: 1 // 可选，缩放比例 当进行缩放时 scale 时的比例 默认2
          });
        let rotateNum = 0;
        this.scaleObj = {
              scaleL: function() {
                imageview.scale(0.1);
              },
              scaleS: function() {
                imageview.scale(-0.1);
              }
            };
      }
    }
  }

</script>
<style>
  .filesUple .filesUpleInput .el-input__inner {
    height: 30px;
  }

  .filesUple .orange {
    background-color: #FFC666;
    border-color: #FFC666;
  }
</style>
<style scoped>
  #modelWrapper {
    position: fixed !important;
    border-radius: 15px;
    width: 100%;
    height: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 2001;
  }

  #modelWrapper .model {
    padding: 15px;
    border-radius: 15px;
    /* background: rgba(151, 168, 190, 0.1); */
    background: #fff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, .1);
    box-sizing: border-box;
  }

  #modelWrapper .head,
  #viewPicture .head {
    height: 20px;
    line-height: 20px;
    text-align: left;
  }

  #modelWrapper .title,
  #viewPicture .title {
    color: #666666;
    font-size: 15px;
    font-weight: bold;
    text-align: left;
  }

  #modelWrapper .close,
  #viewPicture .close {
    float: right;
    color: #bfcbd9;
  }

  #modelWrapper .close:hover,
  #viewPicture .close:hover {
    cursor: pointer;
    color: #20a0ff;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0
  }

  #viewPicture {
    position: fixed !important;
    border-radius: 15px;
    width: 100%;
    height: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.1);
    z-index: 2002;
  }

  #viewPicture .model {
    padding: 15px;
    border-radius: 15px;
    background: rgba(151, 168, 190, 0.1);
    background: #fff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, .1);
    box-sizing: border-box;
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%, -50%);
    box-sizing:border-box;
  }
  #viewPicture .model .img-content {
    width: 800px;
    height: 500px;
    overflow:hidden;
  }
  img.img {
    width: 100%;
    height: 100%;
  }
</style>