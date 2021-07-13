const fs = require('fs');

const templates = {
	ndfl2: fs.readFileSync(`${__dirname}/ndfl2.html`, "utf8"),
	vacationRequest: fs.readFileSync(`${__dirname}/vacationRequest.html`, "utf8"),
	salaryList: fs.readFileSync(`${__dirname}/salaryList.html`, "utf8")
}

module.exports = templates;
