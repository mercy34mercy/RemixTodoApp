import { Client } from "pg";
import { IUserRepository } from "../user.server";
import { createUser } from "~/routes/api/sqlc/query_sql";

export class UserRepository implements IUserRepository {
    private readonly db: Client;

    constructor(client: Client) {
        this.db = client;
    }

    async create (createUserArgs: any): Promise<any> {
        const result = await createUser(this.db, createUserArgs);
        if (result === null) {
            throw new Error("failed to create user");
        }
        return result;
    }
}