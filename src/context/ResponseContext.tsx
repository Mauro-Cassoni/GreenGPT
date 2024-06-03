import { ReactNode, createContext, useState } from "react";

interface iMessage {
    id: number;
    sender: 'user' | 'api';
    text: string;
}

interface iResponseContext {
    message: iMessage[];
    addMessage: (message : iMessage) => void;
}

export const ResponseContext = createContext<iResponseContext | undefined>(undefined);

export const ResponseProvider: React.FC<{children:ReactNode}> = ({children}) => {

    const [message, setMessage] = useState<iMessage[]>([]);

    const addMessage = (message: iMessage) => {
        setMessage(prevMessage => [...prevMessage, message])
    }

    return (
        <ResponseContext.Provider value={{ message, addMessage }}>
        {children}
    </ResponseContext.Provider>
    )
}