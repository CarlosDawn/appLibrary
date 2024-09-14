import { useSQLiteContext } from "expo-sqlite"

export type LivroDataBse = {
    id: number
    titulo: string
    autor: string
    estado: string
    genero: string
}

export function useDatabase(){
    const database = useSQLiteContext()

    async function criar(data: Omit<LivroDataBse, "id">) {
        const statement = await database.prepareAsync(
            "INSERT INTO Livros (titulo, autor, estado, genero) VALUES ($titulo, $autor, $estado, $genero)"
        )

        try {
            const result = await statement.executeAsync({
                $titulo: data.titulo,
                $autor: data.autor,
                $estado: data.estado,
                $genero: data.genero
            })

            const insertedRowId = result.lastInsertRowId.toLocaleString()

            return {insertedRowId}

        } catch (error) {
            throw error
        } finally {
            await statement.finalizeAsync()
        }
    }

    async function buscaNomeLivro(titulo: string) {
        try {
            const query = "SELECT * FROM Livros WHERE titulo LIKE ?"

            const response = await database.getAllAsync<LivroDataBse>(query, `%${titulo}`)

            return response;
        } catch (error) {
            throw error
        }
    }

    return {criar, buscaNomeLivro}
}