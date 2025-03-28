import React from 'react';
import { Card, Descriptions } from 'antd';

interface EmissorProps {
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

const Emissor: React.FC<EmissorProps> = ({
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
  codAtividade,
}) => {
  return (
    <Card title="Informações do Emissor">
      <Descriptions bordered column={2}>
        <Descriptions.Item label="Status">{status}</Descriptions.Item>
        <Descriptions.Item label="Última Atividade">{ultimaAtividade}</Descriptions.Item>
        <Descriptions.Item label="Status da Atividade">{statusAtividade}</Descriptions.Item>
        <Descriptions.Item label="Código do Status">{codigoStatus}</Descriptions.Item>
        <Descriptions.Item label="Descrição do Status">{descricaoStatus}</Descriptions.Item>
        <Descriptions.Item label="Código da Mensagem">{codigoMensagem}</Descriptions.Item>
        <Descriptions.Item label="Mensagem SEFAZ">{mensagemSefaz}</Descriptions.Item>
        <Descriptions.Item label="CNPJ">{cnpj}</Descriptions.Item>
        <Descriptions.Item label="Inscrição Estadual">{ie}</Descriptions.Item>
        <Descriptions.Item label="Nome do Emissor">{nomeEmissor}</Descriptions.Item>
        <Descriptions.Item label="Nome da Empresa">{nomeEmpresa}</Descriptions.Item>
        <Descriptions.Item label="Nome Fantasia">{nomeComercio}</Descriptions.Item>
        <Descriptions.Item label="Endereço">{rua}</Descriptions.Item>
        <Descriptions.Item label="Complemento">{complementoEndereco}</Descriptions.Item>
        <Descriptions.Item label="Bairro">{bairro}</Descriptions.Item>
        <Descriptions.Item label="Número">{numeroEndereco}</Descriptions.Item>
        <Descriptions.Item label="CEP">{codigoPostal}</Descriptions.Item>
        <Descriptions.Item label="Código da Cidade">{codigoCidade}</Descriptions.Item>
        <Descriptions.Item label="Cidade">{nomeCidade}</Descriptions.Item>
        <Descriptions.Item label="UF">{uf}</Descriptions.Item>
        <Descriptions.Item label="Código do País">{chavePais}</Descriptions.Item>
        <Descriptions.Item label="País">{nomePais}</Descriptions.Item>
        <Descriptions.Item label="Telefone">{telefone}</Descriptions.Item>
        <Descriptions.Item label="Código de Tributação">{codTributacao}</Descriptions.Item>
        <Descriptions.Item label="Inscrição Municipal">{inscricaoMunicipal}</Descriptions.Item>
        <Descriptions.Item label="Código de Atividade">{codAtividade}</Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default Emissor; 