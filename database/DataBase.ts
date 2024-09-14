import { type SQLiteDatabase } from "expo-sqlite";

export async function initDatabase(database:SQLiteDatabase) {
    await database.execAsync(`
        CREATE TABLE IF NOT EXISTS Livros (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT NOT NULL,
            autor TEXT NOT NULL,
            estado TEXT NOT NULL,
            genero TEXT NOT NULL
    );    
    `)
}
