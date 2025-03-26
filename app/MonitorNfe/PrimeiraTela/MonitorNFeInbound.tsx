'use client';

import React, { useState, useEffect } from 'react';
import FiltroNFeInbound from './FiltroNFeInbound';
import TabelaNFeInbound from './TabelaNFeInbound';
import DetalhesNFeInbound from './DetalhesNFeInbound';
import UploadXML from './UploadXML';
import { message } from 'antd';

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
  const [loading, setLoading] = useState(false);

  const handleFiltroSubmit = async (filtros: any) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      
      if (filtros.chaveAcesso?.length > 0) {
        params.append('chNFe', filtros.chaveAcesso[0]);
      }
      
      if (filtros.cnpjEmissorDe) {
        params.append('cnpj_emissor', filtros.cnpjEmissorDe[0]);
      }

      if (filtros.dataCriacaoDe && filtros.dataCriacaoAte) {
        params.append('data_inicio', filtros.dataCriacaoDe.toISOString());
        params.append('data_fim', filtros.dataCriacaoAte.toISOString());
      }

      const response = await fetch(`/api/nfe?${params.toString()}`);
      if (!response.ok) throw new Error('Erro ao buscar dados');
      
      const data = await response.json();
      
      const notasFiscais = data.map((xml: any) => ({
        identificacao_nfe: {
          tipo_emissao: xml.nfeProc?.NFe?.infNFe?.ide?.tpEmis || '',
          codigo_status: xml.nfeProc?.protNFe?.infProt?.cStat || '',
          numero_nfe: xml.nfeProc?.NFe?.infNFe?.ide?.nNF || '',
          serie: xml.nfeProc?.NFe?.infNFe?.ide?.serie || ''
        },
        emissor: {
          cnpj: xml.nfeProc?.NFe?.infNFe?.emit?.CNPJ || ''
        },
        referencia_nfe: {
          chave_acesso: xml.nfeProc?.protNFe?.infProt?.chNFe || ''
        }
      }));

      setJsonData({ notas_fiscais: notasFiscais });
      
      if (notasFiscais.length === 0) {
        message.info('Nenhum resultado encontrado para os filtros aplicados.');
      }
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      message.error('Erro ao buscar dados. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleChaveAcessoClick = (chaveAcesso: number) => {
    setSelectedChaveAcesso(chaveAcesso);
  };

  const handleVoltar = () => {
    setSelectedChaveAcesso(null);
  };

  useEffect(() => {
    handleFiltroSubmit({});
  }, []);

  const handleProcessXML = (xmlData: NFeData) => {
    setJsonData(prevData => {
      if (!prevData) return xmlData;
      return {
        notas_fiscais: [...prevData.notas_fiscais, ...xmlData.notas_fiscais]
      };
    });
  };

  if (selectedChaveAcesso) {
    return <DetalhesNFeInbound chaveAcesso={selectedChaveAcesso} onVoltar={handleVoltar} jsonData={jsonData} />;
  }

  return (
    <div className="monitor-nfe-container">
      <UploadXML onProcessXML={handleProcessXML} />
      <FiltroNFeInbound onButtonClick={handleFiltroSubmit} />
      <TabelaNFeInbound jsonData={jsonData} onChaveAcessoClick={handleChaveAcessoClick} />
    </div>
  );
};

export default MonitorNFeInbound; 