import path from "path"
import fs from 'fs';
import { getMenuConfig } from "./mdData";
import { sortMds } from "./mdSort";
import { Blog } from "./getBlog";

export type Course = {
    time: string,
    description: string,
    link: string,
    public: boolean,
    section: Array<Blog>
}

export type Courses = Map<string, Course>

export const getCourses = () => {
    const jsonFullPath = path.join(process.cwd(), `./docs/index.json`)
    const json = JSON.parse(fs.readFileSync(jsonFullPath, 'utf8'))
    const courses = Object.keys(json)
    for (let i = 0; i < courses.length; i++) {
        const course = json[courses[i]]
        course["section"] = sortMds(getMenuConfig(course["link"]) )
    }
    return json
}