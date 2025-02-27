#!/bin/bash
set -e

echo "Čekání na MongoDB servery..."
sleep 10  # Čekání na start MongoDB instancí

echo "Inicializace config serveru..."
mongosh < /scripts/init-configserver.js
sleep 5

echo "Inicializace shardů..."
mongosh < /scripts/init-shard01.js
sleep 5
mongosh < /scripts/init-shard02.js
sleep 5
mongosh < /scripts/init-shard03.js
sleep 5

echo "Inicializace routeru..."
mongosh < /scripts/init-router.js
sleep 5

echo "Inicializace autentizace..."
mongosh < /scripts/init-auth.js
sleep 5

mongosh shard01-a:27017 < /scripts/init-auth.js
sleep 5
mongosh shard02-a:27017 < /scripts/init-auth.js
sleep 5
mongosh shard03-a:27017 < /scripts/init-auth.js

echo "Inicializace dokončena!"