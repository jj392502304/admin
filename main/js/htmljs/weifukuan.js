var max = 10000;
var p = 1;
var ids = [];
var shuju = [];
var itemsids = [];
var item_id = [];
var item_price = [];
var oid = "";
var s_text="";
var zhuangtai=GetRequest().zhuangtai;
$(function () {
    if(typeof(zhuangtai) == "undefined"){
        alert("服务器出现问题，请联系技术人员！")
    }else {
        if(zhuangtai==1){
            $("h3").html("未付款订单管理");
        }else if(zhuangtai==2){
            $("#ax").attr("disabled",true);
            $("h3").html("待发货订单管理");
        }else if(zhuangtai==3){
            $("#ax").attr("disabled",true);
            $("h3").html("已发货订单管理");
        }else if(zhuangtai==4){
            $("#ax").attr("disabled",true);
            $("h3").html("已发货订单管理");
        }
        shop(p)
    }

})

function shop(e) {
    p = e
    if (p < 1) {
        p = 1;
    }
    if (p > max) {
        p = max;
    }
    // console.log(p)
    $.ajax({
        url: ReqPath + '/order/admin/findAll',
        type: 'POST', //GET
        async: true,    //或false,是否异步
        traditional: true,//传递数组序列化
        data: {
            page: p,
            text:s_text,
            zhuangtai:zhuangtai
        },
        dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
        success: function (data) {
            if (data.code == 200) {
                // window.location.href = "javascript:history.go(0)";
                console.log(data)

                max = Math.ceil(data.data.total / 10);
                var list = data.data.list;
                shuju = list;
                var str = "";
                $.each(list, function (n, value) {
                    str += '<tr>' +
                        '                <td><input value="' + value.orderid + '" type="checkbox" name="checkxx"></td>' +
                        '                <td>' + value.orderid + '</td>' +
                        '                <td>' + value.account + '</td>' +
                        '                <td>' + value.payment + '</td>' +
                        '                <td>' + value.zhuangtai + '</td>' +
                        '                <td>' + value.createtime + '</td>' +
                        '                <td>' + value.updatetime + '</td>' +
                        '                <td>' + value.buyermessage + '</td>';
                    if (value.ad == null) {
                        str += '                <th>' + "" + '</th>' +
                            '                <th>' + "" + '</th>';
                    } else {
                        str += '                <th>' + value.ad.receiverName + '</th>' +
                            '                <th>' + value.ad.shengfen + value.ad.chengshi + value.ad.quyu + value.ad.address + '</th>';
                    }

                    if(zhuangtai==1){
                        str += '                <td>' +
                            '                    <button  class="btn" onclick="delone(\'' + value.orderid + '\')">删除</button>' +
                            // '                    <button class="btn" onclick="delAll()">修改</button>' +
                            '                    <button class="btn" onclick="xiangqing(' + n + ')">详情</button>' +
                            '                </td>' +
                            '            </tr>';
                    }else if(zhuangtai==2){
                        str += '                <td>' +
                            '                    <button class="btn" onclick="fahuo(\'' + value.orderid + '\')">发货</button>' +
                            // '                    <button class="btn" onclick="delAll()">修改</button>' +
                            '                    <button class="btn" onclick="xiangqing(' + n + ')">详情</button>' +
                            '                </td>' +
                            '            </tr>';
                    }else if(zhuangtai==3){
                        str += '                <td>' +
                            // '                    <button class="btn" onclick="delAll()">修改</button>' +
                            '                    <button class="btn" onclick="xiangqing(' + n + ')">详情</button>' +
                            '                </td>' +
                            '            </tr>';
                    }else if(zhuangtai==4){
                        str += '                <td>' +
                            // '                    <button class="btn" onclick="delAll()">修改</button>' +
                            '                    <button class="btn" onclick="xiangqing(' + n + ')">详情</button>' +
                            '                </td>' +
                            '            </tr>';
                    }
                })
                $("#tb").html(str);
                var str1 = ' <ul class=\'pagination\'>' +
                    '            <li><a href=\'#\' onclick="shop(--p)">&laquo;</a></li>';
                for (var i = 0; i < max; i++) {
                    str1 += '            <li><a href=\'#\' id="li' + (i + 1) + '" name="li" onclick="shop(' + (i + 1) + ')">' + (i + 1) + '</a></li>';
                }
                str1 += '            <li><a href=\'#\' onclick="shop(++p)">&raquo;</a></li>' +
                    '        </ul>';
                $("#page").html(str1);
                changeli();

            } else {
                alert(data.message)
            }

        }
    })
}

function delone(e) {
    if (confirm("确定删除？")) {
        $.ajax({
            url: ReqPath + '/order/delete',
            type: 'POST', //GET
            async: true,    //或false,是否异步
            traditional: true,//传递数组序列化
            data: {
                id: e
            },
            dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
            success: function (data) {
                if (data.code == 200) {
                    alert("删除成功！")
                    // window.location.href = "javascript:history.go(0)";
                    // $("#xxx").attr("checked",false);
                    shop(p);

                } else {
                    alert(data.message)
                }

            }
        })
    }
}

function changeli() {
    $("a[name='li']").css("color", "blue")
    $("#li" + p).css("color", "red")
    // console.log( $("#li"+p))
}

function delAll() {
    var checks = $("input[name='checkxx']");
    $.each(checks, function (n, value) {
        if (value.checked) {
            ids.push(value.value)
        } else {
            var index = ids.indexOf(value.value);
            if (index > -1) {
                ids.splice(index, 1);
            }
        }
    })
    if (ids.length == 0) {
        return;
    } else {
        if (confirm("确定删除？")) {
            $.ajax({
                url: ReqPath + '/order/deleteids',
                type: 'POST', //GET
                async: true,    //或false,是否异步
                traditional: true,//传递数组序列化
                data: {
                    ids: ids
                },
                dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
                success: function (data) {
                    if (data.code == 200) {
                        alert("删除成功！")
                        // window.location.href = "javascript:history.go(0)";
                        shop(p);

                    } else {
                        alert(data.message)
                    }

                }
            })
        }
    }

}

function xiangqing(e) {
    itemsids = [];
    item_price = [];
    item_id = [];
    oid = "";
    if (shuju[e].items.length == 0) {
        alert("该订单有问题，请删除！")
        return;
    }
    $('#myModal').modal({
        show: true,
        backdrop: 'static'
    });
    oid = shuju[e].orderid;
    var items = shuju[e].items;
    var str = "";
    $.each(items, function (n, value) {
        str += ' <tr>' +
            '                        <td>' + value.id + '</td>' +
            '                        <td>' + value.title + '</td>' +
            '                        <td>' + value.count + '</td>' +
            '                        <td><input type="text" onchange="item_xiugai(this)" value="' + value.price + '" style="width: 50px;text-align: center;border: 0"></td>' +
            '                        <td>' +
            '                            <button class="btn-danger btn-xs" name="ds" onclick="del_item(this)">删除</button>' +
            '                        </td>' +
            '                    </tr>';
    })
    $("#tb1").html(str);
    if(zhuangtai!=1){
        $("button[name='ds']").attr("disabled",true)
    }
}

function del_item(e) {
    itemsids.push($(e).parent().parent().children()[0].innerHTML)
    $(e).parent().parent().remove();
}

function item_xiugai(e) {
    var price = $(e).val();
    var regPos = /^\d+(\.\d+)?$/;
    if (price.length == 0) {
        alert("不能为空")
        $(e).focus();
    }
    if (!regPos.test(price)) {
        alert("请勿输入非数字！")
        $(e).focus();
    }
    var id=$(e).parent().parent().children()[0].innerHTML;
    if(item_id.indexOf(id)>-1){
        item_price[item_id.indexOf(id)]=price
    }else {
        item_id.push(id)
        item_price.push(price);
    }


}

function update() {
    if ($("#tb1").children().length == 0) {
        if (confirm("该订单购买的商品已被全部删除，如果提交将会删除该订单")) {
            $.ajax({
                url: ReqPath + '/order/delete',
                type: 'POST', //GET
                async: true,    //或false,是否异步
                traditional: true,//传递数组序列化
                data: {
                    id: oid
                },
                dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
                success: function (data) {
                    if (data.code == 200) {
                        alert("删除成功！")
                        // window.location.href = "javascript:history.go(0)";
                        $('#myModal').modal('hide');
                        shop(p);

                    } else {
                        alert(data.message)
                    }

                }
            })
        }
    } else {
        var shuju={
            deleteids: itemsids,
            itemids: item_id,
            prices: item_price
        };
        $.ajax({
            url: ReqPath + '/order/upitem',
            type: 'POST', //GET
            async: true,    //或false,是否异步
            // traditional: true,//传递数组序列化
            contentType: 'application/json',
            data: JSON.stringify(shuju),
            dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
            success: function (data) {
                if (data.code == 200) {
                    // console.log(data)
                    alert("修改成功！")
                    $('#myModal').modal('hide');
                    shop(p)
                } else {
                    alert(data.message)
                }

            }
        })
    }

}
function chaxun() {
    var text=$("#s_text").val();
    if(text.length==0){
        return;
    }else {
        s_text=text;
        shop(1)
    }
}

function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    if(url.length==0){
        url=document.referrer;
        url=url.substring(url.lastIndexOf("?"),url.length);
    }
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

function fahuo(e) {
    $("#xid").val(e);
    $("#postCode").val("");
    $("#postType").val("");
    $('#fahuo').modal({
        show: true,
        backdrop: 'static'
    });
}
function kuaidi() {
    if($("#xid").val().length==0){
        return;
    }
    if($("#postCode").val().length==0){
        return;
    }
    if($("#postType").val().length==0){
        return;
    }
    var data={
        "orderid": $("#xid").val(),
        "shipingcode": $("#postCode").val(),
        "shipingname": $("#postType").val()
    }
    $.ajax({
        url: ReqPath + '/order/fahuo',
        type: 'POST', //GET
        async: true,    //或false,是否异步
        // traditional: true,//传递数组序列化
        contentType: 'application/json',
        data: JSON.stringify(data),
        dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
        success: function (data) {
            if (data.code == 200) {
                alert("发货成功！")
                $('#fahuo').modal('hide');
                shop(p)
            } else {
                alert(data.message)
            }

        }
    })
}