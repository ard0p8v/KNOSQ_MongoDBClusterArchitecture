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
  adminDb.runCommand({ enableSharding: "knosq_project" });
  print("Sharding pro databázi 'knosq_project' povolen!");
} catch (e) {
  print("Chyba při povolení shardingu (možná již povolen).");
}

try {
  adminDb.createUser({
    user: "paul",
    pwd: "paulpassword",
    roles: [
      { role: "readWrite", db: "knosq_project" },
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
      { role: "read", db: "knosq_project" }
    ]
  });
  print("Uživatel 'anna' byl vytvořen!");
} catch (e) {
  print("Uživatel 'anna' již existuje.");
}
