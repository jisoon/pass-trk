const logger = require('../config/logger');
const knex = require('../config/dbconfig');
const axios = require("axios");
const TB_APITRK = 'APITRK';

axios.interceptors.request.use((config) => {
  console.log(
      `${config.method.toUpperCase()} request sent to ${config.url} at ${new Date().toISOString()}`);
  if (config.method.toUpperCase() === 'GET' || config.method.toUpperCase()
      === 'DELETE') {
    console.log(config.params);
  } else {
    console.log(config.data);
  }
  return config;
}, (error) => {
  console.error(error);
  return Promise.reject(error);
});

axios.interceptors.response.use((response) => {
  console.log(
      `${response.config.method.toUpperCase()} response received from ${response.config.url} at ${new Date().toISOString()}`);
  console.log(response.data);
  return response;
}, (error) => {
  console.error(error);
  return Promise.reject(error);
});

async function tracking(refineReq) {
  // 요청 이력 저장
  // INSERT INTO APITRK
  // (COMP_CD, TRK_CD, TRK_NO
  //     , REQ_IP, REQ_BODY
  //     , RES_BODY, RES_CODE, RES_DETAIL)
  // VALUES
  // (comp, trkcd, trkno
  //     , 요청ip, 요청body
  //     , 응답body, 응답결과(S or E), 응답메시지)

  let apiResponse;
  if (refineReq.trkcd.toUpperCase() === 'CJ') {
    apiResponse = await trackingCj(refineReq.trkno);
  } else {
    apiResponse = await trackingPost(refineReq.trkno);
  }

  await insertReqLog(refineReq, apiResponse);
  return apiResponse.data;
}

function insertReqLog(refineReq, apiResponse) {
  return knex(TB_APITRK).insert({
    COMP_CD: refineReq.comp,
    TRK_CD: refineReq.trkcd,
    TRK_NO: refineReq.trkno,
    REQ_IP: refineReq.ip,
    REQ_BODY: `${apiResponse.request.protocol}//${apiResponse.request.host}${apiResponse.request.path}`,
    RES_BODY: apiResponse.data,
    RES_CODE: apiResponse.status == 200 ? 'S' : 'E',
    RES_DETAIL: ''
  });
}

async function trackingCj(trackNo) {
  return await axios.get(process.env.CJ_API_URL, {
    headers: {
      'Content-Type': 'application/json',
    }, params: {
      fwdCode: "KACT", HBLNo: trackNo,
    }
  });
}

async function trackingPost(trackNo) {
  return await axios.get(process.env.POST_API_URL, {
    headers: {
      'Content-Type': 'application/json',
    }, params: {
      regkey: process.env.POST_REG_KEY,
      target: 'trace',
      query: trackNo
    }
  });
}

module.exports = {
  tracking: tracking
};
