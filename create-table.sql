

CREATE TABLE IF NOT EXISTS ratings (
    id serial PRIMARY KEY,
    class_id INTEGER NOT NULL,
    enjoyment_rating INTEGER NOT NULL,
    difficulty_rating INTEGER NOT NULL,
    comment VARCHAR(300),
    grade VARCHAR(20) NOT NULL,
    added_timestamp timestamp default now(),
    instructor VARCHAR(100) NOT NULL ---UCINETID
);