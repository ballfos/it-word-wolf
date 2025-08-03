DELETE FROM "categories";
DELETE FROM "difficulties";

INSERT INTO "categories" ("name") VALUES
    ("プログラミング言語"),
    ("データ構造とアルゴリズム"),
    ("ネットワーク"),
    ("データベース"),
    ("セキュリティ"),
    ("ソフトウェア工学"),
    ("ヒューマンインターフェース"),
    ("組み込みシステム"),
    ("データサイエンス"),
    ("コンピュータシステム");



INSERT INTO "difficulties" ("level", "name") VALUES
    (1, "入門"),
    (2, "初級"),
    (3, "中級"),
    (4, "上級"),
    (5, "超上級");