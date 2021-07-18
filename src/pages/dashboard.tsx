
import './dashboard.css'
import ACID_GREEN from './../Assets/bases/ACID_GREEN.png'
import ASH_GREY from './../Assets/bases/ASH_GREY.png'
import BLACK from './../Assets/bases/BLACK.png'
import BRILLANT_YELLOW from './../Assets/bases/BRILLANT_YELLOW.png'
import CERISE from './../Assets/bases/CERISE.png'
import CYCLAMEN_PINK from './../Assets/bases/CYCLAMEN_PINK.png'
import FLASHY_ORANGE from './../Assets/bases/FLASHY_ORANGE.png'
import MIST_GREY from './../Assets/bases/MIST_GREY.png'
import OPAL_GREY from './../Assets/bases/OPAL_GREY.png'
import NIAGARA_BLUE from './../Assets/bases/NIAGARA_BLUE.png'
import POMEGRANATE_RED from './../Assets/bases/POMEGRANATE_RED.png'
import PURPLE from './../Assets/bases/PURPLE.png'
import RED from './../Assets/bases/RED.png'
import ROSE_CANNELLE from './../Assets/bases/ROSE_CANNELLE.png'
import WHITE from './../Assets/bases/WHITE.png'
import WINTER_WHITE from './../Assets/bases/WINTER_WHITE.png'


import logo_base_gold from './../Assets/logos/bottom/gold.png'
import logo_base_silver from './../Assets/logos/bottom/silver.png'
import logo_base_platinum from './../Assets/logos/bottom/platinum.png'
import logo_gold from './../Assets/logos/top/gold.png'
import logo_silver from './../Assets/logos/top/silver.png'
import logo_platinum from './../Assets/logos/top/platinum.png'
import { useEffect, useState, useRef } from 'react'
import mergeImages, { Image } from 'merge-images'
import debounce from "lodash-es/debounce";



const Dashboard = () => {

    const [selectedBase, setSelectedBase] = useState(RED)
    const [selectedLogo, setSelectedLogo] = useState("gold")
    const [outputImage, setOutputImage] = useState<any>()
    const [outputImage2, setOutputImage2] = useState<any>()
    const [text, setText] = useState("")

    const debouncedSave = useRef(
        debounce(nextValue => {
            setText(nextValue.trim())
        }, 500)
    ).current;

    useEffect(() => {
        let top: Image
        let bottom: Image;

        if(selectedLogo === "gold"){
            top = logo_gold;
            bottom = logo_base_gold;
        }else if(selectedLogo === "platinum"){
            top = logo_platinum;
            bottom = logo_base_platinum;
        }else if(selectedLogo === "silver"){
            top = logo_silver;
            bottom = logo_base_silver;
        }else{
            top = logo_gold;
            bottom = logo_base_gold;
        }

        if(!!outputImage2){
            let outImage = selectedBase
            getImage().then(data => {
                data.unshift({src: top, x: 250, y: 70})
                data.unshift({src: bottom, x: 250, y: 500})
                data.unshift(outImage)
                mergeImages(data).then(base => {
                    setOutputImage2(base)
                })
            });
            mergeImages([selectedBase, {src: bottom, x: 250, y: 500}, {src: top, x: 250, y: 70}]).then(base64 => setOutputImage(base64))
        }
        else{
            mergeImages([selectedBase, {src: bottom, x: 250, y: 500}, {src: top, x: 250, y: 70}]).then(base64 => setOutputImage(base64))
        }
        
    }, [selectedBase, selectedLogo])

    const base64Encode =  (buf: any) => {
        let string = '';
        (new Uint8Array(buf)).forEach(
            (byte) => { string += String.fromCharCode(byte) }
          )
        return btoa(string)
      }

    const getImage = async () => {

        let Images: any[] = [];
        let chars = []

        for(let i=0; i<text.length; i++) {
            const char = text.charAt(i)
            chars.push(char)
        }
        return Promise.all(
            chars.map(async (char, index: number) => {
                const path = `./letters/${selectedLogo}/${char}.png`
                const response = await fetch(path)
                Images.push({src: 'data:image/png;base64,'+base64Encode(await response.arrayBuffer()), x: 200+(index*100), y:350})
            })
        ).then(() => Images)
    }

    useEffect(() => {

        if(!!text.length){
            let outImage = outputImage 
            getImage().then(data => {
                data.unshift(outImage)
                mergeImages(data).then(base => setOutputImage2(base))
            });
        }
        else {
            setOutputImage2(null)
        }
        
    }, [text])

    const onKeyPress = (event: any) => {
        return false
      }

    return(

        <div className="container">

            <div className="preview">
                {!!outputImage && (<img src={!!outputImage2 ? outputImage2 : outputImage} className="preview-image" alt="result"></img>)}
            </div>

            <div className="options">
                <div className="option-card">
                    <img src={ACID_GREEN} alt="preview" onClick={() => setSelectedBase(ACID_GREEN)} className="option-card-img"></img>
                </div>

                <div className="option-card">
                    <img src={ASH_GREY} alt="preview" onClick={() => setSelectedBase(ASH_GREY)} className="option-card-img"></img>
                </div>

                <div className="option-card">
                    <img src={BLACK} alt="preview" onClick={() => setSelectedBase(BLACK)} className="option-card-img"></img>
                </div>

                <div className="option-card">
                    <img src={BRILLANT_YELLOW} alt="preview" onClick={() => setSelectedBase(BRILLANT_YELLOW)} className="option-card-img"></img>
                </div>

                <div className="option-card">
                    <img src={CERISE} alt="preview" onClick={() => setSelectedBase(CERISE)} className="option-card-img"></img>
                </div>

                <div className="option-card">
                    <img src={CYCLAMEN_PINK} alt="preview" onClick={() => setSelectedBase(CYCLAMEN_PINK)} className="option-card-img"></img>
                </div>

                <div className="option-card">
                    <img src={FLASHY_ORANGE} alt="preview" onClick={() => setSelectedBase(FLASHY_ORANGE)} className="option-card-img"></img>
                </div>

                <div className="option-card">
                    <img src={MIST_GREY} alt="preview" onClick={() => setSelectedBase(MIST_GREY)} className="option-card-img"></img>
                </div>
            </div>

            <div style={{paddingTop: '0px'}} className="options">
                
                <div className="option-card">
                    <img src={OPAL_GREY} alt="preview" onClick={() => setSelectedBase(OPAL_GREY)} className="option-card-img"></img>
                </div>

                <div className="option-card">
                    <img src={NIAGARA_BLUE} alt="preview" onClick={() => setSelectedBase(NIAGARA_BLUE)} className="option-card-img"></img>
                </div>
            
                <div className="option-card">
                    <img src={POMEGRANATE_RED} alt="preview" onClick={() => setSelectedBase(POMEGRANATE_RED)} className="option-card-img"></img>
                </div>

                <div className="option-card">
                    <img src={PURPLE} alt="preview" onClick={() => setSelectedBase(PURPLE)} className="option-card-img"></img>
                </div>

                <div className="option-card">
                    <img src={RED} alt="preview" onClick={() => setSelectedBase(RED)} className="option-card-img"></img>
                </div>
                

            </div>

            <div className="options">
                <div className="option-card">
                    <img src={logo_platinum} alt="preview" onClick={() => setSelectedLogo("platinum")} className="option-card-img"></img>
                </div>
                <div className="option-card">
                    <img src={logo_gold} alt="preview" onClick={() => setSelectedLogo("gold")} className="option-card-img"></img>
                </div>
                <div className="option-card">
                    <img src={logo_silver} alt="preview" onClick={() => setSelectedLogo("silver")} className="option-card-img"></img>
                </div>
            </div>

            <div className="options">
                <input type="text" maxLength={4} pattern="[A-Za-z]" onChange={e => debouncedSave(e.target.value)}></input>

            </div>
        </div>

    )

}

export default Dashboard