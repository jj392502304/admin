var flist = [];
var fengUrl = [];
var detUrl = [];
var id = ""
var did="";

var delteids = [];
$(function () {
    id = GetRequest().id;
    console.log(id)
    $.ajax({
        url: ReqPath + '/kind/list',
        type: 'POST', //GET
        async: false,    //或false,是否异步
        contentType: 'application/json',
        data: null,
        dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
        success: function (data) {
            var list = data.data.list;
            $.each(list, function (n, value) {
                $("#kind").append('<option value="' + value.kid + '">' + value.ktype + '</option>')
            })
        }
    })

    $.ajax({
        url: ReqPath + '/cleaner/select_a',
        type: 'POST', //GET
        async: false,    //或false,是否异步
        // contentType: 'application/json',
        data: {"id": id},
        dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
        success: function (data) {
            console.log(data)
            var cleaner = data.data.cleaner;
            var detail = data.data.detail;
            did=detail.did;
            var fengmian = data.data.fengmian;
            var xiangtu = data.data.xiangtu;
            $("#count").val(cleaner.ccount)
            $("#keyword").val(cleaner.ckeyword)
            $("#name1").val(cleaner.cname)
            $("#price").val(cleaner.cprice)
            $("#kind").val(cleaner.ctypeid)

            $("#chandi").val(detail.chandi)
            $("#chicun").val(detail.chicun)
            $("#chushuiwendu").val(detail.chushuiwendu)

            $("#color").val(detail.color)

            $("#gonglv").val(detail.gonglv)
            $("#guolvyuanli").val(detail.guolvyuanli)
            $("#huishuilv").val(detail.huishuilv)
            $("#rongliang").val(detail.lvshuihurongliang)
            $("#ro").val(detail.romoguige)
            $("#tishishouming").val(detail.shifoutishishouming)
            $("#shifouyongdian").val(detail.shifouyongdian)
            $("#yalitong").val(detail.shifouyouyalitong)
            $("#shuiya").val(detail.shuiya)
            $("#shuizhi").val(detail.shuizhiyaoqiu)
            $("#type").val(detail.type)
            $("#wendufanwei").val(detail.wendufanwei)
            $("#zhongliang").val(detail.zhongliang)

            for (var i = 0; i < fengmian.length; i++) {
                $("#ul1").append('<li style="border:solid red 0px; margin:5px 5px; width: 70px" class="file-item"><img style="margin-bottom: 5px" src="' + fengmian[i].dpicurl + '" alt="" height="70" width="70px"><button type="button" value="' + fengmian[i].dpicid + '" class="file-del" style="left: 30%;position: absolute;margin-bottom: 10px" onclick="del(this)">删除</button></li>').children(':last').hide().fadeIn(2500);
            }
            for (var i = 0; i < xiangtu.length; i++) {
                $("#ul2").append('<li style="border:solid red 0px; margin:5px 5px; width: 70px" class="file-item"><img style="margin-bottom: 5px" src="' + xiangtu[i].dpicurl + '" alt="" height="70" width="70px"><button type="button" value="' + xiangtu[i].dpicid + '" class="file-del" style="left: 30%;position: absolute;margin-bottom: 10px" onclick="del(this)">删除</button></li>').children(':last').hide().fadeIn(2500);
            }


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
        // flist = flist.concat(Array.from(this.files));
        // for (var i = 0; i < this.files.length; i++) {
        //     // reviewFile(this.files[i])
        // }

        if (flist.length > 3) {
            layer.alert('最多允许上传3张图片');
            return;
        } else {
            var formData = new FormData();
            for (var i = 0, len = this.files.length; i < len; i++) {
                //console.log(fileList[i]);
                formData.append('file', this.files[i]);
            }

            $.ajax({
                url: 'http://120.79.7.46/file/fileonload/onloads',
                type: 'post',
                data: formData,
                dataType: 'json',
                processData: false,
                contentType: false,
                success: function (data) {
                    for (var i = 0; i < data.length; i++) {
                        $("#ul1").append('<li style="border:solid red 0px; margin:5px 5px; width: 70px" class="file-item"><img style="margin-bottom: 5px" src="' + data[i] + '" alt="" height="70" width="70px"><button type="button" value="" class="file-del" style="left: 30%;position: absolute;margin-bottom: 10px" onclick="del(this)">删除</button></li>').children(':last').hide().fadeIn(2500);
                        fengUrl.push(data[i])
                    }
                    console.log(fengUrl);
                }
            })
        }
    });

    // $("#upload2").on('click', function () {
    //
    // })
})

function del(e) {
    var $parent = $(e).parent();
    var url = $($parent.find('img')[0]).attr('src')
    if (fengUrl.indexOf(url) > -1) {
        fengUrl.splice(fengUrl.indexOf(url), 1)
    }
    if (detUrl.indexOf(url) > -1) {
        detUrl.splice(detUrl.indexOf(url), 1)
    }
    // console.log($parent);
    var index = $parent.index();
    flist.splice(index, 1);
    $parent.fadeOut(850, function () {
        $parent.remove()
    });
    delteids.push(e.value)
    console.log(delteids)
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
            $("#ul1").append('<li style="border:solid red 0px; margin:5px 5px; width: 70px" class="file-item"><img style="margin-bottom: 5px" src="' + this.result + '" alt="" height="70" width="70px"><button type="button" value="" class="file-del" style="left: 30%;position: absolute;margin-bottom: 10px" onclick="del(this)">删除</button></li>').children(':last').hide().fadeIn(2500);
        } else {
            $("#ul1").append('<li style="border:solid red 0px; margin:5px 5px; width: 70px" class="file-item"><img style="margin-bottom: 5px" src="' + this.result + '" alt="" height="70" width="70px"><button type="button" value="" class="file-del" style="left: 30%;position: absolute;margin-bottom: 10px" onclick="del(this)">删除</button></li>').children(':last').hide().fadeIn(2500);
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
        "cid": id,
        "ckeyword": $("#keyword").val(),
        "cname": $("#name1").val(),
        "cpicurl": fengUrl[0],
        "cprice": $("#price").val(),
        "ctypeid": $("#kind").val()
    }
    if ($("#ul1").find('li').length == 0) {
        alert("请上传封面图片")
        return;
    }
    if ($("#ul2").find('li').length == 0) {
        alert("请上传详情图片")
        return;
    }

    var detail = {
        "chandi": $("#chandi").val(),
        "chicun": $("#chicun").val(),
        "chushuiwendu": $("#chushuiwendu").val(),
        "color": $("#color").val(),
        "did": did,
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
        url: ReqPath + '/cleaner/update_a?furl=' + fengUrl + "&durl=" + detUrl+"&deleteids="+delteids,
        type: 'POST', //GET
        async: true,    //或false,是否异步
        contentType: 'application/json',
        data: JSON.stringify({
            "cleaner": cleaner,
            "detail": detail
        }),
        dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
        success: function (data) {
            alert("修改成功！")
            console.log(data)
        }
    })

}