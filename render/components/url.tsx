import Image from "next/image"
import Link from "next/link"
import styles from ".././components/styles/span_styles.module.scss"
import { secure_filename } from "@/md/utils"

const Url = ({url, data, follow = true}:{url: string, data: string, follow?: boolean}) => {
    return <div className={styles.link_image}>
        <Link legacyBehavior href = { url }>
            <a className={styles.link} target = {"_blank"} rel={follow ? "" : "nofollow"}>
                <div className={styles.imageContainer}>
                    <Image src={`/images/site/${secure_filename(url)}.png`} layout="fill" objectFit="contain" style={{ objectFit: "cover" }} alt={""}/>
                </div>
                <p>{data}</p>
            </a>
        </Link>
    </div>
}
export default Url