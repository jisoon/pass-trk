const express = require("express");
const router = express.Router();
const trackingService = require('../service/tracking-service');
const {query, validationResult} = require("express-validator");
const xml = require('xml');

router.get('/'
    , [query('comp').notEmpty().withMessage(
        'Message check parameter fail to pass(comp)')
      , query('trkcd').notEmpty().withMessage(
          'Message check parameter fail to pass(trkcd)')
      , query('trkno').notEmpty().withMessage(
          'Message check parameter fail to pass(trkno)')
    ]
    , async (req, res) => {

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        if (req.query.trkcd && req.query.trkcd.toUpperCase() === 'POST') {
          const errorData = {
            error: [
              {errorCode: "S20"},
              {errors: errors.array()[0].msg},
            ]
          }
          res.set('Content-Type', 'application/xml');
          return res.send(xml(errorData));
        } else {
          return res.status(200).json({
            success: "false",
            errorCode: "S20",
            errors: errors.array()[0].msg
          });
        }
      }

      const refineReq = {
        ip: getIp(req),
        comp: req.query.comp,
        trkcd: req.query.trkcd,
        trkno: req.query.trkno,
      }

      const refineResult = await trackingService.tracking(refineReq);

      res.json(refineResult);
    })
;

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
