import { Blog } from "./getBlog";

export const sortBlogs = (blog: Blog[]): Blog[] => {
    return sortMds(blog)
}
export const sortMds = (mds: Blog[]): Blog[] => {
    quickSort(mds, 0, mds.length - 1)
    return mds
}

function quickSort(arr:any, low:number, high:number) {
    if (low < high) {
        let pivot = partition(arr, low, high);
        quickSort(arr, low, pivot - 1);
        quickSort(arr, pivot + 1, high);
    }
}
function partition(arr:any, low:number, high:number) {
    let pivot = arr[high].sort;
    let i = low -1;
    for (let j = low; j < high; j++) {
        if (arr[j].sort <= pivot) {
            i++;
            swap(arr, i, j);
        }
    }
    swap(arr, i + 1, high);
    return i + 1;
}
function swap(arr:any, i:number, j:number) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}