import { useEffect, useState } from "react";
import styles from "./style.module.scss";

interface ITypingTitle {
    /**
     * Initial text to display progressively
     */
    children: string;
    /**
     * Delay between each character in milliseconds (default: 200ms)
     */
    typingDelay?: number;
    /**
     * Callback triggered when the title changes
     */
    onChange?: (value: string) => void;
}

/**
 * Renders an editable title with a typing effect
 */
const TypingTitle: React.FC<ITypingTitle> = ({ children, typingDelay = 200, onChange }) => {
    const [value, setValue] = useState("");
    const [showUnderscore, setShowUnderscore] = useState(true);
    const [isFocused, setIsFocused] = useState(false);
    const [isTyping, setIsTyping] = useState(true);

    useEffect(() => {
        if (isTyping && value.length < children.length) {
            const typingTimeout = setTimeout(() => {
                setValue((prev) => children.slice(0, prev.length + 1));
            }, typingDelay);

            return () => clearTimeout(typingTimeout);
        } else if (isTyping) {
            setIsTyping(false);
        }
    }, [value, children, typingDelay, isTyping]);

    useEffect(() => {
        if (!isTyping && !isFocused) {
            const blinkingInterval = setInterval(() => {
                setShowUnderscore((prev) => !prev);
            }, 500);

            return () => clearInterval(blinkingInterval);
        }
        setShowUnderscore(false);
    }, [isTyping, isFocused]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value: newValue } = e.target;
        setValue(newValue);
        setIsTyping(false);
        onChange?.(newValue);
    };

    return (
        <input
            type="text"
            className={styles["typing-title"]}
            value={`${value}${isTyping ? "" : showUnderscore ? "_" : ""}`}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            spellCheck="false"
        />
    );
};

export default TypingTitle;
