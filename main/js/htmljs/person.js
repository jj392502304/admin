var comlist="";
var page = 1;
var size = 7;
var pageMax = "";
var tablePre = "<table id='table' class='table table-striped'><thead><tr><th>用户名</th><th>公司</th><th>性别</th><th>手机</th><th>邮箱</th><th>中文名</th><th>操作</th></tr></thead>"
var tableTaile = "</tbody></table>"
var pagePre = "<ul class='pagination'><li><a href='#' onclick='showPage(--page)'>&laquo;</a></li>"
var pageTail = "<li><a href='#' onclick='showPage(++page)'>&raquo;</a></li></ul>"
var linshidata = "";

function onload() {
    $.ajax({
        url: ReqPath + "/t/company/list", //请求的url地址
        dataType: "json", //返回格式为json
        async: true, //请求是否异步，默认为异步，这也是ajax重要特性
        data: null, //参数值
        type: "POST", //请求方式
        // processData: false, //对表单data数据是否进行序列化
        success: function (data) {
            if (data.code == 200) {
                comlist=data.data.list;
                // console.log(data.data.list);
                var str=""
                for(var i=0;i<comlist.length;i++){
                    str+="<option value='"+comlist[i].tComId+"'>"+comlist[i].tComName+"</option>"
                }
                $("#gongsi").html(str)
                $("#gongsi1").html(str)
            } else {
                alert(data.message);
            }

        }, error: function (msg) {
            alert(msg.message);
        }
    });
    // console.log(page);
    show(page, size);

}

function showPage(page1) {
    if (page1 <= 0) {
        page = 1;
    } else if (page1 > pageMax) {
        page = pageMax;
    } else {
        page = page1;
    }
    show(page, size);
}

function show(page, size) {
    $.ajax({
        url: ReqPath + "/t/person/list", //请求的url地址
        dataType: "json", //返回格式为json
        async: true, //请求是否异步，默认为异步，这也是ajax重要特性
        data: {
            page: page,
            size: size
        }, //参数值
        type: "POST", //请求方式
        // processData: false, //对表单data数据是否进行序列化
        success: function (data) {
            if (data.code == 200) {
                // console.log(data)
                var p = Math.ceil(data.data.total / size);
                pageMax = p;
                // console.log("页数：" + p)
                var list = data.data.list;
                var str = tablePre;
                var pg = "";
                for (var i = 0; i < list.length; i++) {
                    str += "<tr>"
                    str += "<td>" + list[i].username + "</td>"
                    str += "<td>" + list[i].comname + "</td>"
                    str += "<td>" + list[i].tGender + "</td>"
                    str += "<td>" + list[i].tMobile + "</td>"
                    str += "<td>" + list[i].tEmail + "</td>"
                    str += "<td>" + list[i].tCname + "</td>"
                    str += "<td>"
                    str += "<button class='btn' onclick='shanchu(" +JSON.stringify(list[i])+ ")'>删除</button>"
                    str += "<button class='btn' onclick='gengxin(" + JSON.stringify(list[i]) + ")'>修改</button>"
                    str += " </td>"
                    str += " </tr>"
                    pg += ""
                }
                str += tableTaile;
                if (p > 1) {
                    pg += pagePre;
                    for (var i = 0; i < p; i++) {
                        pg += "<li><a href='#' onclick='showPage(" + (i + 1) + ")'>" + (i + 1) + "</a></li>"
                    }
                    pg += pageTail;
                    // console.log(pg)
                    str += pg;
                }

                $("#table_div").html(str);
                // $("#table").html(str);
            } else {
                alert(data.message);
            }

        }, error: function (msg) {
            alert(msg.message);
        }
    });
}

function chaxun() {
    var name=$("#select1").val();
    $.ajax({
        url: ReqPath + "/t/person/detail2", //请求的url地址
        dataType: "json", //返回格式为json
        async: true, //请求是否异步，默认为异步，这也是ajax重要特性
        data: {
            cname: name
        }, //参数值
        type: "POST", //请求方式
        success: function (data) {
            if (data.code == 200) {
                console.log(data);
                var str = tablePre;
                str += "<tr>"
                str += "<td>" + data.data.username+ "</td>"
                str += "<td>" + data.data.company+ "</td>"
                str += "<td>" + data.data.tGender + "</td>"
                str += "<td>" + data.data.tMobile + "</td>"
                str += "<td>" + data.data.tEmail + "</td>"
                str += "<td>" + data.data.tCname + "</td>"
                str += "<td>"
                str += "<button class='btn' onclick='shanchu(" +JSON.stringify(data.data)+ ")'>删除</button>"
                str += "<button class='btn' onclick='gengxin(" + JSON.stringify(data.data)+ ")'>修改</button>"
                str += " </td>"
                str += " </tr>"
                str += tableTaile;
                $("#table_div").html(str);
            } else {
                alert(data.message);
            }

        }, error: function (msg) {
            alert(msg.message);
        }
    });
}

function shanchu(data) {

    $.ajax({
        url: ReqPath + "/t/person/delete", //请求的url地址
        dataType: "json", //返回格式为json
        async: true, //请求是否异步，默认为异步，这也是ajax重要特性
        data: {
            id: data.tPresonId
        }, //参数值
        type: "POST", //请求方式
        success: function (data) {
            if (data.code == 200) {
                alert("删除成功");
                window.location.href = "person.html";
            } else {
                alert(data.message);
            }

        }, error: function (msg) {
            alert(msg.message);
        }
    });
}

function gengxin(data) {
    $('#myModal').modal({
        show: true,
        backdrop: 'static'
    });
    linshidata = data;
    $("#username").val(data.username);
    $("#company").val(data.comname);
    $("#xingble").val(data.tGender);
    $("#phone").val(data.tMobile);
    $("#em").val(data.tEmail);
    $("#cname").val(data.tCname);
}

function updateData(data) {
    var username = $("#username").val();
    var com = $("#gongsi").val();
    // var text = $("#gongsi").text();
    var xingbie = $("#xingble").val();
    var phone = $("#phone").val();
    var em = $("#em").val();
    var cname = $("#cname").val();
    var pid=data.tPresonId;
    var uid= data.tUserId;
    // console.log(text);
    var data1 = {
        "tCname": cname,
        "tComId": com,
        // "tDicId": "1",
        "tEmail": em,
        "tGender": xingbie,
        "tMobile": phone,
        "tPresonId": pid,
        "tUserId": uid
    };
    var data2 = {
        "tUserId": uid,
        "tUserName": username
    };
    $.ajax({
        url: ReqPath + "/t/person/updateperson", //请求的url地址
        dataType: "json", //返回格式为json
        async: true, //请求是否异步，默认为异步，这也是ajax重要特性
        data: JSON.stringify(data1), //参数值
        headers : {
            'Content-Type' : 'application/json;charset=utf-8'
        },
        type: "POST", //请求方式
        // ContentType:"application/json",
        success: function (data) {
            if (data.code == 200) {
                $.ajax({
                    url: ReqPath + "/t/person/updateuser", //请求的url地址
                    dataType: "json", //返回格式为json
                    async: true, //请求是否异步，默认为异步，这也是ajax重要特性
                    data: JSON.stringify(data2), //参数值
                    headers : {
                        'Content-Type' : 'application/json;charset=utf-8'
                    },
                    type: "POST", //请求方式
                    // ContentType:"application/json",
                    success: function (data) {
                        if (data.code == 200) {
                            window.location.href = "person.html";
                        } else {
                            alert(data.message);
                        }

                    }, error: function (msg) {
                        alert(msg.message);
                    }
                });
            } else {
                alert(data.message);
            }

        }, error: function (msg) {
            alert(msg.message);
        }
    });


}
function add1(){
    $('#myModal1').modal({
        show: true,
        backdrop: 'static'
    });
}
function tianjia() {
    var username = $("#username1").val();
    var com = $("#gongsi1").val();
    // var text = $("#gongsi").text();
    var xingbie = $("#xingble1").val();
    var phone = $("#phone1").val();
    var em = $("#em1").val();
    var cname = $("#cname1").val();

    var datass={
        "tCname": cname,
        "tComId": com,
        // "tDicId": "string",
        "tEmail": em,
        "tGender": xingbie,
        "tMobile": phone,
        "tPresonId": "string",
        "tUserId": "string",
        "username": username
    }

    $.ajax({
        url: ReqPath + "/t/person/add", //请求的url地址
        dataType: "json", //返回格式为json
        async: true, //请求是否异步，默认为异步，这也是ajax重要特性
        data: JSON.stringify(datass), //参数值
        headers : {
            'Content-Type' : 'application/json;charset=utf-8'
        },
        type: "POST", //请求方式
        // ContentType:"application/json",
        success: function (data) {
            if (data.code == 200) {
                alert("添加成功")
                window.location.href = "person.html";
            } else {
                alert(data.message);
            }

        }, error: function (msg) {
            alert(msg.message);
        }
    });
}