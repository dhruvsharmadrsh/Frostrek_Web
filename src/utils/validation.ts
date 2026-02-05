
export const isGibberish = (text: string): boolean => {
    if (!text) return false;

    // Check for words that are too long (likely keyboard smashing)
    const words = text.split(/\s+/);
    const hasLongWord = words.some(word => word.length > 30);
    if (hasLongWord) return true;

    // Check for excessive repeated characters (e.g., "haaaaaaaa")
    const hasRepeatedChars = /(.)\1{4,}/.test(text);
    if (hasRepeatedChars) return true;

    // Check for low character variety in a long string (e.g. "asdasdasd")
    // If text length > 10 and unique char ratio < 10%
    if (text.length > 20) {
        const uniqueChars = new Set(text).size;
        const ratio = uniqueChars / text.length;
        if (ratio < 0.1) return true; // Very repetitive
    }

    return false;
};

export const getMessageValidationError = (message: string): string | null => {
    if (!message) return "Message is required.";

    const wordCount = message.trim().split(/\s+/).length;
    if (wordCount < 20) {
        return `Message must be at least 20 words. (Currently ${wordCount})`;
    }

    if (isGibberish(message)) {
        return "Please enter a valid message.";
    }

    return null;
};
