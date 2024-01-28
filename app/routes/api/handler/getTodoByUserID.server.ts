import { Todo } from "~/domain/todo/todo";
import { client } from "../db/db.server";
import { TodoRepository } from "~/routes/api/repository/todo/psql/psql.server";
import { GetTodoByUserIDUsecase } from "~/routes/api/usecase/getTodoByUserID.server";

export const getTodoByUserIDHandler = async (userID:string):Promise<Todo[]> => {
    const todoRepository = new TodoRepository(client);
    const todoUsecase = new GetTodoByUserIDUsecase(todoRepository);
    const todo = await todoUsecase.execute({ userId: userID});

    // createTodoRowからTodoに変換する
    const todoList: Todo[] = [];
    todo.forEach((element) => {
        todoList.push({
            id: element.id,
            user_id: element.userId,
            title: element.title,
            body: element.body ?? "",
            created_at: element.createdAt,
            completed: element.done
        });
    });

    return todoList;
}