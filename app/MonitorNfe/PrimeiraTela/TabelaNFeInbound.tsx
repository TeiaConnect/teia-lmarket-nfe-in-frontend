import React, { useEffect, useState } from 'react';
import { Button, Cascader, Dropdown, Space, Table } from 'antd';
import type { CascaderProps, MenuProps, TableColumnsType, TableProps } from 'antd';
import { CheckOutlined, DownOutlined } from '@ant-design/icons';
import './TabelaNFe.css';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

interface DataType {
  key: React.Key;
  icon: React.ReactNode;
  tipoNFe: string;
  codigoStatus: number;
  numeroDocumento: number;
  numeroNFe: number;
  serie: number;
  chaveAcesso: number;
}

interface TabelaNFeInboundProps {
  onChaveAcessoClick?: (chaveAcesso: number) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  jsonData: any;
}

interface Option {
  value: string;
  label: string;
  children?: Option[];
}

const options: Option[] = [
  {
    value: 'Standard',
    label: 'Standard',
  },
  {
    value: 'Personalizado',
    label: 'Personalizado',
  },
];

const onChange: CascaderProps<Option>['onChange'] = (value) => {
  console.log(value);
};

const items: MenuProps['items'] = [
  {
    key: '1',
    label: 'Primeira opção',
  },
  {
    key: '2',
    label: 'Segunda opção',
  },
  {
    key: '3',
    label: 'Terceira opção',
  },
];

const TabelaNFeInbound: React.FC<TabelaNFeInboundProps> = ({ onChaveAcessoClick, jsonData }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const [dataSource, setDataSource] = useState<DataType[]>([]);

  useEffect(() => {
    if (jsonData?.notas_fiscais) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const parsedData = jsonData.notas_fiscais.map((nota: any, index: number) => ({
        key: index,
        icon: <CheckOutlined />,
        tipoNFe: nota.identificacao_nfe.tipo_emissao,
        codigoStatus: Number(nota.identificacao_nfe.codigo_status),
        numeroDocumento: nota.emissor.cnpj,
        numeroNFe: nota.identificacao_nfe.numero_nfe,
        serie: nota.identificacao_nfe.serie,
        chaveAcesso: nota.referencia_nfe.chave_acesso,
      }));
      setDataSource(parsedData);
    }
  }, [jsonData]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: 'Status',
      dataIndex: 'icon',
      render: (icon) => icon,
    },
    {
      title: 'Tipo NF-e',
      dataIndex: 'tipoNFe',
    },
    {
      title: 'Código Status',
      dataIndex: 'codigoStatus',
    },
    {
      title: 'Nº do documento',
      dataIndex: 'numeroDocumento',
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
      title: 'Chave de acesso',
      dataIndex: 'chaveAcesso',
      render: (chaveAcesso) => (
        <span 
          className="chave-acesso" 
          style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
          onClick={() => onChaveAcessoClick?.(chaveAcesso)} 
        >
          {chaveAcesso}
        </span>
      ),
    },
  ];

  return (
    <>
      <Cascader options={options} onChange={onChange} placeholder="Visão" style={{width: 80}}/>
      <Dropdown menu={{ items }} >
        <a onClick={(e) => e.preventDefault()}>
          <Space style={{ color: '#6e99cc', backgroundColor: '#F8F7FF', marginLeft: 10, border: '1px solid #6e99cc' , padding: '5px 10px'}}>
            Seleção detalhes
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
      <Button style={{color: '#6e99cc', backgroundColor: '#F8F7FF', borderColor: '#6e99cc', borderRadius: 0, marginLeft: 10}}>Continuar Processo</Button>
      <Button style={{ color: '#6e99cc', backgroundColor: '#F8F7FF', borderColor: '#6e99cc', borderRadius: 0, marginLeft: 10 }}>Continuar Processo B2B</Button>
      <Dropdown menu={{ items }} >
        <a onClick={(e) => e.preventDefault()}>
          <Space style={{ color: '#6e99cc',backgroundColor:'#F8F7FF' , marginLeft: 10, border: '1px solid #6e99cc' , padding: '5px 10px'}}>
            Outras Funções
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
      <Button style={{ color: '#6e99cc', backgroundColor: '#F8F7FF', borderColor: '#6e99cc', borderRadius: 0, marginLeft: 10 }}>Versão de impressão</Button>
      <Dropdown menu={{ items }} >
        <a onClick={(e) => e.preventDefault()}>
          <Space style={{ color: '#6e99cc', backgroundColor: '#F8F7FF', marginLeft: 10, border: '1px solid #6e99cc' , padding: '5px 10px'}}>
            Exportação
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
      
      <Table<DataType>
        rowSelection={rowSelection}
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        size="small"
        scroll={{ y: 400, x: 'max-content' }}
        className="nfe-table" />
    </>
  );
};

export default TabelaNFeInbound; 