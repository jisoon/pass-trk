const knex = require('../config/dbconfig');
const TB_APIASN2 = 'APIASN2';

async function add(refineReq) {
  await knex(TB_APIASN2).insert({
    logisticsOrderCode: refineReq.logisticsOrderCode,
    trackingNumber: refineReq.trackingNumber,
    bizType: refineReq.bizType,
    logisticsOrderCreateTime: refineReq.logisticsOrderCreateTime,
    returnParcel_name: refineReq.returnParcel_name,
    returnParcel_phone: refineReq.returnParcel_phone,
    returnParcel_mobile: refineReq.returnParcel_mobile,
    laneCode: refineReq.laneCode,
    undeliverableOption: refineReq.undeliverableOption,
  })
}

module.exports = {
  add: add
};
