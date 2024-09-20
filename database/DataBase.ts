import { type SQLiteDatabase } from "expo-sqlite";

export async function initDatabase(database:SQLiteDatabase) {
    await database.execAsync(`
        DROP TABLE IF EXISTS Livros;    
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
            paginas TEXT NOT NULL,
            lingua TEXT NOT NULL
        ); 
*/
