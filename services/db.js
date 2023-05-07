const postgres = require('postgres');

const PGHOST = process.env.PGHOST;
const PGDATABASE = process.env.PGDATABASE;
const PGUSER = process.env.PGUSER;
const PGPASSWORD = process.env.PGPASSWORD
const ENDPOINT_ID = process.env.ENDPOINT_ID;

const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?options=project%3D${ENDPOINT_ID}`;

const sql = postgres(URL, { ssl: 'require' });

// async function getPgVersion() {
//   const result = await sql`select version()`;
//   console.log(result);
// }

// getPgVersion();
console.log(`Connect to ${PGDATABASE}`);

module.exports = {
  sql
}