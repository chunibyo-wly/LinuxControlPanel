$(function () {

////////////////////////////////////////////////////////////
///                                                      ///
////////////////////////////////////////////////////////////

    let show_port_list = function (port_array) {
        let $dummy = $("#port-list")
        $dummy.empty()
        let html = ''
        port_array.forEach(function (item) {
            html += '' +
                '<tr rule_id="' + item['rule_id'] + '">' +
                '    <td style="vertical-align: middle;">' + item['rule_id'] + '</td>' +
                '    <td style="vertical-align: middle;">' + item['port'] + '</td>' +
                '    <td style="vertical-align: middle;">' + item['protocol'] + '</td>' +
                '    <td style="vertical-align: middle;">' + item['description'] + '</td>' +
                '    <td>' +
                '        <a style="cursor: pointer" ' +
                '           port="' + item['port'] + '"' +
                '           protocol="' + item['protocol'] + '">删除</a>' +
                '    </td>' +
                '</tr>'
        })
        $dummy.append(html)

        $("#port-list a").on("click", function () {
            delete_port(
                $(this).attr('port'),
                $(this).attr('protocol')
            )
        })
    }

    let get_port_list = function () {
        let settings = {
            "url": "/api/ufw/port",
            "method": "GET",
            "timeout": 0,
        };

        $.ajax(settings).done(function (response) {
            show_port_list(response)
        });
    }

    get_port_list()

////////////////////////////////////////////////////////////
///                                                      ///
////////////////////////////////////////////////////////////

    let delete_port = function (port, protocol) {
        let settings = {
            "url": "/api/ufw/port",
            "method": "DELETE",
            "timeout": 0,
            "headers": {"Content-Type": "application/x-www-form-urlencoded"},
            "data": {
                "port": port,
                "protocol": protocol
            }
        };

        $.ajax(settings).done(function (response) {
            get_port_list()
        });
    }

////////////////////////////////////////////////////////////
///                                                      ///
////////////////////////////////////////////////////////////

    let post_port = function (port, protocol, description) {
        let settings = {
            "url": "/api/ufw/port",
            "method": "POST",
            "timeout": 0,
            "headers": {"Content-Type": "application/x-www-form-urlencoded"},
            "data": {
                "port": port,
                "protocol": protocol,
                "description": description
            }
        };

        $.ajax(settings).done(function (response) {
            get_port_list()
        });
    }

    $("#port-submit").on("click", function () {
        post_port(
            $("#port").val(),
            $("#protocol1").val(),
            $("#description1").val()
        )
    })

////////////////////////////////////////////////////////////
///                                                      ///
////////////////////////////////////////////////////////////

    let show_ip_list = function (port_array) {
        let $dummy = $("#ip-list")
        $dummy.empty()
        let html = ''
        port_array.forEach(function (item) {
            html += '' +
                '<tr rule_id="' + item['rule_id'] + '">' +
                '    <td style="vertical-align: middle;">' + item['rule_id'] + '</td>' +
                '    <td style="vertical-align: middle;">' + item['ip'] + '</td>' +
                '    <td style="vertical-align: middle;">' + item['protocol'] + '</td>' +
                '    <td style="vertical-align: middle;">' + item['description'] + '</td>' +
                '    <td>' +
                '        <a style="cursor: pointer" ' +
                '           ip="' + item['ip'] + '"' +
                '           protocol="' + item['protocol'] + '">删除</a>' +
                '    </td>' +
                '</tr>'
        })
        $dummy.append(html)

        $("#ip-list a").on("click", function () {
            delete_ip(
                $(this).attr('ip'),
                $(this).attr('protocol')
            )
        })
    }

    let get_ip_list = function () {
        let settings = {
            "url": "/api/ufw/ip",
            "method": "GET",
            "timeout": 0,
        };

        $.ajax(settings).done(function (response) {
            show_ip_list(response)
        });
    }

    get_ip_list()

////////////////////////////////////////////////////////////
///                                                      ///
////////////////////////////////////////////////////////////

    let post_ip = function (ip, protocol, description) {
        let settings = {
            "url": "/api/ufw/ip",
            "method": "POST",
            "timeout": 0,
            "headers": {"Content-Type": "application/x-www-form-urlencoded"},
            "data": {
                "ip": ip,
                "protocol": protocol,
                "description": description
            }
        };

        $.ajax(settings).done(function (response) {
            get_ip_list()
        });
    }

    $("#ip-submit").on("click", function () {
        post_ip(
            $("#ip").val(),
            $("#protocol2").val(),
            $("#description2").val()
        )
    })

////////////////////////////////////////////////////////////
///                                                      ///
////////////////////////////////////////////////////////////

    let delete_ip = function (ip, protocol) {
        let settings = {
            "url": "/api/ufw/ip",
            "method": "DELETE",
            "timeout": 0,
            "headers": {"Content-Type": "application/x-www-form-urlencoded"},
            "data": {
                "ip": ip,
                "protocol": protocol
            }
        };

        $.ajax(settings).done(function (response) {
            get_ip_list()
        });
    }
})