import { FormEvent, useContext, useEffect, useRef, useState } from "react"
import { ResponseContext } from "../context/ResponseContext"
import { FaArrowDown, FaPen } from "react-icons/fa";
import { GrSend } from "react-icons/gr";
import { v4 as uuidv4 } from 'uuid';
import { IoCopy } from "react-icons/io5";

export default function MessageList() {
    const context = useContext(ResponseContext);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const messagesContainerRef = useRef<HTMLDivElement>(null);
    const [isAtBottom, setIsAtBottom] = useState(true);
    const [user, setUser] = useState('Utente');
    const [inputValue, setInputValue] = useState('');
    const [alertMessage, setAlertMessage]= useState<string | null>(null)

    if (!context) {
        return <div>Loading...</div>;
    }

    const { messages, setInputMessage } = context;

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

    const handleUser = (e: FormEvent) => {
        e.preventDefault();
        setUser(inputValue);
        context.addMessage({
            id: uuidv4(),
            sender: 'api',
            text: `Ciao ${inputValue} come posso esserti utile oggi?`,
            timestamp: Date.now(),
        })
    };

    const handleUserClick = () => {
        setUser(inputValue);
        context.addMessage({
            id: uuidv4(),
            sender: 'api',
            text: `Ciao ${inputValue} come posso esserti utile oggi?`,
            timestamp: Date.now(),
        });
    };

    const copy = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            setAlertMessage('Testo copiato con successo!');
            setTimeout(() => setAlertMessage(null), 3000)
        }).catch(err => {
            console.error('Error durante la copia del testo: ', err);
        });
    }

    const edit = (text: string) => {
        setInputMessage(text);
        setAlertMessage('Testo copiato nell\'input per la modifica!');
        setTimeout(() => setAlertMessage(null), 3000);
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
            {messages.length === 0 &&
                <div className="flex justify-center items-center h-full w-full">
                    <form className="loader font-bold text-lg p-2 rounded-xl overflow-hidden" onSubmit={handleUser}>
                        <p className="mb-4 transition duration-0 text-[var(--bg)] text-center">Inserisci il tuo nome (Opzionale).</p>
                        <div className="flex flex-col sm:flex-row gap-2">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                className="border-[var(--primary)] border-2 bg-[var(--bg)] focus:outline-none focus:ring-0 resize-none rounded-xl"
                            />
                            <div className="bg-[var(--primary)] rounded-xl flex items-center justify-center p-4 cursor-pointer btn flex-grow-0 sm:flex-shrink-0" onClick={handleUserClick}>
                                <button type="submit"><GrSend /></button>
                            </div>
                        </div>
                    </form>
                </div>
            }
            <div className="flex flex-col">
                {messages.map(message => (
                    <div key={message.id} className={message.sender === 'user' ? 'user-message' : 'api-message'}>
                        {message.sender === 'api' &&
                            <div className="flex justify-between mb-1">
                                <p className=" bg-[var(--bg)] p-1 rounded-xl px-2 me-2">GreenGPT</p>
                                <button className=" bg-[var(--bg)] p-1 rounded-xl px-2"
                                    onClick={() => copy(message.text)}><IoCopy /></button>
                            </div>
                        }
                        {message.sender === 'user' &&
                            <div className="flex justify-between mb-1">
                                <div className="flex gap-2">
                                <button className=" bg-[var(--bg)] rounded-xl p-2"
                                    onClick={() => copy(message.text)}><IoCopy /></button>

                                <button className=" bg-[var(--bg)] rounded-xl p-2"
                                    onClick={() => edit(message.text)}><FaPen  /></button>
                                </div>
                                <p className=" bg-[var(--bg)] p-1 rounded-xl px-2 ms-2">{user}</p>
                            </div>
                        }
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
                        {alertMessage && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 loader p-10 rounded-xl font-bold text-xl text-[var(--bg)] text-center">
                    {alertMessage}
                </div>
            )}
        </div>
    );
}
