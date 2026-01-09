'use client';

import { useState, useEffect, useRef } from 'react';

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

export default function ScrambleText({ text, isActive }: { text: string, isActive: boolean }) {
    const [display, setDisplay] = useState(text);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    
    useEffect(() => {
        if (!isActive) {
            setDisplay(text);
            if (intervalRef.current) clearInterval(intervalRef.current);
            return;
        }

        let iteration = 0;
        if (intervalRef.current) clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            setDisplay(
                text
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) return text[index];
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join("")
            );

            if (iteration >= text.length) {
                if (intervalRef.current) clearInterval(intervalRef.current);
            }

            iteration += 1 / 2; // Speed
        }, 30);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isActive, text]);

    return <span>{display}</span>;
}
