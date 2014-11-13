CREATE TABLE migrations (
  id serial PRIMARY KEY,
  name text NOT NULL,
  performed_at timestamp with time zone NOT NULL DEFAULT NOW()
);
