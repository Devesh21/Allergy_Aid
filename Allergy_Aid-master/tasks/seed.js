const dbConnection = require("../config/mongoConnection");
const data = require("../data/");
const stores = data.stores;
const users = data.users;
const prods = data.prod;
const admin = data.admin;

const main = async() => {
	const db = await dbConnection();
	await db.dropDatabase();
  await stores.addStore (
	  "Stevens' store",
    "Hoboken",
    "701-231-2321",
    "stevens@stevens.edu",

  );
  const firstUser = await users.addUser(

    "Sherlock",
    "Holmes",
    "Sherlock@gmail.com","damnyoujackdonaghy",
    "221B Baker Street, London",
    "Peanut"
    );
  const firstProd = await prods.addProd(
    "Claritin",
    "123456789", //S_id
    "loratadine (an antihistamine) and pseudoephedrine (a nasal decongestant).",
    "Claritin (loratadine) is an antihistamine that reduces the effects of natural chemical histamine in the body. Histamine can produce symptoms of sneezing, itching, watery eyes, and runny nose. Claritin is used to treat sneezing, runny nose, watery eyes, hives, skin rash, itching, and other cold or allergy symptoms",
    "work well",
    

    );
  const firstAdmin = await admin.addAdmin(
    "cs546", // username
    "cs546team5", // password
    "cs546", //fname
    "team5", //lname
    );

	console.log("Done seeding database");
	await db.serverConfig.close();
};

main().catch(console.log);