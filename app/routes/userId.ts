import { json, LoaderFunction } from "@remix-run/node";
import { TodoRepository } from "~/routes/api/repository/todo/psql/psql.server";
import { GetTodoByIDUsecase } from "~/routes/api/usecase/getTodoByUserID.server";
import type { Todo } from "~/domain/todo/todo";
import { client } from "../_index.server";

type LoaderParams = {
    userId: string;
};


export const loader: LoaderFunction = async ({ params }) => {
    try {
        const { userId } = params as LoaderParams;
        const todoRepository = new TodoRepository(client);
        const todoUsecase = new GetTodoByIDUsecase(todoRepository);

        const todo = await todoUsecase.execute({ userId: userId });

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

        return json(todoList);
    } catch (error) {
        // エラーハンドリング。適切な HTTP ステータスコードとメッセージを設定
        return json({ message: "Error fetching todos" }, { status: 500 });
    }
};