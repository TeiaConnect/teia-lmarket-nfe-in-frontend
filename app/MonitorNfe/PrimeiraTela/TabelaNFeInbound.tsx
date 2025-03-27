import React, { useEffect, useState } from 'react';
import { Button, Cascader, Dropdown, Space, Table } from 'antd';
import type { CascaderProps, MenuProps, TableColumnsType, TableProps } from 'antd';
import { CheckOutlined, DownOutlined, CheckCircleOutlined, CloseCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import './TabelaNFe.css';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

export interface DataType {
  key: string;
  chave_acesso: string;
  data_hora_emissao: string;
  identificacao_nfe: {
    tipo_emissao: string;
    codigo_status: string;
    numero_nfe: string;
    serie: string;
    data_hora_emissao: string;
  };
  emissor: {
    cnpj: string;
    codigo_uf: string;
  };
  destinatario: {
    cnpj: string;
  };
  referencia_nfe: {
    chave_acesso: string;
  };
  ambiente: string;
  codigo_mensagem: string;
  mensagem_sefaz: string;
  inscricao_estadual: string;
  nome_emissor: string;
  nome_empresa: string;
  nome_comercio: string;
  rua: string;
  complemento: string;
  bairro: string;
  numero: string;
  codigo_postal: string;
  codigo_cidade: string;
  nome_cidade: string;
  uf: string;
  chave_pais: string;
  nome_pais: string;
  telefone: string;
  codigo_tributacao: string;
  inscricao_municipal: string;
  codigo_atividade: string;
  codigo_status: string;
  descricao_status: string;
  ultima_atividade: string;
  status_atividade: string;      
}

interface TabelaNFeInboundProps {
  onSelectChange: (selectedRow: DataType | null) => void;
  onChaveAcessoClick: (chaveAcesso: string) => void;
  jsonData: any[];
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

const TabelaNFeInbound: React.FC<TabelaNFeInboundProps> = ({ onChaveAcessoClick, jsonData, onSelectChange }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelect = (record: DataType) => {
    setSelectedRowKeys([record.key]);
    onSelectChange(record);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
    onSelect,
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: 'Status',
      dataIndex: 'codigo_status',
      width: 50,
      align: 'center',
      fixed: 'left',
      render: (codigo_status) => getStatusIcon(Number(codigo_status)),
    },
    {
      title: 'Tipo NF-e',
      dataIndex: ['identificacao_nfe', 'tipo_emissao'],
      width: 80,
      align: 'center',
    },
    {
      title: 'Nº NF-e',
      dataIndex: ['identificacao_nfe', 'numero_nfe'],
      width: 100,
      align: 'center',
    },
    {
      title: 'Série',
      dataIndex: ['identificacao_nfe', 'serie'],
      width: 50,
      align: 'center',
    },
    {
      title: 'Chave de acesso',
      dataIndex: 'chave_acesso',
      width: 300,
      align: 'center',
      render: (chave_acesso) => (
        <span 
          className="chave-acesso" 
          style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
          onClick={() => onChaveAcessoClick(chave_acesso)} 
        >
          {chave_acesso}
        </span>
      ),
    },
    {
      title: 'Data/hora de emissão',
      dataIndex: 'data_hora_emissao',
      width: 180,
      align: 'center',
      render: (data_hora_emissao: string) => {
        if (!data_hora_emissao) return '-';
        return data_hora_emissao;
      },
    },
    {
      title: 'Processo Inbound',
      dataIndex: 'processo_inbound',
      width: 130,
      align: 'center',
    },
    {
      title: 'Ultima Etapa do Processo',
      dataIndex: 'ultima_atividade',
      width: 180,
      align: 'center',
    },
    {
      title: 'CNPJ Emissor',
      dataIndex: ['emissor', 'cnpj'],
      key: 'cnpjEmissor',
      render: (cnpj: any) => {
        if (!cnpj) return '-';
        const cnpjString = String(cnpj);
        const formattedCnpj = cnpjString.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
        return formattedCnpj;
      },
    },
    {
      title: 'CNPJ/CPF destinatário',
      dataIndex: ['destinatario', 'cnpj'],
      width: 150,
      render: (cnpj: any) => {
        if (!cnpj) return '-';
        const cnpjString = String(cnpj);
        const formattedCnpj = cnpjString.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
        return formattedCnpj;
      },
    },
    {
      title: 'Codigo UF Emissor',
      dataIndex: ['emissor', 'codigo_uf'],
      align: 'center',
      width: 130,
      render: (codigo_uf: string) => {
        if (!codigo_uf) return '-';
        return codigo_uf;
      },
    },
    {
      title: 'Tipo de Emissão',
      dataIndex: ['identificacao_nfe', 'tipo_emissao'],
      width: 120,
      align: 'center',
      render: (tipo_emissao: string) => {
        if (tipo_emissao == '1') {
          return 'Normal'
        }
        if (tipo_emissao == '2') {
          return 'Contingência'
        }
        if (tipo_emissao == '3') {
          return 'ContingênciaSCAN'
        }
        if (tipo_emissao == '4') {
          return 'ContingênciaDPEC'
        }
        if (tipo_emissao == '5') {
          return 'ContingênciaFS'
        }
        if (tipo_emissao == '6') {
          return 'ContingênciaSVCAN'
        }
        if (tipo_emissao == '7') {
          return 'ContingênciaSVCRS'
        }
        if (tipo_emissao == '8') {
          return 'ContingênciaOFFLINE'
        }
        if (!tipo_emissao) return '-';
        return tipo_emissao;
      },
    },
    {
      title: 'Ambiente SEFAZ',
      dataIndex: 'ambiente',
      width: 120,
      align: 'center',
      render: (ambiente: string) => {
        if (!ambiente) return '-';
        return ambiente;
      },
    },
  ];

  return (
    <div style={{ 
      padding: '20px',
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      overflow: 'auto',
      width: '100%',
      height: '100%'
    }}>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={jsonData}
        size="small"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} itens`,
        }}
        scroll={{ x: 'max-content', y: '60vh' }}
        style={{ 
          fontSize: '10px', 
          width: '100%', 
          height: '100%', 
          overflow: 'auto',
          lineHeight: '1',
          whiteSpace: 'nowrap'
        }}
        className="compact-table"
      />
    </div>
  );
};

export default TabelaNFeInbound; 