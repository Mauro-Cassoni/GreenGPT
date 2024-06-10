import { useContext, useEffect, useRef } from "react"
import { ResponseContext } from "../context/ResponseContext"
import { FaArrowDown } from "react-icons/fa";

export default function MessageList() {
    const context = useContext(ResponseContext);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    if (!context) {
        return <div>Loading...</div>;
    }

    const { messages } = context;

    const formatTimestamp = (timestamp: number) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="flex-1 custom-scrollbar">
            <div className="flex flex-col">
                {messages.map(message => (
                    <div key={message.id} className={message.sender === 'user' ? 'user-message' : 'api-message'}>
                        <p>{message.text}</p>
                        <p
                            className="text-amber-100 text-end text-xs mt-1">
                            {formatTimestamp(message.timestamp)}</p>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            {<button className="fixed bottom-36 right-1/2 bg-[var(--primary)] rounded-xl p-3 btn"
            onClick={scrollToBottom}>
                <FaArrowDown />
            </button>}
        </div>
    );
}
