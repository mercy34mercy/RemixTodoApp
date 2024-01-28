import { GetTodobyUserIDArgs, GetTodobyUserIDRow } from "~/routes/api/sqlc/query_sql";
import { ITodoRepository } from "../repository/todo/todo.server";

export class GetTodoByUserIDUsecase {
    private readonly todoRepository: ITodoRepository;

    constructor(todoRepository: ITodoRepository) {
        this.todoRepository = todoRepository;
    }
    
    async execute(ID: GetTodobyUserIDArgs): Promise<GetTodobyUserIDRow[]> {
        return await this.todoRepository.getByUserID(ID);
    }
}