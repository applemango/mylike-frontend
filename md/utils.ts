export const secure_filename = (filename: string):any => {
    let t = filename
    .replaceAll("#", "")
    .replaceAll("?","")
    .replaceAll("@", "")
    .replaceAll("&","")
    .replaceAll("=","")
    .replaceAll("/","_")
    .replaceAll(":","_")
    .replaceAll("___","_")
    .replaceAll("__","_")
    return t.includes("__") ? secure_filename(t) : t
}

export const isFolder = (file: string) => {
    if(file.indexOf(".") == -1)
        return true
    return false
}

export const sortFiles = (path: string[]) => {
    let files: string[] = []
    let folders: string[] = []
    path.forEach(p => {
        if(isFolder(getLastName(p)))
            folders.push(p)
        else
            files.push(p)
    });
    return folders.concat(files)
}

export const getLastName = (path: string) => {
    if(!path || path.indexOf("/") == -1)
        return path
    return path.split("/")[path.split("/").length - 1]
}