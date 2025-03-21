import React from 'react';
import { Row, Col, Typography, Divider } from 'antd';

const { Text } = Typography;

interface FormularioVisualizacaoProps {
  status: string;
  ultimaAtividade: string;
  statusAtividade: string;
  codigoStatus: string;
  descricaoStatus: string;
  codigoMensagem: string;
  mensagemSefaz: string;
  cnpj: string;
  ie: string;
  nomeEmissor: string;
  nomeEmpresa: string;
  nomeComercio: string;
  rua: string;
  complementoEndereco: string;
  bairro: string;
  numeroEndereco: string;
  codigoPostal: string;
  codigoCidade: string;
  nomeCidade: string;
  uf: string;
  chavePais: string;
  nomePais: string;
  telefone: string;
  codTributacao: string;
  inscricaoMunicipal: string;
  codAtividade: string;
}

const Emissor: React.FC<FormularioVisualizacaoProps> = ({
  status,
  ultimaAtividade,
  statusAtividade,
  codigoStatus,
  descricaoStatus,
  codigoMensagem,
  mensagemSefaz,
  cnpj,
  ie,
  nomeEmissor,
  nomeEmpresa,
  nomeComercio,
  rua,
  complementoEndereco,
  bairro,
  numeroEndereco,
  codigoPostal,
  codigoCidade,
  nomeCidade,
  uf,
  chavePais,
  nomePais,
  telefone,
  codTributacao,
  inscricaoMunicipal,
  codAtividade
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

      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Text strong>CNPJ:</Text>
          {renderTextOrPlaceholder(cnpj)}
        </Col>
        <Col span={8}>
          <Text strong>Inscrição Estadual (IE):</Text>
          {renderTextOrPlaceholder(ie)}
        </Col>
      </Row>
      <Divider />

      <Typography.Title level={4}>Nome do Emissor</Typography.Title>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Text strong>Nome do Emissor:</Text>
          {renderTextOrPlaceholder(nomeEmissor)}
        </Col>
        <Col span={8}>
          <Text strong>Nome da Empresa:</Text>
          {renderTextOrPlaceholder(nomeEmpresa)}
        </Col>
        <Col span={8}>
          <Text strong>Nome do Comércio:</Text>
          {renderTextOrPlaceholder(nomeComercio)}
        </Col>
      </Row>
      <Divider />

      <Typography.Title level={4}>Dados de endereço do emissor</Typography.Title>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Text strong>Rua:</Text>
          {renderTextOrPlaceholder(rua)}
        </Col>
        <Col span={8}>
          <Text strong>Complemento:</Text>
          {renderTextOrPlaceholder(complementoEndereco)}
        </Col>
        <Col span={8}>
          <Text strong>Bairro:</Text>
          {renderTextOrPlaceholder(bairro)}
        </Col>
        <Col span={8}>
          <Text strong>Nº:</Text>
          {renderTextOrPlaceholder(numeroEndereco)}
        </Col>
        <Col span={8}>
          <Text strong>Código Postal:</Text>
          {renderTextOrPlaceholder(codigoPostal)}
        </Col>
        <Col span={8}>
          <Text strong>Código da Cidade:</Text>
          {renderTextOrPlaceholder(codigoCidade)}
        </Col>
        <Col span={8}>
          <Text strong>Nome da Cidade:</Text>
          {renderTextOrPlaceholder(nomeCidade)}
        </Col>
        <Col span={8}>
          <Text strong>UF:</Text>
          {renderTextOrPlaceholder(uf)}
        </Col>
        <Col span={8}>
          <Text strong>Chave País:</Text>
          {renderTextOrPlaceholder(chavePais)}
        </Col>
        <Col span={8}>
          <Text strong>Nome do País:</Text>
          {renderTextOrPlaceholder(nomePais)}
        </Col>
        <Col span={8}>
          <Text strong>Telefone:</Text>
          {renderTextOrPlaceholder(telefone)}
        </Col>
      </Row>
      <Divider />

      <Typography.Title level={4}>Outros dados fiscais</Typography.Title>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Text strong>Cód. Tributação:</Text>
          {renderTextOrPlaceholder(codTributacao)}
        </Col>
        <Col span={8}>
          <Text strong>Inscrição Municipal:</Text>
          {renderTextOrPlaceholder(inscricaoMunicipal)}
        </Col>
        <Col span={8}>
          <Text strong>Cód. Atividade:</Text>
          {renderTextOrPlaceholder(codAtividade)}
        </Col>
      </Row>
    </div>
  );
};

export default Emissor;
