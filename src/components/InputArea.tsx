
export default function InputArea() {



    return (
        <div className="fixed bottom-10 border-4 border-[var(--primary)] w-[90dvw] rounded-3xl p-3">
            <form action="" className="flex justify-between">
                <textarea
                    placeholder="Scrivi un messaggio a GreenGPT"
                    className="bg-transparent focus:outline-none focus:ring-0 focus:border-transparent resize-none rounded-xl custom-scrollbar" />
                <button>Button</button>
            </form>
        </div>
    )
}
