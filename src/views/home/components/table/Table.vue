<template>
    <div>
        <Table border :columns="tablecolumns" :data="tableData">
            <template slot-scope="{ row }" slot="status"> 
                <div v-if="row.status" style="color:#2d8cf0">生效</div>
                <div v-else  style="color:red">失效</div>
            </template>
            <template  slot-scope="{ row }" slot="url">
                <Button type="primary" size="small" style="margin-right: 5px" @click="look(row)">查看</Button>
            </template>

            <template  slot-scope="{ row }" slot="action">
                <Button type="primary" size="small" style="margin-right: 5px" @click="edit(row)">编辑</Button>
                <Button type="error" size="small" @click="del(row)">删除</Button>
            </template>
      </Table>
      <!-- 页码 -->
      <div style="margin: 10px;overflow: hidden">
          <div style="float: right;">
              <Page :total="total" :current="currentPage" @on-change="changePage" show-elevator></Page>
          </div>
      </div> 
    </div>
</template>
<script>
export default {
    data () {
        return { 
            currentPage : 1,    //当前页
        }
    },
    props : {
        tableData : {
            type : Array,
            default () {
                return []
            }
        },
        tablecolumns : {
            type : Array,
            default () {
                return []
            }
        }, 
        total : {
            type : Number,
            default : 0
        }, 
    },
    methods : {
        changePage (index) { 
            this.$emit("changeTablePage",index)
        },
        look (row) {
            this.$emit("look",row)
        },
        edit (row) {
            this.$emit("edit",row)
        },
        del (row) {
            this.$emit("del",row)
        }
    }
    
}
</script>