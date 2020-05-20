$(function () {

    let path = [];
    let page_index = 1;
    let list_num = 15;
    let file_list;

    let array2str = function (path_array) {
        let path_str = "/"
        path_array.forEach(function (item) {
            path_str = path_str + item + "/"
        })
        return path_str;
    }

    let get_file_list = function (_path, change = true) {
        let settings = {
            "async": true,
            "crossDomain": true,
            "url": "/api/ftp_list?path=" + _path,
            "method": "GET"
        };

        $.ajax(settings).done(function (response) {
            if (typeof (response) === "string") {
                response = JSON.parse(response)
            }

            if (change) {
                page_index = 1;
                $("#page-index").html('<a href="#">' + page_index + '</a>');
            }
            file_list = response["file"];
            get_file_list_by_index(page_index - 1);
        });
    }

    let get_file_list_by_index = function (index) {
        let html = "";
        for (let i = index * list_num; i < Math.min((index + 1) * list_num, file_list.length); ++i) {
            html = html + '' +
                '<tr>' +
                '    <td class="name" style="text-align: left; vertical-align: middle;" file_type="' + file_list[i]["file_type"] + '" file_name="' + file_list[i]["name"] + '">' +
                '        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
                '        <img src="../icon/' + file_list[i]["file_type"] + '.png" alt="">' +
                '        &nbsp;&nbsp;&nbsp;' + file_list[i]["name"] +
                '    </td>' +
                '    <td style="vertical-align: middle; width: 500px;">' + file_list[i]["mode"] + '</td>' +
                '    <td style="vertical-align: middle;">' + file_list[i]["owner"] + '</td>' +
                '    <td style="vertical-align: middle; width: 500px">' +
                '        <div class="btn-group btn-group-lg">' +
                '            <a download class="btn btn-info" href="/api/ftp?path=' + array2str(path) + file_list[i]["name"] + '">下载</a>' +
                '            <button class="btn btn-info file-delete" file_name="' + file_list[i]["name"] + '">删除</button>' +
                // '            <button class="btn btn-info file-rename" file_name="' + file_list[i]["name"] + '">重命名</button>' +
                '        </div>' +
                '    </td>' +
                '</tr>'
        }
        $("#file-list").empty().append(html);

        // 文件夹点击事件
        $("td.name").click(function () {
            if ($(this).attr("file_type") === "dir") {
                if ($(this).attr("file_name") === ".") {

                } else if ($(this).attr("file_name") === "..") {
                    path.pop();
                } else {
                    path.push($(this).attr("file_name"));
                }

                get_file_list(array2str(path));

                let html = "<li></li>"
                path.forEach(function (item) {
                    html = html + "<li>" + item + "</li>"
                })
                $("#path").empty().append(html);
            }
        })

        // 删除文件
        $("button.file-delete").click(function () {
            delete_file(array2str(path) + $(this).attr("file_name"));
        })
    }

    let delete_file = function (_path) {
        let settings = {
            "async": true,
            "crossDomain": true,
            "url": "/api/ftp",
            "method": "DELETE",
            "headers": {"content-type": "application/json"},
            "processData": false,
            "data": JSON.stringify({
                "path": _path
            })
        };

        $.ajax(settings).done(function (response) {
            get_file_list(array2str(path));

        });
    }

    let upload_file = function (_path) {
        let form = new FormData();
        form.append("file", $('#upfile').prop("files")[0]);
        // form.append("file", $('#upfile').prop('files').files[0]);
        form.append("path", _path);

        console.log(form)

        let settings = {
            "url": "/api/ftp",
            "method": "PATCH",
            "timeout": 0,
            "processData": false,
            "mimeType": "multipart/form-data",
            "contentType": false,
            "data": form
        };

        $.ajax(settings).done(function (response) {
            get_file_list(array2str(path));
        });
    }

    $(".pagination li:first").click(function () {
        page_index -= 1;
        $("#page-index").html('<a href="#">' + page_index + '</a>');
        get_file_list_by_index(page_index - 1);
    })

    $(".pagination li:last").click(function () {
        page_index += 1;
        $("#page-index").html('<a href="#">' + page_index + '</a>');
        get_file_list_by_index(page_index - 1);
    })


    get_file_list(array2str(path));

    $("#upfile").change(function () {
        upload_file(array2str(path))
    })
})