$(function () {

    let stop_container = function (container_id) {
        let settings = {
            "url": "/api/docker",
            "method": "PUT",
            "timeout": 0,
            "headers": {"Content-Type": "application/x-www-form-urlencoded"},
            "data": {
                "operation": "stop",
                "container_id": container_id
            }
        };

        $.ajax(settings).done(function (response) {
            show_container(response["container_run"], response["container_stop"])
        });
    }

    let start_container = function (container_id) {
        let settings = {
            "url": "/api/docker",
            "method": "PUT",
            "timeout": 0,
            "headers": {"Content-Type": "application/x-www-form-urlencoded"},
            "data": {
                "operation": "start",
                "container_id": container_id
            }
        };

        $.ajax(settings).done(function (response) {
            show_container(response["container_run"], response["container_stop"])
        });
    }

    let show_container = function (run_array, stop_array) {
        let html = "";
        run_array.forEach(function (item) {
            html = html + '' +
                '<tr container_id="' + item['container_id'] + '">' +
                '    <td style="vertical-align: middle;">' + item['name'] + '</td>' +
                '    <td style="vertical-align: middle;">' + item['cpu'] + '</td>' +
                '    <td style="vertical-align: middle;">' + item['mem'] + '</td>' +
                '    <td style="width: 400px;">' +
                '        <button class="btn btn-sm btn-danger">停止</button>' +
                '    </td>' +
                '</tr>'
        })
        $("#run-list").empty().append(html);

        html = ""
        stop_array.forEach(function (item) {
            html = html + '' +
                '<tr container_id="' + item['container_id'] + '">' +
                '    <td style="vertical-align: middle;">' + item['name'] + '</td>' +
                '    <td style="vertical-align: middle;">' + item['cpu'] + '</td>' +
                '    <td style="vertical-align: middle;">' + item['mem'] + '</td>' +
                '    <td style="width: 400px;">' +
                '        <button class="btn btn-sm btn-info">启动</button>' +
                '    </td>' +
                '</tr>'
        })
        $("#stop-list").empty().append(html);

        // 停止事件
        $("td > .btn-danger").click(function () {
            stop_container($(this).parent().parent().attr("container_id"))
        })

        // 启动事件
        $("td > .btn-info").click(function () {
            start_container($(this).parent().parent().attr("container_id"))
        })
    }

    let get_container = function () {
        let settings = {
            "url": "/api/docker",
            "method": "GET",
            "timeout": 0,
        };

        $.ajax(settings).done(function (response) {
            show_container(response["container_run"], response["container_stop"])
        });
    }

    get_container();

})