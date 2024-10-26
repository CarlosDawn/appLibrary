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
            nome_livro TEXT NOT NULL,
            image_livro TEXT NOT NULL,
            nome_pessoa TEXT NOT NULL,
            data_emprestimo TEXT NOT NULL,
            prazo_devolucao TEXT NOT NULL
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
            nome_livro TEXT NOT NULL,
            image_livro TEXT NOT NULL,
            nome_pessoa TEXT NOT NULL,
            data_emprestimo TEXT NOT NULL,
            prazo_devolucao TEXT NOT NULL
        );
DROP TABLE IF EXISTS Emprestar;
*/
