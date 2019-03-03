var ids = [];
var name="";
var p = 1;
var max = 1000000;
var kid="";

$(function () {
    kind();
    shop(p)

})
function kind() {
    $.ajax({
        url: ReqPath + '/kind/list',
        type: 'POST', //GET
        async: false,    //或false,是否异步
        data: null,
        dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
        success: function (data) {
            if (data.code == 200) {
                console.log(data)
                var list=data.data.list;
                for(var i=0;i<list.length;i++){
                    $("#kind_select").append('<option value="'+list[i].kid+'">'+list[i].ktype+'</option>')
                }
            }
        }
    })
}

function findbyKind() {
    kid=$("#kind_select").val();
    p=1;
    name="";
    shop(p)
}
function chaxun() {
    var name1=$("#select1").val();
    if(name1.length==0){
        return
    }
    p=1;
    kid="";
    name=name1;
    shop(p)


}
function shop(value) {
    p = value;

    if (p > max) {
        p = max;
    }
    if(p<1){
        p=1
    }
    // console.log(p)
    $.ajax({
        url: ReqPath + '/cleaner/findAll',
        type: 'POST', //GET
        async: false,    //或false,是否异步
        data: {
            "page": p,
            "name":name,
            "kid":kid
        },
        dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
        success: function (data) {
            // console.log(data)
            var list = data.data.list;
            var str = "";
            var total = data.data.total;
            max = total;
            $.each(list, function (i, item) {
                str += '<tr>' +
                    '                <td><input type="checkbox" name="checkxx" value="' + item.cid + '"></td>' +
                    '                <td>' + item.cid + '</td>'+
                    '                <td>' + item.cname + '</td>' +
                    '                <td>' + item.cprice + '</td>' +
                    '                <td>' + item.type + '</td>' +
                    '                <td>' + item.ckeyword + '</td>' +
                    '                <td>' + item.ccount + '</td>' +
                    '                <td><a href="' + item.cpicurl + '">查看</a></td>' +
                    '<td>' + item.createDate + '</td>' +
                    '                <td>' +
                    '                    <button class="btn" onclick="del(\'' + item.cid + '\')">删除</button>' +
                    '                    <button class="btn" onclick="edit(\'' + item.cid + '\')">修改</button>' +
                    '                </td>' +
                    '            </tr>';
            })
            $("#tb").html(str)
            var str1 = '<ul class=\'pagination\'>' +
                '            <li><a onclick="shop(p--,this)" href=\'#\'>&laquo;</a></li>';


            for (var i = 0; i < total / 10; i++) {
                str1 += '            <li><a onclick="shop(' + (i + 1) + ',this)" href=\'#\'>' + (i + 1) + '</a></li>';
            }
            str1 += '            <li><a onclick="shop(p++,this)" href=\'#\'>&raquo;</a></li>' +
                '        </ul>';
            $("#page").html(str1)
        }
    })
}

function del(value) {
    if (confirm("确定删除吗？")) {
        $.ajax({
            url: ReqPath + '/cleaner/delete',
            type: 'POST', //GET
            async: false,    //或false,是否异步
            data: {
                "id": value
            },
            dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
            success: function (data) {
                if (data.code == 200) {
                    alert("删除成功！")
                    shop(p)
                }
            }
        })
    }

}

function delAll() {
    $("input[type='checkbox']").each(function () {
        if (this.checked == true) {
            if (ids.indexOf(this.value) == -1)
                ids.push(this.value)
        } else {
            var index = ids.indexOf(this.value);
            if (index > -1) {
                ids.splice(index, 1);

            }
        }
        // if(this.checked){
        //     ids.push(this.value)
        // }else {
        //     ids.splice(ids.indexOf(this.value),1);
        // }
    });
    if (ids.length == 0) {
        return
    } else {
        console.log(ids)
        if (confirm("确定删除吗？")) {
            $.ajax({
                url: ReqPath + '/cleaner/deleteids',
                type: 'POST', //GET
                async: false,    //或false,是否异步
                traditional: true,
                data: {
                    "ids": ids
                },
                dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
                success: function (data) {
                    if (data.code == 200) {
                        alert("删除成功！")
                        $("#xxx").attr("checked", false)
                        shop(p)
                    }
                }
            })
        }
    }
}

function add1() {
    window.location.href="../../html/other/external/picture-add.html"
}

function edit(e) {
    window.location.href="../../html/other/external/picture-edit.html?id="+e;
}