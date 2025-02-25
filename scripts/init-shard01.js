rs.initiate({
    _id: "rs-shard-01", 
    version: 1, 
    members: [ 
        { 
            _id: 0, 
            priority: 2, 
            host : "shard01-a:27017"
        },
        { 
            _id: 1, 
            priority: 1,
            host : "shard01-b:27017"
        }, 
        { 
            _id: 2, 
            priority: 1,
            host : "shard01-c:27017"
        }, 
    ] 
})