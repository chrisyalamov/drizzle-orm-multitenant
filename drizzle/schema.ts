import { pgTable, serial, text, real } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"



export const orders = pgTable("orders", {
	id: serial("id").primaryKey().notNull(),
	tenant: text("tenant"),
	amount: real("amount"),
});