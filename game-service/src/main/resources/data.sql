CREATE DATABASE IF NOT EXISTS 'game_service';

-- Inserting game types
INSERT INTO game_type (name) VALUES ('Board Game');
INSERT INTO game_type (name) VALUES ('Card Game');
INSERT INTO game_type (name) VALUES ('Dice Game');
INSERT INTO game_type (name) VALUES ('Role-Playing Game');
INSERT INTO game_type (name) VALUES ('Strategy Game');
INSERT INTO game_type (name) VALUES ('Party Game');

-- Inserting games with corresponding types
INSERT INTO game (name, image, description, game_type_id) VALUES ('Settlers of Catan', 'settlers_of_catan.jpg', 'A multiplayer board game that combines strategy and luck.', (SELECT id FROM game_type WHERE name = 'Board Game'));
INSERT INTO game (name, image, description, game_type_id) VALUES ('Uno', 'uno.jpg', 'A popular card game for all ages.', (SELECT id FROM game_type WHERE name = 'Card Game'));
INSERT INTO game (name, image, description, game_type_id) VALUES ('Yahtzee', 'yahtzee.jpg', 'A classic dice game involving luck and strategy.', (SELECT id FROM game_type WHERE name = 'Dice Game'));
INSERT INTO game (name, image, description, game_type_id) VALUES ('Dungeons & Dragons', 'dungeons_dragons.jpg', 'The iconic fantasy role-playing game.', (SELECT id FROM game_type WHERE name = 'Role-Playing Game'));
INSERT INTO game (name, image, description, game_type_id) VALUES ('Risk', 'risk.jpg', 'A board game of diplomacy, conflict, and conquest.', (SELECT id FROM game_type WHERE name = 'Strategy Game'));
INSERT INTO game (name, image, description, game_type_id) VALUES ('Cards Against Humanity', 'cards_against_humanity.jpg', 'A party game for horrible people.', (SELECT id FROM game_type WHERE name = 'Party Game'));
