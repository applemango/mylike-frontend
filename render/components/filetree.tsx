import styles from "./styles/filetree.module.scss"

const FileTree = ({
    data
}:{
    data: any
}) => {
    return <div className={styles.main}>
        <Child data={data} />
    </div>
}
const Child = ({data}:{data: any}) => {
    if (typeof data === 'string') {
        return <File str={data} />
    }
    if (Object.keys(data).length < 2) {
        return <div className={styles.folder_item}>
            { Object.keys(data)[0] != "0" &&
                <Folder str={Object.keys(data)[0]} />}
            <Child data={data[Object.keys(data)[0]]} />
        </div>
    }
    return <div>
        { Object.keys(data).map((key: string, i: number) => (
            <div key={i} className={styles.folder_item}>
                <Child data={data[key]} />
            </div>
        )) }
    </div>
}

export const Folder = ({
    str
}:{
    str: string
}) => {
    let icon;
    let name = str;
    let config = [""];
    if(str && typeof str === "string" && str.split(":").length > 1) {
        config = str.split(":")
        name = str.split(":")[0]
        //const type = str.split(":")[1]
        if (config.includes("add")) {
            name = str.split(":")[0]
            icon = <svg className={styles.icon_add} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fillRule="evenodd" d="M13.25 2.5H2.75a.25.25 0 00-.25.25v10.5c0 .138.112.25.25.25h10.5a.25.25 0 00.25-.25V2.75a.25.25 0 00-.25-.25zM2.75 1h10.5c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0113.25 15H2.75A1.75 1.75 0 011 13.25V2.75C1 1.784 1.784 1 2.75 1zM8 4a.75.75 0 01.75.75v2.5h2.5a.75.75 0 010 1.5h-2.5v2.5a.75.75 0 01-1.5 0v-2.5h-2.5a.75.75 0 010-1.5h2.5v-2.5A.75.75 0 018 4z"></path></svg>
        } else if (config.includes("change")) {
            name = str.split(":")[0]
            icon = <svg className={styles.icon_change} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fillRule="evenodd" d="M2.75 2.5h10.5a.25.25 0 01.25.25v10.5a.25.25 0 01-.25.25H2.75a.25.25 0 01-.25-.25V2.75a.25.25 0 01.25-.25zM13.25 1H2.75A1.75 1.75 0 001 2.75v10.5c0 .966.784 1.75 1.75 1.75h10.5A1.75 1.75 0 0015 13.25V2.75A1.75 1.75 0 0013.25 1zM8 10a2 2 0 100-4 2 2 0 000 4z"></path></svg>
        }
    }
    return <div className={`${styles.file} ${config.includes("hide") ? styles.hide : ""}`}>
        <div>
            { config.includes("file")
                ? (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fillRule="evenodd" d="M3.75 1.5a.25.25 0 00-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 00.25-.25V6h-2.75A1.75 1.75 0 019 4.25V1.5H3.75zm6.75.062V4.25c0 .138.112.25.25.25h2.688a.252.252 0 00-.011-.013l-2.914-2.914a.272.272 0 00-.013-.011zM2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0113.25 16h-9.5A1.75 1.75 0 012 14.25V1.75z"></path></svg>)
                : (<svg className={styles.svg_folder} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path d="M1.75 1A1.75 1.75 0 000 2.75v10.5C0 14.216.784 15 1.75 15h12.5A1.75 1.75 0 0016 13.25v-8.5A1.75 1.75 0 0014.25 3H7.5a.25.25 0 01-.2-.1l-.9-1.2C6.07 1.26 5.55 1 5 1H1.75z"></path></svg>)
            }
            <p>{name}</p>
        </div>
        <div className={styles.icon}>
            {icon}
        </div>
    </div>
}

export const File = ({
    str
}:{
    str: string
}) => {
    if(!str) {
        return <div></div>
    }
    let icon;
    let name = str;
    let config = [""];
    if(str && str.split(":").length > 1) {
        config = str.split(":")
        name = str.split(":")[0]
        //const type = str.split(":")[1]
        if (config.includes("add")) {
            icon = <svg className={styles.icon_add} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fillRule="evenodd" d="M13.25 2.5H2.75a.25.25 0 00-.25.25v10.5c0 .138.112.25.25.25h10.5a.25.25 0 00.25-.25V2.75a.25.25 0 00-.25-.25zM2.75 1h10.5c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0113.25 15H2.75A1.75 1.75 0 011 13.25V2.75C1 1.784 1.784 1 2.75 1zM8 4a.75.75 0 01.75.75v2.5h2.5a.75.75 0 010 1.5h-2.5v2.5a.75.75 0 01-1.5 0v-2.5h-2.5a.75.75 0 010-1.5h2.5v-2.5A.75.75 0 018 4z"></path></svg>
        } else if (config.includes("change")) {
            icon = <svg className={styles.icon_change} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fillRule="evenodd" d="M2.75 2.5h10.5a.25.25 0 01.25.25v10.5a.25.25 0 01-.25.25H2.75a.25.25 0 01-.25-.25V2.75a.25.25 0 01.25-.25zM13.25 1H2.75A1.75 1.75 0 001 2.75v10.5c0 .966.784 1.75 1.75 1.75h10.5A1.75 1.75 0 0015 13.25V2.75A1.75 1.75 0 0013.25 1zM8 10a2 2 0 100-4 2 2 0 000 4z"></path></svg>
        }
    }
    return <div className={`${styles.file} ${config.includes("hide") ? styles.hide : ""}`}>
        <div>
            { !config.includes("folder")
                ? (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fillRule="evenodd" d="M3.75 1.5a.25.25 0 00-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 00.25-.25V6h-2.75A1.75 1.75 0 019 4.25V1.5H3.75zm6.75.062V4.25c0 .138.112.25.25.25h2.688a.252.252 0 00-.011-.013l-2.914-2.914a.272.272 0 00-.013-.011zM2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0113.25 16h-9.5A1.75 1.75 0 012 14.25V1.75z"></path></svg>)
                : (<svg className={styles.svg_folder} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path d="M1.75 1A1.75 1.75 0 000 2.75v10.5C0 14.216.784 15 1.75 15h12.5A1.75 1.75 0 0016 13.25v-8.5A1.75 1.75 0 0014.25 3H7.5a.25.25 0 01-.2-.1l-.9-1.2C6.07 1.26 5.55 1 5 1H1.75z"></path></svg>)
            }
            <p>{name}</p>
        </div>
        <div className={styles.icon}>
            {icon}
        </div>
    </div>
}

export default FileTree;