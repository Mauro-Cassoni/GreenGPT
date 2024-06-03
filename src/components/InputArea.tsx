import { FormEvent, useContext, useState } from "react";
import { IoMdArrowRoundUp } from "react-icons/io";
import { ResponseContext, iMessage } from "../context/ResponseContext";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

const apiKey = import.meta.env.VITE_API_KEY;
const auth = import.meta.env.VITE_AUTH;

export default function InputArea() {
    const [message, setMessage] = useState<string>('');
    const context = useContext(ResponseContext);

    if (!context) {
        return null;
    }

    const { addMessage } = context;

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

        try {
            const result = await axios.post(apiKey, {
                model: "gpt-3.5-turbo-instruct",
                prompt: message,
                max_tokens: 7,
                temperature: 0
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

            addMessage(userMessage);
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
        }
    };

    return (
        <div className="fixed bottom-10 border-4 border-[var(--primary)] w-[90vw] rounded-3xl p-3">
            <form onSubmit={handleSubmit} className="flex justify-between">
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder=" Scrivi un messaggio a GreenGPT"
                    className="bg-transparent focus:outline-none focus:ring-0 focus:border-transparent resize-none rounded-xl custom-scrollbar" />
                <div
                    className="bg-[var(--primary)] rounded-xl flex items-center justify-center p-4 ms-2">
                    <button type="submit" className="text-xl">
                        <IoMdArrowRoundUp />
                    </button>
                </div>
            </form>
        </div>
    )
}

