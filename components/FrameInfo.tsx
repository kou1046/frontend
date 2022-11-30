import axios from "axios"
import Image from "next/image"
import { Frame } from "../pages/interfaces/basetype"

const FrameInfo = (prop:Frame) => {

    const {frame, people} = prop
        
    return <>
        <p>Frame:{frame}</p>
        {people.map(p => <p key={`${p.frame_num}_${p.box.id}`}>{p.box.id}</p>)}
    </>
}

export default FrameInfo