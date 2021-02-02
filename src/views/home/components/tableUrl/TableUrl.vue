<template>
    <div>
        <Modal
            title="路径"
            v-model="urlShow"
            :styles="{top: '50px'}" 
            @on-visible-change = "urlShowVisible"
            >
             <Table border :columns="tablecolumnsUrl" :data="tableUrlData"> </Table>
        </Modal>
    </div>
</template>
<script>
export default {
    props : {
        modalUrlShow : {
            type : Boolean,
            default : false
        },
        tablecolumnsUrl : {
            type : Array,
            default () {
                return []
            }
        },
        tableUrlData : {
            type : Array,
            default () {
                return []
            }
        },
    }, 
    computed : {
        urlShow : {
            get () {
                return this.modalUrlShow
            },
            set (value) {
                 
            }
        }
    },
    
    methods : { 
        urlShowVisible (value) {  
            this.$emit("changeModalUrlShow",value) 
        }
    } 
}
</script>