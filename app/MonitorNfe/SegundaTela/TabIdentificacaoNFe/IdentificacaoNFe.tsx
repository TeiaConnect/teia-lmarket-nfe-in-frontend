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
  numeroNFe: string;
  serie: string;
  modelo: string;
  numeroAleatorio: string;
  digitoVerificador: string;
  codigoUF: string;
  dataHoraEmissao: string;
  idProcesso: string;
  vrAplicativo: string;
  tipoEmissao: string;
  finalidadeEmissao: string;
  dirMovimentoMerc: string;
  ambAutorids: string;
  hSaidaMercado: string;
  descricaoOper: string;
  codCidade: string;
  formatoDANFE: string;
  motivoConting: string;
  horaExcecao: string;
  localDestino: string;
  consumFinal: string;
  presenComprad: string;
  codigoCorretor: string;
}

const FormularioVisualizacao: React.FC<FormularioVisualizacaoProps> = ({
  status,
  ultimaAtividade,
  statusAtividade,
  codigoStatus,
  descricaoStatus,
  codigoMensagem,
  mensagemSefaz,
  numeroNFe,
  serie,
  modelo,
  numeroAleatorio,
  digitoVerificador,
  codigoUF,
  dataHoraEmissao,
  idProcesso,
  vrAplicativo,
  tipoEmissao,
  finalidadeEmissao,
  dirMovimentoMerc,
  ambAutorids,
  hSaidaMercado,
  descricaoOper,
  codCidade,
  formatoDANFE,
  motivoConting,
  horaExcecao,
  localDestino,
  consumFinal,
  presenComprad,
  codigoCorretor
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

      <Typography.Title level={4}>NF-e e Informações de Emissão</Typography.Title>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Text strong>Nº NF-e:</Text>
          {renderTextOrPlaceholder(numeroNFe)}
        </Col>
        <Col span={8}>
          <Text strong>Série:</Text>
          {renderTextOrPlaceholder(serie)}
        </Col>
        <Col span={8}>
          <Text strong>Modelo:</Text>
          {renderTextOrPlaceholder(modelo)}
        </Col>
        <Col span={8}>
          <Text strong>Nº Aleatório:</Text>
          {renderTextOrPlaceholder(numeroAleatorio)}
        </Col>
        <Col span={8}>
          <Text strong>DV (Dígito Verificador):</Text>
          {renderTextOrPlaceholder(digitoVerificador)}
        </Col>
        <Col span={8}>
          <Text strong>Código UF:</Text>
          {renderTextOrPlaceholder(codigoUF)}
        </Col>
        <Col span={8}>
          <Text strong>Data e Hora da Emissão:</Text>
          {renderTextOrPlaceholder(dataHoraEmissao)}
        </Col>
        <Col span={8}>
          <Text strong>ID do Processo:</Text>
          {renderTextOrPlaceholder(idProcesso)}
        </Col>
      </Row>
      <Divider />

      <Typography.Title level={4}>Dados do Processo</Typography.Title>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Text strong>VR. Aplicativo:</Text>
          {renderTextOrPlaceholder(vrAplicativo)}
        </Col>
        <Col span={8}>
          <Text strong>Tipo de Emissão:</Text>
          {renderTextOrPlaceholder(tipoEmissao)}
        </Col>
        <Col span={8}>
          <Text strong>Finalidade de Emissão:</Text>
          {renderTextOrPlaceholder(finalidadeEmissao)}
        </Col>
      </Row>
      <Divider />

      <Typography.Title level={4}>Dados de Movimento NF-e</Typography.Title>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Text strong>Dir. Movimento Merc:</Text>
          {renderTextOrPlaceholder(dirMovimentoMerc)}
        </Col>
        <Col span={8}>
          <Text strong>Amb. Autorizações:</Text>
          {renderTextOrPlaceholder(ambAutorids)}
        </Col>
        <Col span={8}>
          <Text strong>H. Saída Mercado:</Text>
          {renderTextOrPlaceholder(hSaidaMercado)}
        </Col>
      </Row>
      <Divider />

      <Typography.Title level={4}>Outros Dados</Typography.Title>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Text strong>Descrição Oper:</Text>
          {renderTextOrPlaceholder(descricaoOper)}
        </Col>
        <Col span={8}>
          <Text strong>Cód. Cidade:</Text>
          {renderTextOrPlaceholder(codCidade)}
        </Col>
        <Col span={8}>
          <Text strong>Formato DANFE:</Text>
          {renderTextOrPlaceholder(formatoDANFE)}
        </Col>
        <Col span={8}>
          <Text strong>Motivo Contingência:</Text>
          {renderTextOrPlaceholder(motivoConting)}
        </Col>
        <Col span={8}>
          <Text strong>Hora Exceção:</Text>
          {renderTextOrPlaceholder(horaExcecao)}
        </Col>
        <Col span={8}>
          <Text strong>Local Destino:</Text>
          {renderTextOrPlaceholder(localDestino)}
        </Col>
        <Col span={8}>
          <Text strong>Consum. Final:</Text>
          {renderTextOrPlaceholder(consumFinal)}
        </Col>
        <Col span={8}>
          <Text strong>Presença Comprador:</Text>
          {renderTextOrPlaceholder(presenComprad)}
        </Col>
        <Col span={8}>
          <Text strong>Código do Corretor:</Text>
          {renderTextOrPlaceholder(codigoCorretor)}
        </Col>
      </Row>
    </div>
  );
};

export default FormularioVisualizacao;
