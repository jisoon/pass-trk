const knex = require('../config/dbconfig');
const TB_APIASN = 'APIASN';


async function add(refineReq) {
  await knex(TB_APIASN).insert({
    msg_type: refineReq.msg_type,
    msg_id: refineReq.msg_id,
    from_code: refineReq.from_code,
    partner_code: refineReq.partner_code,
    data_digest: refineReq.data_digest,
    logistics_interface: refineReq.logistics_interface
  })
}

module.exports = {
  add: add
};
