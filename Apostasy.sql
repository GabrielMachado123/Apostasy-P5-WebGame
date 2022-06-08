DROP DATABASE IF EXISTS apostasy;

CREATE DATABASE apostasy;

USE apostasy;

CREATE TABLE player(
	playerId int not null auto_increment,
	username varchar(30) not null,
	passwd varchar(200) not null,
    dungeonTime int default 0,
	PRIMARY KEY (playerId)
);

CREATE TABLE item(
	itemId int not null auto_increment,
	item_name varchar(60) not null,
    item_description varchar(80) not null,
	PRIMARY KEY (itemId)
);

CREATE TABLE loot(
	playerId_fk int not null,
    itemId_fk int not null,
    quantity int not null default 0,
    PRIMARY KEY(playerId_fk, itemId_fk)
);

CREATE TABLE equipmentType(
	equipmentTypeId int not null auto_increment,
    typeName varchar(10),
    PRIMARY KEY (equipmentTypeId)
);

CREATE TABLE equipment(
	equipmentTypeId_fk int not null,
    itemId_fk int not null,
    item_damage int default 0,
    item_health int default 0,
    PRIMARY KEY(equipmentTypeId_fk, itemId_fk)
);

CREATE TABLE consumable(
	consumableId int not null auto_increment,
    itemId_fk int not null,
    restoredHP int default 0,
    restoredMP int default 0,
    multiTarget boolean not null,
    ressurection boolean not null,
    PRIMARY KEY(consumableId)
);
                      
CREATE TABLE inventory(
	playerId_fk int not null,
	itemId_fk int not null,
	quantity int not null default 0,
	PRIMARY KEY (playerId_fk, itemId_fk)
);

CREATE TABLE hero(
	heroId int not null auto_increment,
	playerId_fk int not null,
    hero_name varchar(30) not null,
	weapon_fk_itemId int,
	armor_fk_itemId int,
	acessory_fk_itemId int,
	class varchar(10) not null,
	lvl int not null default 1,
	experience int not null default 0,
    slot int not null default 0,
	PRIMARY KEY(heroId)
);
                        
CREATE TABLE trade(		
	tradeId int not null auto_increment,
	player_sellingId_fk int not null,
	item_sellingId_fk int not null,
	item_buyingId_fk int not null,
	quantity_Selling int not null,
	quantity_Buying int not null,
	quantity_Trade int not null,
	PRIMARY KEY (tradeId)
);

CREATE TABLE enemy(
	enemyId int not null auto_increment,
	enemy_name varchar(15) unique not null,
	PRIMARY KEY(enemyId)
);

CREATE TABLE fight(
	fightId int not null auto_increment,
	playerId_fk int not null,
    streak int not null default 0,
	PRIMARY KEY (fightId)
);

CREATE TABLE heroInFight(
	fightId_fk int not null auto_increment,
    heroId_fk int not null,
    attack int not null,
    maxHP int not null,
    currentHP int not null,
    currentMP int not null default 100,
    cover int not null default 0,
    thornmail boolean not null default false,
    down boolean not null default false,
    PRIMARY KEY(fightId_fk, heroId_fk)
);

CREATE TABLE enemyInFight(
	enemyInFightId int not null auto_increment,
	fightId_fk int not null,
    enemyId_fk int not null,
    damage int not null,
    maxHP int not null,
    currentHP int not null,
    slot int not null,
    mark boolean not null default false,
    PRIMARY KEY(enemyInFightId)
);

-- Foreign keys

-- equipment
ALTER TABLE equipment ADD CONSTRAINT equipment_fk_equipmentType
foreign key(equipmentTypeId_fk) references equipmentType(equipmentTypeId)
ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE equipment ADD CONSTRAINT equipment_fk_item
foreign key(itemId_fk) references item(itemId)
ON DELETE NO ACTION ON UPDATE NO ACTION;

-- loot
ALTER TABLE loot ADD CONSTRAINT loot_fk_playerId
foreign key(playerId_fk) references player(playerId)
ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE loot ADD CONSTRAINT loot_fk_itemId
foreign key(ItemId_fk) references item(ItemId)
ON DELETE NO ACTION ON UPDATE NO ACTION;

-- consumable
ALTER TABLE consumable ADD CONSTRAINT consumable_fk_item
foreign key(itemId_fk) references item(itemId)
ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Inventory
ALTER TABLE inventory ADD CONSTRAINT inventory_fk_player
foreign key(playerId_fk) references player(playerId)
ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE inventory ADD CONSTRAINT inventory_fk_item
foreign key(itemId_fk) references item(itemId)
ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Character
ALTER TABLE hero ADD CONSTRAINT hero_fk_player
foreign key(playerId_fk) references player(playerId)
ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE hero ADD CONSTRAINT heroWep_fk_item
foreign key(weapon_fk_itemId) references item(itemId)
ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE hero ADD CONSTRAINT heroArm_fk_item
foreign key(armor_fk_itemId) references item(itemId)
ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE hero ADD CONSTRAINT heroAcc_fk_item
foreign key(acessory_fk_itemId) references item(itemId)
ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Trade
ALTER TABLE trade ADD CONSTRAINT tradePlayer_fk_inventory
foreign key(player_sellingId_fk) references inventory(playerId_fk)
ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE trade ADD CONSTRAINT tradeItemSell_fk_inventory
foreign key(item_sellingId_fk) references inventory(itemId_fk)
ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE trade ADD CONSTRAINT tradeItemBuy_fk_inventory
foreign key(item_buyingId_fk) references item(itemId)
ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Fight

ALTER TABLE fight ADD CONSTRAINT fight_fk_player
foreign key(playerId_fk) references player(playerId)
ON DELETE NO ACTION ON UPDATE NO ACTION;

-- HeroInFight

ALTER TABLE heroInFight ADD CONSTRAINT heroInFight_fk_fight
foreign key(fightId_fk) references fight(fightId)
ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE heroInFight ADD CONSTRAINT heroInFight_fk_Hero
foreign key(heroId_fk) references hero(heroId)
ON DELETE NO ACTION ON UPDATE NO ACTION;

-- EnemyInFight

ALTER TABLE enemyInFight ADD CONSTRAINT enemyInFight_fk_fight
foreign key(fightId_fk) references fight(fightId)
ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE enemyInFight ADD CONSTRAINT enemyInFight_fk_enemy
foreign key(enemyId_fk) references enemy(enemyId)
ON DELETE NO ACTION ON UPDATE NO ACTION;



-- Inserts

INSERT INTO item (item_name, item_description) VALUES
("Bronze Sword", "20+ Attack"),
("Steel Dagger", "40+ Attack"),
("Bronze Armor", "75+ Health"),
("Steel Armor", "120+ Health"),
("Bronze Acessory", "5+ Attack and 5+ Health"),
("Steel Acessory", "25+ Attack"),
("Health Potion", "50% Health Recovery"),
("Revive Potion", "Ressurect an ally"),
("Mana Potion", "50 Mana Recovery");

INSERT INTO equipmentType(typeName) VALUES
("sword"),
("armor"),
("acessory");

INSERT INTO equipment (equipmentTypeId_fk, itemId_fk, item_damage, item_health) VALUES
(1, 1, 20, 0),
(1, 2, 40, 0),
(2, 3, 0, 75),
(2, 4, 0, 150),
(3, 5, 25, 25),
(3, 6, 40, 0);

INSERT INTO player (username, passwd)
VALUES
("Miguel", "Miriam"),
("Gabriel", "Banana");

INSERT INTO hero (playerId_fk, hero_name, weapon_fk_itemId, armor_fk_itemId, acessory_fk_itemId, class, lvl, experience, slot) VALUES
(1, "Miguel", 1, 3, 5, "warrior", 4, 0, 1),
(1, "Gabriel", 2, 4, 6, "knight", 6, 0, 2),
(1, "Miriam", 1, 3, 5, "witch", 5, 0, 3),
(1, "Jeff", 1, 4, 6, "ranger", 3, 0, 4),
(1, "Deez", 1, 3, 5, "warrior", 1, 0, 0),
(1, "Candice", 1, 3, 5, "witch", 2, 0, 0),

(2, "Gabriel", 2, 4, 6, "warrior", 4, 0, 1);

INSERT INTO enemy (enemy_name) VALUES 
("Jealosy"),
("Virtue");

INSERT INTO inventory (playerId_fk, itemId_fk, quantity)
VALUES(1, 1, 3), (1, 2, 1), (1, 3, 1), (1, 4, 1), (1, 5, 1), (1, 6, 1), (1, 7, 3), (1, 8, 2), (1, 9, 5),
(2, 1, 1), (2, 2, 3), (2, 3, 1), (2, 4, 1), (2, 5, 1), (2, 6, 1),(2,7,3), (2,8,2), (2,9,5);

INSERT INTO trade (player_sellingId_fk, item_sellingId_fk, item_buyingId_fk, quantity_Selling, quantity_Buying, quantity_Trade)
VALUES(1,1,2,1,2,1), (1,1,2,1,1,2), (1,1,2,1,1,3),(1,1,2,1,1,4),(1,1,2,1,1,5),(1,1,2,1,1,6),(1,1,2,1,1,7), (1,1,2,1,1,8), (1,1,2,1,1,9),(1,1,2,1,1,10);

INSERT INTO consumable (itemId_fk, restoredHP, restoredMP, multiTarget, ressurection) VALUES
(7, 50, 0, false, false),
(8, 0, 0, false, true),
(9, 0, 50, false, false);