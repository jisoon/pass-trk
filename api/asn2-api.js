const express = require("express");
const router = express.Router();
const {body, validationResult} = require('express-validator');
const asn2Service = require('../service/asn2-service');
const {createErrorRes} = require("../service/error-msg");

router.post('/', [
      body('logisticsOrderCode').notEmpty(),
      body('trackingNumber').notEmpty(),
      body('logisticsOrderCreateTime').notEmpty(),
      body('returnParcel').notEmpty(),
      body('laneCode').notEmpty(),
      body('undeliverableOption').notEmpty(),
    ],
    async (req, res) => {
      const returnParcel = JSON.parse(req.body.returnParcel);
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
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(200).json(createErrorRes(errors.array()[0].param));
      }

      await asn2Service.add(refineReq);

      res.json({success: "true"});
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
