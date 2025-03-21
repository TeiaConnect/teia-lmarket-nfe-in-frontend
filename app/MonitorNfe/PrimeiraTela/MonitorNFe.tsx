import React, { useState } from 'react';
import DetalhesNFe from './DetalhesNFe';
import FiltroNFe from './FiltroNFe';
import TabelaNFe from './TabelaNFe';
import jsonData from '../exemploNFe.json';

const MonitorNFe: React.FC = () => {
    const [chaveSelecionada, setChaveSelecionada] = useState<number | null>(null);

    const handleChaveAcessoClick = (chave: number) => {
        setChaveSelecionada(chave);
    };

    const handleVoltar = () => {
        setChaveSelecionada(null);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleButtonClick = (json: any) => {
        console.log("botão clicado", json);
        <TabelaNFe onChaveAcessoClick={handleChaveAcessoClick} jsonData={jsonData}/>
    };

    return (
        <div>
            {chaveSelecionada ? (
                <DetalhesNFe chaveAcesso={chaveSelecionada} onVoltar={handleVoltar} jsonData={jsonData}/>
            ) : (
                <>
                    <FiltroNFe onButtonClick={handleButtonClick}/>
                    <TabelaNFe onChaveAcessoClick={handleChaveAcessoClick} jsonData={jsonData} />
                </>
            )}
        </div>
    );
};

export default MonitorNFe;
