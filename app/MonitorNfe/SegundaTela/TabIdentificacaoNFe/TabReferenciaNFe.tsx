import React from 'react';
import { Table } from 'antd';
import type { TableColumnsType } from 'antd';

interface DataType {
  key: React.Key;
  status: string;
  chaveAcesso: number;
  numeroNFe: number;
  serie: number;
  cnpjEmissor: number;
  codigoUf: number;
}

const columns: TableColumnsType<DataType> = [
  {
    title: 'Status',
    dataIndex: 'status',
  },
  {
    title: 'Chave de Acesso',
    dataIndex: 'chaveAcesso',
  },
  {
    title: 'Nº NF-e',
    dataIndex: 'numeroNFe',
  },
  {
    title: 'Série',
    dataIndex: 'serie',
  },
  {
    title: 'CNPJ do Emissor',
    dataIndex: 'cnpjEmissor',
  },
  {
    title: 'Código UF',
    dataIndex: 'codigoUf',
  },
];

const data: DataType[] = [

];


const App: React.FC = () => (
  <>
    <Table<DataType> columns={columns} dataSource={data} size="small" />
  </>
);

export default App;