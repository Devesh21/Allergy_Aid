const dbConnection = require("../config/mongoConnection");
const data = require("../data/");
const stores = data.stores;
const users = data.users;
const prods = data.prod;
const admin = data.admin;

const main = async() => {
	const db = await dbConnection();
	await db.dropDatabase();
	const firstStore = await stores.addStore ( 
	  "Stevens' store", // store name
    "Hoboken",  // address
    "701-231-2321", // phone
    "stevens@stevens.edu",// email
    "stevens1234" // password

  );
    const secondStore = await stores.addStore (

        "ShopRite of East Windsor",
        "319 Route 130 East Windsor, New Jersey 08520",
        "(609) 448 - 1040",
        "shoprite@gmail.com",
        "shoprite1234" // password

        );
    const thridStore = await stores.addStore (
        "Walgreens",
        "20 Jersey Ave, New Brunswick, NJ 08901",
        "(732) 846-9360",
        "Walgreens@gmail.com",
        "walgreen1234" // password
        );
  const firstUser = await users.addUser(

    "Sherlock", // fname
    "Holmes", // lname
    "Sherlock@gmail.com", // email
    "damnyoujackdonaghy", // password
    "221B Baker Street, London", // address
    "701-3432-1234", // mobile
    "Peanut" // allergy
    );
  const secondUser = await users.addUser (
    "Lebron",
    "James",
    "james@yahoo.com",
    "kingjames1234",
    "112 lakers ave, los angeles, CA",
    "621-678-9090",
    "pork meat"

    );
   const thirdUser = await users.addUser (
    "Kobe",
    "Bryant",
    "KobeBryant@gmail.com",
    "kobe24bryant",
    "456 lakers ave, los angeles, CA",
    "665-238-0090",
    "flowers"

    );

   /* get store's id */
    const id_1 = firstStore._id;
    const id_2 = secondStore._id;
    const id_3 = thridStore._id;

    const firstProd = await prods.addProd(
    //"Claritin", // prod name
    "Claritin",
    id_1, // store id
    "loratadine (an antihistamine) and pseudoephedrine (a nasal decongestant).", // ingrendients
    "Claritin (loratadine) is an antihistamine that reduces the effects of natural chemical histamine in the body. Histamine can produce symptoms of sneezing, itching, watery eyes, and runny nose. Claritin is used to treat sneezing, runny nose, watery eyes, hives, skin rash, itching, and other cold or allergy symptoms",
    "work well", // feed back

    

    );
  const secondProd = await prods.addProd(
    "Benadryl Ultratabs Allergy Relief Tablets", // prod name
    id_1, // store id
    "Diphenhydramine", // ingrendients
    "Strike back against allergens and get effective relief from allergies with these Ultratab Allergy Relief Tablets from Benadryl. Each allergy relief tablet contains 25mg of diphenhydramine HCl, an active ingredient that provides relief from cold and allergy symptoms such as sneezing, itchy throat, runny and itchy nose, and itchy, watery eyes. These small-sized anti-allergy tablets provide lasting relief from allergies and the common cold when you need it the most.",
    ""

    );
  const thirdProd = await prods.addProd(
    "Zyrtec 24 Hr Children’s Allergy", // prod name
    id_3, // store id
    "Active Ingredient (in each 5 mL): Cetirizine HCl 5 mg (antihistamine)Inactive Ingredients: Anhydrous citric acid, flavors, propylene glycol, purified water, sodium benzoate, sorbitol solution, sucralose.", // ingrendients
    "Children’s Zyrtec Allergy Syrup relieves indoor and outdoor allergy symptoms in children. With 5 milligrams of cetirizine hydrochloride in each 5 mL, this over the counter children’s allergy medicine offers 24 hour relief from common symptoms of hay fever and other upper respiratory allergies. Children’s Zyrtec provides consistently powerful relief for your kids’ allergies and helps treat symptoms such as runny nose, sneezing, itchy watery eyes, and itchy nose and throat. Suitable for children ages two years and up, Children’s Zyrtec Allergy Syrup is dye-free, sugar-free and available in a variety of kid-friendly flavors",
    "My 4 yr old has been taking this for 2 years now (obviously the amount has changed), but it works! Nothing else has worked. He LOVES the flavor. I love that it's clear." // feed back
    

    );

 const fourthProd = await prods.addProd(
    "Alcon Naphcon-A Allergy Relief Eye Drops", // prod name
    id_2, // store id
    "Naphazoline HCl, Pheniramine Maleate.", // ingrendients
    "Alcon Naphcon-A Allergy Relief Eye Drops are sterile and clinically proven. The eye drops formerly prescribed by doctors now available without a prescription. Combines an antihistamine and a redness reliever for the temporary relief of itchy, red eyes.",
    ""
    );
  const fifthProd = await prods.addProd(
    "Flonase 24hr Allergy Relief Nasal Spray", // prod name
    id_1, // store id
    "benzalkonium chloride, dextrose, microcrystalline cellulose, phenylethyl alcohol, polysorbate 80, purified water, sodium carboxymethylcellulose", // ingrendients
    "FLONASE Allergy Relief is a nasal spray that works directly in the nose to relieve nasal allergy and eye-related allergy symptoms. FLONASE contains fluticasone propionate—which for years has been the #1-prescribed allergy medicine.§ As a nasal spray available over the counter, FLONASE works locally right in the nose, and is minimally absorbed by the body.¹",
    ""
    );
   const sixthProd = await prods.addProd(
    "Nerve Factor ", // prod name
    id_2, // store id
    "Active Ingredient (in each 5 mL): Cetirizine HCl 5 mg (antihistamine)Inactive Ingredients: Anhydrous citric acid, flavors, propylene glycol, purified water, sodium benzoate, sorbitol solution, sucralose.", // ingrendients
    "Nerve Factor is powerful nerve support supplement made with ingredients found in nature. We’re proud to say our product is made in the USA and backed by a 100% money-back guarantee. Nerve Factor contains ingredients that may help support healthy, comfortable nerves. Turmeric is one of the best-studied herbs in relation to healthy blood-flow, and many believe Spirulina is one of the most nutrient-dense plants on earth. Together with herbs like Passionflower and Skullcap that help promote a sense of calm, Nerve Factor is a one-two punch that can get you back on your feet again! Try it today and experience life on your terms. And if you don’t like Nerve Factor, take advantage of our 100% money-back guarantee. You’ve got nothing to lose and everything to gain!",
    "My 4 yr old has been taking this for 2 years now (obviously the amount has changed), but it works! Nothing else has worked. He LOVES the flavor. I love that it's clear." // feed back
    );
     const seventhProd = await prods.addProd(
    "All-Natural Nerve Renew Fast Acting Cream", // prod name
    id_3, // store id
    "Capscium, Camphor, and Sunflower Seed Oil ", // ingrendients
    "Our company took great care to formulate a nerve repair cream safe for those sensitive to overpowering pharmaceuticals. Our all-natural supplement providessupport through vitamins and antioxidants that may reduce nerve pain and nerve damag",
     ""
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