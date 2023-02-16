const logger = require('../config/logger');
const knex = require('../config/dbconfig');
const axios = require("axios");
const TB_CS_LOG = 'CS_LOG';

async function refine(refineReq) {

  let response;
  if (refineReq.trkcd == 'CJ') {
    // fwdCode=KACT&HBLNo=운송장번호
    response = await axios.get(process.env.CJ_API_URL, {
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        fwdCode: "KACT",
        HBLNo: refineReq.trkno,
      }
    });
  } else {
    // regkey=1d17395f7493e7f891598501826530&target=trace&query=운송장번호

  }
  console.log(response.data);
  console.log(JSON.stringify(response.data));

  return JSON.stringify(response.data);

}

module.exports = {refine};
