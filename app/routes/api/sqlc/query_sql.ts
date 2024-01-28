import { QueryArrayConfig, QueryArrayResult } from "pg";

interface Client {
    query: (config: QueryArrayConfig) => Promise<QueryArrayResult>;
}

export const getTodoByIDQuery = `-- name: GetTodoByID :one
SELECT id, user_id, title, body, created_at, done FROM todo
WHERE id = $1 LIMIT 1`;

export interface GetTodoByIDArgs {
    id: string;
}

export interface GetTodoByIDRow {
    id: string;
    userId: string;
    title: string;
    body: string | null;
    createdAt: Date;
    done: boolean;
}

export async function getTodoByID(client: Client, args: GetTodoByIDArgs): Promise<GetTodoByIDRow | null> {
    const result = await client.query({
        text: getTodoByIDQuery,
        values: [args.id],
        rowMode: "array"
    });
    if (result.rows.length !== 1) {
        return null;
    }
    const row = result.rows[0];
    return {
        id: row[0],
        userId: row[1],
        title: row[2],
        body: row[3],
        createdAt: row[4],
        done: row[5]
    };
}

export const getTodobyUserIDQuery = `-- name: GetTodobyUserID :many
SELECT id, user_id, title, body, created_at, done FROM todo
WHERE user_id = $1 ORDER BY created_at DESC`;

export interface GetTodobyUserIDArgs {
    userId: string;
}

export interface GetTodobyUserIDRow {
    id: string;
    userId: string;
    title: string;
    body: string | null;
    createdAt: Date;
    done: boolean;
}

export async function getTodobyUserID(client: Client, args: GetTodobyUserIDArgs): Promise<GetTodobyUserIDRow[]> {
    const result = await client.query({
        text: getTodobyUserIDQuery,
        values: [args.userId],
        rowMode: "array"
    });
    return result.rows.map(row => {
        return {
            id: row[0],
            userId: row[1],
            title: row[2],
            body: row[3],
            createdAt: row[4],
            done: row[5]
        };
    });
}

export const createTodoQuery = `-- name: CreateTodo :one
INSERT INTO todo (
  user_id, title, body
) VALUES (
  $1, $2, $3
)
RETURNING id, user_id, title, body, created_at, done`;

export interface CreateTodoArgs {
    userId: string;
    title: string;
    body: string | null;
}

export interface CreateTodoRow {
    id: string;
    userId: string;
    title: string;
    body: string | null;
    createdAt: Date;
    done: boolean;
}

export async function createTodo(client: Client, args: CreateTodoArgs): Promise<CreateTodoRow | null> {
    const result = await client.query({
        text: createTodoQuery,
        values: [args.userId, args.title, args.body],
        rowMode: "array"
    });
    if (result.rows.length !== 1) {
        return null;
    }
    const row = result.rows[0];
    return {
        id: row[0],
        userId: row[1],
        title: row[2],
        body: row[3],
        createdAt: row[4],
        done: row[5]
    };
}

export const deleteTodoQuery = `-- name: DeleteTodo :exec
DELETE FROM todo
WHERE id = $1`;

export interface DeleteTodoArgs {
    id: string;
}

export async function deleteTodo(client: Client, args: DeleteTodoArgs): Promise<void> {
    await client.query({
        text: deleteTodoQuery,
        values: [args.id],
        rowMode: "array"
    });
}

export const createUserQuery = `-- name: CreateUser :one
INSERT INTO users (
  name, email, password
) VALUES (
  $1, $2, $3
)
RETURNING id, name, email, password, created_at, updated_at`;

export interface CreateUserArgs {
    name: string;
    email: string;
    password: string;
}

export interface CreateUserRow {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export async function createUser(client: Client, args: CreateUserArgs): Promise<CreateUserRow | null> {
    const result = await client.query({
        text: createUserQuery,
        values: [args.name, args.email, args.password],
        rowMode: "array"
    });
    if (result.rows.length !== 1) {
        return null;
    }
    const row = result.rows[0];
    return {
        id: row[0],
        name: row[1],
        email: row[2],
        password: row[3],
        createdAt: row[4],
        updatedAt: row[5]
    };
}

