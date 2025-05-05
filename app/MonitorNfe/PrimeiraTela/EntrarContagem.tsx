'use client';

import React, { useState } from 'react';
import { Button, Table, Space, message, Select, Input } from 'antd';
import { FaCheck, FaArrowLeft, FaQuestionCircle } from 'react-icons/fa';
import type { ColumnsType } from 'antd/es/table';
import './EntrarContagem.css';

interface EntrarContagemProps {
  chaveAcesso: string;
  onVoltar: () => void;
}

interface ItemContagem {
  key: string;
  numero_item: string;
  numero_pedido: string;
  item_pedido: string;
  numero_recebimento: string;
  item_recebimento: string;
  numero_material: string;
  descricao_material: string;
  quantidade_nfe: number;
  unidade_medida_nfe: string;
  quantidade_recebida: number;
  unidade_medida_recebida: string;
}

const EntrarContagem: React.FC<EntrarContagemProps> = ({ chaveAcesso, onVoltar }) => {
  const [loading, setLoading] = useState(false);
  const [tipoContagem, setTipoContagem] = useState<'comum' | 'cega'>('comum');
  const [quantidadesRecebidas, setQuantidadesRecebidas] = useState<{[key: string]: number}>({});

  const handleQuantidadeChange = (value: string, record: ItemContagem) => {
    const numero = parseFloat(value);
    if (!isNaN(numero)) {
      setQuantidadesRecebidas(prev => ({
        ...prev,
        [record.key]: numero
      }));
    }
  };

  const columns: ColumnsType<ItemContagem> = [
    {
      title: 'Nº do item',
      dataIndex: 'numero_item',
      key: 'numero_item',
      width: 100,
      fixed: 'left',
    },
    {
      title: 'Nº do pedido',
      dataIndex: 'numero_pedido',
      key: 'numero_pedido',
      width: 120,
    },
    {
      title: 'Item do pedido',
      dataIndex: 'item_pedido',
      key: 'item_pedido',
      width: 120,
    },
    {
      title: 'Nº de recebi...',
      dataIndex: 'numero_recebimento',
      key: 'numero_recebimento',
      width: 120,
    },
    {
      title: 'Item de receb...',
      dataIndex: 'item_recebimento',
      key: 'item_recebimento',
      width: 120,
    },
    {
      title: 'Nº de material',
      dataIndex: 'numero_material',
      key: 'numero_material',
      width: 120,
    },
    {
      title: 'Descrição do material',
      dataIndex: 'descricao_material',
      key: 'descricao_material',
      width: 200,
    },
    {
      title: 'Quantidade NF-e',
      dataIndex: 'quantidade_nfe',
      key: 'quantidade_nfe',
      width: 120,
      render: (value: number, record: ItemContagem) => (
        tipoContagem === 'comum' ? value : '***'
      ),
    },
    {
      title: 'Unidade de medida',
      dataIndex: 'unidade_medida_nfe',
      key: 'unidade_medida_nfe',
      width: 120,
    },
    {
      title: 'Quantidade recebida',
      dataIndex: 'quantidade_recebida',
      key: 'quantidade_recebida',
      width: 120,
      render: (_: any, record: ItemContagem) => (
        <Input
          type="number"
          size="small"
          style={{ width: '100%' }}
          value={quantidadesRecebidas[record.key] || ''}
          onChange={(e) => handleQuantidadeChange(e.target.value, record)}
        />
      ),
    },
    {
      title: 'Unidade de medida',
      dataIndex: 'unidade_medida_recebida',
      key: 'unidade_medida_recebida',
      width: 120,
    },
  ];

  // Dados de exemplo - substituir por dados reais da API
  const dadosExemplo: ItemContagem[] = [
    {
      key: '1',
      numero_item: '1',
      numero_pedido: '4501302613',
      item_pedido: '10',
      numero_recebimento: '0181753032',
      item_recebimento: '000010',
      numero_material: '2758',
      descricao_material: 'CHAPA POLICARBONATO',
      quantidade_nfe: 12,
      unidade_medida_nfe: 'PC',
      quantidade_recebida: 12,
      unidade_medida_recebida: 'PC',
    },
  ];

  const handleGravarQuantidades = () => {
    setLoading(true);
    // Implementar lógica de gravação
    setTimeout(() => {
      message.success('Quantidades gravadas com sucesso!');
      setLoading(false);
    }, 1000);
  };

  const handleConfirmarQuantidades = () => {
    message.info('Confirmando quantidades e definindo status OK');
  };

  const handleDefinirStatusNaoOk = () => {
    message.info('Definindo status como Não OK');
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
      {/* Cabeçalho SAP */}
      <div style={{
        backgroundColor: '#354966',
        padding: '8px 16px',
        display: 'flex',
        alignItems: 'center',
        color: 'white',
      }}>
        <span>Entrar quantidades EM: {chaveAcesso}</span>
      </div>

      {/* Barra de ações */}
      <div style={{
        padding: '8px 16px',
        backgroundColor: '#fff',
        borderBottom: '1px solid #ccc',
        display: 'flex',
        gap: '8px',
        alignItems: 'center'
      }}>
        <Button 
          icon={<FaArrowLeft />}
          onClick={onVoltar}
        >
          Voltar
        </Button>
        <Button 
          type="primary"
          icon={<FaCheck />}
          onClick={handleGravarQuantidades}
          loading={loading}
        >
          Gravar quantidades entradas
        </Button>
        <Button onClick={handleConfirmarQuantidades}>
          Confirmar quantidades e definir status 'ok'
        </Button>
        <Button onClick={handleDefinirStatusNaoOk}>
          Definir status 'não ok'
        </Button>
        <Button 
          icon={<FaQuestionCircle />}
          style={{ marginLeft: 'auto' }}
        />
      </div>

      {/* Informações da NF-e */}
      <div style={{
        padding: '16px',
        backgroundColor: '#fff',
        margin: '8px 16px',
        borderRadius: '4px',
      }}>
        <div style={{ marginBottom: '8px' }}>
          <strong>Ctg.proc.:</strong> {chaveAcesso}
        </div>
        <div style={{ marginBottom: '8px' }}>
          <strong>NF-e para pedido normal</strong>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
          <div>
            <strong>CNPJ do emissor da NF-e:</strong> 34.371.921/0001-82
          </div>
          <div>
            <strong>Nome do emissor da NF-e:</strong> FLAVIR ROLIM KAYSER
          </div>
          <div>
            <strong>CNPJ/CPF do destinatário da NF-e:</strong> 86.900.925/0001-04
          </div>
        </div>
        <div>
          <strong>Nome do destinatário NF-e:</strong> USAFLEX - INDUSTRIA & COMERCIO S/A
        </div>
      </div>

      {/* Controles da tabela */}
      <div style={{
        padding: '0 16px',
        display: 'flex',
        gap: '8px',
        alignItems: 'center',
        marginBottom: '8px'
      }}>
        <Space>
          <span>Visão:</span>
          <Select
            value={tipoContagem}
            onChange={setTipoContagem}
            style={{ width: 200 }}
            options={[
              { value: 'comum', label: 'Contagem Comum' },
              { value: 'cega', label: 'Contagem Cega' },
            ]}
          />
        </Space>
      </div>

      {/* Tabela */}
      <div style={{ 
        flex: 1,
        padding: '0 16px',
        overflow: 'auto'
      }}>
        <Table
          columns={columns}
          dataSource={dadosExemplo}
          size="small"
          scroll={{ x: 'max-content', y: 'calc(100vh - 300px)' }}
          pagination={false}
          className="atribuir-itens-table"
        />
      </div>
    </div>
  );
};

export default EntrarContagem; 