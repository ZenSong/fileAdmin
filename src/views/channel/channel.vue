<template>
    <div class="channel">
        <div class="add">
            <Button type="info" @click="add">新增</Button>
        </div>
        <!-- 表格 -->
        <MyTable :tableData="tableData" :tablecolumns="tablecolumns" :total="total"     @changeTablePage="changeTablePage"   @del="del" @edit="edit"/>
        <AddTAble ref="myAddTable" @addSure="addSure"  @addCancel="addCancel" :addTitle="addTitle"  :formState="formState" :ruleValidate="ruleValidate" :addModalShow="addModalShow"  />
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
import {taskTable,addTaskTable,updateTaskTable,delTaskTable} from "@/network/channel.js"
export default {
    components: {
        MyTable, 
        AddTAble, 
    },
    data () {
        return {
            tablecolumns: [
                {
                    title: '渠道',
                    key: 'customId'
                },
                {
                    title: '应用类型',
                    slot: 'type'
                },
                {
                    title: '总次数',
                    key: 'count'
                },
                {
                    title: '已下发次数',
                    key: 'been'
                },
                {
                    title: '状态',
                    slot: 'status'
                }, 
                {
                    title: '操作',
                    slot: 'action',
                    width: 150,
                    align: 'center'
                }
            ],  // 表单的header
            tableData: [], // 表单数据 
            total : 0,  // 表单的数量
            formInit: {
                customId: '', 
                type: '', 
                count: '',
                status: '', 
            },  // 新增初始值
            formState: {
                customId: '', 
                type: '', 
                count: '', 
                status: '', 
            },  // 当前值 
            ruleValidate: {
                    customId: [
                        { required: true, message: '这里不能为空', trigger: 'blur' }
                    ], 
                    type: [
                        { required: true, message: '这里不能为空', trigger: 'change' }
                    ],
                    count: [
                        { required: true, message: '这里不能为空', trigger: 'blur' }
                    ], 
                    status: [
                        { required: true, message: '这里不能为空', trigger: 'change' }
                    ],

            },
            addModalShow : false , // 新增
            addTitle : "新增",     // 弹窗title
            currentID : '',       // 当前ID
            delModal : false,     // 删除弹窗的显示
            currentPage : 1,      // 当前页
        }
    },
    created () {
        this.initTable (1,10)
    },
    methods : {
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
        }, 
        /**
         * 表单里的方法
         */ 
        edit (data) {
            this.windowInit("编辑") 
            this.currentID = data.id 
            this.formState.customId = data.customId
            this.formState.count = data.count.toString()
            this.formState.type = data.type.toString()
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
                console.log(valid)
                if (valid) { 
                    // 提交   
                    if(obj.state == "新增") { 
                        that.addTaskTable()
                    }
                    else {
                        that.updateTaskTable()
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
                    this.initTable (1,10) 
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
                    this.initTable(this.currentPage,10) 
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        /**
       *   获取新增或者编辑数据的方法
       */
        addOrEditData (name) { 
           
            let obj = {
                customId: this.formState.customId,
                type:  this.formState.type,
                count: this.formState.count,
                status:  this.formState.status
            } 
            if(name = "编辑") {
               obj.id =  this.currentID
            }
            return obj
      },
    },
}
</script>
<style lang="less" scoped>
    .channel { 
      .add {
        margin-bottom: 10px;
      }
    }
</style>