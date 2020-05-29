$(function () {

    let stop_process = function (_pid) {
        let settings = {
            "url": "/api/process",
            "method": "DELETE",
            "timeout": 0,
            "headers": {"Content-Type": "application/x-www-form-urlencoded"},
            "data": {"pid": _pid}
        };

        $.ajax(settings).done(function (response) {
            // get_process()
        });
    }

    let show_process = function (proc_array) {
        let html = "";
        proc_array.forEach(function (item) {
            html = html + '' +
                '<tr pid="' + item["pid"] + '">' +
                '    <td style="vertical-align: middle;"><a>' + item["proc_name"] + '</a></td>' +
                '    <td style="vertical-align: middle;">' + item["cpu"] + '</td>' +
                '    <td style="vertical-align: middle;">' + item["mem"] + '</td>' +
                '    <td style="vertical-align: middle;">' + item["status"] + '</td>' +
                '    <td>' +
                '        <button class="btn btn-sm btn-danger">停止</button>' +
                '    </td>' +
                '</tr>'
        })
        $("#proc-list").empty().append(html);

        $("td > .btn").click(function () {
            stop_process($(this).parent().parent().attr("pid"))
        })
    }

    let get_process = function () {
        let settings = {
            "url": "/api/process",
            "method": "GET",
            "timeout": 0,
        };
        $.ajax(settings).done(function (response) {
            show_process(response);
        });
    }

    // get_process();
    setInterval(get_process, 1000);

    let show_netstat = function (netstat_array) {
        let $dummy = $("#netstat-list")
        $dummy.empty()
        let html = ""
        netstat_array.forEach(function (item) {
            html += '' +
                '<tr>' +
                '    <td style="vertical-align: middle;"><a>' + item['proc_name'] + '</a></td>' +
                '    <td style="vertical-align: middle;">' + item['cpu'] + '</td>' +
                '    <td style="vertical-align: middle;">' + item['mem'] + '</td>' +
                '    <td style="vertical-align: middle;">' + item['laddr_ip'] + '</td>' +
                '    <td style="vertical-align: middle;">' + item['laddr_port'] + '</td>' +
                '    <td style="vertical-align: middle;">' + item['raddr_ip'] + '</td>' +
                '    <td style="vertical-align: middle;">' + item['raddr_port'] + '</td>' +
                '</tr>'
        })
        $dummy.append(html)
    }

    let get_netstat = function () {
        let settings = {
            "url": "/api/netstat",
            "method": "GET",
            "timeout": 0,
        };

        $.ajax(settings).done(function (response) {
            show_netstat(response)
        });
    }

    setInterval(get_netstat, 1000);
})