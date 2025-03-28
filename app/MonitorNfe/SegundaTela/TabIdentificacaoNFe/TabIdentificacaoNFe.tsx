import React from 'react';
import { Card, Descriptions } from 'antd';

interface TabIdentificacaoNFeProps {
  nfeData: {
    nfeProc: {
      NFe: {
        infNFe: {
          ide: {
            tpEmis: string;
            cStat: string;
            nNF: string;
            serie: string;
            dhEmi: string;
            tpNF: string;
            idDest: string;
            cMunFG: string;
            tpImp: string;
            tpAmb: string;
            finNFe: string;
            indFinal: string;
            indPres: string;
            procEmi: string;
            verProc: string;
            dhCont?: string;
            xJust?: string;
          };
        };
      };
      protNFe: {
        infProt: {
          cStat: string;
          xMotivo: string;
          dhRecbto: string;
          nProt: string;
        };
      };
    };
  };
}

const TabIdentificacaoNFe: React.FC<TabIdentificacaoNFeProps> = ({ nfeData }) => {
  const ide = nfeData?.nfeProc?.NFe?.infNFe?.ide;
  const protNFe = nfeData?.nfeProc?.protNFe?.infProt;

  if (!ide || !protNFe) {
    return <div>Dados da NF-e não encontrados</div>;
  }

  const getTipoEmissao = (tpEmis: string) => {
    const tipos: { [key: string]: string } = {
      '1': 'Normal',
      '2': 'Contingência FS',
      '3': 'Contingência SCAN',
      '4': 'Contingência DPEC',
      '5': 'Contingência FS-DA',
      '6': 'Contingência SVC-AN',
      '7': 'Contingência SVC-RS',
      '9': 'Contingência off-line NFC-e'
    };
    return tipos[tpEmis] || tpEmis;
  };

  const getTipoOperacao = (tpNF: string) => {
    return tpNF === '0' ? 'Entrada' : 'Saída';
  };

  const getDestinoOperacao = (idDest: string) => {
    const destinos: { [key: string]: string } = {
      '1': 'Operação Interna',
      '2': 'Operação Interestadual',
      '3': 'Operação com Exterior'
    };
    return destinos[idDest] || idDest;
  };

  const getTipoImpressao = (tpImp: string) => {
    const tipos: { [key: string]: string } = {
      '0': 'Sem geração de DANFE',
      '1': 'DANFE normal, Retrato',
      '2': 'DANFE normal, Paisagem',
      '3': 'DANFE Simplificado',
      '4': 'DANFE NFC-e',
      '5': 'DANFE NFC-e em mensagem eletrônica'
    };
    return tipos[tpImp] || tpImp;
  };

  const getAmbiente = (tpAmb: string) => {
    return tpAmb === '1' ? 'Produção' : 'Homologação';
  };

  const getFinalidadeEmissao = (finNFe: string) => {
    const finalidades: { [key: string]: string } = {
      '1': 'NF-e normal',
      '2': 'NF-e complementar',
      '3': 'NF-e de ajuste',
      '4': 'Devolução de mercadoria'
    };
    return finalidades[finNFe] || finNFe;
  };

  const getConsumidorFinal = (indFinal: string) => {
    return indFinal === '1' ? 'Sim' : 'Não';
  };

  const getPresencaComprador = (indPres: string) => {
    const presencas: { [key: string]: string } = {
      '0': 'Não se aplica',
      '1': 'Operação presencial',
      '2': 'Operação não presencial, pela Internet',
      '3': 'Operação não presencial, Teleatendimento',
      '4': 'NFC-e em operação com entrega a domicílio',
      '5': 'Operação presencial, fora do estabelecimento',
      '9': 'Operação não presencial, outros'
    };
    return presencas[indPres] || indPres;
  };

  const getProcessoEmissao = (procEmi: string) => {
    const processos: { [key: string]: string } = {
      '0': 'Emissão de NF-e com aplicativo do contribuinte',
      '1': 'Emissão de NF-e avulsa pelo Fisco',
      '2': 'Emissão de NF-e avulsa, pelo contribuinte com seu certificado digital, através do site do Fisco',
      '3': 'Emissão NF-e pelo contribuinte com aplicativo fornecido pelo Fisco'
    };
    return processos[procEmi] || procEmi;
  };

  return (
    <Card title="Identificação da NF-e">
      <Descriptions bordered column={2}>
        <Descriptions.Item label="Tipo de Emissão">{getTipoEmissao(ide.tpEmis)}</Descriptions.Item>
        <Descriptions.Item label="Status">{protNFe.cStat}</Descriptions.Item>
        <Descriptions.Item label="Número">{ide.nNF}</Descriptions.Item>
        <Descriptions.Item label="Série">{ide.serie}</Descriptions.Item>
        <Descriptions.Item label="Data/Hora de Emissão">{ide.dhEmi}</Descriptions.Item>
        <Descriptions.Item label="Tipo de Operação">{getTipoOperacao(ide.tpNF)}</Descriptions.Item>
        <Descriptions.Item label="Destino da Operação">{getDestinoOperacao(ide.idDest)}</Descriptions.Item>
        <Descriptions.Item label="Município do Fato Gerador">{ide.cMunFG}</Descriptions.Item>
        <Descriptions.Item label="Tipo de Impressão">{getTipoImpressao(ide.tpImp)}</Descriptions.Item>
        <Descriptions.Item label="Ambiente">{getAmbiente(ide.tpAmb)}</Descriptions.Item>
        <Descriptions.Item label="Finalidade de Emissão">{getFinalidadeEmissao(ide.finNFe)}</Descriptions.Item>
        <Descriptions.Item label="Consumidor Final">{getConsumidorFinal(ide.indFinal)}</Descriptions.Item>
        <Descriptions.Item label="Presença do Comprador">{getPresencaComprador(ide.indPres)}</Descriptions.Item>
        <Descriptions.Item label="Processo de Emissão">{getProcessoEmissao(ide.procEmi)}</Descriptions.Item>
        <Descriptions.Item label="Versão do Processo">{ide.verProc}</Descriptions.Item>
        {ide.dhCont && (
          <Descriptions.Item label="Data/Hora Contingência">{ide.dhCont}</Descriptions.Item>
        )}
        {ide.xJust && (
          <Descriptions.Item label="Justificativa Contingência">{ide.xJust}</Descriptions.Item>
        )}
        <Descriptions.Item label="Motivo do Status">{protNFe.xMotivo}</Descriptions.Item>
        <Descriptions.Item label="Data/Hora do Recebimento">{protNFe.dhRecbto}</Descriptions.Item>
        <Descriptions.Item label="Protocolo">{protNFe.nProt}</Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default TabIdentificacaoNFe;
