import styles from "./styles/warning.module.scss"
const Warning = ({data, type}:any) => {
    return <div className={`${styles[type]} ${styles.main}`}>
        <p className={styles.type}>{type}</p>
        {data.map((d:any,i:number) => !d ? <br key={i} /> : <p key={i}>{d}</p>)}
    </div>
}
export default Warning