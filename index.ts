import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { orders } from "./drizzle/schema";
import { eq } from "drizzle-orm";

// #region Setting up the database connection and DrizzleORM
const DB_URL = process.env.DB_URL;

if (!DB_URL) {
    throw new Error("DB_URL environment variable is required");
}

const queryClient = postgres(DB_URL);
const db = drizzle(queryClient);
// #endregion

// Retrieve all orders from the database
const results = await db.select().from(orders)
console.log(results)

// Retrieve filtered results manually
const filteredResults = await db.select().from(orders).where(eq(orders.tenant, "ACME Corp"))
console.log(filteredResults)

// Function which enhances queries with a tenant filter
function withTenantFilter(query, tenant, table) {
    return query.$dynamic().where(eq(table.tenant, tenant))
}
const resultsWithTenantFilter = await withTenantFilter(db.select().from(orders), "ACME Corp", orders)
console.log(resultsWithTenantFilter)