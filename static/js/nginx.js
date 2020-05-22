$(function () {

    let delete_web = function (name) {
        let settings = {
            "url": "/api/nginx",
            "method": "DELETE",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            "data": {"name": name}
        };

        $.ajax(settings).done(function (response) {
            get_web_list()
        });
    }

    let show_web_list = function (web_array) {
        console.log(web_array)
        let $dummy = $("#web-list")
        $dummy.empty()
        for (let i = 0; i < web_array.length; ++i) {
            if (i % 2 === 0) {
                $dummy.append('<div class="row"></div>')
            }
            let html = '' +
                '<div class="col-lg-6">' +
                '    <div class="panel  panel-primary">' +
                '        <div class="panel-heading">' +
                '            <div class="row">' +
                '                <div class="col-xs-3">' +
                '                    <i class="fa fa-cloud fa-5x"></i>' +
                '                </div>' +
                '                <div class="col-xs-9 text-right">' +
                '                    <div class="huge">' + web_array[i]['port'] + '</div>' +
                '                    <div>' + web_array[i]['name'] + '</div>' +
                '                </div>' +
                '            </div>' +
                '        </div>' +
                '        <div class="panel-footer">' +
                '            <a class="pull-left"' +
                '               style="cursor: pointer; text-decoration: none;" ' +
                'web_name="' + web_array[i]['name'] + '"' +
                '               onclick="">删除</a>' +
                '            <a href="http://' + window.location.hostname + ':' + web_array[i]['port'] + '" target="_blank">' +
                '                <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>' +
                '                <div class="clearfix"></div>' +
                '            </a>' +
                '        </div>' +
                '    </div>' +
                '</div>'
            $dummy.children("div.row").last().append(html)
        }

        $("a.pull-left").click(function () {
            delete_web($(this).attr("web_name"))
        })
    }

    let get_web_list = function () {
        let settings = {
            "url": "/api/nginx",
            "method": "GET",
            "timeout": 0,
        };

        $.ajax(settings).done(function (response) {
            if (typeof (response) === "string") {
                response = JSON.parse(response)
            }
            show_web_list(response["result"])
        });
    }

    get_web_list()

    let upload_file = function () {
        let form = new FormData();
        form.append("file", $('#file').prop("files")[0]);
        form.append("port", $("#port").val());

        console.log(form)

        let settings = {
            "url": "/api/nginx",
            "method": "PATCH",
            "timeout": 0,
            "processData": false,
            "mimeType": "multipart/form-data",
            "contentType": false,
            "data": form
        };

        $.ajax(settings).done(function (response) {
            get_web_list()
        });
    }

    $("#upfile").click(function () {
        upload_file()
    })
})