import { CreateTodoArgs, CreateTodoRow, GetTodoByIDArgs, GetTodoByIDRow, GetTodobyUserIDArgs, GetTodobyUserIDRow } from "~/routes/api/sqlc/query_sql";

// クリーンアーキテクチャのリポジトリ層のinterfaceを定義する
export interface ITodoRepository {
    getByUserID(getTodoArgs: GetTodobyUserIDArgs): Promise<GetTodobyUserIDRow[]>;
    getByID(getTodoArgs: GetTodoByIDArgs): Promise<GetTodoByIDRow>;
    create(todo: CreateTodoArgs): Promise<CreateTodoRow>;
}