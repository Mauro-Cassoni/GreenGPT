import { useContext } from "react"
import { ResponseContext } from "../context/ResponseContext"


export default function ResponseAPI() {
    const { response } = useContext(ResponseContext)!;

    return (
        <div className="response-display">
            <p>{response}</p>
        </div>
    )
}
