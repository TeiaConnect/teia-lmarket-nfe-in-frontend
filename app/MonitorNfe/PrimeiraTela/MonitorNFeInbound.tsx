'use client';

import React, { useState, useEffect } from 'react';
import FiltroNFeInbound from './FiltroNFeInbound';
import TabelaNFeInbound from './TabelaNFeInbound';
import DetalhesNFeInbound from './DetalhesNFeInbound';
import UploadXML from './UploadXML';
import { message, Button, Dropdown, Space, Cascader } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { NFeData } from '../types/NFeData';

const options = [
  {
    value: 'visao1',
    label: 'Visão 1',
    children: [
      {
        value: 'visao1-1',
        label: 'Visão 1.1',
      },
      {
        value: 'visao1-2',
        label: 'Visão 1.2',
      },
    ],
  },
  {
    value: 'visao2',
    label: 'Visão 2',
    children: [
      {
        value: 'visao2-1',
        label: 'Visão 2.1',
      },
      {
        value: 'visao2-2',
        label: 'Visão 2.2',
      },
    ],
  },
];

const dropdownItems = [
  {
    key: '1',
    label: 'Item 1',
  },
  {
    key: '2',
    label: 'Item 2',
  },
];

const items: MenuProps['items'] = [
  {
    key: '1',
    label: 'Continuar Processo',
  },
  {
    key: '2',
    label: 'Denfinir etapas do processo manualmente para Ok',
  },
  {
    key: '3',
    label: 'Finalizar NF-e Manualmente',
  },
  {
    key: '4',
    label: 'Rejeitar NF-e',
  },
  {
    key: '5',
    label: 'Anular Rejeição NF-e',
  },
  {
    key: '6',
    label: 'Enviar notificação ao Fornecedor',
  },
  {
    key: '7',
    label: 'Consultar Eventos',
  },
];

const etapasProcessoItems = [
  {
    key: '1',
    label: 'Atribuir itens do pedido',
  },
  {
    key: '2',
    label: 'Simular fatura e NF-e',
  },
  {
    key: '3',
    label: 'Entrada DANFE',
  },
  {
    key: '4',
    label: 'Verificar quantidade EM',
  },
];
const optionsExportacao = [
  {
    key: '1',
    label: 'Exportar para Excel',
    function: 'exportarParaExcel',
  },
  {
    key: '2',
    label: 'Exportar para PDF',
    function: 'exportarParaPDF',
  },
  {
    key: '3',
    label: 'Exportar Como...',
    function: 'exportarComo',
  },
];
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
          cnpj: xml.nfeProc?.NFe?.infNFe?.emit?.CNPJ || '',
          codigo_uf: xml.nfeProc?.NFe?.infNFe?.emit?.UF || ''
        },
        destinatario: {
          cnpj: xml.nfeProc?.NFe?.infNFe?.dest?.CNPJ || ''
        },
        referencia_nfe: {
          chave_acesso: xml.nfeProc?.protNFe?.infProt?.chNFe || ''
        },
        ambiente: xml.nfeProc?.NFe?.infNFe?.ide?.tpAmb || '',
        codigo_mensagem: xml.nfeProc?.NFe?.infNFe?.emit?.cMsg || '',
        mensagem_sefaz: xml.nfeProc?.NFe?.infNFe?.emit?.xMsg || '',
        inscricao_estadual: xml.nfeProc?.NFe?.infNFe?.emit?.IE || '',
        nome_emissor: xml.nfeProc?.NFe?.infNFe?.emit?.xNome || '',
        nome_empresa: xml.nfeProc?.NFe?.infNFe?.emit?.xFant || '',
        nome_comercio: xml.nfeProc?.NFe?.infNFe?.emit?.xFant || '',
        rua: xml.nfeProc?.NFe?.infNFe?.emit?.xLgr || '',
        complemento: xml.nfeProc?.NFe?.infNFe?.emit?.xBairro || '',
        bairro: xml.nfeProc?.NFe?.infNFe?.emit?.xBairro || '',
        numero: xml.nfeProc?.NFe?.infNFe?.emit?.nro || '',
        codigo_postal: xml.nfeProc?.NFe?.infNFe?.emit?.CEP || '',
        codigo_cidade: xml.nfeProc?.NFe?.infNFe?.emit?.cMun || '',
        nome_cidade: xml.nfeProc?.NFe?.infNFe?.emit?.xMun || '',
        uf: xml.nfeProc?.NFe?.infNFe?.emit?.UF || '',
        chave_pais: xml.nfeProc?.NFe?.infNFe?.emit?.cPais || '',
        nome_pais: xml.nfeProc?.NFe?.infNFe?.emit?.xPais || '',
        telefone: xml.nfeProc?.NFe?.infNFe?.emit?.fone || '',
        codigo_tributacao: xml.nfeProc?.NFe?.infNFe?.emit?.idEstrangeiro || '',
        inscricao_municipal: xml.nfeProc?.NFe?.infNFe?.emit?.IM || '',
        codigo_atividade: xml.nfeProc?.NFe?.infNFe?.emit?.códigoAtividade || '',
        codigo_status: xml.nfeProc?.protNFe?.infProt?.cStat || '',
        descricao_status: xml.nfeProc?.protNFe?.infProt?.xMotivo || '',
        ultima_atividade: xml.nfeProc?.NFe?.infNFe?.emit?.ultimaAtividade || '',
        status_atividade: xml.nfeProc?.NFe?.infNFe?.emit?.statusAtividade || ''
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
    return <DetalhesNFeInbound 
      chaveAcesso={selectedChaveAcesso} 
      onVoltar={handleVoltar} 
      jsonData={jsonData}
      jsonDataDestinatario={jsonData}
      jsonDataEmissor={jsonData}
      jsonDataEventos={jsonData}
      jsonDataItens={jsonData}
    />;
  }

  return (
    <div className="monitor-nfe-container" style={{ transform: 'scale(0.9)', transformOrigin: 'top left' }}>
      <UploadXML onProcessXML={handleProcessXML} />
      <FiltroNFeInbound onButtonClick={handleFiltroSubmit} />
      <div style={{ marginBottom: '15px' }}>
        <Cascader options={options} onChange={(value) => console.log(value)} placeholder="Visão" style={{width: 70}}/>
        <Dropdown menu={{ items: etapasProcessoItems }} >
          <a onClick={(e) => e.preventDefault()}>
            <Space style={{ color: '#6e99cc', backgroundColor: '#F8F7FF', marginLeft: 10, border: '1px solid #6e99cc' , padding: '5px 10px'}}>
              Etapas do Processo inbound
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
        <Button style={{color: '#6e99cc', backgroundColor: '#F8F7FF', borderColor: '#6e99cc', borderRadius: 0, marginLeft: 10}}>Selecionar Detalhes</Button>
        <Button style={{ color: '#6e99cc', backgroundColor: '#F8F7FF', borderColor: '#6e99cc', borderRadius: 0, marginLeft: 10 }}>Entrar DANFE</Button>
        <Dropdown menu={{ items }} >
          <a onClick={(e) => e.preventDefault()}>
            <Space style={{ color: '#6e99cc',backgroundColor:'#F8F7FF' , marginLeft: 10, border: '1px solid #6e99cc' , padding: '5px 10px'}}>
              Outras Funções
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
        <Button style={{ color: '#6e99cc', backgroundColor: '#F8F7FF', borderColor: '#6e99cc', borderRadius: 0, marginLeft: 10 }}>Versão de impressão</Button>
        <Dropdown menu={{ items: optionsExportacao }} >
          <a onClick={(e) => e.preventDefault()}>
            <Space style={{ color: '#6e99cc', backgroundColor: '#F8F7FF', marginLeft: 10, border: '1px solid #6e99cc' , padding: '5px 10px'}}>
              Exportação
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
      <TabelaNFeInbound jsonData={jsonData} onChaveAcessoClick={handleChaveAcessoClick} />
    </div>
  );
};

export default MonitorNFeInbound; 