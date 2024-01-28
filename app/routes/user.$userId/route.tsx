import { ActionFunction, json, LoaderFunction, TypedResponse } from "@remix-run/node";
import { useLoaderData, useActionData, Link } from "@remix-run/react";
import type { Todo } from "~/domain/todo/todo";
import { getTodoByUserIDHandler } from "../api/handler/getTodoByUserID.server";
import { createTodoHandler } from "../api/handler/createTodHandler.server";

type LoaderParams = {
    userId: string;
};

type CustomErr = {
    titleValidationErr: string,
    fetchErr: string
}

export const action: ActionFunction = async ({ request }): Promise<TypedResponse<Todo | CustomErr>> => {
    const errors = {} as CustomErr;
    try {
        const todoRequest = await request.formData();

        // validation
        const title = todoRequest.get("title")
        if (!title) {
            errors.titleValidationErr = ""
        }

        if (Object.keys(errors).length > 0) {
            return json(errors, { status: 400 });
        }
        const todoRespose = await createTodoHandler({
            title: String(todoRequest.get("title")),
            body: String(todoRequest.get("body")),
            userId: String(todoRequest.get("userId"))
        },)
        return json(todoRespose);
    }
    catch (error) {
        return json(errors, { status: 500 });
    }
}

export const loader: LoaderFunction = async ({ params }) => {
    try {
        const { userId } = params as LoaderParams;
        const todoListResponse = await getTodoByUserIDHandler(userId);
        return json(todoListResponse);
    } catch (error) {
        // エラーハンドリング。適切な HTTP ステータスコードとメッセージを設定
        return json({ message: "Error fetching todos" }, { status: 500 });
    }
};

export default function TodoByUserID(param: LoaderParams) {
    const data = useLoaderData<typeof loader>() as Todo[];
    const actionData = useActionData<typeof action>() as Todo | CustomErr;
    return (
        <div>
            <h1>Todo List</h1>
            {/* actionsでtodoを作成 */}
            <form method="post">
                <p>
                    <input type="text" name="title" placeholder="title" />
                    {(actionData as CustomErr)?.titleValidationErr ? (
                        <em>{(actionData as CustomErr).titleValidationErr}</em>
                    ) : null}
                </p>
                <p>
                    <input type="text" name="body" placeholder="body" />
                </p>
                <p>
                    <input type="text" name="userId" placeholder="userId" />
                </p>
                <button type="submit">Create Todo</button>
            </form>
            <ul>
                {data.map((todo: Todo) => (
                    <li key={todo.id}>
                        <Link prefetch="intent" to={`/todo/${todo.id}`}>{todo.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}