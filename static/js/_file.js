
// 选中文件
var selectedList = new Array(); //全局变量,储存当前已选中文件,其内元素为Base64编码的文件全路径
$.ajax({
    type: "POST",
    dataType: "html",
    url: '/secectList',
    data: {
        'type': 'get'
    },
    success: function (data) {
        selectedList = JSON.parse(jQuery.parseJSON(data).result);
        document.getElementById("already").text = '已选中' + selectedList.length + '个文件,点击查看';
        console.log(selectedList)
    }
});
// 获取文件类型？
function getHtml(te) {
    var $ = layui.jquery;
    var hem = '';
    var chked = ''
    $.each(te, function (i, item) {
        if (selectedList.indexOf(Base64.encode(item.fileName)) != -1) {
            chked = ' checked '
        } else {
            chked = ''
        }
        var filetypes = ''
        fileSuffix = /\.[^\.]+$/.exec(item.fileName);
        hem += '<tr>';
        if (item.fileType == 'dir') {
            hem +=
                "<td><div style='float:left' ><input type='checkbox' onclick='checkboxClick()' id='" +
                item.fileName + "'" + chked +
                ">&#8195;<a href='javascript:void(0);' onclick='GetDir()' id='" + item.fileName +
                "'><img src='static/icon/dir.png' onclick='GetDir()' id='" + item.fileName +
                "'>&#8195;" + item.fileOnlyName + "</a></div></td>";
        } else {
            if (fileSuffix != null) {
                realFileSuffix = fileSuffix[0];
                if ((realFileSuffix == '.zip') || (realFileSuffix == '.ZIP') || (realFileSuffix ==
                    '.gz') || (realFileSuffix == '.GZ') || (realFileSuffix == '.tar') || (
                        realFileSuffix == '.TAR')) {
                    filetypes = 'zip';
                    hem +=
                        "<td><div style='float:left'><input type='checkbox' onclick='checkboxClick()' id='" +
                        item.fileName + "'" + chked +
                        ">&#8195;<img src='static/icon/zip.png'>&#8195;" + item.fileOnlyName +
                        "</div></td>";
                } else if ((realFileSuffix == '.jpg') || (realFileSuffix == '.JPG') || (
                    realFileSuffix == '.png') || (realFileSuffix == '.PNG') || (realFileSuffix ==
                        '.gif') || (realFileSuffix == '.GIF') || (realFileSuffix == '.JPEG') || (
                        realFileSuffix == '.jpeg') || (realFileSuffix == '.bmp') || (realFileSuffix ==
                            '.BMP') || (realFileSuffix == '.svg') || (realFileSuffix == '.SVG') || (
                        realFileSuffix == '.ico') || (realFileSuffix == '.ICO')) {
                    filetypes = 'pic';
                    hem +=
                        "<td><div style='float:left'><input type='checkbox' onclick='checkboxClick()' id='" +
                        item.fileName + "'" + chked +
                        ">&#8195;<img src='static/icon/pic.png'>&#8195;" + item.fileOnlyName +
                        "</div></td>";
                } else {
                    filetypes = 'no';
                    hem +=
                        "<td><div style='float:left'><input type='checkbox' onclick='checkboxClick()' id='" +
                        item.fileName + "'" + chked +
                        ">&#8195;<img src='static/icon/nonefile.png'>&#8195;" + item.fileOnlyName +
                        "</div></td>";
                };
            } else {
                hem +=
                    "<td><div style='float:left'><input type='checkbox' onclick='checkboxClick()' id='" +
                    item.fileName + "'" + chked +
                    ">&#8195;<img src='static/icon/nonefile.png'>&#8195;" + item.fileOnlyName +
                    "</div></td>";
            }

        };
        hem += "<td>" + item.fileSize + "</td>";
        hem += "<td><a style='color:#0040FF' href='javascript:void(0);' onclick='Chmod()' id='" + item
            .fileName + "'>" + item.power + "</a></td>";
        hem += "<td>" + item.fileMODTime + "</td><td>";


        if (item.fileType != 'dir') {
            if (filetypes == 'pic') {
                hem +=
                    "&#12288;<a class='layui-btn layui-btn-sm'  href='javascript:void(0);' onclick='visit()' id='" +
                    item.fileName + "'>预览</a>&#12288;";
            }
            hem +=
                "<a class='layui-btn layui-btn-sm' href='javascript:void(0);' onclick='codeEdit()' id='" +
                item.fileName + "'>编辑</a>";
            // hem +=
            //     "&#12288;<a class='layui-btn layui-btn-normal layui-btn-sm' href='javascript:void(0);' onclick='DownFile()' id='" +
            //     item.fileName + "'>下载</a>";
            // hem +=
            //     "&#12288;<a class='layui-btn layui-btn-normal layui-btn-sm' href='javascript:void(0);' onclick='fileShare()' id='" +
            //     item.fileName + "'>分享</a>";
        } else {
            // hem +=
            //     "&#12288;<a class='layui-btn layui-btn-normal layui-btn-sm'  href='javascript:void(0);' onclick='DownFile()' id='" +
            //     item.fileName + "'>下载</a>";
        };
        hem +=
            "&#12288;<a class='layui-btn layui-btn-normal layui-btn-sm' href='javascript:void(0);' onclick='RenameFile()' id='" +
            item.fileName + "'>重命名</a>";
        hem +=
            "&#12288;<a class='layui-btn layui-btn-normal layui-btn-sm' href='javascript:void(0);' onclick='Delete()' id='" +
            item.fileName + "'>删除</a>";

        if (filetypes == 'zip') {
            hem +=
                "&#12288;<a class='layui-btn layui-btn-normal layui-btn-sm'  href='javascript:void(0);' onclick='Extract()' id='" +
                item.fileName + "'>解压</a>";
        };
        hem += "</tr></td>";
    });
    return hem;
};
layui.config({
    base: 'static/plugins/layui/modules/'
});
layui.use(['icheck', 'laypage', 'layer'], function () {
    var files = '';
    var $ = layui.jquery
    var laypage = layui.laypage
    var layer = parent.layer === undefined ? layui.layer : parent.layer;
    $('input').iCheck({
        checkboxClass: 'icheckbox_flat-green'
    });
    var nowPath = Base64.decode('{{ nowPath }}');
    var sep = Base64.decode('{{ sep }}');
    var workPath = Base64.decode('{{ workPath }}');
    deleteSelectedList = function () {
        $.ajax({
            type: "POST",
            dataType: "html",
            url: '/secectList',
            data: {
                'type': 'del'
            }
        })
        selectedList = [];
    }
    // 获取文件列表
    function GetResult(path) {
        $.ajax({
            type: "POST",
            dataType: "html",
            url: '/GetFile',
            data: {
                'path': Base64.encode(path)
            },
            success: function (data) {
                if (jQuery.parseJSON(data).resultCode == '1') {
                    layer.alert(jQuery.parseJSON(data).result, {
                        title: false,
                        skin: "layui-layer-molv",
                        area: ["250px", "150px"],
                        time: 10000,
                        btn: ["知道了"]
                    });
                    return 0
                };
                path = Base64.decode(jQuery.parseJSON(data).result.path);
                nowPath = path
                files = jQuery.parseJSON(data).result.files;
                document.getElementById("fileQuantity").text = jQuery.parseJSON(data).result
                    .fileQuantity;
                var t = files.slice(0, 15);
                ht = getHtml(t);
                document.getElementById("dataList").innerHTML = ht;

                laypage({
                    cont: 'page',
                    pages: Math.ceil(files.length / 15),
                    groups: 5,
                    jump: function (obj, first) {
                        var curr = obj.curr;
                        if (!first) {
                            var te = files.slice(curr * 15 - 15, curr * 15);
                            hem = getHtml(te);
                            document.getElementById("dataList").innerHTML = hem;
                        }
                    }
                });
                var pathtemplist = nowPath.split(sep);
                fileRouteHtml = '';
                $.each(pathtemplist, function (i, item) {
                    if (i == 0) {
                        fileRouteHtml +=
                            "<a href='javascript:void(0);' style='color:#0040FF' onclick='FileRoute()' title='" +
                            workPath + "' >根目录</a>&#8194;/&#8194;";
                    } else if (item != '') {
                        fileRouteHtml +=
                            "<a href='javascript:void(0);' style='color:#0040FF' onclick='FileRoute()' title='" +
                            item + "' >" + item + "</a>&#8194;/&#8194;";
                    }
                });
                document.getElementById("fileRoute").innerHTML = fileRouteHtml;
                document.getElementById("already").text = '已选中' + selectedList.length +
                    '个文件,点击查看';
            }
        });
    };
    GetResult(nowPath);
    GetDir = function () {
        GetResult(event.srcElement.id);
    };
    // fileShare = function () {
    //     wpfilepath = Base64.encode(event.srcElement.id);
    //     fileSharealert = layer.alert('请确认分享的文件是否需要提取码', {
    //         skin: 'layui-layer-molv' //样式类名  自定义样式
    //             ,
    //         closeBtn: 1 // 是否显示关闭按钮
    //             ,
    //         anim: 0 //动画类型
    //             ,
    //         btn: ['需要', '不需要', '取消'] //按钮
    //             ,
    //         icon: 0 // icon
    //             ,
    //         yes: function () {
    //             $.ajax({
    //                 type: "POST",
    //                 dataType: "html",
    //                 url: '/creatFileShare',
    //                 data: {
    //                     'filepath': wpfilepath,
    //                     'needvie': 'yes'
    //                 },
    //                 success: function (data) {
    //                     layer.msg('成功建立带提取码的网盘分享')
    //                 }
    //             });
    //             layer.close(fileSharealert);
    //         },
    //         btn2: function () {
    //             $.ajax({
    //                 type: "POST",
    //                 dataType: "html",
    //                 url: '/creatFileShare',
    //                 data: {
    //                     'filepath': wpfilepath,
    //                     'needvie': 'no'
    //                 },
    //                 success: function (data) {
    //                     layer.msg('成功建立公开文件分享')
    //                 }
    //             });
    //         },
    //         btn3: function () {
    //             layer.msg('取消分享');
    //         }
    //     });
    // }
    codeEdit = function () {
        editfilepath = event.srcElement.id;
        clickeidt = layer.open({
            type: 2,
            title: editfilepath,
            shadeClose: false,
            shade: 0.8,
            btn: ['保存', '关闭'],
            area: ['90%', '800px'],
            content: '/codeEdit?filename=' + Base64.encode(editfilepath),

            yes: function (index) {
                var body = layer.getChildFrame('body', clickeidt);
                body.find("#codeEidtFormPostSubmit").click();
                layer.msg('文件已提交');
            },
            btn2: function () {
                console.log('文件关闭')
            }

        });
    };
    visit = function () {
        editfilepath = event.srcElement.id;
        $.ajax({
            type: "POST",
            dataType: "html",
            url: '/picVisit',
            data: {
                'filename': Base64.encode(editfilepath)
            },
            success: function (data) {
                var img = new Image()
                img.src = 'data:image/jpg;base64,' + data;
                img.onload = function () {
                    clickvisit = layer.open({
                        type: 1,
                        title: false,
                        shadeClose: false,
                        title: '此处仅为缩略图,原图请点击下载',
                        area: [img.width + 'px', img.height + 100 + 'px'],
                        btn: ['下载', '关闭'],
                        content: '<img src="data:image/jpg;base64,' + data +
                            '" alt="正在加载...">',
                        yes: function () {

                            document.getElementById("formPost").action =
                                '/DownFile';
                            document.getElementById("formPost").method =
                                'post';
                            v = Base64.encode(editfilepath);
                            document.getElementById("inputBox").value =
                                v;
                            document.getElementById("formPost").submit()


                        }

                    });

                };

            }
        });

    };
    // 文件下载
    // DownFile = function () {
    //     layer.msg('正在打包下载...');
    //     document.getElementById("formPost").action = '/DownFile';
    //     document.getElementById("formPost").method = 'post';
    //     v = Base64.encode(event.srcElement.id);
    //     document.getElementById("inputBox").value = v;
    //     document.getElementById("formPost").submit()
    // };
    // 文件重命名
    RenameFile = function () {
        oldFileName = event.srcElement.id;
        inputprompt = layer.prompt({
            title: '请输入新文件名',
            value: oldFileName.replace(/[^\\\/]*[\\\/]+/g, '')
        },
            function (value, index, elem) {
                var promptInputValue = value
                $.ajax({
                    type: "POST",
                    dataType: "html",
                    url: '/RenameFile',
                    data: {
                        'newFileName': Base64.encode(promptInputValue),
                        'oldFileName': Base64.encode(oldFileName)
                    },
                    success: function (data) {
                        resultCode = jQuery.parseJSON(data).resultCode;
                        if (resultCode == '0') {
                            b64filename = Base64.encode(oldFileName)
                            index = selectedList.indexOf(b64filename)
                            if (index != -1) {
                                selectedList.splice(index, 1);
                                $.ajax({
                                    type: "POST",
                                    dataType: "html",
                                    url: '/secectList',
                                    data: {
                                        'type': 'out',
                                        'value': b64filename
                                    }
                                });
                            }
                            GetResult(nowPath);
                            layer.msg('重命名成功')
                        } else {
                            layer.alert(jQuery.parseJSON(data).result, {
                                title: false,
                                skin: "layui-layer-molv",
                                area: ["250px", "150px"],
                                time: 10000,
                                btn: ["知道了"]
                            });
                            GetResult(nowPath)
                        }
                    }
                });
                layer.close(inputprompt);
            }
        );
    };
    // 修改文件权限
    // Chmod = function () {
    //     fileName = event.srcElement.id;
    //     inputpromptpower = layer.prompt({
    //             title: '请输入新权限',
    //             value: event.srcElement.text
    //         },
    //         function (value, index, elem) {
    //             var power = value;
    //             $.ajax({
    //                 type: "POST",
    //                 dataType: "html",
    //                 url: '/chmod',
    //                 data: {
    //                     'filename': Base64.encode(fileName),
    //                     'power': power
    //                 },
    //                 success: function (data) {
    //                     resultCode = jQuery.parseJSON(data).resultCode;
    //                     if (resultCode == '0') {
    //                         GetResult(nowPath);
    //                         layer.msg('修改成功')
    //                     } else {
    //                         layer.alert(jQuery.parseJSON(data).result, {
    //                             title: false,
    //                             skin: "layui-layer-molv",
    //                             area: ["250px", "150px"],
    //                             time: 10000,
    //                             btn: ["知道了"]
    //                         });
    //                         GetResult(nowPath)
    //                     };
    //                     layer.close(inputpromptpower);
    //                 }
    //             });
    //         }
    //     );
    // };
    // 删除文件
    Delete = function () {

        clickfilename = event.srcElement.id;
        clickalert = layer.alert('真的要删除吗', {
            skin: 'layui-layer-molv' //样式类名  自定义样式
            ,
            closeBtn: 1 // 是否显示关闭按钮
            ,
            anim: 0 //动画类型
            ,
            btn: ['确定', '取消'] //按钮
            ,
            icon: 0 // icon
            ,
            yes: function () {
                $.ajax({
                    type: "POST",
                    dataType: "html",
                    url: '/Delete',
                    data: {
                        'filename': Base64.encode(clickfilename)
                    },
                    success: function (data) {
                        resultCode = jQuery.parseJSON(data).resultCode;
                        if (resultCode == '0') {
                            GetResult(nowPath);
                            layer.msg('删除成功')
                        } else {
                            layer.alert(jQuery.parseJSON(data).result, {
                                title: false,
                                skin: "layui-layer-molv",
                                area: ["250px", "150px"],
                                time: 10000,
                                btn: ["知道了"]
                            });
                            GetResult(nowPath)
                        }
                    }
                });
                layer.close(clickalert);
            },
            btn2: function () {
                layer.msg('删除取消');
            }
        });
    };
    // 新建目录
    CreateDir = function () {
        inputprompt = layer.prompt({
            title: '请输入目录名'
        },
            function (value, index, elem) {
                var promptInputValue = value;
                $.ajax({
                    type: "POST",
                    dataType: "html",
                    url: '/CreateDir',
                    data: {
                        'dirName': Base64.encode(promptInputValue),
                        'path': Base64.encode(nowPath)
                    },
                    success: function (data) {
                        resultCode = jQuery.parseJSON(data).resultCode;
                        if (resultCode == '0') {
                            GetResult(nowPath);
                            layer.msg('创建成功')
                        } else {
                            layer.alert(jQuery.parseJSON(data).result, {
                                title: false,
                                skin: "layui-layer-molv",
                                area: ["250px", "150px"],
                                time: 10000,
                                btn: ["知道了"]
                            });
                            GetResult(nowPath)
                        }
                    }
                });
                layer.close(inputprompt);
            }
        );
    };
    // 跳转目录
    ChangePath = function () {
        inputprompt = layer.prompt({
            title: '请输入跳转目录',
            value: nowPath
        },
            function (value, index, elem) {
                var promptInputValue = value;
                GetResult(promptInputValue)
                layer.close(inputprompt);
            }
        );
    };
    // 创建文件夹
    CreateFile = function () {
        inputprompt = layer.prompt({
            title: '创建的文件名'
        },
            function (value, index, elem) {
                var promptInputValue = value
                $.ajax({
                    type: "POST",
                    dataType: "html",
                    url: '/CreateFile',
                    data: {
                        'fileName': Base64.encode(promptInputValue),
                        'path': Base64.encode(nowPath)
                    },
                    success: function (data) {
                        resultCode = jQuery.parseJSON(data).resultCode;
                        if (resultCode == '0') {
                            GetResult(nowPath);
                            layer.msg('创建成功');
                        } else {
                            layer.alert(jQuery.parseJSON(data).result, {
                                title: false,
                                skin: "layui-layer-molv",
                                area: ["250px", "150px"],
                                time: 10000,
                                btn: ["知道了"]
                            });
                            GetResult(nowPath)
                        }
                    }
                });

                layer.close(inputprompt);
            }
        );
    };
    SelectSplice = function () {
        b64filename = event.srcElement.id
        index = selectedList.indexOf(b64filename)
        if (index != -1) {
            selectedList.splice(index, 1);
            $.ajax({
                type: "POST",
                dataType: "html",
                url: '/secectList',
                data: {
                    'type': 'out',
                    'value': b64filename
                }
            });
            var alertSelectFile = '<div id="alertSelectListDiv">';
            $.each(selectedList, function (i, item) {
                alertSelectFile += (i + 1) + '.' + Base64.decode(item) + '<a id = "' +
                    item +
                    '" style = "float:right;color:#1E90FF" onclick="SelectSplice()">取消</a></br>';
            });
            alertSelectFile += '</div>'
            document.getElementById("alertSelectListDiv").innerHTML = alertSelectFile;
            alertSelectFile = ''
        };
    };
    // 弹出选中的文件列表
    alertSelectList = function () {
        var alertSelectFile = '<div id="alertSelectListDiv">';
        $.each(selectedList, function (i, item) {
            alertSelectFile += (i + 1) + '.' + Base64.decode(item) + '<a id = "' + item +
                '" style = "float:right;color:#1E90FF" onclick="SelectSplice()">取消</a></br>';
        });
        alertSelectFile += '</div>'
        clickalert = window.layer.alert('已选中的内容', {
            title: '已选中的内容',
            skin: 'layui-layer-molv' //样式类名  自定义样式
            ,
            closeBtn: 1 // 是否显示关闭按钮
            ,
            anim: 0 //动画类型
            ,
            btn: ['清空', '关闭'] //按钮
            ,
            content: alertSelectFile,
            yes: function () {
                deleteSelectedList()
                GetResult(nowPath);
                window.layer.close(clickalert);
            },
            btn2: function () {
                GetResult(nowPath);
                window.layer.close(clickalert);
            },
            cancel: function () {
                GetResult(nowPath);
                window.layer.close(clickalert);

            }
        });
        alertSelectFile = [];
        document.getElementById("ransda").selected = true;
    };

    // 批量操作
    batch = function () {
        titleTextDict = {
            'cut': '剪切',
            'copy': '复制',
            'delete': '删除',
            'zip': '压缩'
        }
        batchValue = document.getElementById('batch').value;
        var alertSelectFile = '';
        $.each(selectedList, function (i, item) {
            alertSelectFile += (i + 1) + '.' + Base64.decode(item) + '</br>';
        });
        clickalert = layer.alert('确认操作？', {
            title: '确认操作？',
            skin: 'layui-layer-molv' //样式类名  自定义样式
            ,
            closeBtn: 1 // 是否显示关闭按钮
            ,
            anim: 0 //动画类型
            ,
            btn: ['确定', '取消'] //按钮
            ,
            icon: 0,
            content: '将<a style="color:red">' + titleTextDict[batchValue] +
                '</a>以下文件:<br>' + alertSelectFile,
            yes: function () {
                $.ajax({
                    type: "POST",
                    dataType: "html",
                    url: '/batch',
                    data: {
                        'type': batchValue,
                        'selectedList': JSON.stringify(selectedList),
                        'path': Base64.encode(nowPath)
                    },
                    success: function (data) {
                        resultCode = jQuery.parseJSON(data).resultCode;
                        if (resultCode == '0') {
                            ;
                            layer.msg('处理成功');
                            selectedList = [];
                            GetResult(nowPath);
                        } else {
                            layer.alert(jQuery.parseJSON(data).result, {
                                title: false,
                                skin: "layui-layer-molv",
                                area: ["250px", "150px"],
                                time: 10000,
                                btn: ["知道了"]
                            });
                            selectedList = [];
                            GetResult(nowPath);
                        };
                    }
                });
                document.getElementById("ransda").selected = true;
                GetResult(nowPath)
                layer.close(clickalert);
            },
            btn2: function () {
                document.getElementById("ransda").selected = true;
            }
        });

    };
    // 选中文件
    checkboxClick = function () {
        b64filename = Base64.encode(event.srcElement.id)
        if (document.getElementById(event.srcElement.id).checked) {
            if ($.inArray(b64filename, selectedList) == -1) {
                selectedList.push(b64filename)
                $.ajax({
                    type: "POST",
                    dataType: "html",
                    url: '/secectList',
                    data: {
                        'type': 'in',
                        'value': b64filename
                    }
                });
            };

        } else {
            var index = selectedList.indexOf(Base64.encode(event.srcElement.id))
            selectedList.splice(index, 1);
            $.ajax({
                type: "POST",
                dataType: "html",
                url: '/secectList',
                data: {
                    'type': 'out',
                    'value': b64filename
                }
            });
        };

        document.getElementById("already").text = '已选中' + selectedList.length + '个文件,点击查看';
    };
    // 上传文件
    UploadFile = function () {
        uptip = layer.msg('上传中...', {
            icon: 16,
            time: 9999999
        });
        fd = new FormData();
        fd.append("nowPath", Base64.encode(nowPath));
        fd.append("File", $("#UploadInput").get(0).files[0]);
        $.ajax({
            url: '/UploadFile',
            type: "POST",
            processData: false,
            contentType: false,
            data: fd,
            success: function (data) {
                resultCode = jQuery.parseJSON(data).resultCode;
                if (resultCode == '0') {
                    GetResult(nowPath);
                    layer.close(uptip)
                    layer.msg('上传成功');
                } else {
                    layer.alert(jQuery.parseJSON(data).result, {
                        title: false,
                        skin: "layui-layer-molv",
                        area: ["250px", "150px"],
                        time: 10000,
                        btn: ["知道了"]
                    });
                    GetResult(nowPath)
                }
            }
        })
    };
    // 获取文件路径
    FileRoute = function () {
        if (event.srcElement.title == workPath) {
            GetResult(workPath);
        } else {
            var pathTempArr = nowPath.split(sep); //获取文件路径分离后的列表
            var clickText = event.srcElement.title; //点击的文件夹
            var clickTextIndex = pathTempArr.indexOf(clickText); //点击的文件名在列表中的位置
            var clickFilePathArr = pathTempArr.slice(0, clickTextIndex + 1);
            var realPath = clickFilePathArr.join(sep);
            GetResult(realPath);
        }
    };
    // 文件解压
    Extract = function () {
        $.ajax({
            type: "POST",
            dataType: "html",
            url: '/Extract',
            data: {
                'filename': Base64.encode(event.srcElement.id)
            },
            success: function (data) {
                resultCode = jQuery.parseJSON(data).resultCode;
                if (resultCode == '0') {
                    layer.msg('解压完成');
                    GetResult(nowPath)
                } else {
                    layer.msg(jQuery.parseJSON(data).result);
                    GetResult(nowPath)
                }
            }
        });
    }
});
