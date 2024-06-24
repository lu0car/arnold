import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextAre({ type = 'text', className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <textarea 
        {...props}
            type={type}
        rows="4" 
        className={
            'block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-indogo-500 focus:border-indogo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:border-indigo-500 focus:ring-indigo-500' +
            className
        }

        />

    );
});
