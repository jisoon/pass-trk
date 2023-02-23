
function createErrorRes(reqParam){
  const message = `Message check parameter fail to pass(${reqParam})`
  return {
    success: "false",
    errorCode: "S20",
    errors: message}
}


module.exports = {
  createErrorRes: createErrorRes
};
