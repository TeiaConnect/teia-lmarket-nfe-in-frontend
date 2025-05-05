'use client';

import React, { useState } from 'react';
import { Button, Table, Typography, Row, Col, Alert, Tabs, Tag } from 'antd';
import { FaArrowLeft } from 'react-icons/fa';
import { InfoCircleOutlined } from '@ant-design/icons';
import SimulacaoFaturaTabelaItens from './components/SimulacaoFaturaTabelaItens';

const { Text } = Typography;
const { TabPane } = Tabs;

interface SimulacaoFaturaProps {
  nfeData: any;
  onVoltar: () => void;
}

const columns = [
  { title: 'Nº do item', dataIndex: 'numeroItem', key: 'numeroItem' },
  { title: 'Categoria', dataIndex: 'categoria', key: 'categoria' },
  { title: 'Nº pedido', dataIndex: 'numeroPedido', key: 'numeroPedido' },
  { title: 'Item pedido', dataIndex: 'itemPedido', key: 'itemPedido' },
  { title: 'Qtd.', dataIndex: 'quantidade', key: 'quantidade' },
  { title: 'Unidade', dataIndex: 'unidade', key: 'unidade' },
  { title: 'Código material', dataIndex: 'codigoMaterial', key: 'codigoMaterial' },
  { title: 'Descrição', dataIndex: 'descricao', key: 'descricao' },
  { title: 'CFOP', dataIndex: 'cfop', key: 'cfop' },
  { title: 'Cód. imposto', dataIndex: 'codImposto', key: 'codImposto' },
  { title: 'Frete', dataIndex: 'frete', key: 'frete' },
  { title: 'Valor Seguro', dataIndex: 'valorSeguro', key: 'valorSeguro' },
  { title: 'Origem', dataIndex: 'origem', key: 'origem' },
  { title: 'NCM', dataIndex: 'ncm', key: 'ncm' },
];

const campoTooltip = (label: string, tooltip: string, valor: React.ReactNode, destaque?: boolean) => (
  <div style={{ marginBottom: 4 }}>
    <span style={{ fontWeight: 500 }}>{label} <InfoCircleOutlined style={{ fontSize: 12, color: '#888' }} title={tooltip} /></span>:
    <span style={{ color: destaque ? '#d4380d' : undefined, fontWeight: destaque ? 700 : undefined, marginLeft: 4 }}>{valor}</span>
    {destaque && <Tag color="red" style={{ marginLeft: 8 }}>Divergente</Tag>}
  </div>
);

// Mock criativo de múltiplos itens para visualização rica
const mockItens = [
  {
    numeroItem: 1,
    categoria: 'Chinelos',
    numeroPedido: '4501215661',
    itemPedido: 130,
    quantidade: 167,
    unidade: 'PAR',
    codigoMaterial: '00000001016731001',
    descricao: 'CHINELO AL4401 EVA AZUL CEU',
    cfop: '2101AA',
    codImposto: 'I5',
    frete: '0,00',
    valorSeguro: '0,00',
    origem: 'Nacional',
    ncm: '64029990',
    status: 'divergente' as const,
    motivoDivergencia: 'Valor divergente',
    ultimaAcao: 'Justificado por João em 10/06',
    responsavel: 'João',
    valorTotal: '3.429,08',
    simulacao: {
      frete: '0,00', valorSeguro: '0,00', origem: 'Nacional', ncm: '64029990', valorTotal: '3.840,57', descricao: 'CHINELO AL4401 EVA AZUL CEU', quantidade: '167,0000', cfop: '2101AA', codImposto: 'I5'
    },
    impostos: { ICMS: '180,00', IPI: '50,00', PIS: '10,00', COFINS: '20,00' },
    condicoesImposto: { ICMS: '00', IPI: '50', PIS: '01', COFINS: '01' },
    condicoesDetalhadas: [
      { codigo: 'ICM1', imposto: 'ICMS', base: '3.429,08', aliquota: '18' },
      { codigo: 'IPI1', imposto: 'IPI', base: '0,00', aliquota: '5' },
      { codigo: 'PIS1', imposto: 'PIS', base: '3.017,59', aliquota: '1.65' },
      { codigo: 'COF1', imposto: 'COFINS', base: '3.017,59', aliquota: '7.6' }
    ]
  },
  {
    numeroItem: 2,
    categoria: 'Sandália',
    numeroPedido: '4501215662',
    itemPedido: 140,
    quantidade: 200,
    unidade: 'CX',
    codigoMaterial: '00000002016731002',
    descricao: 'SANDÁLIA CONFORTO FEMININA',
    cfop: '2102BB',
    codImposto: 'I6',
    frete: '50,00',
    valorSeguro: '10,00',
    origem: 'Importado',
    ncm: '64039990',
    status: 'ok' as const,
    ultimaAcao: 'Aprovado por Maria em 09/06',
    responsavel: 'Maria',
    valorTotal: '5.000,00',
    simulacao: {
      frete: '50,00', valorSeguro: '10,00', origem: 'Importado', ncm: '64039990', valorTotal: '5.000,00', descricao: 'SANDÁLIA CONFORTO FEMININA', quantidade: '200,0000', cfop: '2102BB', codImposto: 'I6'
    },
    impostos: { ICMS: '250,00', IPI: '60,00', PIS: '15,00', COFINS: '30,00' },
    condicoesImposto: { ICMS: '10', IPI: '51', PIS: '02', COFINS: '02' },
    condicoesDetalhadas: [
      { codigo: 'ICM1', imposto: 'ICMS', base: '5.000,00', aliquota: '12' },
      { codigo: 'IPI1', imposto: 'IPI', base: '0,00', aliquota: '5' },
      { codigo: 'PIS1', imposto: 'PIS', base: '4.500,00', aliquota: '1.65' },
      { codigo: 'COF1', imposto: 'COFINS', base: '4.500,00', aliquota: '7.6' }
    ]
  },
  {
    numeroItem: 3,
    categoria: 'Brinde',
    numeroPedido: '4501215663',
    itemPedido: 150,
    quantidade: 10,
    unidade: 'UN',
    codigoMaterial: '00000003016731003',
    descricao: 'BOLSA PROMOCIONAL',
    cfop: '2910CC',
    codImposto: 'I7',
    frete: '0,00',
    valorSeguro: '0,00',
    origem: 'Nacional',
    ncm: '42022210',
    status: 'alerta' as const,
    motivoDivergencia: 'Quantidade baixa',
    ultimaAcao: 'Aguardando análise',
    responsavel: 'Carlos',
    valorTotal: '100,00',
    simulacao: {
      frete: '0,00', valorSeguro: '0,00', origem: 'Nacional', ncm: '42022210', valorTotal: '100,00', descricao: 'BOLSA PROMOCIONAL', quantidade: '10,0000', cfop: '2910CC', codImposto: 'I7'
    },
    impostos: { ICMS: '5,00', IPI: '2,00', PIS: '0,50', COFINS: '1,00' },
    condicoesImposto: { ICMS: '20', IPI: '52', PIS: '03', COFINS: '03' },
    condicoesDetalhadas: [
      { codigo: 'ICM1', imposto: 'ICMS', base: '100,00', aliquota: '18' },
      { codigo: 'IPI1', imposto: 'IPI', base: '0,00', aliquota: '5' },
      { codigo: 'PIS1', imposto: 'PIS', base: '90,00', aliquota: '1.65' },
      { codigo: 'COF1', imposto: 'COFINS', base: '90,00', aliquota: '7.6' }
    ]
  },
  {
    numeroItem: 4,
    categoria: 'Item principal',
    numeroPedido: '4501215664',
    itemPedido: 160,
    quantidade: 334,
    unidade: 'PAR',
    codigoMaterial: '00000004016731004',
    descricao: 'CHINELO INFANTIL',
    cfop: '2101AA',
    codImposto: 'I5',
    frete: '0,00',
    valorSeguro: '0,00',
    origem: 'Importado',
    ncm: '64029990',
    status: 'divergente' as const,
    motivoDivergencia: 'Origem divergente',
    ultimaAcao: 'Justificado por Pedro em 07/06',
    responsavel: 'Pedro',
    valorTotal: '3.429,08',
    simulacao: {
      frete: '0,00', valorSeguro: '0,00', origem: 'Nacional', ncm: '64029990', valorTotal: '3.429,08', descricao: 'CHINELO INFANTIL', quantidade: '334,0000', cfop: '2101AA', codImposto: 'I5'
    },
    impostos: { ICMS: '180,00', IPI: '50,00', PIS: '10,00', COFINS: '20,00' },
    condicoesImposto: { ICMS: '00', IPI: '50', PIS: '01', COFINS: '01' },
    condicoesDetalhadas: [
      { codigo: 'ICM1', imposto: 'ICMS', base: '3.429,08', aliquota: '18' },
      { codigo: 'IPI1', imposto: 'IPI', base: '0,00', aliquota: '5' },
      { codigo: 'PIS1', imposto: 'PIS', base: '3.017,59', aliquota: '1.65' },
      { codigo: 'COF1', imposto: 'COFINS', base: '3.017,59', aliquota: '7.6' }
    ]
  },
  {
    numeroItem: 5,
    categoria: 'Chinelos',
    numeroPedido: '4501215665',
    itemPedido: 170,
    quantidade: 334,
    unidade: 'PAR',
    codigoMaterial: '00000005016731005',
    descricao: 'CHINELO AL4401 EVA AZUL CEU',
    cfop: '2101AA',
    codImposto: 'I5',
    frete: '100,00',
    valorSeguro: '0,00',
    origem: 'Nacional',
    ncm: '64029990',
    status: 'divergente' as const,
    motivoDivergencia: 'Frete divergente',
    ultimaAcao: 'Justificado por Lucas em 06/06',
    responsavel: 'Lucas',
    valorTotal: '3.429,08',
    simulacao: {
      frete: '0,00', valorSeguro: '0,00', origem: 'Nacional', ncm: '64029990', valorTotal: '3.429,08', descricao: 'CHINELO AL4401 EVA AZUL CEU', quantidade: '334,0000', cfop: '2101AA', codImposto: 'I5'
    },
    impostos: { ICMS: '180,00', IPI: '50,00', PIS: '10,00', COFINS: '20,00' },
    condicoesImposto: { ICMS: '00', IPI: '50', PIS: '01', COFINS: '01' },
    condicoesDetalhadas: [
      { codigo: 'ICM1', imposto: 'ICMS', base: '3.429,08', aliquota: '18' },
      { codigo: 'IPI1', imposto: 'IPI', base: '0,00', aliquota: '5' },
      { codigo: 'PIS1', imposto: 'PIS', base: '3.017,59', aliquota: '1.65' },
      { codigo: 'COF1', imposto: 'COFINS', base: '3.017,59', aliquota: '7.6' }
    ]
  }
];

const SimulacaoFatura: React.FC<SimulacaoFaturaProps> = ({ nfeData, onVoltar }) => {
  // Sempre usar o mockItens para exibição
  const itensParaExibir = mockItens;
  const [selectedItemKey, setSelectedItemKey] = useState<number>(mockItens[0].numeroItem);
  const selectedItem = itensParaExibir.find((item: any) => Number(item.numeroItem) === Number(selectedItemKey)) || itensParaExibir[0];

  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f0f0f0', padding: 0, margin: 0 }}>
      {/* Cabeçalho SAP */}
      <div style={{ backgroundColor: '#354966', padding: '8px 16px', display: 'flex', alignItems: 'center', color: 'white', fontWeight: 500, fontSize: 16 }}>
        <span>Simulação de Fatura e NF-e</span>
      </div>
      {/* Barra de ações */}
      <div style={{ padding: '8px 16px', backgroundColor: '#fff', borderBottom: '1px solid #ccc', display: 'flex', gap: '8px', alignItems: 'center' }}>
        <Button icon={<FaArrowLeft />} onClick={onVoltar}>Voltar</Button>
      </div>
      {/* Conteúdo */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 0, width: '100%' }}>
        {/* Informações principais */}
        <div style={{ background: '#fff', padding: '16px 16px 0 16px', borderBottom: '1px solid #eee' }}>
          <Row gutter={24}>
            <Col span={8}><Text strong>Emitente:</Text> {nfeData.emitente.nome}</Col>
            <Col span={8}><Text strong>Destinatário:</Text> {nfeData.destinatario.nome}</Col>
            <Col span={8}><Text strong>Valor total:</Text> R$ {nfeData.valorTotal}</Col>
          </Row>
        </div>
        {/* Mensagens de alerta */}
        {nfeData.mensagens.map((msg: string, idx: number) => (
          <div key={idx} style={{ background: '#fff', padding: '0 16px' }}>
            <Alert message={msg} type="warning" showIcon style={{ margin: '8px 0' }} />
          </div>
        ))}
        {/* Tabela de itens */}
        <div style={{ background: '#fff', padding: 16, borderBottom: '1px solid #eee' }}>
          <SimulacaoFaturaTabelaItens
            itens={itensParaExibir}
            selectedItemKey={selectedItemKey}
            onSelectItem={setSelectedItemKey}
          />
        </div>
        {/* Barra de ações das abas */}
        <div style={{ background: '#fff', padding: '8px 16px 0 16px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
          <Button type="primary">Gravar Simulação</Button>
        </div>
        {/* Detalhes do item selecionado */}
        {selectedItem && (
          <div style={{ background: '#fff', padding: 16, borderTop: '1px solid #eee' }}>
            <Tabs defaultActiveKey="1">
              <TabPane tab="Valores" key="1">
                <Row gutter={24}>
                  <Col span={12}>
                    <h4>NF-e</h4>
                    {campoTooltip('CFOP', 'Código Fiscal de Operações e Prestações', selectedItem.cfop, selectedItem.cfop !== selectedItem.simulacao?.cfop)}
                    {campoTooltip('Descrição', 'Descrição do produto conforme NF-e', selectedItem.descricao, selectedItem.descricao !== selectedItem.simulacao?.descricao)}
                    {campoTooltip('Quantidade', 'Quantidade informada na NF-e', selectedItem.quantidade, selectedItem.quantidade !== selectedItem.simulacao?.quantidade)}
                    {campoTooltip('Frete', 'Valor do frete informado na NF-e', selectedItem.frete, selectedItem.frete !== selectedItem.simulacao?.frete)}
                    {campoTooltip('Valor total', 'Valor total do item na NF-e', selectedItem.valorTotal || selectedItem.simulacao?.valorTotal, (selectedItem.valorTotal || selectedItem.simulacao?.valorTotal) !== selectedItem.simulacao?.valorTotal)}
                    {campoTooltip('Valor seguro', 'Valor do seguro informado na NF-e', selectedItem.valorSeguro, selectedItem.valorSeguro !== selectedItem.simulacao?.valorSeguro)}
                    {campoTooltip('Origem', 'Origem do material conforme NF-e', selectedItem.origem, selectedItem.origem !== selectedItem.simulacao?.origem)}
                    {campoTooltip('NCM', 'Nomenclatura Comum do Mercosul', selectedItem.ncm, selectedItem.ncm !== selectedItem.simulacao?.ncm)}
                  </Col>
                  <Col span={12}>
                    <h4>Simulação</h4>
                    {campoTooltip('CFOP', 'Código Fiscal de Operações e Prestações', selectedItem.simulacao?.cfop, selectedItem.cfop !== selectedItem.simulacao?.cfop)}
                    {campoTooltip('Descrição', 'Descrição do produto conforme simulação', selectedItem.simulacao?.descricao, selectedItem.descricao !== selectedItem.simulacao?.descricao)}
                    {campoTooltip('Quantidade', 'Quantidade informada na simulação', selectedItem.simulacao?.quantidade, selectedItem.quantidade !== selectedItem.simulacao?.quantidade)}
                    {campoTooltip('Frete', 'Valor do frete informado na simulação', selectedItem.simulacao?.frete, selectedItem.frete !== selectedItem.simulacao?.frete)}
                    {campoTooltip('Valor total', 'Valor total do item na simulação', selectedItem.simulacao?.valorTotal, (selectedItem.valorTotal || selectedItem.simulacao?.valorTotal) !== selectedItem.simulacao?.valorTotal)}
                    {campoTooltip('Valor seguro', 'Valor do seguro informado na simulação', selectedItem.simulacao?.valorSeguro, selectedItem.valorSeguro !== selectedItem.simulacao?.valorSeguro)}
                    {campoTooltip('Origem', 'Origem do material conforme simulação', selectedItem.simulacao?.origem, selectedItem.origem !== selectedItem.simulacao?.origem)}
                    {campoTooltip('NCM', 'Nomenclatura Comum do Mercosul', selectedItem.simulacao?.ncm, selectedItem.ncm !== selectedItem.simulacao?.ncm)}
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab="Impostos" key="2">
                <Row gutter={24} justify="center">
                  <Col span={24} style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{
                      width: '100%',
                      background: '#fff',
                      borderRadius: 12,
                      boxShadow: '0 2px 12px #0001',
                      padding: 24,
                      overflowX: 'auto',
                      border: '1px solid #f0f0f0'
                    }}>
                      <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
                        <thead>
                          <tr style={{ background: 'linear-gradient(90deg, #e6f7ff 0%, #fafafa 100%)' }}>
                            <th style={{ padding: '12px 8px', textAlign: 'center', fontWeight: 700, borderTopLeftRadius: 8 }}>Imposto</th>
                            <th style={{ padding: '12px 8px', textAlign: 'center', fontWeight: 700 }}>NF-e</th>
                            <th style={{ padding: '12px 8px', textAlign: 'center', fontWeight: 700 }}>Simulação</th>
                            <th style={{ padding: '12px 8px', textAlign: 'center', fontWeight: 700, borderTopRightRadius: 8 }}>Divergência</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(['ICMS', 'IPI', 'PIS', 'COFINS'] as const).map((imposto, idx) => {
                            const nfeValor = selectedItem.impostos && selectedItem.impostos[imposto] ? selectedItem.impostos[imposto] : '0,00';
                            const simulacaoImpostos: Record<string, string> = (selectedItem.simulacao && typeof selectedItem.simulacao === 'object' && 'impostos' in selectedItem.simulacao && typeof selectedItem.simulacao.impostos === 'object') ? selectedItem.simulacao.impostos as Record<string, string> : {};
                            const simulacaoValor = simulacaoImpostos[imposto] ? simulacaoImpostos[imposto] : nfeValor;
                            const divergente = nfeValor !== simulacaoValor;
                            return (
                              <tr key={imposto} style={{ background: idx % 2 === 0 ? '#f9fafb' : '#fff' }}>
                                <td style={{ padding: '10px 8px', textAlign: 'center', fontWeight: 500 }}>{imposto}</td>
                                <td style={{ padding: '10px 8px', textAlign: 'center' }}>R$ {nfeValor}</td>
                                <td style={{ padding: '10px 8px', textAlign: 'center' }}>R$ {simulacaoValor}</td>
                                <td style={{ padding: '10px 8px', textAlign: 'center' }}>{divergente && <Tag color="red">Divergente</Tag>}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab="Condições de Imposto" key="3">
                <Row gutter={24} justify="center">
                  <Col span={24} style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{
                      width: '100%',
                      background: '#fff',
                      borderRadius: 12,
                      boxShadow: '0 2px 12px #0001',
                      padding: 24,
                      overflowX: 'auto',
                      border: '1px solid #f0f0f0'
                    }}>
                      <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
                        <thead>
                          <tr style={{ background: 'linear-gradient(90deg, #e6f7ff 0%, #fafafa 100%)' }}>
                            <th style={{ padding: '12px 8px', textAlign: 'center', fontWeight: 700, borderTopLeftRadius: 8 }}>Condição SAP</th>
                            <th style={{ padding: '12px 8px', textAlign: 'center', fontWeight: 700 }}>Imposto</th>
                            <th style={{ padding: '12px 8px', textAlign: 'center', fontWeight: 700 }}>Base de Cálculo</th>
                            <th style={{ padding: '12px 8px', textAlign: 'center', fontWeight: 700 }}>Alíquota (%)</th>
                            <th style={{ padding: '12px 8px', textAlign: 'center', fontWeight: 700, borderTopRightRadius: 8 }}>Valor do Imposto</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedItem.condicoesDetalhadas && selectedItem.condicoesDetalhadas.map((cond: any, idx: number) => {
                            const base = Number((cond.base || '0').replace(/\./g, '').replace(',', '.'));
                            const aliquota = Number((cond.aliquota || '0').replace(',', '.'));
                            const valor = base * aliquota / 100;
                            return (
                              <tr key={cond.codigo + idx} style={{ background: idx % 2 === 0 ? '#f9fafb' : '#fff' }}>
                                <td style={{ padding: '10px 8px', textAlign: 'center', fontWeight: 500 }}>{cond.codigo}</td>
                                <td style={{ padding: '10px 8px', textAlign: 'center' }}>{cond.imposto}</td>
                                <td style={{ padding: '10px 8px', textAlign: 'center' }}>{cond.base}</td>
                                <td style={{ padding: '10px 8px', textAlign: 'center' }}>{cond.aliquota}</td>
                                <td style={{ padding: '10px 8px', textAlign: 'center', fontWeight: 700, color: '#1890ff' }}>{valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </Col>
                </Row>
              </TabPane>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimulacaoFatura; 