import React from 'react';
import { Row, Col, Typography, Divider } from 'antd';
import TabReferenciaNFe from './TabReferenciaNFe';

const { Text } = Typography;

interface FormularioVisualizacaoProps {
  status: string;
  ultimaAtividade: string;
  statusAtividade: string;
  codigoStatus: string;
  descricaoStatus: string;
  codigoMensagem: string;
  mensagemSefaz: string;
}

const ReferenciaNFe: React.FC<FormularioVisualizacaoProps> = ({
  status,
  ultimaAtividade,
  statusAtividade,
  codigoStatus,
  descricaoStatus,
  codigoMensagem,
  mensagemSefaz
}) => {
  const renderTextOrPlaceholder = (text: string) => (
    <div style={{
      backgroundColor: '#e0e0e0',
      padding: '8px',
      borderRadius: '4px',
      minHeight: '32px',
      width: '100%',
      display: 'flex',
      alignItems: 'center'
    }}>
      <Text>{text || '-'}</Text>
    </div>
  );

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Text strong>Status:</Text>
          {renderTextOrPlaceholder(status)}
        </Col>
        <Col span={8}>
          <Text strong>Última Atividade:</Text>
          {renderTextOrPlaceholder(ultimaAtividade)}
        </Col>
        <Col span={8}>
          <Text strong>Status da Atividade:</Text>
          {renderTextOrPlaceholder(statusAtividade)}
        </Col>
        <Col span={8}>
          <Text strong>Código de Status:</Text>
          {renderTextOrPlaceholder(codigoStatus)}
        </Col>
        <Col span={8}>
          <Text strong>Descrição do Status:</Text>
          {renderTextOrPlaceholder(descricaoStatus)}
        </Col>
        <Col span={8}>
          <Text strong>Código da Mensagem:</Text>
          {renderTextOrPlaceholder(codigoMensagem)}
        </Col>
        <Col span={8}>
          <Text strong>Mensagem SEFAZ:</Text>
          {renderTextOrPlaceholder(mensagemSefaz)}
        </Col>
      </Row>
      <Divider />

      <Typography.Title level={4}>Referências NF-e</Typography.Title>
      <Row gutter={[16, 16]}>
      </Row>
      <TabReferenciaNFe />
    </div>
  );
};

export default ReferenciaNFe;
