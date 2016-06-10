var env = process.env.ENVIRONMENT_NAME || "local";

var prod = {

};

var local = {
	databaseUrl: "postgresql://aleksi:md54a9e62d1379d47bc9f2245f048120928@localhost:5432/junction"
};

if(env === "local") {
	module.exports = local;
} else {
	module.exports = prod;
}