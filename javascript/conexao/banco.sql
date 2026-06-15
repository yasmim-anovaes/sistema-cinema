create database cineyas ;
 
use cineyas ;
 
create table usuario(
id_usuario int auto_increment primary key,
nome varchar(150),
email varchar(150),
senha varchar(255),
idade int,
cpf int) ;
 
create table filmes (
id_filme int primary key auto_increment,
nome varchar(255),
quantidade_dis int,
comprados int
);
 
 
create table aperitivos(
id int primary key auto_increment,
nome varchar(100),
valor decimal (10,2)
);
ALTER TABLE filmes ADD COLUMN valor DECIMAL(10,2) NOT NULL DEFAULT 0.00;
UPDATE filmes SET valor = 25.00 WHERE id_filme = 1;
 
alter table usuario modify column cpf varchar(14);
 
insert into filmes (nome, quantidade_dis, comprados)
values 
('Scarface',20,0),
('Barbie',20,0),
('Poderoso Chefão',20,0),
('Titanic',20,0),
('HunterxHunter',20,0),
('Taxi Driver',20,0),
('Diabo veste prada',20,0),
('Michael Jackson',20,0),
('Crepusculo',20,0),
('Todo mundo em pânico',20,0),
('Invocação do mal',20,0),
('Se beber não case',20,0),
('Hora do pesadelo',20,0);
 
UPDATE filmes
SET valor = 25.00
WHERE id_filme > 0;

DESCRIBE filmes;
select*from aperitivos;
DESCRIBE filmes;
 
SET SQL_SAFE_UPDATES = 0;
 
UPDATE filmes
SET valor = 25.00;
 
alter table aperitivos add column comprados int;
 
insert into aperitivos (nome, valor, comprados) values 
('pipoca+refri', 25.00, 0),
('2 pipocas', 20.50, 0),
('refrigerante', 8.00, 0)
 
select*from usuario