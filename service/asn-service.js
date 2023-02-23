const asn2Service = require('./asn2-service');
const knex = require('../config/dbconfig');
const TB_APIASN = 'APIASN';


async function add(refineReq, logisticsInterfaceJson) {
  await knex(TB_APIASN).insert({
    msg_type: refineReq.msg_type,
    msg_id: refineReq.msg_id,
    from_code: refineReq.from_code,
    partner_code: refineReq.partner_code,
    data_digest: refineReq.data_digest,
    logistics_interface: refineReq.logistics_interface
  });

  await asn2Service.add({
    logisticsOrderCode: logisticsInterfaceJson.logisticsOrderCode,
    trackingNumber: logisticsInterfaceJson.trackingNumber,
    bizType: logisticsInterfaceJson.bizType,
    logisticsOrderCreateTime: logisticsInterfaceJson.logisticsOrderCreateTime,
    returnParcel_name: logisticsInterfaceJson.returnParcel.name,
    returnParcel_phone: logisticsInterfaceJson.returnParcel.phone,
    returnParcel_mobile: logisticsInterfaceJson.returnParcel.mobile,
    laneCode: logisticsInterfaceJson.lanecode,
    undeliverableOption: logisticsInterfaceJson.undeliverableOption,
  });
}

module.exports = {
  add: add
};
