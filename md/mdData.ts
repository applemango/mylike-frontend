import fs from 'fs';
import {glob, sync} from 'glob';
import path from 'path';
import { Blog } from './getBlog';
import { getMDConfig, parseMD } from './md';

const basedir = process.cwd()

const dir = path.join(process.cwd(), "docs")

export const getMDList = (category: string = "*") => {
    const mds = sync(`./docs/${category}/*.md`)
    return mds.map((md)=> `./${md}`)
}

export const getMDData = (category_or_path: string, name: string = "index.md") => {
    try {
        //const fullPath = path.join(process.cwd(), category_or_path[0] == "." ? category_or_path : `./docs/${category_or_path}/${name}.md`)
        let fullPath
        if (category_or_path[0] == ".") {
            fullPath = path.join(basedir, category_or_path)
            //console.log(category_or_path)
        } else {
            fullPath = path.join(path.join(dir, category_or_path), name)
        }
        console.log(fullPath)
        //const fullPath = path.join(dir, category_or_path[0] == "." ? category_or_path : `./docs/${category_or_path}/${name}.md`)
        const Md = fs.readFileSync(fullPath, 'utf8')
        return Md
    } catch (e) {
        return ""
    }
}

export const getMenuConfig = (category: string): Array<Blog> => {
    const mdsPath = getMDList(category)
    let result:any = []
    mdsPath.map((path:string,i:number)=> {
        const md = getMDData(path)
        let config: any = getMDConfig(md)
        config.key = path.split("/")[path.split("/").length - 1].slice(0,path.split("/")[path.split("/").length - 1].indexOf("."))
        result.push(config)
    })
    return result
}