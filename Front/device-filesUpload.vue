<template>
  <div class="device-filesUple" v-sky-loading="loading">
    <el-row :gutter="4">
      <el-col :span="2" :xs="2" :offset="22">
        <el-button type="primary" ref="files" icon="upload" v-show="queryFileParms.code" style="float:right">上传</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="4">
      <el-table :data="FileTableData" :height="deviceHeight" border stripe style="width: 100%">
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
        <el-table-column prop="DisplayName" width="100" header-align="center" align="center" label="创建人">
        </el-table-column>
        <el-table-column prop="CreateTime" width="140" header-align="center" align="center" label="创建时间">
          <template scope="scope">
            <label>{{scope.row.CreateTime | date}}</label>
          </template>
        </el-table-column>
        <el-table-column header-align="center" width="100" align="center" label="操作">
          <template scope="scope">
            <span @click="fileDownload(scope.row)" class="detail_trigger">下载</span>
            <span @click="deleteRow(scope.$index, FileTableData)" class="detail_trigger" v-show="queryFileParms.code">删除</span>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
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
  </div>
</template>
<script>
  import plupload from 'plupload';
  require('./../util/ImageView.js')
  import {
    formatDate
  } from '@/util/date.js'
  import {
    successMessage,
    errorMessage,
    warningMessage
  } from '@/util/message.js';
  export default {
    name: "devuce_filesUple",
    props: {
      queryFileParms: { //查询附件
        type: Object
      },
      deviceHeight: { //表格高度
        type: Number,
        default: 240
      }
    },
    data() {
      return {
        FileTableData: [], //表格数据集合,
        plupload: null,
        viewPicture: false,
        viewPictureUrl: null,
        loading: false //遮罩层
      }
    },
    created() {
      this.queryFiles()
    },
    mounted: function () {
      $("#viewPicture .model").css({
        "position": "absolute"
      });
      $("#viewPicture .model").css({
        "top": '50%',
        "left": '50%',
        "transform": "translate(-50%, -50%)",
        "box-sizing": "border-box"
      });
      let that = this;
      this.uploader = new plupload.Uploader({
        browse_button: that.$refs.files.$el, //触发文件dom元素
        url: 'Common/Attachment/DeviceUpload', //后端请求地址
        multipart: true, //为true时将以multipart/form-data的形式来上传文件
        runtimes: 'html5,flash,silverlight,html4',
        filters: { //上传文件限制
          max_file_size: '2mb', //最大只能上传10mb的文件
          prevent_duplicates: true, //是否允许选取重复的文件，为true时表示不允许，为false时表示允许
          prevent_empty: false //是否允许传递空文件
        },
        multi_selection: true,
        //地址必须指向flash文件
        flash_swf_url: './../../../static/Moxie.swf',
        silverlight_xap_url: './../../static/Moxie.xap',
        init: {
          //选着文件
          FilesAdded: function (up, file) {
            up.start(); //发送附件
            that.loading = true; //遮罩开启
          },
          Error: function (up, errObject) {
            that.loading = false; //遮罩关闭
            if (errObject.code == -600) {
              errorMessage("当前上传的文件大小超过2MB，上传失败！")
              up.stop();
            }
          },
          //发送之前
          BeforeUpload: function (up, file) {
            up.getOption().multipart_params = {
              fileid: file.id,
              tableName: that.queryFileParms.tableName,
              tableKey: that.queryFileParms.tableKey,
              mark: that.queryFileParms.mark
            }
          },
          //上传成功回调
          FileUploaded: function (up, file, res) {
            that.loading = false; //关闭遮罩
            let responseDataObj = eval(`(${res.response})`);
            if (responseDataObj.success) {
              that.FileTableData.push({
                "keyId": responseDataObj.data[0].KeyId,
                "fileId": responseDataObj.data[0].fileId,
                "FileName": responseDataObj.data[0].Name,
                "Length": parseInt(responseDataObj.data[0].Length / 1024 > 1 ? responseDataObj.data[0].Length /
                  1024 : 1),
                "Hashcode": responseDataObj.data[0].Hashcode,
                "CreateTime": responseDataObj.data[0].CreateTime,
                "DisplayName": responseDataObj.data[0].DisplayName
              });
            }
          }
        }
      })
      this.uploader.init()
      this.scaleObj=null;//构建一个空值,便于后期创建缩放对象
    },
    methods: {
      //查询附件
      queryFiles: function () {
        if (this.queryFileParms.tableName && this.queryFileParms.tableKey) {
          this.loading = true;
          this.axios.post('Common/Attachment/QueryAttachment?_dc=' + new Date().getTime(), this.queryFileParms).then(
            (res) => {
              if (res.data.success) {
                res.data.data.map((item, index) => {
                  item.Length = parseInt(item.Length / 1024 > 1 ? item.Length / 1024 : 1)
                  this.$set(this.FileTableData, index, item);
                })
                this.loading = false;
              }
            }).catch(err => this.loading = false)
        }
      },
      //删除队列附件和服务器附件
      deleteRow: function (index, dataSource) {
        this.$confirm('此操作将删除该附件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios.post('Common/Attachment/RemoveAttachmentContent', {
              keyId: dataSource[index].keyId
            })
            .then(_ => {
              if (_.data.success) {
                successMessage("删除成功");
                dataSource.splice(index, 1)
              }
            })
        }).catch(() => {
          infoMessage("已取消删除");
        });

      },
      //下载附件
      fileDownload: function (row) {
        if (row.keyId) {
          window.open(`Common/Attachment/Download?keyId=${row.keyId}`, "download-container");
        }
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
      mouseout() {
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
<style scoped>
  #viewPicture .head {
    height: 20px;
    line-height: 20px;
    text-align: left;
  }

  #viewPicture .title {
    color: #666666;
    font-size: 15px;
    font-weight: bold;
    text-align: left;
  }

  #viewPicture .close {
    float: right;
    color: #bfcbd9;
  }

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
