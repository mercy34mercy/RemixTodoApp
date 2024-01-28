import { Client } from "pg";
import { ITodoRepository } from "../todo.server";
import { CreateTodoArgs, CreateTodoRow, GetTodoByIDArgs, GetTodoByIDRow, GetTodobyUserIDArgs, GetTodobyUserIDRow, createTodo, getTodoByID, getTodobyUserID } from "~/routes/api/sqlc/query_sql";

// クリーンアーキテクチャのリポジトリ層の実装
// constructorの引数には、DBクライアントを受け取る
export class TodoRepository implements ITodoRepository {
    private readonly db: Client;

    constructor(client: Client) {
        this.db = client;
    }

    async getByUserID(getTodoArgs: GetTodobyUserIDArgs): Promise<GetTodobyUserIDRow[]> {
       const result =  getTodobyUserID(this.db, getTodoArgs); 
       return result;  
    }

    async create (createTodoArgs: CreateTodoArgs): Promise<CreateTodoRow> {
        const result = await createTodo(this.db, createTodoArgs);
        if (result === null) {
            throw new Error("failed to create todo");
        }
        return result;
    }

    async getByID (getTodoArgs: GetTodoByIDArgs): Promise<GetTodoByIDRow> {
        const result = await getTodoByID(this.db, getTodoArgs);
        if (result === null) {
            throw new Error("failed to get todo");
        }
        return result;
    }


}