var unirest = require("unirest");

let sendOtp = function(number,otp) {

	var req = unirest("POST", "https://www.fast2sms.com/dev/bulk");

	req.headers({
	  "content-type": "application/x-www-form-urlencoded",
	  "cache-control": "no-cache",
	  "authorization": "sz92yPApHd5iJDQUGmkhLNeo0qIf3MYOKvlFWaRtC4VurbnZ7S6SUd5zVlBWmKpIiF9b0Z8usnYEHQ3A"
	});

	req.form({
	  "sender_id": "FSTSMS",
	  "language": "english",
	  "route": "qt",
	  "numbers": number,
	  "message": "31719",
	  "variables": "{#AA#}",
	  "variables_values": otp
	});

	req.end(function (res) {
	  if (res.error) throw new Error(res.error);
	  console.log(res.body);
	});
}


module.exports = sendOtp