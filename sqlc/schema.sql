CREATE TABLE users (
  id   BIGSERIAL PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL UNIQUE,
  password text NOT NULL,
  created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE todo (
  id   BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL,
  title text NOT NULL,
  body  text,
  created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
  done  boolean NOT NULL DEFAULT false,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
