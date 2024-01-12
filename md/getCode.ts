import fs from 'fs';
import glob from 'glob';
import path from 'path';
import { getMDConfig, parseMD } from './md';
import { getMenuConfig } from './mdData';
import { sortMds } from './mdSort';
import { getLastName, secure_filename } from './utils';

const dir = process.cwd()

const pathToSafe = (path: Array<string> | string) => {
    return  Array.isArray(path)
        ? path.map((path)=> toSafe(path))
        : toSafe(path)
}
const toSafe = (path: string) => {
    return secure_filename(path)
        //.replaceAll("/","")
        .replaceAll("..","")
        .replaceAll("\\","")
        .replaceAll("%","")
        .replaceAll(":","")
        .replaceAll(",","")
}

const pathArrayToString = (path: Array<string>) => {
    const p = path // ['api', 'src']
        .map((p)=> p + "/") // ['api/', 'src/']
        .toString() // api/,src/
        .replaceAll(",","") // api/src
         + "{*,.*}" // api/src/*
    return p
}

export const getDir = (path?: Array<string> | string | undefined) => {
    //if(Array.isArray(path))
    //    console.log(pathArrayToString(pathToSafe(path)))    
    const files = 
        Array.isArray(path)
            ? glob.sync(`./code/${pathArrayToString(pathToSafe(path))}`)
            : path
                ? glob.sync(`./code/${pathToSafe(path)}/{*,.*}`)
                : glob.sync(`./code/{*,.*}`)
    return files
}

export const getFile = (path_?: Array<string> | string | undefined) => {
    if(!path_)
        return undefined;
    if(!Array.isArray(path_))
        path_ = path_.split("/")
    const name =
        Array.isArray(path_)
            ? pathArrayToString(pathToSafe(path_)).slice(0, -7)
            : pathToSafe(path_)
    const fullPath = path.join(dir, `./code/${name}`)
    console.log(fullPath)
    try {
        const file = fs.readFileSync(fullPath, 'utf8')
        //if(file)
            return file
        return undefined
    } catch(err) {
        return undefined
    }
}

export const getReadMe = (paths: Array<string>) => {
    const readme = paths.filter((path)=> ["readme.md", "README.md"].includes(getLastName(path)))
    console.log(readme)
    if(!readme.length)
        return undefined
    const file = getFile(
        readme.filter((path)=> getLastName(path) == "README.md")[0]
        || readme.filter((path)=> getLastName(path) == "readme.md")[0]
    )
    console.log(readme.filter((path)=> getLastName(path) == "README.md")[0]
    || readme.filter((path)=> getLastName(path) == "readme.md")[0])
    console.log(file)
    return file
}

export const getIndex = () => {
    const fullPath = path.join(dir, "./code/index.json")
    try{
        const file = fs.readFileSync(fullPath, "utf8")
        const json = JSON.parse(file)
        return json
    } catch(e: any) {
        return undefined
    }
}