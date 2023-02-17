const express = require("express");
const router = express.Router();
const addrService = require('../service/addr-service');

router.get('/', async (req, res) => {

  const refineReq = {
    ip : getIp(req),
    comp : req.query.comp,
    trkcd : req.query.trkcd,
    trkno : req.query.trkno,
  }

  const refineResult = await addrService.refine(refineReq);

  res.json(refineResult);
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
