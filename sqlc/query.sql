-- name: GetTodoByID :one
SELECT * FROM todo
WHERE id = $1 LIMIT 1;

-- name: GetTodobyUserID :many
SELECT * FROM todo
WHERE user_id = $1 ORDER BY created_at DESC;

-- name: CreateTodo :one
INSERT INTO todo (
  user_id, title, body
) VALUES (
  $1, $2, $3
)
RETURNING *;

-- name: DeleteTodo :exec
DELETE FROM todo
WHERE id = $1;

-- name: CreateUser :one
INSERT INTO users (
  name, email, password
) VALUES (
  $1, $2, $3
)
RETURNING *;