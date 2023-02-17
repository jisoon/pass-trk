const express = require("express");
const router = express.Router();
const asnService = require('../service/asn-service');

router.post('/', async (req, res) => {

  const refineReq = {
    msg_type: req.body.msg_type,
    msg_id: req.body.msg_id,
    from_code: req.body.from_code,
    partner_code: req.body.partner_code,
    data_digest: req.body.data_digest,
    logistics_interface: req.body.logistics_interface,
  }

  await asnService.add(refineReq);

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
