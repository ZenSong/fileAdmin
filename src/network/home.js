import { instance } from "./axios"
// table数据
function taskTable (page,row) {
    return instance.post(`/Config/selConfig?page=${page}&row=${row}`)
}
// 新增
function addTaskTable (data) {
    return instance.post(`/Config/addConfig?customId=${data.customId}&packageName=${data.packageName}&status=${data.status}&url=${data.url}`)
}
function updateTaskTable (data) {
    return instance.post(`/Config/updateConfig?id=${data.id}&customId=${data.customId}&packageName=${data.packageName}&status=${data.status}&url=${data.url}`)
}
function delTaskTable(id){
    return instance.post(`/Config/delConfig?id=${id}`)
}
export {
    taskTable,
    addTaskTable,
    updateTaskTable,
    delTaskTable,
}