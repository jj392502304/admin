$(function () {
    $.ajax({
        url: ReqPath + '/order/admin/findAll',
        type: 'POST', //GET
        async: true,    //或false,是否异步
        traditional: true,//传递数组序列化
        data: null,
        dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
        success: function (data) {
            if (data.code == 200) {
                // window.location.href = "javascript:history.go(0)";
                console.log(data)
            }else {
                alert(data.message)
            }

        }
    })
})