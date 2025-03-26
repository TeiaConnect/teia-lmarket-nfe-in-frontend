import React, { useEffect, useState } from 'react';
import { Button, Cascader, Dropdown, Space, Table } from 'antd';
import type { CascaderProps, MenuProps, TableColumnsType, TableProps } from 'antd';
import { CheckOutlined, DownOutlined, CheckCircleOutlined, CloseCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import './TabelaNFe.css';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

interface DataType {
  key: React.Key;
  icon: React.ReactNode;
  tipoNFe: string;
  codigoStatus: number;
  numeroDocumento: string;
  numeroNFe: string;
  serie: string;
  chaveAcesso: string;
  dataHoraEmissao: string;
  processoInbound: string;
  cnpjEmissor: string;
}

interface TabelaNFeInboundProps {
  onChaveAcessoClick?: (chaveAcesso: number) => void;
  jsonData: {
    notas_fiscais: Array<{
      identificacao_nfe: {
        tipo_emissao: string;
        codigo_status: string;
        numero_nfe: string;
        serie: string;
      };
      emissor: {
        cnpj: string;
      };
      referencia_nfe: {
        chave_acesso: string;
      };
    }>;
  } | null;
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

const TabelaNFeInbound: React.FC<TabelaNFeInboundProps> = ({ onChaveAcessoClick, jsonData }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<DataType[]>([]);

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

  useEffect(() => {
    if (jsonData?.notas_fiscais) {
      const parsedData = jsonData.notas_fiscais.map((nota, index) => ({
        key: index,
        icon: getStatusIcon(Number(nota.identificacao_nfe.codigo_status)),
        tipoNFe: nota.identificacao_nfe.tipo_emissao,
        codigoStatus: Number(nota.identificacao_nfe.codigo_status),
        numeroDocumento: nota.emissor.cnpj,
        numeroNFe: nota.identificacao_nfe.numero_nfe,
        serie: nota.identificacao_nfe.serie,
        chaveAcesso: nota.referencia_nfe.chave_acesso,
        dataHoraEmissao: new Date().toLocaleString(),
        processoInbound: 'Processado',
        cnpjEmissor: nota.emissor.cnpj
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
      width: 60,
      fixed: 'left',
      render: (icon) => icon,
    },
    {
      title: 'Tipo NF-e',
      dataIndex: 'tipoNFe',
      width: 100,
    },
    {
      title: 'Nº NF-e',
      dataIndex: 'numeroNFe',
      width: 100,
    },
    {
      title: 'Série',
      dataIndex: 'serie',
      width: 80,
    },
    {
      title: 'Chave de acesso',
      dataIndex: 'chaveAcesso',
      width: 300,
      render: (chaveAcesso) => (
        <span 
          className="chave-acesso" 
          style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
          onClick={() => onChaveAcessoClick?.(Number(chaveAcesso))} 
        >
          {chaveAcesso}
        </span>
      ),
    },
    {
      title: 'Data/hora de emissão',
      dataIndex: 'dataHoraEmissao',
      width: 180,
    },
    {
      title: 'Processo Inbound',
      dataIndex: 'processoInbound',
      width: 120,
    },
    {
      title: 'CNPJ/CPF emissor',
      dataIndex: 'cnpjEmissor',
      width: 120,
      render: (cnpjEmissor: string) => {
        if (!cnpjEmissor) return '-';
        const formattedCnpj = cnpjEmissor.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
        return formattedCnpj;
      },
    },
  ];

  return (
    <div style={{ 
      padding: '20px',
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      overflow: 'auto'
    }}>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={dataSource}
        size="middle"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} itens`,
        }}
        scroll={{ x: 1300 }}
      />
    </div>
  );
};

export default TabelaNFeInbound; 