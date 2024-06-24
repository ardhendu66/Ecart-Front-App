interface Props {
    children: React.ReactNode;
    addedClass: string;
}

export default function TransparentButton({children, addedClass}: Props) {
    return (
        <button type="button" className={`bg-transparent border-[1.5px] px-4 py-2 rounded-md ${addedClass}`}> 
            {children} 
        </button>
    )
}