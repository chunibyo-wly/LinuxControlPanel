$(function () {

    let settings = {
        "async": true,
        "crossDomain": true,
        "url": "/api/sysinfo",
        "method": "GET",
        "headers": {
            "content-type": "application/xml",
        }
    };

    let init_axis_data = function (len) {
        let now = new Date();
        let res = [];
        while (len--) {
            res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
            now = new Date(now - 2000);
        }
        return res;
    }

    let init_charts_data = function (len) {
        let res = []
        while (len--) {
            res.push(0);
        }
        return res;
    }

    let shift_data = function (myChart, option, a, b) {
        let axisData = (new Date()).toLocaleTimeString().replace(/^\D*/, '');

        let data0 = option.series[0].data;
        let data1 = option.series[1].data;
        data0.shift();
        data0.push(a);
        data1.shift();
        data1.push(b);

        option.xAxis[0].data.shift();
        option.xAxis[0].data.push(axisData);
        myChart.setOption(option);
    }

    let net_io_charts = echarts.init(document.getElementById("net-io"));
    let net_io_colors = ['#5793f3', '#d14a61', '#675bba'];
    let net_io_option = {
        color: net_io_colors,
        tooltip: {
            trigger: 'none',
            axisPointer: {
                type: 'cross'
            }
        },
        legend: {
            data: ['网络发送', '网络接收']
        },
        grid: {
            top: 70,
            bottom: 50
        },
        xAxis: [
            {
                type: 'category',
                axisTick: {
                    alignWithLabel: true
                },
                axisLine: {
                    onZero: false,
                    lineStyle: {
                        color: net_io_colors[1]
                    }
                },
                axisPointer: {
                    label: {
                        formatter: function (params) {
                            return '网络接收 ' + params.value
                                + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                        }
                    }
                },
                data: init_axis_data(12)
            },
            {
                type: 'category',
                axisTick: {
                    alignWithLabel: true
                },
                axisLine: {
                    onZero: false,
                    lineStyle: {
                        color: net_io_colors[0]
                    }
                },
                axisPointer: {
                    label: {
                        formatter: function (params) {
                            return '网络发送  ' + params.value
                                + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                        }
                    }
                },
                data: init_axis_data(12)
            }
        ],
        yAxis: [
            {
                type: 'value',
                max: 2000,
                min: 0
            }
        ],
        series: [
            {
                name: '网络发送',
                type: 'line',
                xAxisIndex: 1,
                smooth: true,
                data: init_charts_data(12),
            },
            {
                name: '网络接收',
                type: 'line',
                smooth: true,
                data: init_charts_data(12),
            }
        ]
    };
    net_io_charts.setOption(net_io_option);


    let io_charts = echarts.init(document.getElementById("io"));
    let io_option = {
        color: net_io_colors,

        tooltip: {
            trigger: 'none',
            axisPointer: {
                type: 'cross'
            }
        },
        legend: {
            data: ['发送', '接收']
        },
        grid: {
            top: 70,
            bottom: 50
        },
        xAxis: [
            {
                type: 'category',
                axisTick: {
                    alignWithLabel: true
                },
                axisLine: {
                    onZero: false,
                    lineStyle: {
                        color: net_io_colors[1]
                    }
                },
                axisPointer: {
                    label: {
                        formatter: function (params) {
                            return '接受  ' + params.value
                                + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                        }
                    }
                },
                data: init_axis_data(12)
            },
            {
                type: 'category',
                axisTick: {
                    alignWithLabel: true
                },
                axisLine: {
                    onZero: false,
                    lineStyle: {
                        color: net_io_colors[0]
                    }
                },
                axisPointer: {
                    label: {
                        formatter: function (params) {
                            return '发送  ' + params.value
                                + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                        }
                    }
                },
                data: init_axis_data(12)
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: '发送',
                type: 'line',
                xAxisIndex: 1,
                smooth: true,
                data: init_charts_data(12)
            },
            {
                name: '接收',
                type: 'line',
                smooth: true,
                data: init_charts_data(12)
            }
        ]
    };
    io_charts.setOption(io_option);

    let vm = new Vue({
        el: '#cpu_info',
        data: {
            // core_num: response,
            message: {
                "cpu_info": {
                    "core_num": 2,
                    "cpu_num": 1,
                    "model_name": "Intel(R) Xeon(R) Platinum 8163 CPU @ 2.50GHz",
                    "processor_num": 2
                },
                "disk_info": {
                    "Total": 39,
                    "Used": 29
                },
                "io_info": {
                    "io_recv": 0,
                    "io_sent": 0,
                    "net_io_recv": 0,
                    "net_io_sent": 0
                },
                "mem_info": {
                    "Active": 2.71,
                    "Buffers": 0.3,
                    "Cached": 0.75,
                    "MemAvailable": 1.4,
                    "MemFree": 0.51,
                    "MemTotal": 3.85,
                    "SwapCached": 0,
                    "Used": 2.29
                }
            }
        }
    });

    setInterval(function () {

        $.ajax(settings).done(function (response) {
            if (typeof (response) === "string") {
                response = JSON.parse(response)
            }

            shift_data(net_io_charts, net_io_option, response['io_info']['net_io_sent'], response['io_info']['net_io_recv']);
            shift_data(io_charts, io_option, response['io_info']['io_sent'], response['io_info']['io_recv']);

            let disk_charts = echarts.init(document.getElementById("disk"));
            let disk_option = {
                tooltip: {
                    trigger: 'item',
                    formatter: 'Used: {c}G'
                },
                angleAxis: {
                    max: response['disk_info']['Total'],
                    startAngle: 30,
                    splitLine: {
                        show: false
                    }
                },
                radiusAxis: {
                    type: 'category',
                    data: ['', '/'],
                    z: 10
                },
                polar: {},
                series: [{
                    type: 'bar',
                    data: [0, response['disk_info']['Used']],
                    coordinateSystem: 'polar',
                    name: '/',
                    color: 'rgba(200, 0, 0, 0.5)',
                    itemStyle: {
                        borderColor: 'red',
                        borderWidth: 1
                    }
                }],
                legend: {
                    show: true,
                    data: ['/']
                }
            };
            disk_charts.setOption(disk_option)

            let mem_charts = echarts.init(document.getElementById("mem"));
            let mem_option = {
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c} ({d}%)'
                },
                legend: {
                    orient: 'horizontal',
                    // left: 10,
                    data: ['Used', 'Free', 'Buffers', 'Cached']
                },
                series: [
                    {
                        name: '内存占用',
                        type: 'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: [
                            {value: response['mem_info']['Used'], name: 'Used'},
                            {value: response['mem_info']['MemFree'], name: 'Free'},
                            {value: response['mem_info']['Buffers'], name: 'Buffers'},
                            {value: response['mem_info']['Cached'], name: 'Cached'}
                        ]
                    }
                ]
            };
            mem_charts.setOption(mem_option)

            vm.message = response
        });
    }, 2000);

    $("#logout").click(function () {
        let settings = {
            "url": "/api/logout",
            "method": "POST",
            "timeout": 0,
        };

        $.ajax(settings).done(function (response) {
            window.location.href = "http://" + window.location.host;
        });
    })
})