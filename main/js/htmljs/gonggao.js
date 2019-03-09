var url="";
var ids=[];
var id="";
$(function () {
    $.ajax({
                url: ReqPath + '/notice/list',
                type: 'POST', //GET
                async: false,    //或false,是否异步
                traditional: true,
                data: {
                    "size":1000
                },
                dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
                success: function (data) {
                    if (data.code == 200) {
                        // console.log(data)
                        var list=data.data.list;
                        var str="";
                        $.each(list,function (n,value) {
                            str+='<tr>'+
                                '                <td><input type="checkbox" value="'+value.nid+'" name="checkxx"></td>'+
                                '                <td>'+value.ntitle+'</td>'+
                                '                <td>'+value.ncontent+'</td>'+
                                '                <td><img src="'+value.image+'" style="height: 50px;width: 80px"/></td>'+
                                '                <td>'+
                                '                    <button class="btn" onclick="del(\''+value.nid+'\')">删除</button>'+
                                '                    <button class="btn" onclick="xiugai(\''+value.nid+'\')">修改</button>'+
                                '                </td>'+
                                '            </tr>';
                        })
                       $("#tb").html(str);
                    }
                }
            })
})
function xiugai(e) {
    $('#myModal10').modal({
        show: true,
        backdrop: 'static'
    });
    $.ajax({
        url: ReqPath + '/notice/detail',
        type: 'POST', //GET
        async: false,    //或false,是否异步
        traditional: true,
        data: {
            "id":e
        },
        dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
        success: function (data) {
            if (data.code == 200) {
                id=data.data.nid;
                $("#title10").val(data.data.ntitle);
                $("#text10").val(data.data.ncontent);
            }
        }
    })
}
function add1() {
    $('#myModal').modal({
        show: true,
        backdrop: 'static'
    });
}

function add2() {
    var obj = document.getElementById("file10");
    var title=$("#title10").val();
    var text=$("#text10").val();
    if(obj.files.length==0){
        alert("请上传图片")
        return;
    }else if(title.length==0){
        alert("请输入标题")
        return;
    }else if(text.length==0){
        alert("请输入内容")
        return;
    }
    var body={
        "nid":id,
        "ncontent":$("#text10").val(),
        "ntitle": $("#title10").val()
    }
    var formData=new FormData();
    formData.append("file",obj.files[0])
    $.ajax({
        url: 'http://120.79.7.46/file/fileonload/onloads',
        type: 'POST', //GET
        async: false,    //或false,是否异步
        // traditional: true,
        processData:false,
        contentType:false,
        data: formData,
        dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
        success: function (data) {
            url=data;
            $.ajax({
                url: ReqPath + '/notice/update?url='+url,
                type: 'POST', //GET
                async: false,    //或false,是否异步
                contentType:'application/json',
                traditional: true,
                data: JSON.stringify(body),
                dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
                success: function (data) {
                    window.location.href="javascript:history.go(0)"
                }
            })
        }
    })
}
function del(e) {
    if(confirm("确认删除?")){
        $.ajax({
            url: ReqPath + '/notice/delete',
            type: 'POST', //GET
            async: false,    //或false,是否异步
            traditional: true,
            data: {
                "id":e
            },
            dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
            success: function (data) {
                if (data.code == 200) {
                    alert("删除成功");
                    window.location.href="javascript:history.go(0)"
                }
            }
        })
    }
}
function delAll () {
    ids=[];
    var inputs=$("input[name='checkxx']");
    for(var i=0;i<inputs.length;i++){
        if(inputs[i].checked){
            ids.push(inputs[i].value);
        }else {
            var index=inputs[i].value;
            if(index>-1){
                ids.splice(index,1)
            }
        }
    }
    if(ids.length!=0){
        if(confirm("确认删除所选？")){
            $.ajax({
                url: ReqPath + '/notice/deleteids',
                type: 'POST', //GET
                async: false,    //或false,是否异步
                // contentType:'application/json',
                traditional: true,
                data: {
                    ids:ids
                },
                dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
                success: function (data) {
                    alert("删除成功!")
                    window.location.href="javascript:history.go(0)"
                }
            })
        }
    }
}
function add() {
    var obj = document.getElementById("file");
    var title=$("#title").val();
    var text=$("#text").val();
    if(obj.files.length==0){
        alert("请上传图片")
        return;
    }else if(title.length==0){
        alert("请输入标题")
        return;
    }else if(text.length==0){
        alert("请输入内容")
        return;
    }
    var body={
        "ncontent":$("#text").val(),
        "ntitle": $("#title").val()
    }
    var formData=new FormData();
    formData.append("file",obj.files[0])
    $.ajax({
        url: 'http://120.79.7.46/file/fileonload/onloads',
        type: 'POST', //GET
        async: false,    //或false,是否异步
        // traditional: true,
        processData:false,
        contentType:false,
        data: formData,
        dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
        success: function (data) {
            url=data;
            $.ajax({
                url: ReqPath + '/notice/add?url='+url,
                type: 'POST', //GET
                async: false,    //或false,是否异步
                contentType:'application/json',
                traditional: true,
                data: JSON.stringify(body),
                dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
                success: function (data) {
                    window.location.href="javascript:history.go(0)"
                }
            })
        }
    })
}