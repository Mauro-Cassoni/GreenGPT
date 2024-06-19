import { useContext } from "react"
import { ResponseContext } from "../context/ResponseContext"


export default function ResponseAPI() {
    const context = useContext(ResponseContext);

    if (!context) {
        return <div>Loading...</div>;
    }

    const { response } = context;

    return (
        <div>
            <p>{response}</p>
        </div>
    );
}
