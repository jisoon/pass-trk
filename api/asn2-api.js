const express = require("express");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const asn2Service = require('../service/asn2-service');

router.post('/', [
      body('logisticsOrderCode').notEmpty().withMessage(
          'Message check parameter fail to pass(logisticsOrderCode)'),
      body('trackingNumber').notEmpty().withMessage(
          'Message check parameter fail to pass(trackingNumber)'),
      body('logisticsOrderCreateTime').notEmpty().withMessage(
          'Message check parameter fail to pass(logisticsOrderCreateTime)'),
      body('returnParcel').notEmpty().withMessage(
          'Message check parameter fail to pass(returnParcel)'),
      body('laneCode').notEmpty().withMessage(
          'Message check parameter fail to pass(laneCode)'),
      body('undeliverableOption').notEmpty().withMessage(
          'Message check parameter fail to pass(undeliverableOption)'),
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
        return res.status(200).json({
          success: "false",
          errorCode: "S20",
          errors: errors.array()[0].msg});
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
