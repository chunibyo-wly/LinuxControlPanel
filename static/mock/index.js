Mock.mock("/api/sysinfo", {
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
})