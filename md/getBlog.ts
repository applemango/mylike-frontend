import fs from 'fs';
import glob from 'glob';
import path from 'path';
import { getMDConfig, parseMD } from './md';
import { getMenuConfig } from './mdData';
import { sortMds } from './mdSort';

const dir = path.join(process.cwd(), "blog")

export const getBlogMDList = () => {
    const mds = glob.sync("./blog/*.md")
    return mds
}

export const getBlogMd = (name: string) => {
    try {
        const fullPath = path.join(dir, name)
        const Md = fs.readFileSync(fullPath, 'utf8')
        return Md
    } catch (e) {
        return false
    }
}

export const getBlogMDData = (path_: string) => {
    try {
        const fullPath = path.join(process.cwd(), path_)
        const Md = fs.readFileSync(fullPath, 'utf8')
        return Md
    } catch (e) {
        return String(e)
    }
}

export type Blog = {
    title: string;
    date: string;
    tags: string[];
    url_title: string;
    description: string;
    sort: number;
    index: boolean;
    public: boolean;
    show: boolean;
    key: string;
    image: string;
    by: string;
}

export type Blogs = Array<Blog>

export const getBlogs = (): Blogs => {
    const mdsPath = getBlogMDList()
    let result:any = []
    mdsPath.map((path:string,i:number)=> {
        const md = getBlogMDData(path)
        let config:any = getMDConfig(md)
        config.key = path.split("/")[path.split("/").length - 1].slice(0,path.split("/")[path.split("/").length - 1].indexOf("."))
        result.push(config)
    })
    return result.filter((config:any) => config.show)
}