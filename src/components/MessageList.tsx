import { useContext } from "react"
import { ResponseContext } from "../context/ResponseContext"

export default function MessageList() {
    const context = useContext(ResponseContext);

    if (!context) {
        return <div>Loading...</div>;
    }

    const { messages } = context;

    const formatTimestamp = (timestamp: number) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="flex flex-col">
            {messages.map(message => (
                <div key={message.id} className={message.sender === 'user' ? 'user-message' : 'api-message'}>
                    <p>{message.text}</p>
                    <p
                        className="text-amber-100 text-end text-xs mt-1">
                        {formatTimestamp(message.timestamp)}</p>
                </div>
            ))}
        </div>
    );
}
