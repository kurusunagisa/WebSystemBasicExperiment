PRAGMA foreign_keys=true;

CREATE TABLE IF NOT EXISTS user(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR
);

CREATE TABLE IF NOT EXISTS book(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR,
    owner_id INT,
    total INT,
    current INT,
    foreign key (owner_id) references user(id)
);

CREATE TABLE IF NOT EXISTS rent(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INT,
    book_id INT,
    rent_flag INT,
    foreign key (user_id) references user(id),
    foreign key (book_id) references book(id)
);


INSERT INTO user (name) VALUES("test1");
INSERT INTO user (name) VALUES("test2");

INSERT INTO book (name, owner_id, total, current) VALUES("マスタリングTCP/IP 入門編",1,1,1);
INSERT INTO book (name, owner_id, total, current) VALUES("ドラゴンイングリッシュ",2,2,2);
INSERT INTO book (name, owner_id, total, current) VALUES("英語耳",1,1,1);

INSERT INTO rent (user_id, book_id,rent_flag) VALUES(2,1,1);
UPDATE book SET current=current-1 WHERE id=1;

UPDATE rent SET rent_flag=0 WHERE id=1;
UPDATE book SET current=current+1 WHERE id=1;
