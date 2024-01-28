
import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { Todo } from "~/domain/todo/todo";
import { getTodoByIDHandler } from "../api/handler/getTodoHandler.server";

type LoaderParams = {
    Id: string;
};

export const loader: LoaderFunction = async ({ params }) => {
    try {
        const { Id } = params as LoaderParams;
        const todoResponse = await getTodoByIDHandler(Id);
        return json(todoResponse);
    } catch (error) {
        // エラーハンドリング。適切な HTTP ステータスコードとメッセージを設定
        return json({ message: "Error fetching todos" }, { status: 500 });
    }
};

export default function TodoByUserID(param: LoaderParams) {
    const data = useLoaderData<typeof loader>() as Todo;
    return (
        <div>
            <h1>Todo</h1>
            <ul>
                <li>{data.title}</li>
                <li>{data.body}</li>
                <li>{data.completed}</li>
                <li>{data.id}</li>
                <li>{data.user_id}</li>
            </ul>
        </div>
    );
}