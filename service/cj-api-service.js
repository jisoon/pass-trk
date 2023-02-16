const axios = require('axios');
const logger = require('../config/logger');

async function postCjApi(apiPath, reqBody, tokenNum) {
  const apiUrl = createApiUri(apiPath);
  let tokenResult = "";
  await axios.post(apiUrl, JSON.stringify(reqBody), {
    headers: {
      'Content-Type': 'application/json',
      'CJ-Gateway-APIKey' : tokenNum
    }
  }).then(res => {
    logger.info('--------------------------------------')
    logger.info(`[REQ] >>>>> ${JSON.stringify(res.config.headers)}`)
    logger.info(`[REQ] >>>>> ${JSON.stringify(res.config.method)}`)
    logger.info(`[REQ] >>>>> ${JSON.stringify(res.config.url)}`)
    logger.info(`[REQ] >>>>> ${JSON.stringify(res.config.data)}`)
    logger.info(`[RES] <<<<< ${JSON.stringify(res.status)}`, );
    logger.info(`[RES] <<<<< ${JSON.stringify(res.data)}`, );
    logger.info('--------------------------------------')
    tokenResult = res.data;
  }).catch(e => {
    logger.info('--------------------------------------')
    logger.info('[REQ][Error] axios >>>> req headers : ', e.config.headers);
    logger.info('[REQ][Error] axios >>>> req method : ', e.config.method);
    logger.info('[REQ][Error] axios >>>> req url : ', e.config.url);
    logger.info('[REQ][Error] axios >>>> req data : ', e.config.data);
    logger.info('[RES][Error] axios <<<< res status :', e.response.status);
    logger.info('[RES][Error] axios <<<< res body :', e.response.data);
    logger.info('--------------------------------------')
    tokenResult = e.response.data;
  });
  return tokenResult;
}

function createApiUri(path) {
  return `${process.env.CJ_API_URL}:${process.env.CJ_API_PORT}${path}`;

}

module.exports = {postCjApi};
