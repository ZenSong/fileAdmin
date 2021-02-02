<template>
    <div>
        <Modal
            v-model="addModalShow"
            :title="addTitle"  
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
                    <Select
                        v-model="formState.status"  
                        >
                        <Option value="false">失效</Option>
                        <Option value="true">生效</Option> 
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
    </div>
</template>
<script>
export default { 
    props : {
        addModalShow : {
            type : Boolean,
            default : false
        },
        formState  : {
            type : Object,
            default () {
                return {}
            }
        },
        ruleValidate  : {
            type : Object,
            default () {
                return {}
            }
        }, 
        addTitle : {
            type : String,
            defualt : ''
        }
    },  
    methods : {
    //   change(value) { 
    //       this.$emit("changeAddModalShow",value) 
    //   },
      handleAdd() {
          this.$emit("handleAdd") 
      },
      addCancel() {
          this.$emit("addCancel") 
      },
      addSure(value) {
          let obj = {
              state : this.addTitle,
              name : value
          }
          this.$emit("addSure",obj) 
      },
      addCancel() {
          this.$emit("addCancel")
      },
      handleRemove(value){
          this.$emit("handleRemove",value) 
      }
    }, 
    computed : {
        myAdd : {
           get () { 
               return this.addModalShow
           },
           set (value) {  
           }
        }, 
    },  
    
}
</script>