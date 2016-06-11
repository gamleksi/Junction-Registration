var env = process.env.ENVIRONMENT_NAME || "local";

var prod = {

};

var local = {
	databaseUrl: "postgresql://eliasmikkola:md565dc8059e1f8abdcf75606e8f61b6d29@localhost:5432/Junction"
};

if(env === "local") {
	module.exports = local;
} else {
	module.exports = prod;
}