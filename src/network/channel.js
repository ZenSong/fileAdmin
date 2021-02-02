import { instance } from "./axios"
// table数据
function taskTable (page,row){
    return instance.post(`/Config/selCustom?page=${page}&row=${row}`)
}
// 新增
function addTaskTable (data) {
    return instance.post(`/Config/addCustom?customId=${data.customId}&type=${data.type}&status=${data.status}&count=${data.count}`)
}
function updateTaskTable (data) {
    return instance.post(`/Config/updateCustom?id=${data.id}&customId=${data.customId}&type=${data.type}&status=${data.status}&count=${data.count}`)
}
function delTaskTable(id){
    return instance.post(`/Config/delCustom?id=${id}`)
}
export {
    taskTable,
    addTaskTable,
    updateTaskTable,
    delTaskTable,
}