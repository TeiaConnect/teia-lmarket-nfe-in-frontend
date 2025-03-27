'use client';

import React, { useState, useEffect } from 'react';
import { Button, Table, Space, message, Dropdown } from 'antd';
import { EyeOutlined, FileTextOutlined, DownOutlined } from '@ant-design/icons';
import { FaFileCode, FaFileInvoice, FaCheck, FaTimes, FaSync, FaPlayCircle, FaBalanceScale, FaRegistered, FaSearch } from 'react-icons/fa';
import type { ColumnsType } from 'antd/es/table';
import type { MenuProps } from 'antd';

interface ItemNFe {
  key: string;
  codigo: string;
  descricao: string;
  quantidade: number;
  valorUnitario: number;
  valorTotal: number;
}

interface ItemPedido {
  key: string;
  codigo: string;
  descricao: string;
  quantidade: number;
  valorUnitario: number;
  valorTotal: number;
}

interface ItemAtribuido {
  key: string;
  codigoNFe: string;
  descricaoNFe: string;
  quantidadeNFe: number;
  codigoPedido: string;
  descricaoPedido: string;
  quantidadePedido: number;
  status: string;
}

export interface AtribuirItensPedidoProps {
  chaveAcesso?: string;
}

const AtribuirItensPedido: React.FC<AtribuirItensPedidoProps> = ({ chaveAcesso }) => {
  // Estado para os dados das tabelas
  const [itensNFe, setItensNFe] = useState<ItemNFe[]>([]);
  const [itensPedido, setItensPedido] = useState<ItemPedido[]>([]);
  const [itensAtribuidos, setItensAtribuidos] = useState<ItemAtribuido[]>([]);

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
                codigo: item.prod.cProd || '',
                descricao: item.prod.xProd || '',
                quantidade: Number(item.prod.qCom) || 0,
                valorUnitario: Number(item.prod.vUnCom) || 0,
                valorTotal: Number(item.prod.vProd) || 0
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
      title: 'Código',
      dataIndex: 'codigo',
      key: 'codigo',
      width: 100,
    },
    {
      title: 'Descrição',
      dataIndex: 'descricao',
      key: 'descricao',
    },
    {
      title: 'Quantidade',
      dataIndex: 'quantidade',
      key: 'quantidade',
      width: 100,
    },
    {
      title: 'Valor Unitário',
      dataIndex: 'valorUnitario',
      key: 'valorUnitario',
      width: 120,
    },
    {
      title: 'Valor Total',
      dataIndex: 'valorTotal',
      key: 'valorTotal',
      width: 120,
    },
  ];

  // Colunas para a tabela de Itens do Pedido
  const colunasPedido: ColumnsType<ItemPedido> = [
    {
      title: 'Código',
      dataIndex: 'codigo',
      key: 'codigo',
      width: 100,
    },
    {
      title: 'Descrição',
      dataIndex: 'descricao',
      key: 'descricao',
    },
    {
      title: 'Quantidade',
      dataIndex: 'quantidade',
      key: 'quantidade',
      width: 100,
    },
    {
      title: 'Valor Unitário',
      dataIndex: 'valorUnitario',
      key: 'valorUnitario',
      width: 120,
    },
    {
      title: 'Valor Total',
      dataIndex: 'valorTotal',
      key: 'valorTotal',
      width: 120,
    },
  ];

  // Colunas para a tabela de Itens Atribuídos
  const colunasAtribuidos: ColumnsType<ItemAtribuido> = [
    {
      title: 'Código NF-e',
      dataIndex: 'codigoNFe',
      key: 'codigoNFe',
      width: 100,
    },
    {
      title: 'Descrição NF-e',
      dataIndex: 'descricaoNFe',
      key: 'descricaoNFe',
    },
    {
      title: 'Qtd NF-e',
      dataIndex: 'quantidadeNFe',
      key: 'quantidadeNFe',
      width: 80,
    },
    {
      title: 'Código Pedido',
      dataIndex: 'codigoPedido',
      key: 'codigoPedido',
      width: 100,
    },
    {
      title: 'Descrição Pedido',
      dataIndex: 'descricaoPedido',
      key: 'descricaoPedido',
    },
    {
      title: 'Qtd Pedido',
      dataIndex: 'quantidadePedido',
      key: 'quantidadePedido',
      width: 80,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 100,
    },
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

  return (
    <div style={{ 
      width: '100%',
      padding: '20px',
      backgroundColor: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      overflow: 'hidden'
    }}>
      {/* Cabeçalho com botões */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        padding: '10px',
        backgroundColor: '#f5f5f5',
        borderRadius: '4px',
        border: '1px solid #e8e8e8',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <Button icon={<FaPlayCircle/>} style={buttonStyle}>Continuar Processo</Button>
          <Button icon={<FaFileCode />} style={buttonStyle}>Simular XML</Button>
          <Button icon={<FaFileInvoice />} style={buttonStyle}>Simular Fatura</Button>
          <Button icon={<FaBalanceScale/>} style={buttonStyle}>Contagem</Button>
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <Button icon={<FaRegistered/>} style={buttonStyle}>MIGO/MIRO</Button>
          <Button icon={<EyeOutlined />} style={buttonStyle}>Exibir XML</Button>
          <Button icon={<FileTextOutlined />} style={buttonStyle}>Exibir DANFE</Button>
        </div>
      </div>

      {/* Container principal com as tabelas */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        gap: '20px',
        width: '100%',
        overflow: 'hidden'
      }}>
        {/* Container das tabelas lado a lado */}
        <div style={{ 
          display: 'flex',
          gap: '20px',
          width: '100%'
        }}>
          {/* Tabela de Itens da NF-e */}
          <div style={{ 
            flex: 1,
            backgroundColor: '#fff',
            padding: '15px',
            borderRadius: '4px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            overflow: 'hidden',
            height: '400px'
          }}>
            <h3 style={{ marginBottom: '15px', color: '#333' }}>Itens da NF-e</h3>
            <div style={{ overflowX: 'auto', height: 'calc(100% - 40px)' }}>
              <Table
                columns={colunasNFe}
                dataSource={itensNFe}
                size="small"
                pagination={false}
                scroll={{ x: 'max-content', y: 'calc(100% - 40px)' }}
                style={{ 
                  fontSize: '12px',
                  width: '100%'
                }}
              />
            </div>
          </div>

          {/* Tabela de Itens do Pedido */}
          <div style={{ 
            flex: 1,
            backgroundColor: '#fff',
            padding: '15px',
            borderRadius: '4px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            overflow: 'hidden',
            height: '400px'
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '15px' 
            }}>
              <h3 style={{ color: '#333', margin: 0 }}>Itens do Pedido</h3>
              <Dropdown menu={{ items }} placement="bottomRight">
                <Button 
                  icon={<FaSearch />} 
                  style={{
                    ...buttonStyle,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  Procurar itens de Pedido <DownOutlined />
                </Button>
              </Dropdown>
            </div>
            <div style={{ overflowX: 'auto', height: 'calc(100% - 40px)' }}>
              <Table
                columns={colunasPedido}
                dataSource={itensPedido}
                size="small"
                pagination={false}
                scroll={{ x: 'max-content', y: 'calc(100% - 40px)' }}
                style={{ 
                  fontSize: '12px',
                  width: '100%'
                }}
              />
            </div>
          </div>
        </div>

        {/* Tabela de Itens Atribuídos */}
        <div style={{ 
          backgroundColor: '#fff',
          padding: '15px',
          borderRadius: '4px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          overflow: 'hidden',
          height: '300px'
        }}>
          <h3 style={{ marginBottom: '15px', color: '#333' }}>Itens Atribuídos</h3>
          <div style={{ overflowX: 'auto', height: 'calc(100% - 40px)' }}>
            <Table
              columns={colunasAtribuidos}
              dataSource={itensAtribuidos}
              size="small"
              pagination={false}
              scroll={{ x: 'max-content', y: 'calc(100% - 40px)' }}
              style={{ 
                fontSize: '12px',
                width: '100%'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AtribuirItensPedido;