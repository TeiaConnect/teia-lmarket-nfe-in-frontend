import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import IdentificacaoNFe from './IdentificacaoNFe';
import ReferenciaNFe from './ReferenciaNFe';

interface AppProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  nfeData: any; 
}

const onChange = (key: string) => {
  console.log(key);
};

const App: React.FC<AppProps> = ({ nfeData }) => {
  console.log(nfeData);
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Identificação NF-e',
      children: <IdentificacaoNFe status={nfeData.identificacao_nfe.status} ultimaAtividade={nfeData.identificacao_nfe.ultima_atividade} statusAtividade={nfeData.identificacao_nfe.status_atividade} codigoStatus={nfeData.identificacao_nfe.codigo_status} descricaoStatus={nfeData.identificacao_nfe.descricao_status} codigoMensagem={nfeData.identificacao_nfe.codigo_mensagem} mensagemSefaz={nfeData.identificacao_nfe.mensagem_sefaz} numeroNFe={nfeData.identificacao_nfe.numero_nfe} serie={nfeData.identificacao_nfe.serie} modelo={nfeData.identificacao_nfe.modelo} numeroAleatorio={nfeData.identificacao_nfe.numero_aleatorio} digitoVerificador={nfeData.identificacao_nfe.digito_verificador} codigoUF={nfeData.identificacao_nfe.codigo_uf} dataHoraEmissao={nfeData.identificacao_nfe.data_hora_emissao} idProcesso={nfeData.identificacao_nfe.id_processo} vrAplicativo={nfeData.identificacao_nfe.vr_aplicativo} tipoEmissao={nfeData.identificacao_nfe.tipo_emissao} finalidadeEmissao={nfeData.identificacao_nfe.finalidade_emissao} dirMovimentoMerc={nfeData.identificacao_nfe.dir_movimento_merc} ambAutorids={nfeData.identificacao_nfe.amb_autorids} hSaidaMercado={nfeData.identificacao_nfe.h_saida_mercado} descricaoOper={nfeData.identificacao_nfe.descricao_oper} codCidade={nfeData.identificacao_nfe.cod_cidade} formatoDANFE={nfeData.identificacao_nfe.formato_danfe} motivoConting={nfeData.identificacao_nfe.motivo_conting} horaExcecao={nfeData.identificacao_nfe.hora_excecao} localDestino={nfeData.identificacao_nfe.local_destino} consumFinal={nfeData.identificacao_nfe.consum_final} presenComprad={nfeData.identificacao_nfe.presen_comprad} codigoCorretor={nfeData.identificacao_nfe.codigo_corretor} />,
    },
    {
      key: '2',
      label: 'Referência NF-e/CT-e',
      children: <ReferenciaNFe status={nfeData.referencia_nfe.status} ultimaAtividade={nfeData.referencia_nfe.ultima_atividade} statusAtividade={nfeData.referencia_nfe.status_atividade} codigoStatus={nfeData.referencia_nfe.codigo_status} descricaoStatus={nfeData.referencia_nfe.descricao_status} codigoMensagem={nfeData.referencia_nfe.codigo_mensagem} mensagemSefaz={nfeData.referencia_nfe.mensagem_sefaz} />,
    },
  ];

  return <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
};

export default App;
