$(function () {

    let cwd = ""

    let show_crontab = function (crontab_array) {
        let html = ""
        let $dummy = $("#cron-list")
        $dummy.empty()
        crontab_array.forEach(function (item) {
            html += '' +
                '<tr cron_id="' + item['cron_id'] + '">' +
                '    <td style="vertical-align: middle;">' + item['cron_id'] + '</td>' +
                '    <td style="vertical-align: middle;">' + item['description'] + '</td>' +
                '    <td style="vertical-align: middle;" class="line-limit-length">' + item['command'] + '</td>' +
                '    <td style="vertical-align: middle;">' + item['cron_type'] + '</td>' +
                '    <td style="vertical-align: middle;">' + item['next'] + '</td>' +
                '    <td>' +
                '        <button class="btn btn-sm btn-danger">删除</button>' +
                '    </td>' +
                '</tr>'
        })
        $dummy.append(html)

        $("button.btn-danger").click(function () {
            delete_crontab(
                $(this).parent().parent().attr("cron_id")
            )
        })
    }

    let get_crontab = function () {
        let settings = {
            "url": "/api/crontab",
            "method": "GET",
            "timeout": 0,
        };

        $.ajax(settings).done(function (response) {
            show_crontab(response)
        });
    };

    let get_cwd = function () {
        let settings = {
            "url": "/api/cwd",
            "method": "GET",
            "timeout": 0,
        };

        $.ajax(settings).done(function (response) {
            cwd = response.toString()
        });
    }

    let post_crontab = function () {
        let settings = {
            "url": "/api/crontab",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            "data": {
                "cron_type": $("#cron-type").val(),
                "command": $("#command").val(),
                "description": $("#task-name").val()
            }
        };

        $.ajax(settings).done(function (response) {
            $("#form")[0].reset()
            get_crontab()
        });
    }

    let delete_crontab = function (cron_id) {
        let settings = {
            "url": "/api/crontab",
            "method": "DELETE",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            "data": {"cron_id": cron_id}
        };

        $.ajax(settings).done(function (response) {
            get_crontab()
        });
    }

    $("button.btn-default").click(function () {
        post_crontab()
    })

    $("#task_type").change(function () {

        let $selected = $("#task_type").val()
        if ($selected === "1") {
            $(".oss").hide()
            $("#task-name").val('')
            $('#cron-type option[value="minute"]').attr("selected", "selected")
            $("#command").val("")
        } else if ($selected === "2") {
            $("#command").val("")
            $(".oss").show()
        } else if ($selected === "3") {
            $(".oss").hide()
            $("#task-name").val('同步时间')
            $('#cron-type option[value="month"]').attr("selected", "selected")
            $("#command").val("sudo ntpdate ntp.aliyun.com > /tmp/ntpdate.log")
        }
    })

    $(".oss").change(function () {
        $("#command").val("" +
            "cd " + cwd + " && venv/bin/python " + "model/oss.py " + $("#oss-object-name").val() + " " + $("#oss-local-file").val()
        )
    })

    get_cwd()
    get_crontab()
})
