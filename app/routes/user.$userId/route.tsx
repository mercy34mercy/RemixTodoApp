import { ActionFunction, json, LoaderFunction, TypedResponse } from "@remix-run/node";
import { useLoaderData, useActionData } from "@remix-run/react";
import { TodoRepository } from "~/routes/api/repository/todo/psql/psql.server";
import { GetTodoByIDUsecase } from "~/routes/api/usecase/getTodoByUserID.server";
import type { Todo } from "~/domain/todo/todo";
import { CreateTodoUsecase } from "../api/usecase/createTodoUsecase.server";
import { client } from "../../_index.server";

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

        const todoRepository = new TodoRepository(client);
        const createTodoUsecase = new CreateTodoUsecase(todoRepository);
        const todoResponse = await createTodoUsecase.execute(
            {
                title: String(todoRequest.get("title")),
                body: String(todoRequest.get("body")),
                userId: "1"
            },
        );
        const todo = {
            title: todoResponse.title,
            body: todoResponse.body,
            created_at: todoResponse.createdAt,
            completed: todoResponse.done,
            id: todoResponse.id,
            user_id: todoResponse.userId,
        } as Todo
        return json(todo);
    }
    catch (error) {
        return json(errors, { status: 500 });
    }
}
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



export default function TodoByUserID(param: LoaderParams) {
    const data = useLoaderData<typeof loader>();
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
                        <a href={`/todo/${todo.id}`}>{todo.title}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}