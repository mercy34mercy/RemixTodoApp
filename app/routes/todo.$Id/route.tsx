
import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { TodoRepository } from "~/routes/api/repository/todo/psql/psql.server";
import { GetTodoByIDUsecase } from "~/routes/api/usecase/getTodoByID.server";
import type { Todo } from "~/domain/todo/todo";
import { client } from "~/_index.server";
type LoaderParams = {
    Id: string;
};



export const loader: LoaderFunction = async ({ params }) => {
    try {
        const { Id } = params as LoaderParams;
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

        return json(todo);
    } catch (error) {
        // エラーハンドリング。適切な HTTP ステータスコードとメッセージを設定
        return json({ message: "Error fetching todos" }, { status: 500 });
    }
};



export default function TodoByUserID( param : LoaderParams) {
    const data = useLoaderData<typeof loader>();
    return (
        <div>
            <h1>Todo List</h1>
            <ul>
                <li>{data.title}</li>
                <li>{data.body}</li>
                <li>{data.created_at}</li>
                <li>{data.completed}</li>
                <li>{data.id}</li>
                <li>{data.user_id}</li>
            </ul>
        </div>
    );
  }