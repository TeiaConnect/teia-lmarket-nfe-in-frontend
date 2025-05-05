import React from 'react';
import { Table, Tooltip } from 'antd';
import { ExclamationCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';

interface ItemSimulacao {
  numeroItem: number;
  categoria: string;
  numeroPedido: string;
  itemPedido: number;
  quantidade: number;
  unidade: string;
  codigoMaterial: string;
  descricao: string;
  cfop: string;
  codImposto: string;
  frete: string;
  valorSeguro: string;
  origem: string;
  ncm: string;
  status?: 'ok' | 'divergente' | 'alerta';
  motivoDivergencia?: string;
  ultimaAcao?: string;
  responsavel?: string;
}

interface SimulacaoFaturaTabelaItensProps {
  itens: ItemSimulacao[];
  selectedItemKey: number;
  onSelectItem: (numeroItem: number) => void;
}

const columns = [
  {
    title: '',
    dataIndex: 'status',
    key: 'status',
    width: 32,
    render: (status: string, record: ItemSimulacao) => {
      if (status === 'divergente') {
        return <Tooltip title={record.motivoDivergencia}><ExclamationCircleOutlined style={{ color: '#faad14', fontSize: 18 }} /></Tooltip>;
      }
      if (status === 'ok') {
        return <CheckCircleOutlined style={{ color: '#52c41a', fontSize: 18 }} />;
      }
      return null;
    }
  },
  { title: 'Nº do item', dataIndex: 'numeroItem', key: 'numeroItem' },
  { title: 'Categoria do item', dataIndex: 'categoria', key: 'categoria' },
  { title: 'Nº do pedido', dataIndex: 'numeroPedido', key: 'numeroPedido' },
  { title: 'Item do pedido', dataIndex: 'itemPedido', key: 'itemPedido' },
  { title: 'Qtd. NF-e convertida', dataIndex: 'quantidade', key: 'quantidade' },
  { title: 'ERP unidade de medida', dataIndex: 'unidade', key: 'unidade' },
  { title: 'ERP nº de material', dataIndex: 'codigoMaterial', key: 'codigoMaterial' },
  { title: 'ERP texto breve do material', dataIndex: 'descricao', key: 'descricao' },
  { title: 'CFOP', dataIndex: 'cfop', key: 'cfop' },
  { title: 'CódImposto', dataIndex: 'codImposto', key: 'codImposto' },
  { title: 'Frete', dataIndex: 'frete', key: 'frete' },
  { title: 'Valor Seguro', dataIndex: 'valorSeguro', key: 'valorSeguro' },
  { title: 'Origem', dataIndex: 'origem', key: 'origem' },
  { title: 'NCM', dataIndex: 'ncm', key: 'ncm' },
  { title: 'Última ação', dataIndex: 'ultimaAcao', key: 'ultimaAcao' },
  { title: 'Responsável', dataIndex: 'responsavel', key: 'responsavel' },
];

const SimulacaoFaturaTabelaItens: React.FC<SimulacaoFaturaTabelaItensProps> = ({ itens, selectedItemKey, onSelectItem }) => (
  <Table
    columns={columns}
    dataSource={itens}
    rowKey="numeroItem"
    size="small"
    pagination={false}
    rowClassName={record => Number(selectedItemKey) === Number(record.numeroItem) ? 'ant-table-row-selected' : ''}
    onRow={record => ({
      onClick: () => onSelectItem(record.numeroItem),
      style: { cursor: 'pointer' }
    })}
    scroll={{ x: true }}
    style={{ background: '#fff', marginBottom: 0 }}
  />
);

export default SimulacaoFaturaTabelaItens; 