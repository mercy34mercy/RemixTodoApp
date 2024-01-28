import { CreateUserArgs, CreateUserRow } from "~/routes/api/sqlc/query_sql";

export interface IUserRepository {
    create(user: CreateUserArgs): Promise<CreateUserRow>;
}