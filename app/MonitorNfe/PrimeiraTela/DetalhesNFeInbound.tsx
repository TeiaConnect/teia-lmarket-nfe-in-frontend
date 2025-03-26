import React from 'react';
import { Tabs, Button, Row, Col, Typography, Divider } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import './DetalhesNFe.css';
import Emissor from '../SegundaTela/TabEmissor/Emissor';
import TabIdentificacaoNFe from '../SegundaTela/TabIdentificacaoNFe/TabIdentificacaoNFe';

const { Text } = Typography;

const onChange = (key: string) => {
  console.log(key);
};

interface NFeData {
  notas_fiscais: Array<{
    referencia_nfe: {
      chave_acesso: string;
    };
    emissor: {
      cnpj: string;
      status: string;
      ultima_atividade: string;
      status_atividade: string;
      codigo_status: string;
      descricao_status: string;
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
    };
  }>;
}

interface DetalhesNFeInboundProps {
  chaveAcesso: number;
  onVoltar: () => void;
  jsonData: NFeData | null;
}

const tabNames = [
  "Identificação NF-e",
  "Emissor",
  "Destinatário",
  "Itens",
  "Valores Totais",
  "Transporte",
  "Liquidação",
  "Data de Pagamento",
  "Informações Adicionais",
  "Responsável Técnico"
];

const DetalhesNFeInbound: React.FC<DetalhesNFeInboundProps> = ({ chaveAcesso, onVoltar, jsonData }) => {
  // Verifica se jsonData e notas_fiscais existem
  if (!jsonData || !jsonData.notas_fiscais) {
    return <div>Nenhum dado disponível.</div>;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const nfe = jsonData.notas_fiscais.find((nfe: any) => nfe.referencia_nfe.chave_acesso === chaveAcesso.toString());

  if (!nfe) {
    return <div>Nota Fiscal não encontrada.</div>;
  }

  const tabComponents: { [key: string]: React.JSX.Element } = {
    "Identificação NF-e": <TabIdentificacaoNFe nfeData={nfe} />,
    "Emissor": <Emissor 
      status={nfe.emissor.status}
      ultimaAtividade={nfe.emissor.ultima_atividade}
      statusAtividade={nfe.emissor.status_atividade}
      codigoStatus={nfe.emissor.codigo_status}
      descricaoStatus={nfe.emissor.descricao_status}
      codigoMensagem={nfe.emissor.codigo_mensagem}
      mensagemSefaz={nfe.emissor.mensagem_sefaz}
      cnpj={nfe.emissor.cnpj}
      ie={nfe.emissor.inscricao_estadual}
      nomeEmissor={nfe.emissor.nome_emissor}
      nomeEmpresa={nfe.emissor.nome_empresa}
      nomeComercio={nfe.emissor.nome_comercio}
      rua={nfe.emissor.rua}
      complementoEndereco={nfe.emissor.complemento}
      bairro={nfe.emissor.bairro}
      numeroEndereco={nfe.emissor.numero}
      codigoPostal={nfe.emissor.codigo_postal}
      codigoCidade={nfe.emissor.codigo_cidade}
      nomeCidade={nfe.emissor.nome_cidade}
      uf={nfe.emissor.uf}
      chavePais={nfe.emissor.chave_pais}
      nomePais={nfe.emissor.nome_pais}
      telefone={nfe.emissor.telefone}
      codTributacao={nfe.emissor.codigo_tributacao}
      inscricaoMunicipal={nfe.emissor.inscricao_municipal}
      codAtividade={nfe.emissor.codigo_atividade}
    />,
  };

  return (
    <div>
      <Row gutter={[16, 8]} style={{ marginBottom: 16, alignItems: 'center' }}>
        <Col>
          <Button 
            type="link" 
            onClick={onVoltar} 
            style={{ fontSize: 16 }}
          >
            <LeftOutlined /> Voltar
          </Button>
        </Col>
        <Col>
          <Button 
            type="primary" 
            style={{ 
              backgroundColor: 'white', 
              color: '#1890ff', 
              border: 'none', 
              fontSize: 16 
            }}
          >
            Exibir XML
          </Button>
        </Col>
      </Row>
      
      <Row gutter={[16, 8]} style={{ marginBottom: 16 }}>
        <Col span={12}>
          <Text strong style={{ fontSize: 22 }}>Ctg. proc:</Text>
          <Text>{chaveAcesso}</Text>
          <Text strong style={{ display: 'block', fontSize: 16 }}>Emissão NF-e</Text>
        </Col>
        <Col span={1}>
          <Divider type="vertical" style={{ height: 40 }} />
        </Col>
        <Col span={11}>
          <Text strong style={{ fontSize: 16 }}>Descrição detalhada da nota fiscal</Text> 
        </Col>
      </Row>

      <Tabs
        onChange={onChange}
        type="card"
        className="custom-tabs"
        items={tabNames.map((name, index) => ({
          label: name,
          key: String(index + 1),
          children: tabComponents[name] || <div>Componente não encontrado</div>,
        }))}
      />
    </div>
  );
};

export default DetalhesNFeInbound; 