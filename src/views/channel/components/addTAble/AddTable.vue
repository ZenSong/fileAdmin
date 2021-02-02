<template>
    <div>
        <Modal
            v-model="addModalShow"
            :title="addTitle"
            :closable="false"
            :mask-closable="false" 
            :styles="{top: '50px'}" 
             >
             <Form :model="formState" ref="formState" :label-width="100" :rules="ruleValidate">
                <FormItem label="渠道:" prop="customId" >
                    <Input v-model="formState.customId"></Input>
                </FormItem> 
                <FormItem label="总下发次数:" prop="count">
                    <Input v-model="formState.count"></Input>
                </FormItem>  
                <FormItem label="应用类型:" prop="type">
                    <Select v-model="formState.type"  >
                        <Option value="1">whatsapp</Option>
                        <Option value="2">instagram</Option> 
                        <Option value="3">faceBook</Option>
                        <Option value="4">all</Option> 
                    </Select>
                </FormItem> 
                <FormItem label="状态:" prop="status">
                    <Select v-model="formState.status"  >
                        <Option value="false">失效</Option>
                        <Option value="true">生效</Option> 
                    </Select>
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