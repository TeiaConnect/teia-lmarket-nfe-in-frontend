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
  cnpjDestinatario: string;
  codigoUfEmissor: string;
  tipoEmissao: string;
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
    console.log('TabelaNFeInbound - jsonData recebido:', jsonData);
    if (jsonData?.notas_fiscais) {
      console.log('TabelaNFeInbound - Processando notas_fiscais:', jsonData.notas_fiscais);
      const parsedData = jsonData.notas_fiscais.map((nota, index) => {
        console.log('TabelaNFeInbound - Processando nota:', nota);
        const data = {
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
          cnpjEmissor: nota.emissor.cnpj || '',
          cnpjDestinatario: nota.destinatario.cnpj || '',
          codigoUfEmissor: nota.emissor.codigo_uf || '',
          tipoEmissao: nota.identificacao_nfe.tipo_emissao || ''
        };
        console.log('TabelaNFeInbound - Dados mapeados:', data);
        return data;
      });
      console.log('TabelaNFeInbound - Dados finais:', parsedData);
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
      width: 50,
      align: 'center',
      fixed: 'left',
      render: (icon) => icon,
    },
    {
      title: 'Tipo NF-e',
      dataIndex: 'tipoNFe',
      width: 80,
      align: 'center',
    },
    {
      title: 'Nº NF-e',
      dataIndex: 'numeroNFe',
      width: 100,
      align: 'center',
    },
    {
      title: 'Série',
      dataIndex: 'serie',
      width: 50,
      align: 'center',
    },
    {
      title: 'Chave de acesso',
      dataIndex: 'chaveAcesso',
      width: 300,
      align: 'center',
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
      align: 'center',
    },
    {
      title: 'Processo Inbound',
      dataIndex: 'processoInbound',
      width: 130,
      align: 'center',
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
    {
      title: 'CNPJ/CPF destinatário',
      dataIndex: 'cnpjDestinatario',
      width: 150,
      render: (cnpjDestinatario: string) => {
        if (!cnpjDestinatario) return '-';
        const formattedCnpj = cnpjDestinatario.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
        return formattedCnpj;
      },
    },
    {
      title: 'Codigo UF Emissor',
      dataIndex: 'codigoUfEmissor',
      align: 'center',
      width: 130,
      render: (codigoUfEmissor: string) => {
        if (!codigoUfEmissor) return '-';
        return codigoUfEmissor;
      },
    },
    {
      title: 'Tipo de Emissão',
      dataIndex: 'tipoEmissao',
      width: 120,
      align: 'center',
      render: (tipoEmissao: string) => {
        if (tipoEmissao == '1') {
          return 'Normal'
        }
        if (tipoEmissao == '2') {
          return 'Contingência'
        }
        if (tipoEmissao == '3') {
          return 'ContingênciaSCAN'
        }
        if (tipoEmissao == '4') {
          return 'ContingênciaDPEC'
        }
        if (tipoEmissao == '5') {
          return 'ContingênciaFS'
        }
        if (tipoEmissao == '6') {
          return 'ContingênciaSVCAN'
        }
        if (tipoEmissao == '7') {
          return 'ContingênciaSVCRS'
        }
        if (tipoEmissao == '8') {
          return 'ContingênciaOFFLINE'
        }
        if (!tipoEmissao) return '-';
        return tipoEmissao;
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
        dataSource={dataSource}
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