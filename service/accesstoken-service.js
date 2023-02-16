const cjApiService = require('./cj-api-service');
const memcache = require('../config/cacheconfig')

const CJ_TOKEN_MEM_KEY = 'CjTokenNum';
const HOUR = 1000 * 60 * 60;

async function getAccessToken() {
  if(memcache.get(CJ_TOKEN_MEM_KEY)){
    return {
      type : "mem",
      number : memcache.get(CJ_TOKEN_MEM_KEY)
    };
  }
  const reqBody = {
    DATA: {
      CUST_ID: process.env.CJ_CUST_ID,
      BIZ_REG_NUM: process.env.CJ_BIZ_REG_NUM
    }
  };
  const token = await cjApiService.postCjApi("/ReqOneDayToken", reqBody);
  memcache.set(CJ_TOKEN_MEM_KEY, token.DATA.TOKEN_NUM, HOUR * 24)
  return {
    type : "new",
    // number : memcache.get(CJ_TOKEN_MEM_KEY),
    number : memcache.get(CJ_TOKEN_MEM_KEY),
    cjRes : token.DATA,
    cjReq : reqBody
  };;
}

function delAccessToken(){
  memcache.del(CJ_TOKEN_MEM_KEY);
}

module.exports = {getAccessToken, delAccessToken  };
