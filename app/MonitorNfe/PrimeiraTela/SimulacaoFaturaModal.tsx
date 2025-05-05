import React, { useState } from 'react';
import { Modal, Tabs, Table, Alert } from 'antd';

interface SimulacaoFaturaModalProps {
  open: boolean;
  onClose: () => void;
  nfeData: any; // Substituir pelo tipo correto se disponível
}

const { TabPane } = Tabs;

const SimulacaoFaturaModal: React.FC<SimulacaoFaturaModalProps> = ({ open, onClose, nfeData }) => {
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // Exemplo de colunas da tabela de itens
  const columns = [
    { title: 'Nº do item', dataIndex: 'numeroItem', key: 'numeroItem' },
    { title: 'Categoria do item', dataIndex: 'categoria', key: 'categoria' },
    { title: 'Nº do pedido', dataIndex: 'numeroPedido', key: 'numeroPedido' },
    { title: 'Item do pedido', dataIndex: 'itemPedido', key: 'itemPedido' },
    { title: 'Qtd. NF-e convertida', dataIndex: 'quantidade', key: 'quantidade' },
    { title: 'Unidade', dataIndex: 'unidade', key: 'unidade' },
    { title: 'Código material', dataIndex: 'codigoMaterial', key: 'codigoMaterial' },
    { title: 'Descrição', dataIndex: 'descricao', key: 'descricao' },
    { title: 'CFOP', dataIndex: 'cfop', key: 'cfop' },
    { title: 'Cód. imposto', dataIndex: 'codImposto', key: 'codImposto' },
  ];

  // Exemplo de dados de itens (substituir pelo real)
  const dataSource = nfeData?.itens || [];

  return (
    <Modal
      open={open}
      onCancel={onClose}
      onOk={onClose}
      width={1200}
      title="Simulação de Fatura e NF-e"
      style={{ top: 20 }}
    >
      {/* Cabeçalho */}
      <div style={{ marginBottom: 16 }}>
        <b>Emitente:</b> {nfeData?.emitente?.nome} | <b>Destinatário:</b> {nfeData?.destinatario?.nome} | <b>Valor total:</b> {nfeData?.valorTotal}
      </div>

      {/* Mensagens de alerta */}
      {nfeData?.mensagens?.map((msg: string, idx: number) => (
        <Alert key={idx} message={msg} type="warning" showIcon style={{ marginBottom: 8 }} />
      ))}

      {/* Tabela de itens */}
      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey="numeroItem"
        size="small"
        onRow={record => ({
          onClick: () => setSelectedItem(record),
        })}
        pagination={false}
        style={{ marginBottom: 16 }}
      />

      {/* Abas de detalhes do item selecionado */}
      {selectedItem && (
        <Tabs defaultActiveKey="1">
          <TabPane tab="Valores" key="1">
            {/* Exibir valores do item */}
            <pre>{JSON.stringify(selectedItem.valores, null, 2)}</pre>
          </TabPane>
          <TabPane tab="Impostos" key="2">
            {/* Exibir impostos do item */}
            <pre>{JSON.stringify(selectedItem.impostos, null, 2)}</pre>
          </TabPane>
          <TabPane tab="Condições de imposto" key="3">
            {/* Exibir condições de imposto do item */}
            <pre>{JSON.stringify(selectedItem.condicoesImposto, null, 2)}</pre>
          </TabPane>
        </Tabs>
      )}
    </Modal>
  );
};

export default SimulacaoFaturaModal; 