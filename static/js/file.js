$(function () {

    let path = "/";
    let page_index = 1;
    let list_num = 15;
    let file_list;

    let get_file_list = function (_path) {
        let settings = {
            "async": true,
            "crossDomain": true,
            "url": "/api/file?path=" + _path,
            "method": "GET"
        };

        $.ajax(settings).done(function (response) {
            if (typeof (response) === "string") {
                response = JSON.parse(response)
            }
            // console.log(response)
            page_index = 1;
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
                '            <button class="btn btn-info">下载</button>' +
                '            <button class="btn btn-info">删除</button>' +
                '            <button class="btn btn-info">重命名</button>' +
                '        </div>' +
                '    </td>' +
                '</tr>'
        }
        $("#file-list").empty().append(html);

        $("td.name").click(function () {
            if ($(this).attr("file_type") === "dir") {
                path = path + $(this).attr("file_name") + "/"
                get_file_list(path);

                let html = ""
                path.split("/").forEach(function (item) {
                    html = html + "" +
                        "<li>" + item + "</li>"
                })
                // html = html + "<li></li>"
                $("#path").empty().append(html);
            }
        })
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


    get_file_list(path);
})