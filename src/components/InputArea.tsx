import { FormEvent, useContext, useState } from "react";
import { ResponseContext, iMessage } from "../context/ResponseContext";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { GrSend } from "react-icons/gr";
import { FaSpinner } from "react-icons/fa";

const apiKey = import.meta.env.VITE_API_KEY;
const auth = import.meta.env.VITE_AUTH;

interface iInputArea {
    className?: string;
}

export default function InputArea({ className }: iInputArea) {
    const [message, setMessage] = useState<string>('');
    const context = useContext(ResponseContext);

    if (!context) {
        return null;
    }

    const { addMessage, setLoading, loading } = context;

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (message.trim() === '') return;

        const userMessage: iMessage = {
            id: uuidv4(),
            sender: 'user',
            text: message,
            timestamp: Date.now()
        };

        setMessage('');
        addMessage(userMessage);
        setLoading(true);

        try {
            const result = await axios.post(apiKey, {
                model: "gpt-3.5-turbo-instruct",
                prompt: message,
                max_tokens:150,
                temperature: 0.7,
                top_p: 0.9,
                frequency_penalty: 0.5,
                presence_penalty: 0.6,
                // stop: ["\n"]
            }, {
                headers: {
                    'Authorization': auth,
                    'Content-Type': 'application/json'
                }
            });

            const apiMessage: iMessage = {
                id: uuidv4(),
                sender: 'api',
                text: result.data.choices[0].text,
                timestamp: Date.now()
            };

            addMessage(apiMessage);

        } catch (error) {
            console.error("Errore durante la chiamata API:", error);
            const errorMessage: iMessage = {
                id: uuidv4(),
                sender: 'api',
                text: "Errore durante la chiamata API",
                timestamp: Date.now()
            };
            addMessage(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`${className} border-4 border-[var(--primary)] rounded-3xl p-3 w-full`}>
            <form className="flex justify-between h-full" onSubmit={handleSubmit}>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Scrivi un messaggio..."
                    className="bg-transparent focus:outline-none focus:ring-0 focus:border-transparent resize-none rounded-xl custom-scrollbar"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            handleSubmit(e);
                        }
                    }}
                />
                <div onClick={handleSubmit}
                    className="bg-[var(--primary)] rounded-xl flex items-center justify-center p-4 ms-2 cursor-pointer btn">
                    <button type="submit" className="text-xl">
                        <GrSend />
                    </button>
                </div>
            {loading && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 loader p-12 rounded-xl">
                    <div className="flex items-center">
                        <FaSpinner className="animate-spin text-[var(--primary)] text-2xl" />
                        <span className="font-bold text-xl text-[var(--primary)] m-2">Attendere...</span>
                    </div>
                </div>
            )}
            </form>
        </div>
    );
}
