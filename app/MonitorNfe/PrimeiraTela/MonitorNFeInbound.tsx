'use client';

import React, { useState } from 'react';
import FiltroNFeInbound from './FiltroNFeInbound';
import TabelaNFeInbound from './TabelaNFeInbound';
import DetalhesNFeInbound from './DetalhesNFeInbound';
import UploadXML from './UploadXML';

interface NFeData {
  notas_fiscais: Array<{
    referencia_nfe: {
      chave_acesso: string;
    };
    emissor: {
      cnpj: string;
      status: string;
      ultima_atividade: string;
      status_atividade: string;
      codigo_status: string;
      descricao_status: string;
      codigo_mensagem: string;
      mensagem_sefaz: string;
      inscricao_estadual: string;
      nome_emissor: string;
      nome_empresa: string;
      nome_comercio: string;
      rua: string;
      complemento: string;
      bairro: string;
      numero: string;
      codigo_postal: string;
      codigo_cidade: string;
      nome_cidade: string;
      uf: string;
      chave_pais: string;
      nome_pais: string;
      telefone: string;
      codigo_tributacao: string;
      inscricao_municipal: string;
      codigo_atividade: string;
    };
  }>;
}

const MonitorNFeInbound: React.FC = () => {
  const [jsonData, setJsonData] = useState<NFeData | null>(null);
  const [selectedChaveAcesso, setSelectedChaveAcesso] = useState<number | null>(null);

  const handleFiltroClick = (data: NFeData) => {
    setJsonData(data);
  };

  const handleChaveAcessoClick = (chaveAcesso: number) => {
    setSelectedChaveAcesso(chaveAcesso);
  };

  const handleVoltar = () => {
    setSelectedChaveAcesso(null);
  };

  const handleProcessXML = (xmlData: NFeData) => {
    setJsonData(prevData => {
      if (!prevData) return xmlData;
      return {
        notas_fiscais: [...prevData.notas_fiscais, ...xmlData.notas_fiscais]
      };
    });
  };

  return (
    <div className="monitor-nfe-container">
      <UploadXML onProcessXML={handleProcessXML} />
      <FiltroNFeInbound onButtonClick={handleFiltroClick} />
      <TabelaNFeInbound jsonData={jsonData} onChaveAcessoClick={handleChaveAcessoClick} />
      {selectedChaveAcesso && (
        <DetalhesNFeInbound 
          chaveAcesso={selectedChaveAcesso} 
          onVoltar={handleVoltar}
          jsonData={jsonData}
        />
      )}
    </div>
  );
};

export default MonitorNFeInbound; 