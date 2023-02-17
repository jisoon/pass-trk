const express = require("express");
const { body, validationResult } = require('express-validator');
const router = express.Router();
const asnService = require('../service/asn-service');

router.post('/',
    [
      body('msg_type').notEmpty().withMessage(
          'Message check parameter fail to pass(msg_type)'),
      body('msg_id').notEmpty().withMessage(
          'Message check parameter fail to pass(msg_id)'),
      body('from_code').notEmpty().withMessage(
          'Message check parameter fail to pass(from_code)'),
      body('partner_code').notEmpty().withMessage(
          'Message check parameter fail to pass(partner_code)'),
      body('data_digest').notEmpty().withMessage(
          'Message check parameter fail to pass(data_digest)'),
      body('logistics_interface').notEmpty().withMessage(
          'Message check parameter fail to pass(logistics_interface)'),

    ], async (req, res) => {

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(200).json({
          success: "false",
          errorCode: "S20",
          errors: errors.array()[0].msg});
      }

      const refineReq = {
        msg_type: req.body.msg_type,
        msg_id: req.body.msg_id,
        from_code: req.body.from_code,
        partner_code: req.body.partner_code,
        data_digest: req.body.data_digest,
        logistics_interface: req.body.logistics_interface,
      }

      await asnService.add(refineReq);

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
