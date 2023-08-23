const linkCheck = require("link-check");
const BadRequestError = require("../errors");
function urlChecker(redirectURL) {
  linkCheck(redirectURL, function (err, result) {
    if (err) {
      return false;
    } else if (result.status == "dead") {
      return false;
    }
    return true;
  });
}

module.exports = urlChecker;
