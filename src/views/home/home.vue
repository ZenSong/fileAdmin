<template>
  <div class="home">
    <div class="add">
      <Button type="info" @click="add">新增</Button>
    </div>
    <!-- 表格 -->
    <MyTable :tableData="tableData" :tablecolumns="tablecolumns" :total="total"     @changeTablePage="changeTablePage" @look="look" @del="del" @edit="edit"/>
    <!-- 查看路径 -->
    <TableUrl  ref="myModalUrl" :modalUrlShow="modalUrlShow" :tablecolumnsUrl="tableUrlcolumns" :tableUrlData="tableUrlData" @changeModalUrlShow="changeModalUrlShow"/>
    <!-- <div>
        <Modal
            title="路径"
            v-model="modalUrlShow"
            :styles="{top: '50px'}"  
            >
             <Table border :columns="tableUrlcolumns" :data="tableUrlData"> </Table>
        </Modal>
    </div> -->
    <!-- 新增弹窗 -->
    <AddTAble   ref="myAddTable" @handleAdd="handleAdd" @handleRemove="handleRemove" @addSure="addSure"  @addCancel="addCancel" :addTitle="addTitle" :formState="formState" :ruleValidate="ruleValidate" :addModalShow="addModalShow"  />
    <!-- <div> 
        <Modal
            v-model="addModalShow"
            title="新增"  
            :closable="false"
            :mask-closable="false" 
            :styles="{top: '50px'}" 
             >
             <Form :model="formState" ref="formState" :label-width="80" :rules="ruleValidate">
                <FormItem label="渠道:" prop="customId" >
                    <Input v-model="formState.customId"></Input>
                </FormItem> 
                <FormItem label="包名:" prop="packageName">
                    <Input v-model="formState.packageName"></Input>
                </FormItem> 
                <FormItem label="状态:" prop="status">
                    <Select v-model="formState.status" value="formItem.select">
                        <Option value="0">false</Option>
                        <Option value="1">true</Option> 
                    </Select>
                </FormItem>
                <FormItem
                    v-for="(item, index) in formState.url" 
                    :key="index"
                    :label="'路径 ' + (Number(index) + 1) + ':'" 
                    :prop="'url[' + index + '].value'"
                    :rules="{required: true, message: '这里不能为空', trigger: 'blur'}"
                     
                    >
                      <Row>
                          <Col span="18">
                              <Input type="text" v-model="item.value" ></Input>
                          </Col>
                          <Col span="4" offset="1">
                              <Button @click="handleRemove(index)">删除</Button>
                          </Col>
                      </Row>
                </FormItem> 
                <FormItem>
                    <Row>
                        <Col span="12">
                            <Button type="dashed" long @click="handleAdd" icon="md-add">添加路径</Button>
                        </Col>
                    </Row>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="default" @click="addCancel">取消</Button>
                <Button type="primary" @click="addSure('formState')">确定</Button>
            </div>
        </Modal>
    </div> -->

    <Modal
        v-model="delModal"
        title=""
        @on-ok="sureDel" >
        <div>是否要删除?</div>
    </Modal>
  </div>
</template>

<script>
import MyTable from "./components/table/Table" 
import AddTAble from "./components/addTAble/AddTable" 
import TableUrl from "./components/tableUrl/TableUrl" 

import {taskTable,addTaskTable,updateTaskTable,delTaskTable} from "@/network/home.js"
export default {
  name: "Home",
  components: {
    MyTable, 
    AddTAble,
    TableUrl,
  },
  props: {},
  data() {
    return { 
      modalUrlShow : false, //  路径弹窗的显示
      total : 0,  // 表单的数量
      tablecolumns: [
          {
              title: '渠道',
              key: 'customId'
          },
          {
              title: '包名',
              key: 'packageName'
          },
          {
              title: '状态',
              slot: 'status'
          },
          {
              title: '路径',
              slot: 'url',
              width: 150,
              align: 'center'
          },
          {
              title: '操作',
              slot: 'action',
              width: 150,
              align: 'center'
          }
      ],  // 表单的header
      tableData: [], // 表单数据 
      tableUrlcolumns : [
          {
              title: '路径',
              key: 'name'
          },
      ],  // 路径的header
      tableUrlData : [],  // 路径table的数据
      formInit: {
          customId: '', 
          packageName: '', 
          status: '',  
          url: []
      },  // 新增初始值
      formState: {
          customId: '', 
          packageName: '', 
          status: '',  
          url: []
      },  // 当前值 
       ruleValidate: {
            customId: [
                { required: true, message: '这里不能为空', trigger: 'blur' }
            ], 
            packageName: [
                { required: true, message: '这里不能为空', trigger: 'blur' }
            ],
            status: [
                { required: true, message: '这里不能为空', trigger: 'change' }
            ], 
            // aaaaa4 : [
            //     {type: 'array', required: true, message: '这里不能为空', trigger: 'blur' }
            // ]

      },
      addModalShow : false , // 新增
      addTitle : "新增",     // 弹窗title ，
      currentID : '',       // 当前ID
      delModal : false,     // 删除弹窗的显示
      currentPage : 1,      // 当前页
    };
  }, 
  created () {
        this.initTable (1,10)
  },
  methods: {
      // table 初始化
      initTable (page,row) {
        // 获取表table数据
        this.taskTable(page,row)
      },
      windowInit(title) {
        this.addTitle = title
        // 清除提示
        this.$refs.myAddTable.$refs.formState.resetFields();
        // 初始化 
        this.formState = JSON.parse(JSON.stringify(this.formInit))
        // 显示弹窗
        this.addModalShow = true  
      },
      add() {
        this.windowInit("新增")
        // this.$refs.myAddTable.changeAddTable(this.addModalShow)  
      },
      /**
       * 表单里的方法
      */
      look (data) { 
        this.tableUrlData = []
        let urlArr = data.url.split(",")
        urlArr.forEach((e,i) => {
            this.tableUrlData.push({
                name : e
            })
        })
        this.modalUrlShow = true;  
      }, 
      edit (data) { 
        this.windowInit("编辑") 
        this.currentID = data.id
        let urlArr = data.url.split(",")
        urlArr.forEach((e) => {
            this.formState.url.push({
              value : e,  
          });
        })

        this.formState.customId = data.customId
        this.formState.packageName = data.packageName
        this.formState.status = data.status ? "true" : "false" 
         
      },
      del (data) { 
        this.currentID = data.id
        this.delModal = true  
      },
      sureDel() {
        delTaskTable(this.currentID)
        .then((res) => { 
            if(this.tableData.length == 1 ) {
                if(this.currentPage != 1) {
                    this.currentPage--
                }
                else {
                    this.currentPage = 1
                }
            } 
            this.initTable (this.currentPage,10) 
        })
        .catch((err) => {
            console.log(err)
        })
      },
      changeTablePage (page) { 
          this.currentPage = page
          this.taskTable(page,10)
      },  
      /**
       * 新增里的方法
       */
      addSure (obj) {    
        let that = this 
        this.$refs.myAddTable.$refs[obj.name].validate((valid) => { 
            if (valid) { 
                if(that.formState.url.length == 0) {
                    this.$Message.error('请添加路径');
                }
                else {
                    // 提交  
                    if(obj.state == "新增") { 
                        that.addTaskTable()
                    }
                    else {
                        that.updateTaskTable()
                    }
                    
                }
            }
            else {
                this.$Message.error('请填写信息');
            }
        })
      },
      addCancel () {
         this.addModalShow = false  
      },
      handleAdd () { 
          this.formState.url.push({
              value: '',  
          }); 
      },
      handleRemove (index) {
          this.formState.url.splice(index,1) 
      }, 
    //   changeAddModalShow(value) {
    //       this.addModalShow = value 
    //   },
      /**
       * 查看路径里的方法
       */
      changeModalUrlShow(value){
            this.modalUrlShow = value 
      },
      /**
       * 获取数据方法 
       */
      // table
      taskTable(page,row) {
          taskTable(page,row)
          .then((res) => {
              this.tableData = res.data.data;
              this.total = res.data.count;
          })
          .catch((err) => {
              console.log(err)
          })
      },
      // 新增
      addTaskTable() {   
            addTaskTable(this.addOrEditData("新增"))
            .then((res) => {
                this.addModalShow = false
                this.initTable (this.currentPage,10) 
            })
            .catch((err) => {
                console.log(err)
            })
      },
      // 编辑
      updateTaskTable() {
            updateTaskTable(this.addOrEditData("编辑"))
            .then((res) => {
                this.addModalShow = false
                this.initTable (this.currentPage,10) 
            })
            .catch((err) => {
                console.log(err)
            })
      },
      /**
       *   获取新增或者编辑数据的方法
       */
      addOrEditData (name) {
          let myUrl = ""
            if(this.formState.url.length == 1) {
                myUrl = this.formState.url[0].value;
            }
            else {
                this.formState.url.forEach((e,i) => {
                    if(i != this.formState.url.length-1) {
                        myUrl+=this.formState.url[i].value + ','
                    }
                    else {
                        myUrl+=this.formState.url[i].value
                    }
                })
            }
            let obj = {
                customId: this.formState.customId,
                packageName:  this.formState.packageName,
                status: this.formState.status == 'false' ? false : true,
                url:  myUrl
            } 
            if(name = "编辑") {
               obj.id =  this.currentID
            }
            return obj
      },
  },
};
</script>

<style lang="less" scoped>
    .home { 
      .add {
        margin-bottom: 10px;
      }
    }
</style>
