rs.initiate({
    _id: "rs-shard-04", 
    version: 1, 
    members: [ 
        { 
            _id: 0,
            priority: 2, 
            host : "shard04-a:27017" 
        },
        { 
            _id: 1,
            priority: 1, 
            host : "shard04-b:27017" 
        }, 
        { 
            _id: 2, 
            priority: 1,
            host : "shard04-c:27017"
        }, 
    ] 
})