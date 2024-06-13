import { useContext, useEffect, useRef, useState } from "react"
import { ResponseContext } from "../context/ResponseContext"
import { FaArrowDown } from "react-icons/fa";

export default function MessageList() {
    const context = useContext(ResponseContext);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const messagesContainerRef = useRef<HTMLDivElement>(null);
    const [isAtBottom, setIsAtBottom] = useState(true);

    if (!context) {
        return <div>Loading...</div>;
    }

    const { messages } = context;

    const formatTimestamp = (timestamp: number) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleScroll = () => {
        if (messagesContainerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
            setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 10);
        }
    };

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        const container = messagesContainerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
            return () => {
                container.removeEventListener('scroll', handleScroll);
            };
        }
    }, []);

    return (
        <div className="flex-1 custom-scrollbar" ref={messagesContainerRef}>
            <div className="flex flex-col">
                {messages.map(message => (
                    <div key={message.id} className={message.sender === 'user' ? 'user-message' : 'api-message'}>
                        <p>{message.text}</p>
                        <p className="text-amber-100 text-end text-xs mt-1">
                            {formatTimestamp(message.timestamp)}
                        </p>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            {!isAtBottom && (
                <button className="fixed bottom-[11svh] left-1/2 bg-[var(--bg)] rounded-xl p-3 btn transform -translate-x-1/2 -translate-y-1/2 border-2 border-[var(--primary)]"
                onClick={scrollToBottom}>
                    <FaArrowDown />
                </button>
            )}
        </div>
    );
}
