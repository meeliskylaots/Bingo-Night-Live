import React, { useState, useEffect } from 'react';
import { GameProvider, useGame } from './hooks/useGameSync';
import ControlPanel from './components/ControlPanel';
import PublicDisplay from './components/PublicDisplay';
import { THEMES } from './constants';
import { GameMode, Theme } from './types';
import { speak } from './services/speechService';

const AppContent: React.FC = () => {
    const { isGameStarted, theme, startGame } = useGame();
    const [view, setView] = useState<'setup' | 'control' | 'public'>('setup');

    // Check if this window should be a dedicated public view based on URL
    const isPublicWindow = new URLSearchParams(window.location.search).get('view') === 'public';
    
    const currentTheme = THEMES[theme];

    // Effect to reset to setup screen if game ends in the main control window
    useEffect(() => {
        if (!isPublicWindow && !isGameStarted && view !== 'setup') {
            setView('setup');
        }
    }, [isGameStarted, view, isPublicWindow]);

    const handleStartGame = (mode: GameMode) => {
        startGame(mode);
        setView('control');
    };

    const openPublicWindow = () => {
      // Point directly to index.html. This is a robust way to ensure the server
      // finds the correct entry point, bypassing issues with server-side routing
      // or URL rewriting for SPAs.
      const publicViewUrl = '/index.html?view=public';
      window.open(publicViewUrl, 'BingoPublicDisplay', 'width=1024,height=768,menubar=no,toolbar=no,location=no,status=no');
    };

    // If it's a dedicated public window, render only the PublicDisplay
    if (isPublicWindow) {
        return (
            <div className={`min-h-screen font-sans transition-colors duration-500 ${currentTheme.bg}`}>
                <PublicDisplay />
            </div>
        );
    }
    
    // Render the setup screen for the main control window
    if (view === 'setup') {
        return (
            <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 text-center">
                <h1 className="text-6xl font-bold mb-4 text-yellow-300 tracking-wider" style={{fontFamily: "'Arial Black', Gadget, sans-serif"}}>BINGO NIGHT LIVE</h1>
                <p className="text-xl mb-8 text-gray-300">Vali mängu tüüp ja alusta loosimist!</p>
                <div className="flex space-x-6">
                    <button onClick={() => handleStartGame(GameMode.BINGO75)} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-2xl transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                        75 Palli Bingo
                    </button>
                    <button onClick={() => handleStartGame(GameMode.BINGO90)} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-lg text-2xl transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                        90 Palli Bingo
                    </button>
                </div>
                <div className="mt-12 text-sm text-gray-500 max-w-lg mx-auto">
                    <p>Pärast mängu alustamist näed juhi vaadet. Publiku jaoks on kaks võimalust:</p>
                    <ul className="list-disc list-inside mt-2 text-left">
                        <li>Vajuta üleval paremal olevale nupule <strong className="text-gray-300">"Ava Aken"</strong>, et avada spetsiaalne aken publikule (soovitatav).</li>
                        <li>Või ava see leht teises brauseri aknas ja vali sealt käsitsi "Avalik Vaade".</li>
                    </ul>
                </div>
            </div>
        );
    }
    
    // Render the main control window with view switcher
    return (
        <div className={`min-h-screen font-sans transition-colors duration-500 ${currentTheme.bg}`}>
            {isGameStarted && (
                <div className="absolute top-4 right-4 z-50">
                    <div className="flex items-center space-x-2 bg-black bg-opacity-30 p-2 rounded-lg">
                        <button 
                            onClick={() => setView('control')} 
                            className={`px-3 py-1 rounded-md text-sm font-medium transition ${view === 'control' ? 'bg-yellow-400 text-black' : 'bg-gray-700 text-white hover:bg-gray-600'}`}>
                            Juhi Vaade
                        </button>
                        <button 
                            onClick={() => setView('public')} 
                            className={`px-3 py-1 rounded-md text-sm font-medium transition ${view === 'public' ? 'bg-yellow-400 text-black' : 'bg-gray-700 text-white hover:bg-gray-600'}`}>
                            Avalik Vaade
                        </button>
                         <button 
                            onClick={openPublicWindow} 
                            className="px-3 py-1 rounded-md text-sm font-medium transition bg-teal-500 text-white hover:bg-teal-400"
                            title="Ava avalik vaade eraldi aknas"
                        >
                           Ava Aken
                        </button>
                    </div>
                </div>
            )}
            
            {view === 'control' && <ControlPanel />}
            {view === 'public' && <PublicDisplay />}
        </div>
    );
}


const App: React.FC = () => {
    return (
        <GameProvider>
            <AppContent />
        </GameProvider>
    );
};

export default App;