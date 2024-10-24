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
export type LivroDataBaseUp = {
    idUp: number
    imageUp: string
    tituloUp: string
    autorUp: string
    estadoUp: string
    generoUp: string
    paginasUp: number
    linguaUp: string
}
export type livrosEmprestados = {
    id: number
    livro_id: number
    nome_pessoa: string
    dataFullEmpres: string
    dataFullPrazo: string
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

    async function emprestar(data: Omit<livrosEmprestados, "id">) {
        const statement = await database.prepareAsync(
            "INSERT INTO Emprestar (livro_id, nome_pessoa, data_emprestimo, prazo_devolucao) VALUES ($livro_id, $nome_pessoa, $dataFullEmpres, $dataFullPrazo)"
        )

        try {
            await statement.executeAsync({
                $livro_id: data.livro_id,
                $nome_pessoa: data.nome_pessoa,
                $dataFullEmpres: data.dataFullEmpres,
                $dataFullPrazo: data.dataFullPrazo
            }) 
            
            console.log(data.livro_id, data.nome_pessoa, data.dataFullEmpres)
        } catch (error) {
            throw error
        } finally {
            await statement.finalizeAsync()
        }
    }

    async function update(data: LivroDataBaseUp) {
        const statement = await database.prepareAsync(
            "UPDATE Livros SET image = $imageUp, titulo = $tituloUp, autor = $autorUp, estado = $estadoUp, genero = $generoUp, paginas = $paginasUp, lingua = $linguaUp WHERE id = $idUp"
        )

        try {
            await statement.executeAsync({
                $idUp: data.idUp,
                $imageUp: data.imageUp,
                $tituloUp: data.tituloUp,
                $autorUp: data.autorUp,
                $estadoUp: data.estadoUp,
                $generoUp: data.generoUp,
                $paginasUp: data.paginasUp,
                $linguaUp: data.linguaUp
            })

        } catch (error) {
            throw error
        } finally {
            await statement.finalizeAsync()
        }
    }

    async function remove(id: number) {
        try {
            await database.execAsync(
                "DELETE FROM Livros WHERE id = " + id
            )
        } catch (error) {
            console.log(error)
        }
    }

    async function buscaNomeLivro(titulo: string) {
        try {
            const query = "SELECT * FROM Livros WHERE titulo LIKE ? ORDER BY titulo ASC";

            const response = await database.getAllAsync<LivroDataBse>(query, `%${titulo}%`)

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
    async function buscaTodosEmprestados() {
        try {
            const query = "SELECT * FROM Emprestar";

            const response = await database.getAllAsync<livrosEmprestados>(query)

            console.log(response);
            return response;

        } catch (error) {
            throw error
        }
    }
    async function removeEmprestimo(id: number) {
        
    }

    return {criar, emprestar, update, remove, buscaNomeLivro, buscaLivrosPorEstatos, buscaTodosEmprestados}
}
