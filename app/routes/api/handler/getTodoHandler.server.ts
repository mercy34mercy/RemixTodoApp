import { useLoaderData } from "@remix-run/react";
import { TodoRepository } from "~/routes/api/repository/todo/psql/psql.server";
import { GetTodoByIDUsecase } from "~/routes/api/usecase/getTodoByID.server";
import type { Todo } from "~/domain/todo/todo";
import { client } from "../db/db.server";

export const getTodoByIDHandler = async (id: string):Promise<Todo> => {
    const Id = id;
    const todoRepository = new TodoRepository(client);
    const todoUsecase = new GetTodoByIDUsecase(todoRepository);

    const todoResponse = await todoUsecase.execute({ id: Id });

    // createTodoRowからTodoに変換する
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