import "dotenv/config";
import { db } from "../db";
import { users } from "../db/schema/users";

async function checkUsers() {
    try {
        const allUsers = await db.select().from(users);
        console.log("Found users:", allUsers.length);
        console.log(JSON.stringify(allUsers, null, 2));
    } catch (error) {
        console.error("Error fetching users:", error);
    } finally {
        process.exit();
    }
}

checkUsers();
