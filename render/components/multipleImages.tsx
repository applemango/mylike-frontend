import Image from "next/image";



type style = {readonly [key: string]: string;}
let s: {main: style,} = {main: {},}
import stylesMain from "../../renderv2/main.module.scss"
s.main = stylesMain

const MultipleImages = ({data}: {
    data: Array<{
        "src": string,
        "title": string
    }>
}) => {
    return <div style={{
        position: "relative",
        display: "flex"
    }}>
        {data.map((item, index) => <div key={index} style={{
            width: "calc(50% - 8px)",
            marginRight: index!=data.length-1 ? `calc(8px + (8px / ${data.length - 1}))` : 0
        }}>
            <div className={s.main.image}>
                <Image src={item.src} alt={item.title} layout="fill" objectFit="contain" />
                <p style={{
                    margin: 0,
                    textAlign: "center",
                    color: "#777"
                }}>{item.title}</p>
            </div>
        </div>)}
    </div>
}
export default MultipleImages;