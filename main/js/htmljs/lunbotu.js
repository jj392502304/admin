var ids=[];
$(function () {
    $.ajax({
        url: ReqPath + '/round/list',
        type: 'POST', //GET
        async: {
            "size": 10000
        },    //或false,是否异步
        data: null,
        dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
        success: function (data) {
            console.log(data);
            var list = data.data.list;
            var str = "";
            $.each(list, function (n, value) {
                str += '<tr>' +
                    '                <td><input type="checkbox" value="' + value.rid + '" name="checkxx"></td>' +
                    '                <td>' + value.rid + '</td>' +
                    '                <td>' + value.rbrief + '</td>' +
                    '                <td>' + value.rname + '</td>' +
                    '                <td>' + value.rprice + '</td>' +
                    '                <td><img style="width: auto" height="51px" src="' + value.rimage + '"/></td>' +
                    '                <td>' +
                    '                    <button class="btn" onclick="del(\'' + value.rid + '\')">删除</button>' +
                    '                    <!--<button class="btn">修改</button>-->' +
                    '                </td>' +
                    '            </tr>';
            })
            $("#tb").html(str);

        }
    })
})

function del(e) {
    if (confirm("确定删除吗？")) {
        $.ajax({
            url: ReqPath + '/round/delete',
            type: 'POST', //GET
            async: true,    //或false,是否异步
            data: {
                "id": e
            },
            dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
            success: function (data) {
                if (data.code == 200) {
                    alert("删除成功")
                    window.location.href = "javascript:history.go(0)";
                }

            }
        })
    }
}
function delAll() {
    var list=$("input[type='checkbox']");
    for(var i=0;i<list.length;i++){
        if(list[i].checked){
           ids.push(list[i].value);
        }else {
            var index=ids.indexOf(list[i].value);
            if(index>-1){
                ids.splice(index,1);
            }
        }
    }

    if(ids.length>0){
        if(confirm("确定删除所选？")){
            $.ajax({
                url: ReqPath + '/round/deleteids',
                type: 'POST', //GET
                async: true,    //或false,是否异步
                traditional: true,//传递数组序列化
                data: {
                    "ids": ids
                },
                dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
                success: function (data) {
                    if (data.code == 200) {
                        alert("删除成功")
                        window.location.href = "javascript:history.go(0)";
                    }

                }
            })
        }
    }
}
function add1() {
    $("#bianhao").val("");
    $('#addmotai').modal({
        show: true,
        backdrop: 'static'
    });

}
function add() {
    if($("#bianhao").val()==""){
        alert("请输入商品的编号")
        return;
    }
    $.ajax({
        url: ReqPath + '/round/insert',
        type: 'POST', //GET
        async: true,    //或false,是否异步
        traditional: true,//传递数组序列化
        data: {
            "id": $("#bianhao").val()
        },
        dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
        success: function (data) {
            if (data.code == 200) {
                alert("添加成功！")
                window.location.href = "javascript:history.go(0)";
            }else {
                alert(data.message)
            }

        }
    })
}
