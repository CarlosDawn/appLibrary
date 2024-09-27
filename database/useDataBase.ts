import { useSQLiteContext } from "expo-sqlite"

export type LivroDataBse = {
    id: number
    image: string
    titulo: string
    autor: string
    estado: string
    genero: string
    paginas: number
    lingua: string
}

export function useDatabase(){
    const database = useSQLiteContext()

    async function criar(data: Omit<LivroDataBse, "id">) {
        const statement = await database.prepareAsync(
            "INSERT INTO Livros (image, titulo, autor, estado, genero, paginas, lingua) VALUES ($image, $titulo, $autor, $estado, $genero, $paginas, $lingua)"
        )

        try {
            const result = await statement.executeAsync({
                $image: data.image,
                $titulo: data.titulo,
                $autor: data.autor,
                $estado: data.estado,
                $genero: data.genero,
                $paginas: data.paginas,
                $lingua: data.lingua
            })

            const insertedRowId = result.lastInsertRowId.toLocaleString()

            return {insertedRowId}

        } catch (error) {
            throw error
        } finally {
            await statement.finalizeAsync()
        }
    }

    async function update(data: LivroDataBse) {
        const statement = await database.prepareAsync(
            "UPDATE Livros SET image = $image, titulo = $titulo, autor = $autor, estado = $estado, genero = $genero, paginas = $paginas, lingua = $lingua WHERE id = $id"
        )

        try {
            const result = await statement.executeAsync({
                $id: data.id,
                $image: data.image,
                $titulo: data.titulo,
                $autor: data.autor,
                $estado: data.estado,
                $genero: data.genero,
                $paginas: data.paginas,
                $lingua: data.lingua
            })

            const insertedRowId = result.lastInsertRowId.toLocaleString()

            return {insertedRowId}

        } catch (error) {
            throw error
        } finally {
            await statement.finalizeAsync()
        }
    }

    async function buscaNomeLivro(titulo: string | string[]) {
        try {
            const query = "SELECT * FROM Livros WHERE titulo LIKE ?"

            const response = await database.getAllAsync<LivroDataBse>(query, `%${titulo}`)

            return response;
        } catch (error) {
            throw error
        }
    }
    async function buscaLivrosPorEstatos(estado: string | string[]) {
        try {
            const query = "SELECT * FROM Livros WHERE estado LIKE ?;"

            const response = await database.getAllAsync<LivroDataBse>(query, `%${estado}`)

            return response;
        } catch (error) {
            throw error
        }
    }

    return {criar, update, buscaNomeLivro, buscaLivrosPorEstatos}
}
