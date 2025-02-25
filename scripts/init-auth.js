const conn = new Mongo();
const adminDb = conn.getDB("admin");

try {
  adminDb.createUser({
    user: "admin",
    pwd: "adminpassword_08",
    roles: [{ role: "root", db: "admin" }]
  });
  print("Uživatel admin byl vytvořen!");
} catch (e) {
  print("Uživatel admin již existuje. Resetujeme heslo.");
  db.changeUserPassword("admin", "adminpassword_08");
}

adminDb.auth("admin", "adminpassword_08");
if (adminDb.runCommand({ connectionStatus: 1 }).authInfo.authenticatedUsers.length > 0) {
  print("Přihlášení jako admin proběhlo úspěšně!");
} else {
  print("Chyba při přihlášení admina!");
}

try {
  adminDb.runCommand({ enableSharding: "nosql_project" });
  print("Sharding pro databázi 'nosql_project' povolen!");
} catch (e) {
  print("Chyba při povolení shardingu (možná již povolen).");
}

const nosqlDb = conn.getDB("nosql_project");

try {
  nosqlDb.getCollection("collections").insertOne({ initialized: true });
  print("Kolekce 'collections' byla inicializována!");
} catch (e) {
  print("Kolekce 'collections' již existuje.");
}

try {
  nosqlDb.getCollection("collections").createIndex({ oemNumber: "hashed" });
  print("Index pro shardování byl vytvořen!");
} catch (e) {
  print("Chyba při vytváření indexu (možná již existuje).");
}

try {
  adminDb.runCommand({
    shardCollection: "nosql_project.collections",
    key: { oemNumber: "hashed" },
    numInitialChunks: 4
  });
  print("Sharding pro kolekci 'collections' byl úspěšně nastaven!");
} catch (e) {
  print("Chyba při shardování kolekce (možná již nastaveno).");
}

try {
  adminDb.createUser({
    user: "paul",
    pwd: "paulpassword",
    roles: [
      { role: "readWrite", db: "nosql_project" },
      { role: "clusterAdmin", db: "admin" }
    ]
  });
  print("Uživatel 'paul' byl vytvořen!");
} catch (e) {
  print("Uživatel 'paul' již existuje.");
}

try {
  adminDb.createUser({
    user: "anna",
    pwd: "annapassword",
    roles: [
      { role: "read", db: "nosql_project" }
    ]
  });
  print("Uživatel 'anna' byl vytvořen!");
} catch (e) {
  print("Uživatel 'anna' již existuje.");
}
