import { ReactNode, createContext, useState } from "react";

export interface iMessage {
    id: string;
    text: string;
    sender: 'user' | 'api';
    timestamp: number
    copy?: () => void;
}

export interface iResponseContext {
    messages: iMessage[];
    response: string;
    loading: boolean;
    inputMessage: string;
    setInputMessage: (message: string) => void;
    addMessage: (message: iMessage) => void;
    setLoading: (loading: boolean) => void;
}

export const ResponseContext = createContext<iResponseContext | undefined>(undefined);

export const ResponseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [messages, setMessages] = useState<iMessage[]>([]);
    const [response] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [inputMessage, setInputMessage] = useState<string>('');

    const addMessage = (message: iMessage) => {
        setMessages(prevMessages => [...prevMessages, message]);
    };

    return (
        <ResponseContext.Provider value={{ messages, response, loading, inputMessage, setInputMessage, addMessage, setLoading }}>
            {children}
        </ResponseContext.Provider>
    );
};

