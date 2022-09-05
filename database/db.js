const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.URI)
  .then(() => console.log("db conectada ⚡ "))
  .catch((e) => console.log("fallo la conexion " + e));
}