var env = process.env.ENVIRONMENT_NAME || "local";

var prod = {

};

var local = {
databaseUrl: "postgresql://eliasmikkola:md511a7bbad6bac2f8c91a2611f29e4fd92@localhost:5432/junction"
,	admin: {
		firstname: "Luukas",
		lastname: "Castren",
		email: "admin@admin.com",
		password: "admin",
		admin: true
	}
};

if(env === "local") {
	module.exports = local;
} else {
	module.exports = prod;
}