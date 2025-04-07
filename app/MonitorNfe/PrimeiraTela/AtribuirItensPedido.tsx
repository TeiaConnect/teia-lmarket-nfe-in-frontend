'use client';

import React, { useState, useEffect } from 'react';
import { Button, Table, Space, message, Dropdown, Modal, Tabs } from 'antd';
import { EyeOutlined, FileTextOutlined, DownOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { FaFileCode, FaFileInvoice, FaCheck, FaTimes, FaSync, FaPlayCircle, FaBalanceScale, FaRegistered, FaSearch, FaFilter, FaCog } from 'react-icons/fa';
import type { ColumnsType } from 'antd/es/table';
import type { MenuProps } from 'antd';
import './AtribuirItensPedido.css';

interface ItemNFe {
  key: string;
  numero: string;
  categoria: string;
  quantidade: number;
  unidade: string;
  codigoMaterial: string;
  descricao: string;
}

interface ItemPedido {
  key: string;
  numeroPedido: string;
  itemPedido: string;
  codigoMaterialERP: string;
  descricaoMaterialERP: string;
  quantidadePedido: number;
  unidadeMedidaERP: string;
}

interface ItemAtribuido {
  key: string;
  categoria: string;
  quantidadeNFe: number;
  unidadeMedida: string;
  codigoMaterialNFe: string;
  descricaoProduto: string;
  numeroPedido: string;
  itemPedido: string;
  quantidadeConvertida: number;
  unidadeMedidaERP: string;
  codigoMaterialERP: string;
  descricaoMaterialERP: string;
}

export interface AtribuirItensPedidoProps {
  chaveAcesso?: string;
}

const AtribuirItensPedido: React.FC<AtribuirItensPedidoProps> = ({ chaveAcesso }) => {
  const [activeTab, setActiveTab] = useState('1');
  const [modalActiveTab, setModalActiveTab] = useState('1');
  const [itensNFe, setItensNFe] = useState<ItemNFe[]>([]);
  const [itensPedido, setItensPedido] = useState<ItemPedido[]>([]);
  const [itensAtribuidos, setItensAtribuidos] = useState<ItemAtribuido[]>([]);
  const [detalhesNFe, setDetalhesNFe] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSimulacaoXmlVisible, setIsSimulacaoXmlVisible] = useState(false);

  useEffect(() => {
    if (chaveAcesso) {
      const carregarDadosNFe = async () => {
        try {
          console.log('Buscando dados da NF-e com chave:', chaveAcesso);
          const response = await fetch(`/api/nfe/inbound?chNFe=${chaveAcesso}`);
          const data = await response.json();
          
          console.log('Dados recebidos:', data);
          
          if (data && data.length > 0) {
            const nfe = data.find((item: any) => 
              item.nfeProc?.protNFe?.infProt?.chNFe === chaveAcesso
            );
            
            console.log('NF-e encontrada:', nfe);
            
            if (nfe?.nfeProc?.NFe?.infNFe?.det) {
              const itens = Array.isArray(nfe.nfeProc.NFe.infNFe.det) 
                ? nfe.nfeProc.NFe.infNFe.det 
                : [nfe.nfeProc.NFe.infNFe.det];

              const itensFormatados: ItemNFe[] = itens.map((item: any, index: number) => ({
                key: String(index + 1),
                numero: item.prod.cProd || '',
                categoria: item.prod.xProd || '',
                quantidade: Number(item.prod.qCom) || 0,
                unidade: item.prod.uCom || '',
                codigoMaterial: item.prod.cProd || '',
                descricao: item.prod.xProd || ''
              }));

              console.log('Itens formatados:', itensFormatados);
              setItensNFe(itensFormatados);
            } else {
              console.log('Nenhum item encontrado na NF-e');
              setItensNFe([]);
            }
          } else {
            console.log('Nenhuma NF-e encontrada');
            setItensNFe([]);
          }
        } catch (error) {
          console.error('Erro ao carregar dados da NF-e:', error);
          setItensNFe([]);
        }
      };

      carregarDadosNFe();
    }
  }, [chaveAcesso]);

  const colunasNFe: ColumnsType<ItemNFe> = [
    {
      title: 'Nº do item',
      dataIndex: 'numero',
      key: 'numero',
      width: 80,
    },
    {
      title: 'Categoria do item',
      dataIndex: 'categoria',
      key: 'categoria',
      width: 120,
    },
    {
      title: 'Quantidade',
      dataIndex: 'quantidade',
      key: 'quantidade',
      width: 100,
      align: 'right',
    },
    {
      title: 'Unidade',
      dataIndex: 'unidade',
      key: 'unidade',
      width: 80,
    },
    {
      title: 'Nº de material',
      dataIndex: 'codigoMaterial',
      key: 'codigoMaterial',
      width: 120,
    },
    {
      title: 'Descrição',
      dataIndex: 'descricao',
      key: 'descricao',
      width: 300,
    }
  ];

  const colunasPedido: ColumnsType<ItemPedido> = [
    {
      title: 'Nº do pedido',
      dataIndex: 'numeroPedido',
      key: 'numeroPedido',
      width: 120,
    },
    {
      title: 'Item do pedido',
      dataIndex: 'itemPedido',
      key: 'itemPedido',
      width: 100,
    },
    {
      title: 'ERP nº de material',
      dataIndex: 'codigoMaterialERP',
      key: 'codigoMaterialERP',
      width: 150,
    },
    {
      title: 'ERP texto breve material',
      dataIndex: 'descricaoMaterialERP',
      key: 'descricaoMaterialERP',
      width: 300,
    },
    {
      title: 'Quantidade do pedido',
      dataIndex: 'quantidadePedido',
      key: 'quantidadePedido',
      width: 140,
      align: 'right',
    },
    {
      title: 'ERP unidade de medida',
      dataIndex: 'unidadeMedidaERP',
      key: 'unidadeMedidaERP',
      width: 150,
    }
  ];

  const colunasAtribuidos: ColumnsType<ItemAtribuido> = [
    {
      title: 'Categoria do item',
      dataIndex: 'categoria',
      key: 'categoria',
      width: 120,
    },
    {
      title: 'Quantidade NF-e',
      dataIndex: 'quantidadeNFe',
      key: 'quantidadeNFe',
      width: 120,
      align: 'right',
    },
    {
      title: 'Unidade de medida',
      dataIndex: 'unidadeMedida',
      key: 'unidadeMedida',
      width: 130,
    },
    {
      title: 'Nº de material NF-e',
      dataIndex: 'codigoMaterialNFe',
      key: 'codigoMaterialNFe',
      width: 140,
    },
    {
      title: 'Descrição do produto',
      dataIndex: 'descricaoProduto',
      key: 'descricaoProduto',
      width: 300,
    },
    {
      title: 'Nº do pedido',
      dataIndex: 'numeroPedido',
      key: 'numeroPedido',
      width: 120,
    },
    {
      title: 'Item do pedido',
      dataIndex: 'itemPedido',
      key: 'itemPedido',
      width: 100,
    },
    {
      title: 'Qtd.NF-e convertida',
      dataIndex: 'quantidadeConvertida',
      key: 'quantidadeConvertida',
      width: 140,
      align: 'right',
    },
    {
      title: 'ERP unidade de medida',
      dataIndex: 'unidadeMedidaERP',
      key: 'unidadeMedidaERP',
      width: 150,
    },
    {
      title: 'ERP nº de material',
      dataIndex: 'codigoMaterialERP',
      key: 'codigoMaterialERP',
      width: 140,
    },
    {
      title: 'ERP texto breve do material',
      dataIndex: 'descricaoMaterialERP',
      key: 'descricaoMaterialERP',
      width: 300,
    }
  ];

  const buttonStyle = {
    color: '#6e99cc',
    backgroundColor: '#F8F7FF',
    borderColor: '#6e99cc',
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

  const buttonGroupStyle = {
    display: 'flex',
    gap: '0',
    border: '1px solid #6e99cc',
    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    overflow: 'hidden',
    backgroundColor: '#ffffff'
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'Procurar Pedido',
      icon: <FaSearch />
    },
    {
      key: '2',
      label: 'Procurar Pedido e Item',
      icon: <FaSearch />
    },
    {
      key: '3',
      label: 'Pesquisa Ampliada',
      icon: <FaSearch />
    }
  ];

  const handleChaveAcessoClick = async (chaveAcesso: string) => {
    try {
      const response = await fetch(`/api/nfe/inbound?chNFe=${chaveAcesso}`);
      const data = await response.json();
      
      if (data && data.length > 0) {
        const nfe = data.find((item: any) => 
          item.nfeProc?.protNFe?.infProt?.chNFe === chaveAcesso
        );
        
        if (nfe) {
          setDetalhesNFe(nfe);
          setIsModalVisible(true);
        } else {
          message.error('NF-e não encontrada');
        }
      }
    } catch (error) {
      console.error('Erro ao carregar detalhes da NF-e:', error);
      message.error('Erro ao carregar detalhes da NF-e');
    }
  };

  const handleSimularXml = () => {
    setIsSimulacaoXmlVisible(true);
  };

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  const handleModalTabChange = (key: string) => {
    setModalActiveTab(key);
  };

  const ValoresContent = () => (
    <div className="sap-values-section">
      <div className="sap-values-row">
        <div className="sap-values-field">
          <span className="sap-values-label">Valor Total:</span>
          <span className="sap-values-value">R$ 1.234,56</span>
        </div>
        <div className="sap-values-field">
          <span className="sap-values-label">Base ICMS:</span>
          <span className="sap-values-value">R$ 1.000,00</span>
        </div>
        <div className="sap-values-field">
          <span className="sap-values-label">Valor ICMS:</span>
          <span className="sap-values-value">R$ 180,00</span>
        </div>
      </div>
      <div className="sap-values-row">
        <div className="sap-values-field">
          <span className="sap-values-label">Valor Produtos:</span>
          <span className="sap-values-value">R$ 1.200,00</span>
        </div>
        <div className="sap-values-field">
          <span className="sap-values-label">Valor Frete:</span>
          <span className="sap-values-value">R$ 34,56</span>
        </div>
        <div className="sap-values-field">
          <span className="sap-values-label">Valor Seguro:</span>
          <span className="sap-values-value">R$ 0,00</span>
        </div>
      </div>
    </div>
  );

  const ImpostosContent = () => (
    <div className="sap-taxes-section">
      <div className="sap-taxes-row">
        <div className="sap-taxes-field">
          <span className="sap-taxes-label">ICMS:</span>
          <span className="sap-taxes-value">18%</span>
        </div>
        <div className="sap-taxes-field">
          <span className="sap-taxes-label">IPI:</span>
          <span className="sap-taxes-value">5%</span>
        </div>
        <div className="sap-taxes-field">
          <span className="sap-taxes-label">PIS:</span>
          <span className="sap-taxes-value">1,65%</span>
        </div>
        <div className="sap-taxes-field">
          <span className="sap-taxes-label">COFINS:</span>
          <span className="sap-taxes-value">7,6%</span>
        </div>
      </div>
      <div className="sap-taxes-row">
        <div className="sap-taxes-field">
          <span className="sap-taxes-label">CST ICMS:</span>
          <span className="sap-taxes-value">00</span>
        </div>
        <div className="sap-taxes-field">
          <span className="sap-taxes-label">CST IPI:</span>
          <span className="sap-taxes-value">50</span>
        </div>
        <div className="sap-taxes-field">
          <span className="sap-taxes-label">CST PIS:</span>
          <span className="sap-taxes-value">01</span>
        </div>
        <div className="sap-taxes-field">
          <span className="sap-taxes-label">CST COFINS:</span>
          <span className="sap-taxes-value">01</span>
        </div>
      </div>
    </div>
  );

  const tableProps = {
    dataSource: [],
    columns: [],
    pagination: false as const,
    scroll: { y: 'calc(100% - 8px)', x: 'max-content' },
    size: 'small' as const
  };

  const mainTabItems = [
    {
      label: 'Itens',
      key: '1',
      children: <Table {...tableProps} />
    },
    {
      label: 'Valores totais',
      key: '2',
      children: <ValoresContent />
    },
    {
      label: 'Valores',
      key: '3',
      children: <ValoresContent />
    },
    {
      label: 'Impostos',
      key: '4',
      children: <ImpostosContent />
    }
  ];

  const modalTabItems = [
    {
      label: 'Valores',
      key: '1',
      children: <ValoresContent />
    },
    {
      label: 'Impostos',
      key: '2',
      children: <ImpostosContent />
    }
  ];

  return (
    <div style={{ 
      width: '100%',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#f0f0f0',
      padding: '0',
      margin: '0'
    }}>
      <div style={{
        padding: '4px 8px',
        backgroundColor: '#fff',
        borderBottom: '1px solid #ccc',
        display: 'flex',
        gap: '4px',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', gap: '4px' }}>
          <Button 
            size="small"
            icon={<FaCheck style={{ fontSize: '11px' }} />}
            className="sap-button"
          >
            Gravar atribuições
          </Button>
          <Button 
            size="small"
            icon={<FaSync style={{ fontSize: '11px' }} />}
            className="sap-button"
          >
            Reinicializar
          </Button>
        </div>
        <div style={{ display: 'flex', gap: '4px' }}>
          <Button 
            size="small"
            icon={<FaFileCode style={{ fontSize: '11px' }} />}
            className="sap-button"
            onClick={handleSimularXml}
          >
            Simular XML
          </Button>
          <Button 
            size="small"
            icon={<FaFileInvoice style={{ fontSize: '11px' }} />}
            className="sap-button"
          >
            Simular Fatura
          </Button>
          <Button 
            size="small"
            icon={<FaBalanceScale style={{ fontSize: '11px' }} />}
            className="sap-button"
          >
            Contagem
          </Button>
        </div>
      </div>

      <div className="sap-header">
        <div className="sap-header-row">
          <div>
            <span className="sap-header-label">CNPJ do emissor da NF-e: </span>
            <span className="sap-header-value">{detalhesNFe?.nfeProc?.NFe?.infNFe?.emit?.CNPJ}</span>
          </div>
          <div>
            <span className="sap-header-label">Nome do emissor da NF-e: </span>
            <span className="sap-header-value">{detalhesNFe?.nfeProc?.NFe?.infNFe?.emit?.xNome}</span>
          </div>
        </div>
        <div className="sap-header-row">
          <div>
            <span className="sap-header-label">CNPJ/CPF do destinatário da NF-e: </span>
            <span className="sap-header-value">{detalhesNFe?.nfeProc?.NFe?.infNFe?.dest?.CNPJ}</span>
          </div>
          <div>
            <span className="sap-header-label">Nome do destinatário NF-e: </span>
            <span className="sap-header-value">{detalhesNFe?.nfeProc?.NFe?.infNFe?.dest?.xNome}</span>
          </div>
        </div>
        <div className="sap-header-row">
          <div>
            <span className="sap-header-label">Valor total inclusive impostos: </span>
            <span className="sap-header-value">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(detalhesNFe?.nfeProc?.NFe?.infNFe?.total?.ICMSTot?.vNF) || 0)}
            </span>
          </div>
        </div>
      </div>

      <div style={{
        padding: '0 8px',
        backgroundColor: '#fff',
        borderBottom: '1px solid #ccc',
        display: 'flex',
        gap: '1px'
      }}>
        <Tabs
          type="card"
          items={[
            { label: 'Pesquisa baseada no item', key: '1' },
            { label: 'Pesquisa global', key: '2' }
          ]}
          style={{
            marginBottom: 0
          }}
          className="atribuir-itens-tabs"
          activeKey={activeTab}
          onChange={handleTabChange}
          destroyInactiveTabPane
        />
      </div>

      <div style={{ 
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '1px',
        backgroundColor: '#f0f0f0',
        overflow: 'hidden',
        minHeight: 0,
        position: 'relative'
      }}>
        <div style={{ 
          display: 'flex',
          gap: '1px',
          flex: 1,
          minHeight: 0
        }}>
          <div style={{ 
            flex: '0 0 50%',
            backgroundColor: '#fff',
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
            maxWidth: '50%'
          }}>
            <div className="sap-section-title">
              <span>Itens NF-e pendentes</span>
              <div style={{ marginLeft: 'auto', display: 'flex', gap: '4px' }}>
                <Button 
                  size="small"
                  icon={<FaRegistered style={{ fontSize: '11px' }} />}
                  className="sap-button-compact"
                >
                  MIGO/MIRO
                </Button>
                <Button 
                  size="small"
                  icon={<EyeOutlined style={{ fontSize: '11px' }} />}
                  className="sap-button-compact"
                  onClick={() => chaveAcesso && handleChaveAcessoClick(chaveAcesso)}
                >
                  Exibir XML
                </Button>
                <Button 
                  size="small"
                  icon={<FileTextOutlined style={{ fontSize: '11px' }} />}
                  className="sap-button-compact"
                >
                  Exibir DANFE
                </Button>
              </div>
            </div>
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <Table
                columns={colunasNFe}
                dataSource={itensNFe}
                size="small"
                pagination={false}
                scroll={{ y: 'calc(100% - 8px)', x: 'max-content' }}
                rowSelection={{
                  type: 'radio',
                  onChange: (selectedRowKeys, selectedRows) => {
                    console.log('selectedRowKeys:', selectedRowKeys);
                    console.log('selectedRows:', selectedRows);
                  }
                }}
                className="atribuir-itens-table"
              />
            </div>
          </div>

          <div style={{ 
            flex: '0 0 50%',
            backgroundColor: '#fff',
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
            maxWidth: '50%'
          }}>
            <div className="sap-section-title" style={{ justifyContent: 'space-between' }}>
              <span>Itens do pedido disponíveis</span>
              <Dropdown menu={{ items }} placement="bottomRight">
                <Button 
                  size="small"
                  icon={<FaSearch style={{ fontSize: '11px' }} />}
                  className="sap-dropdown-button"
                >
                  Procurar itens de Pedido <DownOutlined style={{ fontSize: '10px', marginLeft: '4px' }} />
                </Button>
              </Dropdown>
            </div>
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <Table
                columns={colunasPedido}
                dataSource={itensPedido}
                size="small"
                pagination={false}
                scroll={{ y: 'calc(100% - 8px)', x: 'max-content' }}
                rowSelection={{
                  type: 'radio',
                  onChange: (selectedRowKeys, selectedRows) => {
                    console.log('selectedRowKeys:', selectedRowKeys);
                    console.log('selectedRows:', selectedRows);
                  }
                }}
                className="atribuir-itens-table"
              />
            </div>
          </div>
        </div>

        <div style={{ 
          backgroundColor: '#fff',
          display: 'flex',
          flexDirection: 'column',
          height: '35%',
          minHeight: '200px',
          maxHeight: '400px',
          position: 'relative'
        }}>
          <div className="sap-section-title" style={{ justifyContent: 'space-between' }}>
            <span>Itens NF-e atribuídos</span>
            <Button 
              size="small"
              icon={<FaTimes style={{ fontSize: '11px' }} />}
              className="sap-button"
            >
              Anular atribuição
            </Button>
          </div>
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <Table
              columns={colunasAtribuidos}
              dataSource={itensAtribuidos}
              size="small"
              pagination={false}
              scroll={{ y: 'calc(100% - 8px)', x: 'max-content' }}
              className="atribuir-itens-table"
            />
          </div>
        </div>
      </div>

      <Modal
        title="Detalhes da NF-e"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        width={800}
        footer={null}
      >
        {detalhesNFe && (
          <div style={{ padding: '20px' }}>
            <h4>Informações Gerais</h4>
            <p><strong>Chave de Acesso:</strong> {detalhesNFe.nfeProc?.protNFe?.infProt?.chNFe}</p>
            <p><strong>Número:</strong> {detalhesNFe.nfeProc?.NFe?.infNFe?.ide?.nNF}</p>
            <p><strong>Série:</strong> {detalhesNFe.nfeProc?.NFe?.infNFe?.ide?.serie}</p>
            <p><strong>Data Emissão:</strong> {detalhesNFe.nfeProc?.NFe?.infNFe?.ide?.dhEmi}</p>
            
            <h4 style={{ marginTop: '20px' }}>Emitente</h4>
            <p><strong>CNPJ:</strong> {detalhesNFe.nfeProc?.NFe?.infNFe?.emit?.CNPJ}</p>
            <p><strong>Nome:</strong> {detalhesNFe.nfeProc?.NFe?.infNFe?.emit?.xNome}</p>
            <p><strong>Inscrição Estadual:</strong> {detalhesNFe.nfeProc?.NFe?.infNFe?.emit?.IE}</p>
            
            <h4 style={{ marginTop: '20px' }}>Destinatário</h4>
            <p><strong>CNPJ:</strong> {detalhesNFe.nfeProc?.NFe?.infNFe?.dest?.CNPJ}</p>
            <p><strong>Nome:</strong> {detalhesNFe.nfeProc?.NFe?.infNFe?.dest?.xNome}</p>
            
            <h4 style={{ marginTop: '20px' }}>Totais</h4>
            <p><strong>Valor Total:</strong> R$ {detalhesNFe.nfeProc?.NFe?.infNFe?.total?.ICMSTot?.vNF}</p>
            <p><strong>Base de Cálculo ICMS:</strong> R$ {detalhesNFe.nfeProc?.NFe?.infNFe?.total?.ICMSTot?.vBC}</p>
            <p><strong>Valor ICMS:</strong> R$ {detalhesNFe.nfeProc?.NFe?.infNFe?.total?.ICMSTot?.vICMS}</p>
          </div>
        )}
      </Modal>

      <Modal
        title={
          <div className="sap-modal-title">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontFamily: 'Arial', fontWeight: 'normal' }}>
                Simular itens do pedido: 33110811663724000131550010000200501271045599
              </span>
              <Button 
                size="small" 
                className="sap-help-button"
              >
                Ajuda
              </Button>
            </div>
          </div>
        }
        open={isSimulacaoXmlVisible}
        onCancel={() => setIsSimulacaoXmlVisible(false)}
        width={1200}
        className="sap-simulacao-modal"
        footer={
          <div className="sap-modal-footer">
            <div className="sap-button-group">
              <Button 
                size="small" 
                className="sap-button" 
                icon={<FaSync style={{ fontSize: '11px' }} />}
              >
                Voltar
              </Button>
              <Button 
                size="small" 
                className="sap-button" 
                icon={<FaSync style={{ fontSize: '11px' }} />}
              >
                Voltar para síntese
              </Button>
              <Button 
                size="small" 
                className="sap-button" 
                icon={<FaCheck style={{ fontSize: '11px' }} />}
              >
                Gravar parâmetros
              </Button>
              <Button 
                size="small" 
                className="sap-button" 
                icon={<FaPlayCircle style={{ fontSize: '11px' }} />}
              >
                Executar simulação
              </Button>
            </div>
          </div>
        }
      >
        <div className="sap-simulacao-content">
          <div className="sap-info-section">
            <div className="sap-info-row">
              <div className="sap-info-field">
                <span className="sap-info-label">Ctn proc.:</span>
                <span className="sap-info-value">NF-e para pedido normal</span>
              </div>
            </div>
            <div className="sap-info-row">
              <div className="sap-info-field">
                <span className="sap-info-label">Nº CNPJ do emissor da NF-e:</span>
                <span className="sap-info-value">11663724000131</span>
              </div>
              <div className="sap-info-field">
                <span className="sap-info-label">Nome do emissor da NF-e:</span>
                <span className="sap-info-value">Consorcio Techint-Andrade Gutierrez (TE-AG)</span>
              </div>
              <div className="sap-info-field">
                <span className="sap-info-label">Nº CNPJ/CPF do recebedor da NF-e:</span>
                <span className="sap-info-value">99999999000191</span>
              </div>
            </div>
            <div className="sap-info-row">
              <div className="sap-info-field">
                <span className="sap-info-label">Nome do destinat.NF-e:</span>
                <span className="sap-info-value">NF-E EMITIDA EM AMBIENTE DE HOMOLOGACAO - SEM VALOR FISCAL</span>
              </div>
              <div className="sap-info-field">
                <span className="sap-info-label">Valor total incl.impostos:</span>
                <span className="sap-info-value">2721.70</span>
              </div>
            </div>
            <div className="sap-warning">
              <span className="sap-warning-icon">⚠</span>
              <span className="sap-warning-text">Saldo não é igual a zero: 0,39- Débito: 2.722,09 Crédito: 2.721,70 - Exibir ajuda</span>
            </div>
          </div>

          <div className="sap-tabs-section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 8px' }}>
              <Tabs
                type="card"
                items={mainTabItems}
                className="atribuir-itens-tabs"
                activeKey={activeTab}
                onChange={handleTabChange}
                destroyInactiveTabPane
              />
              <div style={{ display: 'flex', gap: '4px', marginLeft: 'auto', marginRight: '4px' }}>
                <Button 
                  size="small" 
                  className="sap-icon-button"
                  icon={<FaFilter style={{ fontSize: '11px' }} />}
                />
                <Button 
                  size="small" 
                  className="sap-icon-button"
                  icon={<FaCog style={{ fontSize: '11px' }} />}
                />
              </div>
            </div>
          </div>

          <div className="sap-table-section">
            <Table
              columns={[
                { 
                  title: 'Nº do item', 
                  dataIndex: 'numero', 
                  width: 80,
                  render: (text) => <span style={{ fontFamily: 'Courier New, monospace' }}>{text}</span>
                },
                { 
                  title: 'Nº do pedido', 
                  dataIndex: 'pedido', 
                  width: 120,
                  render: (text) => <span style={{ fontFamily: 'Courier New, monospace' }}>{text}</span>
                },
                { 
                  title: 'Item do pedido', 
                  dataIndex: 'itemPedido', 
                  width: 100,
                  render: (text) => <span style={{ fontFamily: 'Courier New, monospace' }}>{text}</span>
                },
                { 
                  title: 'Qtd.NF-e convertida', 
                  dataIndex: 'quantidade', 
                  width: 120, 
                  align: 'right',
                  render: (text) => <span style={{ fontFamily: 'Courier New, monospace' }}>{text}</span>
                },
                { 
                  title: 'Unidade de pedido', 
                  dataIndex: 'unidade', 
                  width: 120 
                },
                { 
                  title: 'Pedido - nº de material', 
                  dataIndex: 'material', 
                  width: 150,
                  render: (text) => <span style={{ fontFamily: 'Courier New, monospace' }}>{text}</span>
                },
                { 
                  title: 'Pedido - texto breve', 
                  dataIndex: 'descricao', 
                  width: 300 
                },
                { 
                  title: 'CFOP', 
                  dataIndex: 'cfop', 
                  width: 80,
                  render: (text) => <span style={{ fontFamily: 'Courier New, monospace' }}>{text}</span>
                },
                { 
                  title: 'Cód.imposto', 
                  dataIndex: 'codImposto', 
                  width: 100,
                  render: (text) => <span style={{ fontFamily: 'Courier New, monospace' }}>{text}</span>
                }
              ]}
              dataSource={[
                {
                  key: '1',
                  numero: '1',
                  pedido: '4500210636',
                  itemPedido: '10',
                  quantidade: '36',
                  unidade: 'CDA',
                  material: '0290-B-2315-06 B',
                  descricao: 'PETROCHEMICAL NAPHTHA PUMP-B',
                  cfop: '2102AA',
                  codImposto: 'Z3'
                }
              ]}
              size="small"
              pagination={false}
              className="atribuir-itens-table"
              scroll={{ y: '200px', x: 'max-content' }}
              rowSelection={{
                type: 'radio',
                columnWidth: 28,
                selectedRowKeys: ['1']
              }}
            />
          </div>

          <div className="sap-bottom-tabs">
            <Tabs
              type="card"
              items={modalTabItems}
              className="modal-tabs"
              activeKey={modalActiveTab}
              onChange={handleModalTabChange}
              destroyInactiveTabPane
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AtribuirItensPedido;