interface Props {
    children: React.ReactNode;
    addedClass: string;
}

export default function PrimaryButton({children, addedClass}: Props) {
    return (
        <button 
            type="button"
            className={`bg-orange-400 border-0 px-4 py-2 rounded-md ${addedClass}`}
        >
            {children}
        </button>
    )
}