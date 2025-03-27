'use client';

import React, { useState, useEffect } from 'react';
import FiltroNFeInbound from './FiltroNFeInbound';
import TabelaNFeInbound from './TabelaNFeInbound';
import DetalhesNFeInbound from './DetalhesNFeInbound';
import { message, Button, Dropdown, Space, Cascader, Upload } from 'antd';
import { DownOutlined, FileTextOutlined, FileExcelOutlined, PrinterOutlined, ReloadOutlined, DeleteOutlined, PlusOutlined, EyeOutlined, HistoryOutlined, SettingOutlined, UploadOutlined, PlayCircleTwoTone, CheckCircleOutlined, CloseCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { FaBalanceScale, FaFileCode, FaFileInvoice, FaHistory, FaPlayCircle, FaUpload, FaTrash, FaSync } from 'react-icons/fa';
import type { MenuProps } from 'antd';
import { FaRegistered } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import { DataType } from './TabelaNFeInbound';
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

export default function MonitorNFeInbound() {
  const router = useRouter();
  const [selectedRow, setSelectedRow] = useState<DataType | null>(null);
  const [selectedChaveAcesso, setSelectedChaveAcesso] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [jsonData, setJsonData] = useState<NFeData | null>(null);

  const uploadProps = {
    name: 'file',
    multiple: true,
    accept: '.xml',
    beforeUpload: (file: File) => {
      const isXML = file.type === 'text/xml' || file.name.endsWith('.xml');
      if (!isXML) {
        message.error('Apenas arquivos XML são permitidos!');
        return false;
      }
      return true;
    },
    customRequest: async ({ file, onSuccess, onError }: any) => {
      try {
        const reader = new FileReader();
        reader.onload = async (e) => {
          try {
            const xmlContent = e.target?.result as string;
            const response = await fetch('/api/nfe/inbound', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                xml_content: xmlContent,
                created_at: new Date().toISOString()
              }),
            });

            if (!response.ok) {
              throw new Error('Erro ao fazer upload do arquivo');
            }

            const data = await response.json();
            if (data.success) {
              message.success('Arquivo XML processado com sucesso!');
              onSuccess('ok');
              handleFiltroSubmit({});
            } else {
              throw new Error(data.error || 'Erro ao processar XML');
            }
          } catch (error) {
            console.error('Erro ao processar XML:', error);
            message.error('Erro ao processar arquivo XML');
            onError(error);
          }
        };
        reader.readAsText(file);
      } catch (error) {
        console.error('Erro ao ler arquivo:', error);
        message.error('Erro ao ler arquivo');
        onError(error);
      }
    }
  };

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
            key: protNFe.chNFe || '',
            chave_acesso: protNFe.chNFe || '',
            data_hora_emissao: nfe.ide.dhEmi || '',
            identificacao_nfe: {
              tipo_emissao: nfe.ide.tpEmis || '',
              codigo_status: protNFe.cStat || '',
              numero_nfe: nfe.ide.nNF || '',
              serie: nfe.ide.serie || '',
              data_hora_emissao: nfe.ide.dhEmi || ''
            },
            emissor: {
              cnpj: nfe.emit.CNPJ || '',
              codigo_uf: nfe.emit.enderEmit?.UF || ''
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
      setJsonData({ notas_fiscais: notasFiscais });
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      message.error('Erro ao buscar dados. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (codigoStatus: number) => {
    switch (codigoStatus) {
      case 100:
        return <CheckCircleOutlined style={{ color: '#52c41a', fontSize: '16px' }} />;
      case 217:
        return <CloseCircleOutlined style={{ color: '#ff4d4f', fontSize: '16px' }} />;
      default:
        return <ClockCircleOutlined style={{ color: '#faad14', fontSize: '16px' }} />;
    }
  };

  const handleChaveAcessoClick = (chaveAcesso: string) => {
    setSelectedChaveAcesso(Number(chaveAcesso));
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

  const handleAtribuirItensPedido = (chaveAcesso: string) => {
    if (!chaveAcesso) {
      message.error('Selecione uma NF-e para atribuir itens do pedido');
      return;
    }
    router.push(`/MonitorNfe/PrimeiraTela/AtribuirItensPedido?chaveAcesso=${chaveAcesso}`);
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
    <div className="monitor-nfe-container" style={{ 
      width: '100%',
      padding: '5px',
      backgroundColor: '#ffffff',
      maxWidth: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <FiltroNFeInbound onButtonClick={handleFiltroSubmit} />
      
      <div style={{ 
        width: '100%',
        marginBottom: '4px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '4px',
        backgroundColor: '#f5f5f5',
        borderRadius: '4px',
        border: '1px solid #e8e8e8'
      }}>
        <div style={buttonGroupStyle}>
          <Button 
            name="etapasProcesso" 
            icon={<FaPlayCircle/>} 
            style={buttonStyle} 
            title="Atribuir itens do pedido"
            onClick={() => handleAtribuirItensPedido(selectedRow?.chave_acesso || '')}
            disabled={!selectedRow}
          >
            Atribuir itens do pedido
          </Button>
          <Button icon={<FaFileCode />} style={buttonStyle} title="Simular XML">Simular XML</Button>
          <Button icon={<FaFileInvoice />} style={buttonStyle} title="Simular Fatura">Simular Fatura</Button>
          <Button icon={<FaBalanceScale/>} style={buttonStyle} title="Entrar Contagem">Contagem</Button>
        </div>

        <div style={buttonGroupStyle}>
          <Button icon={<FaRegistered/>} style={buttonStyle} title="Registrar MIGO/MIRO">MIGO/MIRO</Button>
          <Button icon={<EyeOutlined />} style={buttonStyle} title="Exibir XML">Exibir XML</Button>
          <Button icon={<FileTextOutlined />} style={buttonStyle} title="Exibir DANFE">Exibir DANFE</Button>
        </div>

        <div style={buttonGroupStyle}>
          <Button icon={<FaHistory/>} style={buttonStyle} title="Eventos">Eventos</Button>
          <Upload
            {...uploadProps}
            showUploadList={false}
            style={{ display: 'inline-block' }}
          >
            <Button icon={<FaUpload/>} style={buttonStyle} title="Incluir XML">Incluir XML</Button>
          </Upload>
          <Button icon={<FaTrash/>} style={buttonStyle} title="Excluir XML">Excluir XML</Button>
        </div>

        <div style={buttonGroupStyle}>
          <Button icon={<FaSync/>} style={buttonStyle} title="Redeterminar Processo">Redeterminar Processo</Button>
          <Dropdown menu={{ items }}>
            <Button icon={<SettingOutlined />} style={buttonStyle} title="Outros Processos">Outros Processos</Button>
          </Dropdown>
        </div>

        <div style={buttonGroupStyle}>
          <Button icon={<PrinterOutlined />} style={buttonStyle} title="Versão de impressão" />
          <Dropdown menu={{ items: optionsExportacao }}>
            <Button icon={<FileExcelOutlined />} style={buttonStyle} title="Exportação" />
          </Dropdown>
        </div>
      </div>
      <div style={{ 
        width: '100%', 
        overflowX: 'auto',
        margin: 0,
        padding: 0,
        fontSize: '12px'
      }}>
        <TabelaNFeInbound 
          onSelectChange={setSelectedRow}
          onChaveAcessoClick={handleChaveAcessoClick}
          jsonData={jsonData?.notas_fiscais || []}
        />
      </div>
    </div>
  );
}

// Estilo comum para os botões
const buttonStyle = {
  color: '#6e99cc',
  backgroundColor: '#F8F7FF',
  borderRadius: 0,
  margin: 0,
  padding: '0 6px',
  height: '26px',
  display: 'flex',
  alignItems: 'center',
  gap: '2px',
  transition: 'all 0.3s ease',
  ':hover': {
    backgroundColor: '#e6f0ff',
    borderColor: '#4a7ab0'
  }
};

// Estilo para os grupos de botões
const buttonGroupStyle = {
  display: 'flex',
  border: '1px solid #6e99cc',
  boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
  overflow: 'hidden',
  backgroundColor: '#ffffff'
};