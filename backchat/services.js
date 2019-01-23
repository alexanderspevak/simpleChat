const services = {}

services.removeUser = function (arr, id) {
    console.log('id', id)
    var index = -1
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].id === id) {
            index = i;
            arr.splice(index, 1)
            console.log('user removed', arr)
        }
    }
}

services.getUserNick=function(arr,id){
    console.log('id', id)
    var index = -1
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].id === id) {
            index = i
        }
    }
    if(index>-1){
        return arr[index].chatNick
    }
    return false
}

module.exports = services