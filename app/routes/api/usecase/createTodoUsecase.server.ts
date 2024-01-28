import { CreateTodoArgs, CreateTodoRow } from "~/routes/api/sqlc/query_sql";
import { ITodoRepository } from "../repository/todo/todo.server";

export class CreateTodoUsecase {
    private readonly todoRepository: ITodoRepository;

    constructor(todoRepository: ITodoRepository) {
        this.todoRepository = todoRepository;
    }
    
    async execute(todo: CreateTodoArgs): Promise<CreateTodoRow> {
        return await this.todoRepository.create(todo);
    }
}