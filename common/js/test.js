$(function () {
    $.ajax({
        url: 'http://localhost:8082/cleaner/findtest',
        type: 'POST', //GET
        async: true,    //或false,是否异步
        data: {"name":""},
        dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
        success: function (data) {
            var list=data.data;
            var str="";



            $.each(list, function (i, item) {
                str += '<tr>' +
                    // '                <td><input type="checkbox" name="checkxx" value="' + item.cid + '"></td>' +
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
            $("#tb").html(str);
           var xxx=$("#xxx").DataTable({
               ordering: false,
               processing: true,
               deferRender: true,
               bSortClasses: true,
               info: false,  // 去除多余的自带信息
               //定义初始的页长
               pageLength: 10,
               pagingType: 'full_numbers',
               oPaginate:{
                   "sFirst": "首页",
                   "sPrevious": "上页",
                   "sNext": "下页",
                   "sLast": "末页"
               }

           })
            xxx.ajax.reload();
        }
    })
})