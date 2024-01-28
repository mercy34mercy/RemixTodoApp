import { Todo } from "~/domain/todo/todo";
import { CreateTodoArgs } from "../sqlc/query_sql";
import { TodoRepository } from "~/routes/api/repository/todo/psql/psql.server";
import { CreateTodoUsecase } from "~/routes/api/usecase/createTodoUsecase.server";
import { client } from "../db/db.server";

export const createTodoHandler = async(todoRequest:CreateTodoArgs):Promise<Todo> => {
    const todoRepository = new TodoRepository(client);
    const createTodoUsecase = new CreateTodoUsecase(todoRepository);
    const todoResponse = await createTodoUsecase.execute(
        {
            title:todoRequest.title,
            body:todoRequest.body,
            userId:todoRequest.userId,
        }
    );
    const todo = {
        title: todoResponse.title,
        body: todoResponse.body,
        created_at: todoResponse.createdAt,
        completed: todoResponse.done,
        id: todoResponse.id,
        user_id: todoResponse.userId,
    } as Todo
    return todo;
}