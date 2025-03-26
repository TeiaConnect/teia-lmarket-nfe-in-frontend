'use client';

import React, { useState, useEffect } from 'react';
import FiltroNFeInbound from './FiltroNFeInbound';
import TabelaNFeInbound from './TabelaNFeInbound';
import DetalhesNFeInbound from './DetalhesNFeInbound';
import UploadXML from './UploadXML';
import { message, Button, Dropdown, Space, Cascader } from 'antd';
import { DownOutlined, FileTextOutlined, FileExcelOutlined, PrinterOutlined, ReloadOutlined, DeleteOutlined, PlusOutlined, EyeOutlined, HistoryOutlined, SettingOutlined } from '@ant-design/icons';
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

  const handleFiltroSubmit = async (values: any) => {
    try {
      setLoading(true);
      console.log('Iniciando busca com valores:', values);
      
      const params = new URLSearchParams();
      if (values.chNFe) params.append('chNFe', values.chNFe);
      if (values.cnpj_emissor) params.append('cnpj_emissor', values.cnpj_emissor);
      if (values.data_inicio) params.append('data_inicio', values.data_inicio);
      if (values.data_fim) params.append('data_fim', values.data_fim);

      console.log('Fazendo requisição para:', `/api/nfe/inbound?${params.toString()}`);
      const response = await fetch(`/api/nfe/inbound?${params.toString()}`);
      const data = await response.json();
      
      console.log('Dados brutos recebidos:', data);
      
      if (!Array.isArray(data)) {
        console.error('Resposta não é um array:', data);
        throw new Error('Formato de resposta inválido');
      }

      const notasFiscais = data.map(doc => {
        try {
          const nfe = doc.nfeProc?.NFe?.infNFe;
          const protNFe = doc.nfeProc?.protNFe?.infProt;
          
          if (!nfe || !protNFe) {
            console.error('Documento inválido - campos obrigatórios ausentes:', doc);
            return null;
          }

          return {
            identificacao_nfe: {
              tipo_emissao: nfe.ide.tpEmis || '',
              codigo_status: protNFe.cStat || '',
              numero_nfe: nfe.ide.nNF || '',
              serie: nfe.ide.serie || '',
              data_hora_emissao: nfe.ide.dhEmi || ''
            },
            emissor: {
              cnpj: nfe.emit.CNPJ || '',
              codigo_uf: nfe.emit.enderEmit?.UF || '',
              status: protNFe.xMotivo || '',
              ultima_atividade: doc.created_at || '',
              status_atividade: protNFe.cStat || '',
              codigo_status: protNFe.cStat || '',
              descricao_status: protNFe.xMotivo || '',
              codigo_mensagem: protNFe.cStat || '',
              mensagem_sefaz: protNFe.xMotivo || '',
              inscricao_estadual: nfe.emit.IE || '',
              nome_emissor: nfe.emit.xNome || '',
              nome_empresa: nfe.emit.xNome || '',
              nome_comercio: nfe.emit.xFant || '',
              rua: nfe.emit.enderEmit?.xLgr || '',
              complemento: nfe.emit.enderEmit?.xCpl || '',
              bairro: nfe.emit.enderEmit?.xBairro || '',
              numero: nfe.emit.enderEmit?.nro || '',
              codigo_postal: nfe.emit.enderEmit?.CEP || '',
              codigo_cidade: nfe.emit.enderEmit?.cMun || '',
              nome_cidade: nfe.emit.enderEmit?.xMun || '',
              uf: nfe.emit.enderEmit?.UF || '',
              chave_pais: nfe.emit.enderEmit?.cPais || '',
              nome_pais: nfe.emit.enderEmit?.xPais || '',
              telefone: nfe.emit.enderEmit?.fone || '',
              codigo_tributacao: nfe.emit.CRT || '',
              inscricao_municipal: nfe.emit.IM || '',
              codigo_atividade: nfe.emit.CNAE || ''
            },
            destinatario: {
              cnpj: nfe.dest.CNPJ || ''
            },
            referencia_nfe: {
              chave_acesso: protNFe.chNFe || ''
            },
            ambiente: protNFe.tpAmb || '',
            codigo_mensagem: protNFe.cStat || '',
            mensagem_sefaz: protNFe.xMotivo || '',
            inscricao_estadual: nfe.emit.IE || '',
            nome_emissor: nfe.emit.xNome || '',
            nome_empresa: nfe.emit.xNome || '',
            nome_comercio: nfe.emit.xFant || '',
            rua: nfe.emit.enderEmit?.xLgr || '',
            complemento: nfe.emit.enderEmit?.xCpl || '',
            bairro: nfe.emit.enderEmit?.xBairro || '',
            numero: nfe.emit.enderEmit?.nro || '',
            codigo_postal: nfe.emit.enderEmit?.CEP || '',
            codigo_cidade: nfe.emit.enderEmit?.cMun || '',
            nome_cidade: nfe.emit.enderEmit?.xMun || '',
            uf: nfe.emit.enderEmit?.UF || '',
            chave_pais: nfe.emit.enderEmit?.cPais || '',
            nome_pais: nfe.emit.enderEmit?.xPais || '',
            telefone: nfe.emit.enderEmit?.fone || '',
            codigo_tributacao: nfe.emit.CRT || '',
            inscricao_municipal: nfe.emit.IM || '',
            codigo_atividade: nfe.emit.CNAE || '',
            codigo_status: protNFe.cStat || '',
            descricao_status: protNFe.xMotivo || '',
            ultima_atividade: doc.created_at || '',
            status_atividade: protNFe.cStat || ''
          };
        } catch (error) {
          console.error('Erro ao mapear documento:', error);
          return null;
        }
      }).filter(Boolean);
      console.log('Notas fiscais mapeadas:', notasFiscais);
      setJsonData({ notas_fiscais: notasFiscais as any }); // Forçando o tipo any temporariamente
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
      
      <div style={{ 
        marginBottom: '15px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
        alignItems: 'center',
        padding: '10px',
        backgroundColor: '#f5f5f5',
        borderRadius: '4px'
      }}>
        {/* Grupo de Visão e Processo */}
        <div style={buttonGroupStyle}>
          <Cascader 
            options={options} 
            onChange={(value) => console.log(value)} 
            placeholder="Visão" 
            style={{width: 100}}
          />
          <Dropdown menu={{ items: etapasProcessoItems }}>
            <Button icon={<SettingOutlined />} style={buttonStyle}>
              Etapas do Processo
            </Button>
          </Dropdown>
        </div>

        {/* Grupo de Simulação e Contagem */}
        <div style={buttonGroupStyle}>
          <Button icon={<FileTextOutlined />} style={buttonStyle}>
            Simular XML
          </Button>
          <Button icon={<FileExcelOutlined />} style={buttonStyle}>
            Simular Fatura
          </Button>
          <Button icon={<ReloadOutlined />} style={buttonStyle}>
            Entrar Contagem
          </Button>
        </div>

        {/* Grupo de Registro e Visualização */}
        <div style={buttonGroupStyle}>
          <Button icon={<PrinterOutlined />} style={buttonStyle}>
            Registrar MIGO/MIRO
          </Button>
          <Button icon={<EyeOutlined />} style={buttonStyle}>
            Exibir XML
          </Button>
          <Button icon={<FileTextOutlined />} style={buttonStyle}>
            Exibir DANFE
          </Button>
        </div>

        {/* Grupo de Eventos e XML */}
        <div style={buttonGroupStyle}>
          <Button icon={<HistoryOutlined />} style={buttonStyle}>
            Eventos
          </Button>
          <Button icon={<PlusOutlined />} style={buttonStyle}>
            Incluir XML
          </Button>
          <Button icon={<DeleteOutlined />} style={buttonStyle}>
            Excluir XML
          </Button>
        </div>

        {/* Grupo de Processos */}
        <div style={buttonGroupStyle}>
          <Button style={buttonStyle}>
            Redeterminar Processo
          </Button>
          <Dropdown menu={{ items }}>
            <Button style={buttonStyle}>
              Outros Processos
            </Button>
          </Dropdown>
        </div>

        {/* Grupo de Exportação */}
        <div style={buttonGroupStyle}>
          <Button style={buttonStyle}>
            Versão de impressão
          </Button>
          <Dropdown menu={{ items: optionsExportacao }}>
            <Button style={buttonStyle}>
              Exportação
            </Button>
          </Dropdown>
        </div>
      </div>
      <TabelaNFeInbound 
        jsonData={{
          notas_fiscais: jsonData?.notas_fiscais?.map(nota => ({
            ...nota,
            dataHoraEmissao: nota.identificacao_nfe?.numero_nfe
          })) || []
        }}
        onChaveAcessoClick={handleChaveAcessoClick}
      />
    </div>
  );
};

// Estilo comum para os botões
const buttonStyle = {
  color: '#6e99cc',
  backgroundColor: '#F8F7FF',
  borderColor: '#6e99cc',
  borderRadius: 0,
  margin: 0,
  padding: '0 12px',
  height: '32px',
  display: 'flex',
  alignItems: 'center',
  gap: '4px'
};

// Estilo para os grupos de botões
const buttonGroupStyle = {
  display: 'flex',
  gap: '0',
  border: '1px solid #6e99cc',
  borderRadius: '4px',
  overflow: 'hidden'
};

export default MonitorNFeInbound; 