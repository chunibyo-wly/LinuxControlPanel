$(function () {
    $("#login-btn").click(function () {
        let settings = {
            "async": true,
            "crossDomain": true,
            "url": "/api/login",
            "method": "POST",
            "headers": {"content-type": "application/json"},
            "processData": false,
            "data": JSON.stringify({
                "name": $("#inputEmailAddress").val(),
                "passwd": $("#inputPassword").val()
            })
        };

        $.ajax(settings).done(function (response) {
            if (response["status"] === "ok") {window.location.href = "http://" + window.location.host;}
        });
    })
})
