// var ids = [];
// var name = "";
// var p = 1;
// var max = 1000000;
// var kid = "";
// var parentname = ["家用净水器", "商用净水器"]
// $(function () {
//     kind();
//     // shop(p)
//
// })
//
// function kind() {
//     $.ajax({
//         url: ReqPath + '/kind/list',
//         type: 'POST', //GET
//         async: false,    //或false,是否异步
//         data: {
//             size: 100000
//         },
//         dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
//         success: function (data) {
//             if (data.code == 200) {
//                 console.log(data)
//                 var list = data.data.list;
//                 var str = ""
//                 for (var i = 0; i < list.length; i++) {
//                     // $("#kind_select").append('<option value="'+list[i].kid+'">'+list[i].ktype+'</option>')
//                     str += ' <tr>' +
//                         '                <td><input type="checkbox" value="' + list[i].kid + '" name="checkxx"></td>' +
//                         '                <td>' + list[i].kid + '</td>' +
//                         '                <td>' + list[i].ktype + '</td>' +
//                         '                <td>' + parentname[(list[i].kpid) - 1] + '</td>' +
//                         '                <td>' +
//                         '                    <button class="btn" onclick="del(\'' + list[i].kid + '\')">删除</button>' +
//                         '                    <button class="btn" onclick="edit(\'' + list[i].kid + '\')">修改</button>' +
//                         '                </td>' +
//                         '            </tr>';
//                 }
//                 $("#tb").html(str)
//             }
//         }
//     })
// }
//
// function findbyKind() {
//     kid = $("#kind_select").val();
//     p = 1;
//     name = "";
//     shop(p)
// }
//
// function chaxun() {
//     var name1 = $("#select1").val();
//     if (name1.length == 0) {
//         return
//     }
//     $.ajax({
//         url: ReqPath + '/kind/find',
//         type: 'POST', //GET
//         async: false,    //或false,是否异步
//         data: {"name": name1},
//         dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
//         success: function (data) {
//             if (data.code == 200) {
//                 console.log(data)
//                 var list = data.data;
//                 var str = ""
//                 for (var i = 0; i < list.length; i++) {
//                     // $("#kind_select").append('<option value="'+list[i].kid+'">'+list[i].ktype+'</option>')
//                     str += ' <tr>' +
//                         '                <td><input type="checkbox" value="' + list[i].kid + '" name="checkxx"></td>' +
//                         '                <td>' + list[i].kid + '</td>' +
//                         '                <td>' + list[i].ktype + '</td>' +
//                         '                <td>' + parentname[(list[i].kpid) - 1] + '</td>' +
//                         '                <td>' +
//                         '                    <button class="btn" onclick="del(\'' + list[i].kid + '\')">删除</button>' +
//                         '                    <button class="btn" onclick="edit(\'' + list[i].kid + '\')">修改</button>' +
//                         '                </td>' +
//                         '            </tr>';
//                 }
//                 $("#tb").html(str)
//             }
//         }
//     })
//     // p=1;
//     // kid="";
//     // name=name1;
//     // shop(p)
//
//
// }
//
// function shop(value) {
//     p = value;
//
//     if (p > max) {
//         p = max;
//     }
//     if (p < 1) {
//         p = 1
//     }
//     // console.log(p)
//     $.ajax({
//         url: ReqPath + '/cleaner/findAll',
//         type: 'POST', //GET
//         async: false,    //或false,是否异步
//         data: {
//             "page": p,
//             "name": name,
//             "kid": kid
//         },
//         dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
//         success: function (data) {
//             // console.log(data)
//             var list = data.data.list;
//             var str = "";
//             var total = data.data.total;
//             max = total;
//             $.each(list, function (i, item) {
//                 str += '<tr>' +
//                     '                <td><input type="checkbox" name="checkxx" value="' + item.cid + '"></td>' +
//                     '                <td>' + item.cname + '</td>' +
//                     '                <td>' + item.cprice + '</td>' +
//                     '                <td>' + item.type + '</td>' +
//                     '                <td>' + item.ckeyword + '</td>' +
//                     '                <td>' + item.ccount + '</td>' +
//                     '                <td><a href="' + item.cpicurl + '">查看</a></td>' +
//                     '<td>' + item.createDate + '</td>' +
//                     '                <td>' +
//                     '                    <button class="btn" onclick="del(\'' + item.cid + '\')">删除</button>' +
//                     '                    <button class="btn" onclick="edit(\'' + item.cid + '\')">修改</button>' +
//                     '                </td>' +
//                     '            </tr>';
//             })
//             $("#tb").html(str)
//             var str1 = '<ul class=\'pagination\'>' +
//                 '            <li><a onclick="shop(p--,this)" href=\'#\'>&laquo;</a></li>';
//
//
//             for (var i = 0; i < total / 10; i++) {
//                 str1 += '            <li><a onclick="shop(' + (i + 1) + ',this)" href=\'#\'>' + (i + 1) + '</a></li>';
//             }
//             str1 += '            <li><a onclick="shop(p++,this)" href=\'#\'>&raquo;</a></li>' +
//                 '        </ul>';
//             $("#page").html(str1)
//         }
//     })
// }
//
// function del(value) {
//     if (confirm("确定删除吗？")) {
//         $.ajax({
//             url: ReqPath + '/kind/delete',
//             type: 'POST', //GET
//             async: false,    //或false,是否异步
//             data: {
//                 "id": value
//             },
//             dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
//             success: function (data) {
//                 if (data.code == 200) {
//                     alert("删除成功！")
//                     window.location.href = "kind.html"
//                 }
//             }
//         })
//     }
//
// }
//
// function delAll() {
//     $("input[type='checkbox']").each(function () {
//         if (this.checked == true) {
//             if (ids.indexOf(this.value) == -1)
//                 ids.push(this.value)
//         } else {
//             var index = ids.indexOf(this.value);
//             if (index > -1) {
//                 ids.splice(index, 1);
//
//             }
//         }
//         // if(this.checked){
//         //     ids.push(this.value)
//         // }else {
//         //     ids.splice(ids.indexOf(this.value),1);
//         // }
//     });
//     if (ids.length == 0) {
//         return
//     } else {
//         console.log(ids)
//         if (confirm("确定删除吗？")) {
//             $.ajax({
//                 url: ReqPath + '/kind/deleteids',
//                 type: 'POST', //GET
//                 async: false,    //或false,是否异步
//                 traditional: true,
//                 data: {
//                     "ids": ids
//                 },
//                 dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
//                 success: function (data) {
//                     if (data.code == 200) {
//                         alert("删除成功！")
//                        window.location.href="kind.html"
//                     }
//                 }
//             })
//         }
//     }
// }
//
// function add1() {
//     $('#myModal').modal({
//         show: true,
//         backdrop: 'static'
//     });
// }
//
// function add() {
//     $("#name").val("");
//     $("#fulei").val("");
//     var name = $("#name").val();
//     var fulei = $("#fulei").val();
//     if (name.length == 0) {
//         alert("类名不能为空")
//         return;
//     }
//     var data = {
//         "ktype": name,
//         "kpid": fulei
//     }
//     $.ajax({
//         url: ReqPath + '/kind/add',
//         type: 'POST', //GET
//         async: true,    //或false,是否异步
//         contentType: 'application/json',
//         // traditional: true,
//         data: JSON.stringify(data),
//         dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
//         success: function (data) {
//             if (data.code == 200) {
//                 alert("添加成功！")
//                 window.location.href = "kind.html"
//             }
//         }
//     })
// }
//
// function edit(e) {
//     $("#name1").val("");
//    $("#fulei1").val("");
//     $('#myModal2').modal({
//         show: true,
//         backdrop: 'static'
//     });
//     $.ajax({
//         url: ReqPath + '/kind/detail',
//         type: 'POST', //GET
//         async: true,    //或false,是否异步
//         // contentType: 'application/json',
//         // traditional: true,
//         data: {"id":e},
//         dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
//         success: function (data) {
//           $("#name1").val(data.data.ktype);
//           $("#fulei1").val(data.data.kpid);
//             $("#id").val(e)
//
//         }
//     })
// }
//
// function up1() {
//     var name = $("#name1").val();
//     var fulei = $("#fulei1").val();
//     if (name.length == 0) {
//         alert("类名不能为空")
//         return;
//     }
//     var data = {
//         "kid":$("#id").val(),
//         "ktype": name,
//         "kpid": fulei
//     }
//     $.ajax({
//         url: ReqPath + '/kind/update',
//         type: 'POST', //GET
//         async: true,    //或false,是否异步
//         contentType: 'application/json',
//         // traditional: true,
//         data: JSON.stringify(data),
//         dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
//         success: function (data) {
//             if (data.code == 200) {
//                 alert("修改成功！")
//                 window.location.href = "kind.html"
//             }
//         }
//     })
// }
var p = 1;
var max = 100000;
var name = "";
var userinfoid="";
$(function () {
    page(p);
})

function page(value) {
    console.log(name)
    p = value;
    if (p > max) {
        p = max;
    } else if (p < 1) {
        p = 1
    }
    $.ajax({
        url: ReqPath + '/suser/findConditon',
        type: 'POST', //GET
        async: true,    //或false,是否异步
        // contentType: 'application/json',
        // traditional: true,
        data: {
            "page": p,
            "name": name
        },
        dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
        success: function (data) {
            if (data.code == 200) {
                console.log(data)
                var total = data.data.total;
                max = Math.ceil(total / 10);
                var list = data.data.list;
                var str = "";

                for (var i = 0; i < list.length; i++) {
                    str += '<tr>' +
                        '                <td><input value="' + list[i].uid + '" type="checkbox" name="checkxx"></td>' +
                        '                <td>' + list[i].account + '</td>' +
                        '                <td>' + list[i].registerdate + '</td>' +
                        '                <td>' + list[i].userinfo.name + '</td>' +
                        '                <td>' + list[i].userinfo.sex + '</td>' +
                        '                <td>' + list[i].userinfo.age + '</td>' +
                        '                <td>' + list[i].userinfo.email + '</td>' +
                        '                <td>' + list[i].userinfo.phonenumber + '</td>' +
                        '                <td>' + list[i].userinfo.adress + '</td>' +
                        '                <td>' +
                        '                    <button onclick="del(\'' + list[i].uid + '\')" class="btn">删除</button>' +
                        '                    <button onclick="xiugai(\'' + list[i].uid + '\')" class="btn">修改</button>' +
                        '                </td>' +
                        '            </tr>';
                }
                $("#tb").html(str)
                var str1 = '<ul class=\'pagination\'>' +
                    '            <li><a onclick="page(p--,this)" href=\'#\'>&laquo;</a></li>';


                for (var i = 0; i < max; i++) {
                    str1 += '            <li><a onclick="page(' + (i + 1) + ',this)" href=\'#\'>' + (i + 1) + '</a></li>';
                }
                str1 += '            <li><a onclick="page(p++,this)" href=\'#\'>&raquo;</a></li>' +
                    '        </ul>';
                $("#page").html(str1)
            }
        }
    })
}

function chaxun() {
    var string = $("#select1").val();
    if (string.length == 0) {
        return;
    }
    name = string;
    p = 1;
    page(p);
}

function del(e) {
    console.log(e)
    $.ajax({
        url: ReqPath + '/suser/delete',
        type: 'POST', //GET
        async: true,    //或false,是否异步
        // contentType: 'application/json',
        // traditional: true,
        data: {
            "id": e + ""
        },
        dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
        success: function (data) {
            if (data.code == 200) {
                alert("删除成功！")
                window.location.href = "javascript:history.go(0)";
            }
        }
    })
}

function xiugai(e) {
    $('#myModal1').modal({
        show: true,
        backdrop: 'static'
    });
    var inputs = $("#myModal1").find("input")
    console.log(inputs)
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }
    $.ajax({
        url: ReqPath + '/suser/detail',
        type: 'POST', //GET
        async: true,    //或false,是否异步
        // contentType: 'application/json',
        // traditional: true,
        data: {
            "id": e + ""
        },
        dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
        success: function (data) {
            if (data.code == 200) {
                console.log(data);
                $("#account").val(data.data.account);
                $("#cname").val(data.data.userinfo.name);
                $("#age").val(data.data.userinfo.age);
                $("#phone").val(data.data.userinfo.phonenumber);
                $("#em1").val(data.data.userinfo.email);
                $("#address").val(data.data.userinfo.adress);
                $("#account").val(data.data.account);
                $("#cname").val(data.data.userinfo.name);
                $("#age").val(data.data.userinfo.age);
                $("#phone").val(data.data.userinfo.phonenumber);
                $("#em1").val(data.data.userinfo.email);
                $("#xingble").val(data.data.userinfo.sex);
                $("#uid").val(data.data.uid);
                userinfoid=data.data.userinfo.uinfoid;
            }
        }
    })
}
function tianjia() {
    var suser={
        "account": $("#account").val(),
        "uid": $("#uid").val()
    };
    var userinfo={
            "adress":$("#address").val(),
            "age": $("#age").val(),
            "email": $("#em1").val(),
            "name": $("#cname").val(),
            "phonenumber": $("#phone").val(),
            "sex": $("#xingble").val(),
            "uinfoid": userinfoid
        }

    $.ajax({
        url: ReqPath + '/suser/update',
        type: 'POST', //GET
        async: true,    //或false,是否异步
        contentType: 'application/json',
        // traditional: true,
        data: JSON.stringify({
            "suser":suser,
            "userinfo":userinfo
        }),
        dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
        success: function (data) {
            if (data.code == 200) {
                console.log(data)
                alert("修改成功！")
                window.location.href = "javascript:history.go(0)";

            }
        }
    })
}

function delAll() {
    var deleteids=[];
    var inputs=$("input[type='checkbox']");
    for(var i=0;i<inputs.length;i++){
        if(inputs[i].checked){
            deleteids.push(inputs[i].value)
        }
    }
    if(deleteids.length==0){
        return
    }else {
        if(confirm("确定删除吗？")){
            $.ajax({
                url: ReqPath + '/suser/deleteids',
                type: 'POST', //GET
                async: true,    //或false,是否异步
                // contentType: 'application/json',
                traditional: true,
                data: {"ids":deleteids},
                dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
                success: function (data) {
                    if (data.code == 200) {
                        console.log(data)
                        alert("删除成功！")
                        window.location.href = "javascript:history.go(0)";

                    }
                }
            })
        }
    }


}