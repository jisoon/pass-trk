const express = require("express");
const router = express.Router();
const asn2Service = require('../service/asn2-service');

router.post('/', async (req, res) => {
  const returnParcel = req.body.returnParcel;
  const refineReq = {
    logisticsOrderCode: req.body.logisticsOrderCode,
    trackingNumber: req.body.trackingNumber,
    bizType: req.body.bizType,
    logisticsOrderCreateTime: req.body.logisticsOrderCreateTime,
    returnParcel_name: returnParcel.name,
    returnParcel_phone: returnParcel.phone,
    returnParcel_mobile: returnParcel.mobile,
    laneCode: req.body.laneCode,
    undeliverableOption: req.body.undeliverableOption,
  }

  await asn2Service.add(refineReq);

  res.json({success: true});
});

function getIp(req) {
  let ips = (
      req.headers['cf-connecting-ip'] ||
      req.headers['x-real-ip'] ||
      req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress || ''
  ).split(',');

  return ips[0].trim();
}

module.exports = router;
