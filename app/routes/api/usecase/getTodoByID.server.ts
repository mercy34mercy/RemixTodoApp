import { GetTodoByIDArgs, GetTodoByIDRow } from "~/routes/api/sqlc/query_sql";
import { ITodoRepository } from "../repository/todo/todo.server";

export class GetTodoByIDUsecase {
    private readonly todoRepository: ITodoRepository;

    constructor(todoRepository: ITodoRepository) {
        this.todoRepository = todoRepository;
    }
    
    async execute(todoID: GetTodoByIDArgs): Promise<GetTodoByIDRow> {
        return await this.todoRepository.getByID(todoID);
    }
}