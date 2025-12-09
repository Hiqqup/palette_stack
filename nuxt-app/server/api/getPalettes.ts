import { promises as fs } from 'fs'
import { resolve as path_resolve } from 'path'

const DATA_PATH = path_resolve('./public/data/')
let file_names: string[] | null = null // persistent in-memory cache

async function loadFileNames() {
    if (!file_names) {
        try {
            file_names = await fs.readdir(DATA_PATH)
        } catch (err) {
            console.error('Error reading data directory', err)
            file_names = []
        }
    }
    return file_names
}

export default defineEventHandler(async (event) => {
    const from = Number(getQuery(event).from) || 0

    // Load filenames from cache or filesystem
    const files = await loadFileNames()
    const files_to_read = files.slice(from, from + 10)

    const response = []
    for (const file of files_to_read) {
        try {
            const data = await fs.readFile(path_resolve(DATA_PATH, file), 'utf-8')
            response.push(JSON.parse(data))
        } catch (err) {
            console.error(`Error reading/parsing file ${file}:`, err)
        }
    }

    return { response: JSON.stringify(response) }
})
