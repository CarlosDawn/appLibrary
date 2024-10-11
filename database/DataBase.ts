import { type SQLiteDatabase } from "expo-sqlite";

export async function initDatabase(database:SQLiteDatabase) {
    await database.execAsync(`
        CREATE TABLE IF NOT EXISTS Livros (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT NOT NULL,
            titulo TEXT NOT NULL,
            autor TEXT NOT NULL,
            estado TEXT NOT NULL,
            genero TEXT NOT NULL,
            paginas INTEGER NOT NULL,
            lingua TEXT NOT NULL
        );   
        CREATE TABLE IF NOT EXISTS Emprestar (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            livro_id INTEGER,
            nome_pessoa TEXT,
            data_emprestimo TEXT,
            prazo_devolucao TEXT
        );
    `)
}

/*
CREATE TABLE IF NOT EXISTS Livros (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT NOT NULL,
            titulo TEXT NOT NULL,
            autor TEXT NOT NULL,
            estado TEXT NOT NULL,
            genero TEXT NOT NULL,
            paginas INTEGER NOT NULL,
            lingua TEXT NOT NULL
        );  
DROP TABLE IF EXISTS Livros;

CREATE TABLE IF NOT EXISTS Emprestar (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            livro_id INTEGER,
            nome_pessoa TEXT,
            data_emprestimo TEXT,
            prazo_devolucao TEXT
        ); 
DROP TABLE IF EXISTS Emprestar;
*/
