rs.initiate(
    {
       _id: "rs-shard-04",
       version: 1,
       members: [
          { _id: 0, host : "shard04-a:27017" },
          { _id: 1, host : "shard04-b:27017" }
       ]
    }
 )