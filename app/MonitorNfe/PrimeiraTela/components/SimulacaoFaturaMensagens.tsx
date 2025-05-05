import React from 'react';
import { Alert, Collapse } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { Panel } = Collapse;

interface SimulacaoFaturaMensagensProps {
  mensagensGerais: string[];
  mensagensPorItem: { item: string; mensagem: string; detalhes?: string }[];
}

const SimulacaoFaturaMensagens: React.FC<SimulacaoFaturaMensagensProps> = ({ mensagensGerais, mensagensPorItem }) => (
  <div style={{ margin: '16px 0' }}>
    {mensagensGerais.map((msg, idx) => (
      <Alert
        key={idx}
        message={msg}
        type="warning"
        showIcon
        icon={<ExclamationCircleOutlined />}
        style={{ marginBottom: 8, background: '#fffbe6', border: '1px solid #ffe58f' }}
      />
    ))}
    {mensagensPorItem.length > 0 && (
      <Collapse bordered={false} style={{ background: '#fffbe6', marginTop: 8 }}>
        {mensagensPorItem.map((item, idx) => (
          <Panel
            header={<span><ExclamationCircleOutlined style={{ color: '#faad14', marginRight: 8 }} />{item.mensagem}</span>}
            key={idx}
          >
            <div><b>Item:</b> {item.item}</div>
            {item.detalhes && <div style={{ marginTop: 8 }}>{item.detalhes}</div>}
          </Panel>
        ))}
      </Collapse>
    )}
  </div>
);

export default SimulacaoFaturaMensagens; 