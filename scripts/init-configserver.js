rs.initiate({
    _id: "rs-config-server", 
    configsvr: true, 
    version: 1, 
    members: [ 
        { 
            _id: 0, 
            priority: 2,
            host : 'configsvr01:27017'
        }, 
        { 
            _id: 1, 
            priority: 1, 
            host : 'configsvr02:27017'
        }, 
        { 
            _id: 2, 
            priority: 1,
            host : 'configsvr03:27017'
        } 
    ] 
})