
import React from 'react';
import { useGame } from '../hooks/useGameSync';
import { Theme } from '../types';

const THEME_OPTIONS = [
    { id: Theme.CLASSIC, name: 'Klassikaline' },
    { id: Theme.RETRO, name: 'Retro' },
    { id: Theme.MODERN, name: 'Modernne' },
];

const ThemeSelector: React.FC = () => {
    const { theme, changeTheme } = useGame();

    return (
        <div className="flex items-center justify-center space-x-2 bg-black/20 p-1.5 rounded-full">
            {THEME_OPTIONS.map(option => (
                <button
                    key={option.id}
                    onClick={() => changeTheme(option.id)}
                    className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${
                        theme === option.id
                            ? 'bg-white text-black shadow-md'
                            : 'text-white hover:bg-white/10'
                    }`}
                >
                    {option.name}
                </button>
            ))}
        </div>
    );
};

export default ThemeSelector;
