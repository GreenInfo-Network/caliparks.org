-- matching on integers is way better than integer <-> numeric
ALTER TABLE cpad_entry_points ALTER COLUMN su_id TYPE integer;

CREATE INDEX cpad_entry_points_su_id_idx ON cpad_entry_points(su_id);
