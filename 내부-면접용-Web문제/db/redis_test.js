const redis=require('redis')
const client=redis.createClient()

async function run(){
    await client.connect()
}

run()

module.exports={
    setValue:async function(key,value){
        const onehourExpire=60*60
        await client.set(key,value,"EX",onehourExpire);
    },

    getValue:async function(key){
        return client.get(key)
    },

    existKeyChekcer:async function(key){
        return client.exists(key)
    },

    expireKey:async function(key){
        await client.del(key)
    }
}

