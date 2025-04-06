'use client';

import React, { useState, useEffect } from 'react';
import { Button, Table, Space, message, Dropdown, Modal, Tabs } from 'antd';
import { EyeOutlined, FileTextOutlined, DownOutlined } from '@ant-design/icons';
import { FaFileCode, FaFileInvoice, FaCheck, FaTimes, FaSync, FaPlayCircle, FaBalanceScale, FaRegistered, FaSearch } from 'react-icons/fa';
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
  // Estado para os dados das tabelas
  const [itensNFe, setItensNFe] = useState<ItemNFe[]>([]);
  const [itensPedido, setItensPedido] = useState<ItemPedido[]>([]);
  const [itensAtribuidos, setItensAtribuidos] = useState<ItemAtribuido[]>([]);
  const [detalhesNFe, setDetalhesNFe] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Carregar dados da NF-e quando a chave de acesso for fornecida
  useEffect(() => {
    if (chaveAcesso) {
      const carregarDadosNFe = async () => {
        try {
          console.log('Buscando dados da NF-e com chave:', chaveAcesso);
          const response = await fetch(`/api/nfe/inbound?chNFe=${chaveAcesso}`);
          const data = await response.json();
          
          console.log('Dados recebidos:', data);
          
          if (data && data.length > 0) {
            // Procura a NF-e pela chave de acesso no protNFe
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

  // Colunas para a tabela de Itens da NF-e
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

  // Colunas para a tabela de Itens do Pedido
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

  // Colunas para a tabela de Itens Atribuídos
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

  // Estilo comum para os botões
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

  // Estilo para os grupos de botões
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
      {/* Barra de botões superior */}
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

      {/* Cabeçalho com informações da NF */}
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

      {/* Barra de ferramentas com tabs */}
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
        />
      </div>

      {/* Container principal */}
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
        {/* Container das tabelas lado a lado */}
        <div style={{ 
          display: 'flex',
          gap: '1px',
          flex: 1,
          minHeight: 0
        }}>
          {/* Tabela de Itens NF-e pendentes */}
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

          {/* Tabela de Itens do pedido disponíveis */}
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

        {/* Tabela de Itens NF-e atribuídos */}
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

      {/* Modal de Detalhes da NF-e */}
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
    </div>
  );
};

export default AtribuirItensPedido;