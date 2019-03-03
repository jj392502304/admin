var flist = [];
var fengUrl = "";
var detUrl = "";
$(function () {
    $.ajax({
        url: ReqPath + '/kind/list',
        type: 'POST', //GET
        async: true,    //或false,是否异步
        contentType: 'application/json',
        data: null,
        dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
        success: function (data) {
           var list=data.data.list;
           $.each(list,function (n,value) {
               $("#kind").append('<option value="'+value.kid+'">'+value.ktype+'</option>')
           })
        }
    })

    $("#fengmian").on('change', function (e) {
        var linum = document.getElementById('ul1').getElementsByTagName("li").length;
        if (linum >= 3) {
            alert("不能大于3张");
            return;
        }
        if (this.files.length > 3) {
            alert("不能大于3张");
            return;
        }
        if (this.files.length + linum > 3) {
            alert("不能大于3张");
            return;
        }
        flist = flist.concat(Array.from(this.files));
        for (var i = 0; i < this.files.length; i++) {
            reviewFile(this.files[i])
        }
    });

    $("#upload2").on('click', function () {
        if (flist.length > 3) {
            layer.alert('最多允许上传3张图片');
            return;
        } else {
            var formData = new FormData();
            for (var i = 0, len = flist.length; i < len; i++) {
                //console.log(fileList[i]);
                formData.append('file', flist[i]);
            }
            $.ajax({
                url: 'http://120.79.7.46/file/fileonload/onloads',
                type: 'post',
                data: formData,
                dataType: 'json',
                processData: false,
                contentType: false,
                success: function (data) {
                    fengUrl = data
                    alert("上传成功！")
                    // console.log(fengUrl);
                }
            })
        }
    })
})

function del(e) {
    var $parent = $(e).parent();
    // console.log($parent);
    var index = $parent.index();
    flist.splice(index, 1);
    $parent.fadeOut(850, function () {
        $parent.remove()
    });
    // console.log(flist)
}

function reviewFile(file) {
    //实例化fileReader,
    var fd = new FileReader();
    //获取当前选择文件的类型
    var fileType = file.type;
    //调它的readAsDataURL并把原生File对象传给它，
    fd.readAsDataURL(file);//base64
    //监听它的onload事件，load完读取的结果就在它的result属性里了
    fd.onload = function () {
        if (/^image\/[jpeg|png|jpg|gif]/.test(fileType)) {
            $("#ul1").append('<li style="border:solid red 0px; margin:5px 5px; width: 70px" class="file-item"><img src="' + this.result + '" alt="" height="70" width="70px"><span class="file-del" style="left: 40%;position: absolute" onclick="del(this)">删除</span></li>').children(':last').hide().fadeIn(2500);
        } else {
            $("#ul1").append('<li class="file-item"><span class="file-name">' + file.name + '</span><span class="file-del"onclick="del(this)">删除</span></li>')
        }

    }
}

function article_save_submit() {
    var bool = false;
    var inputs = $("input[type=text]");
    for (var i = 0; i < inputs.length; i++) {
        if ($(inputs[i]).val().length == 0) {
            alert($(inputs[i]).parent().parent().find("label")[0].innerText + "不能为空");
            bool = true
            break;
        }
    }
    var selects = $("select");
    for (var i = 0; i < selects.length; i++) {
        if (selects[i].value == "请选择") {
            var str = $(selects[i]).parent().parent().parent().find("label")[0].innerText;
            str = str.replace("：", "").replace(/\s+/g, "");
            alert("请选择  " + str)
            bool = true
            break;
        }

    }
    if (bool) {
        return;
    }
    var cleaner = {
        "ccount": $("#count").val(),
        "cid": "string",
        "ckeyword": $("#keyword").val(),
        "cname": $("#name1").val(),
        "cpicurl": fengUrl[0],
        "cprice": $("#price").val(),
        "createDate": "string",
        "ctemple2": Math.round(Math.random() * (2 - 1) + 1),
        "ctypeid": $("#kind").val()
    }
    if(fengUrl.length==0){
        alert("请上传封面图片")
        return;
    }
    if(detUrl.length==0){
        alert("请上传详情图片")
        return;
    }

    var detail = {
        "chandi": $("#chandi").val(),
        "chicun": $("#chicun").val(),
        "chushuiwendu": $("#chushuiwendu").val(),
        "cid": "string",
        "color": $("#color").val(),
        "did": "string",
        "gonglv": $("#gonglv").val(),
        "guolvyuanli": $("#guolvyuanli").val(),
        "huishuilv": $("#huishuilv").val(),
        "lvshuihurongliang": $("#rongliang").val(),
        "romoguige": $("#ro").val(),
        "shifoutishishouming": $("#tishishouming").val(),
        "shifouyongdian": $("#shifouyongdian").val(),
        "shifouyouyalitong": $("#yalitong").val(),
        "shuiya": $("#shuiya").val(),
        "shuizhiyaoqiu": $("#shuizhi").val(),
        "type": $("#type").val(),
        "wendufanwei": $("#wendufanwei").val(),
        "zhongliang": $("#zhongliang").val()
    };

    $.ajax({
        url: ReqPath + '/cleaner/insert?furl='+fengUrl+"&durl="+detUrl,
        type: 'POST', //GET
        async: true,    //或false,是否异步
        contentType: 'application/json',
        data: JSON.stringify({
            "cleaner": cleaner,
            "detail": detail
        }),
        dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
        success: function (data) {
            alert("添加成功！")
            console.log(data)
        }
    })

}