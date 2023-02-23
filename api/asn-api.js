const express = require("express");
const {body, validationResult} = require('express-validator');
const router = express.Router();
const asnService = require('../service/asn-service');
const Joi = require('joi');
const {createErrorRes} = require("../service/error-msg");

router.post('/',
    [
      body('msg_type').notEmpty(),
      body('msg_id').notEmpty(),
      body('from_code').notEmpty(),
      body('partner_code').notEmpty(),
      body('data_digest').notEmpty(),
      body('logistics_interface').notEmpty(),

    ], async (req, res) => {

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(200).json(
            createErrorRes(errors.array()[0].param));
      }

      const logisticsJson = JSON.parse(req.body.logistics_interface);
      const logisticsJsonValidationResult = validateLogisticsJson(
          logisticsJson);
      if (logisticsJsonValidationResult.error) {
        return res.status(200).json(createErrorRes(
            logisticsJsonValidationResult.error.details[0].context.key));
      }

      const refineReq = {
        msg_type: req.body.msg_type,
        msg_id: req.body.msg_id,
        from_code: req.body.from_code,
        partner_code: req.body.partner_code,
        data_digest: req.body.data_digest,
        logistics_interface: req.body.logistics_interface,
      }

      await asnService.add(refineReq, logisticsJson);

      res.json({success: "true"});
    });

// {"":"LP00026858846767","":"AECA00015","":"false","":"2022-11-09 17:39:00","":
// {"name":"SHIN","phone":"01011112222","moblie":"01033334444"},"":"","":"Discard"}

function validateLogisticsJson(logisticsJson) {

  const schema = Joi.object({
    logisticsOrderCode: Joi.string().required(),
    bizType: Joi.string(),
    trackingNumber: Joi.string().required(),
    logisticsOrderCreateTime: Joi.string().required(),
    returnParcel: Joi.object().required(),
    lanecode: Joi.string().required(),
    undeliverableOption: Joi.string().required(),
  });

  return schema.validate(logisticsJson);

}

module.exports = router;
