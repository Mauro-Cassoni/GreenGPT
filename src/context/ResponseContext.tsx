import { ReactNode, createContext, useState } from "react";

export interface iMessage {
    id: string;
    text: string;
    sender: 'user' | 'api';
    timestamp:number
}


export interface iResponseContext {
    messages: iMessage[];
    response: string;
    addMessage: (message: iMessage) => void;
}

export const ResponseContext = createContext<iResponseContext | undefined>(undefined);

export const ResponseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [messages, setMessages] = useState<iMessage[]>([]);
    const [response, setResponse] = useState<string>('');

    const addMessage = (message: iMessage) => {
        setMessages(prevMessages => [...prevMessages, message]);
    };

    return (
        <ResponseContext.Provider value={{ messages, response, addMessage }}>
            {children}
        </ResponseContext.Provider>
    );
};

