import Link from "next/link"
import styles from ".././components/styles/span_styles.module.scss"

const PageLink = ({link, data}:{link: string, data: string}) => {
    return <Link legacyBehavior href = {link }><a className={styles.link}>{data}</a></Link>
}
export default PageLink