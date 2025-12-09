
import  * as fs  from 'fs'
import { resolve as path_resolve } from 'path'

const path = path_resolve("./server/data/")
let file_names: Array<string>;

(async()=>{file_names= await new Promise((resolve, reject) => {
    fs.readdir(path, (err, files) => {
        resolve(files)
    })
})})();

export default defineEventHandler(async (event) => {
    const files_to_read = file_names.slice(0,10);
    let response =[];
    for (const file of files_to_read) {
        response.push(   await new Promise((resolve, reject)=>{
            fs.readFile(path_resolve(path,file), (err, data)=>{
                resolve(JSON.parse(data.toString()))
            })
        }))
    }
  return {
      response: JSON.stringify(response),
  }
})