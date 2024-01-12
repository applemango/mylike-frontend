import styles from "./styles/table.module.scss"
const Table = ({
    data
}:{
    data: {
        columns:string[],
        rows: Object[]
    }
}) => {
    if(!data.columns || !data.rows)
        return <div/>
    return <div style={{overflowX: "auto"}}>
        <table className={styles.table}>
            <thead>
                <tr>
                    {data.columns.map((column: string, i: number) => <th key={i}>{column}</th>)}
                </tr>
            </thead>
            <tbody>
                {data.rows.map((row: any, i: number) =>(
                    <tr key={i}>
                        {data.columns.map((column: string, j: number) => <td key={j}>{row[column]}</td>)}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
}
export default Table