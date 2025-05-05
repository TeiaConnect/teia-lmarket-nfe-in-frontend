import React from 'react';
import { Row, Col, Typography, Tag } from 'antd';

const { Title, Text } = Typography;

interface SimulacaoFaturaHeaderProps {
  titulo: string;
  cnpjEmissor: string;
  nomeEmissor: string;
  cnpjDestinatario: string;
  nomeDestinatario: string;
  valorTotal: string;
}

const SimulacaoFaturaHeader: React.FC<SimulacaoFaturaHeaderProps> = ({
  titulo,
  cnpjEmissor,
  nomeEmissor,
  cnpjDestinatario,
  nomeDestinatario,
  valorTotal
}) => (
  <div style={{ background: '#354966', color: 'white', padding: '16px 24px', borderRadius: 0, marginBottom: 0 }}>
    <Row align="middle" justify="space-between">
      <Col>
        <Title level={4} style={{ color: 'white', margin: 0 }}>{titulo}</Title>
        <div style={{ fontSize: 13, marginTop: 4 }}>
          <Text style={{ color: 'white' }}>
            <b>Emissor:</b> {nomeEmissor} ({cnpjEmissor})<br/>
            <b>Destinatário:</b> {nomeDestinatario} ({cnpjDestinatario})
          </Text>
        </div>
      </Col>
      <Col>
        <Tag color="gold" style={{ fontSize: 18, padding: '6px 18px', borderRadius: 8 }}>
          Valor total: R$ {valorTotal}
        </Tag>
      </Col>
    </Row>
  </div>
);

export default SimulacaoFaturaHeader; 