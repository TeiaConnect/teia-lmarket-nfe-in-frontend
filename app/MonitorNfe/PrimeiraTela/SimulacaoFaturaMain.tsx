'use client';

import React, { useState } from 'react';
import { Button, Input, Badge, Row, Col, Space, Tooltip, message, Tabs, Skeleton, Tag } from 'antd';
import { SearchOutlined, FileExcelOutlined, PrinterOutlined, CopyOutlined, ExclamationCircleOutlined, CheckCircleOutlined, QuestionCircleOutlined, ArrowLeftOutlined, FilterOutlined, InfoCircleOutlined } from '@ant-design/icons';
import SimulacaoFaturaHeader from './components/SimulacaoFaturaHeader';
import SimulacaoFaturaMensagens from './components/SimulacaoFaturaMensagens';
import SimulacaoFaturaTabelaItens from './components/SimulacaoFaturaTabelaItens';

// Dados mockados para exemplo
const mockData = {
  titulo: 'Simulação de Fatura e NF-e',
  cnpjEmissor: '07.352.128/0001-63',
  nomeEmissor: 'ATTA INDUSTRIAL LTDA',
  cnpjDestinatario: '86.900.925/0001-04',
  nomeDestinatario: 'USAFLEX - INDUSTRIA & COMERCIO S/A',
  valorTotal: '30.861,72',
  statusGeral: 'Divergências encontradas',
  mensagensGerais: [
    'Existem mensagens no nível de item',
    'Preço abaixo do limite: limite tolerância de 10,00 % não será atingido',
  ],
  mensagensPorItem: [
    { item: '1', mensagem: 'Divergência de valor: produto 3.429,08 em NF-e difere do valor calculado 3.840,57', detalhes: 'Verifique o preço cadastrado no pedido.' },
    { item: '3', mensagem: 'Divergência de NCM: 64029990 (NF-e) x 64062000 (Simulação)', detalhes: 'NCM divergente entre NF-e e cadastro.' },
    { item: '4', mensagem: 'Divergência de origem do material', detalhes: 'Origem informada na NF-e difere do cadastro.' },
    { item: '5', mensagem: 'Divergência de frete: 0,00 (NF-e) x 100,00 (Simulação)', detalhes: 'Frete informado na simulação não consta na NF-e.' },
  ],
  itens: [
    {
      numeroItem: 1,
      categoria: 'Item principal',
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
      status: 'divergente',
      motivoDivergencia: 'Valor divergente',
      ultimaAcao: 'Justificado por João em 10/06',
      responsavel: 'João',
      simulacao: {
        frete: '0,00', valorSeguro: '0,00', origem: 'Nacional', ncm: '64029990', valorTotal: '3.840,57', descricao: 'CHINELO AL4401 EVA AZUL CEU', quantidade: '167,0000', cfop: '2101AA', codImposto: 'I5'
      }
    },
    {
      numeroItem: 2,
      categoria: 'Item principal',
      numeroPedido: '4501215661',
      itemPedido: 140,
      quantidade: 167,
      unidade: 'PAR',
      codigoMaterial: '00000001016731002',
      descricao: 'CHINELO AL4401 EVA AZUL CEU',
      cfop: '2101AA',
      codImposto: 'I5',
      frete: '0,00',
      valorSeguro: '0,00',
      origem: 'Nacional',
      ncm: '64029990',
      status: 'ok',
      ultimaAcao: 'Aprovado por Maria em 09/06',
      responsavel: 'Maria',
      simulacao: {
        frete: '0,00', valorSeguro: '0,00', origem: 'Nacional', ncm: '64029990', valorTotal: '3.429,08', descricao: 'CHINELO AL4401 EVA AZUL CEU', quantidade: '167,0000', cfop: '2101AA', codImposto: 'I5'
      }
    },
    {
      numeroItem: 3,
      categoria: 'Item principal',
      numeroPedido: '4501215661',
      itemPedido: 150,
      quantidade: 334,
      unidade: 'PAR',
      codigoMaterial: '00000001016731003',
      descricao: 'CHINELO AL4401 EVA AZUL CEU',
      cfop: '2101AA',
      codImposto: 'I5',
      frete: '0,00',
      valorSeguro: '0,00',
      origem: 'Nacional',
      ncm: '64029990',
      status: 'divergente',
      motivoDivergencia: 'NCM divergente',
      ultimaAcao: 'Justificado por Ana em 08/06',
      responsavel: 'Ana',
      simulacao: {
        frete: '0,00', valorSeguro: '0,00', origem: 'Nacional', ncm: '64062000', valorTotal: '3.429,08', descricao: 'CHINELO AL4401 EVA AZUL CEU', quantidade: '334,0000', cfop: '2101AA', codImposto: 'I5'
      }
    },
    {
      numeroItem: 4,
      categoria: 'Item principal',
      numeroPedido: '4501215661',
      itemPedido: 160,
      quantidade: 334,
      unidade: 'PAR',
      codigoMaterial: '00000001016731004',
      descricao: 'CHINELO AL4401 EVA AZUL CEU',
      cfop: '2101AA',
      codImposto: 'I5',
      frete: '0,00',
      valorSeguro: '0,00',
      origem: 'Importado',
      ncm: '64029990',
      status: 'divergente',
      motivoDivergencia: 'Origem divergente',
      ultimaAcao: 'Justificado por Pedro em 07/06',
      responsavel: 'Pedro',
      simulacao: {
        frete: '0,00', valorSeguro: '0,00', origem: 'Nacional', ncm: '64029990', valorTotal: '3.429,08', descricao: 'CHINELO AL4401 EVA AZUL CEU', quantidade: '334,0000', cfop: '2101AA', codImposto: 'I5'
      }
    },
    {
      numeroItem: 5,
      categoria: 'Item principal',
      numeroPedido: '4501215661',
      itemPedido: 170,
      quantidade: 334,
      unidade: 'PAR',
      codigoMaterial: '00000001016731005',
      descricao: 'CHINELO AL4401 EVA AZUL CEU',
      cfop: '2101AA',
      codImposto: 'I5',
      frete: '0,00',
      valorSeguro: '0,00',
      origem: 'Nacional',
      ncm: '64029990',
      status: 'divergente',
      motivoDivergencia: 'Frete divergente',
      ultimaAcao: 'Justificado por Lucas em 06/06',
      responsavel: 'Lucas',
      simulacao: {
        frete: '100,00', valorSeguro: '0,00', origem: 'Nacional', ncm: '64029990', valorTotal: '3.429,08', descricao: 'CHINELO AL4401 EVA AZUL CEU', quantidade: '334,0000', cfop: '2101AA', codImposto: 'I5'
      }
    },
    {
      numeroItem: 6,
      categoria: 'Item principal',
      numeroPedido: '4501215661',
      itemPedido: 180,
      quantidade: 167,
      unidade: 'PAR',
      codigoMaterial: '00000001016731006',
      descricao: 'CHINELO AL4401 EVA AZUL CEU',
      cfop: '2101AA',
      codImposto: 'I5',
      frete: '0,00',
      valorSeguro: '0,00',
      origem: 'Nacional',
      ncm: '64029990',
      status: 'ok',
      ultimaAcao: 'Aprovado por Maria em 09/06',
      responsavel: 'Maria',
      simulacao: {
        frete: '0,00', valorSeguro: '0,00', origem: 'Nacional', ncm: '64029990', valorTotal: '3.429,08', descricao: 'CHINELO AL4401 EVA AZUL CEU', quantidade: '167,0000', cfop: '2101AA', codImposto: 'I5'
      }
    },
  ],
};

const { TabPane } = Tabs;

const campoTooltip = (label: string, tooltip: string, valor: React.ReactNode, destaque?: boolean) => (
  <div style={{ marginBottom: 4 }}>
    <Tooltip title={tooltip} placement="right">
      <span style={{ fontWeight: 500 }}>{label} <InfoCircleOutlined style={{ fontSize: 12, color: '#888' }} /></span>
    </Tooltip>:
    <span style={{ color: destaque ? '#d4380d' : undefined, fontWeight: destaque ? 700 : undefined, marginLeft: 4 }}>{valor}</span>
    {destaque && <Tag color="red" style={{ marginLeft: 8 }}>Divergente</Tag>}
  </div>
);

const SimulacaoFaturaMain: React.FC = () => {
  const [selectedItemKey, setSelectedItemKey] = useState<number>(mockData.itens[0].numeroItem);
  const [busca, setBusca] = useState('');
  const [filtroStatus, setFiltroStatus] = useState<'todos' | 'divergente' | 'ok'>('todos');
  const [loading, setLoading] = useState(false);

  // Filtros e busca
  const itensFiltrados = mockData.itens.filter(item => {
    if (filtroStatus !== 'todos' && item.status !== filtroStatus) return false;
    if (busca && !(
      item.numeroPedido.includes(busca) ||
      item.codigoMaterial.includes(busca) ||
      item.descricao.toLowerCase().includes(busca.toLowerCase()) ||
      item.cfop.includes(busca)
    )) return false;
    return true;
  });
  const selectedItem = mockData.itens.find(i => i.numeroItem === selectedItemKey) || mockData.itens[0];

  // Ações rápidas
  const handleExport = () => message.success('Exportação realizada!');
  const handlePrint = () => message.info('Impressão iniciada!');
  const handleCopy = () => message.success('Copiado para área de transferência!');
  const handleVerDivergencias = () => setFiltroStatus('divergente');

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: '#f0f2f5', display: 'flex', flexDirection: 'column' }}>
      {/* Cabeçalho */}
      <SimulacaoFaturaHeader
        titulo={mockData.titulo}
        cnpjEmissor={mockData.cnpjEmissor}
        nomeEmissor={mockData.nomeEmissor}
        cnpjDestinatario={mockData.cnpjDestinatario}
        nomeDestinatario={mockData.nomeDestinatario}
        valorTotal={mockData.valorTotal}
      />
      {/* Barra de ações */}
      <div style={{ background: '#fff', borderBottom: '1px solid #eee', padding: '8px 24px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <Button icon={<ArrowLeftOutlined />}>Voltar</Button>
        <Button icon={<FileExcelOutlined />} onClick={handleExport}>Exportar</Button>
        <Button icon={<PrinterOutlined />} onClick={handlePrint}>Imprimir</Button>
        <Button icon={<CopyOutlined />} onClick={handleCopy}>Copiar</Button>
        <Button icon={<FilterOutlined />} onClick={handleVerDivergencias}>
          Ver divergências <Badge count={mockData.itens.filter(i => i.status === 'divergente').length} style={{ backgroundColor: '#faad14', marginLeft: 8 }} />
        </Button>
        <Tooltip title="Ajuda sobre a simulação de fatura">
          <Button shape="circle" icon={<QuestionCircleOutlined />} />
        </Tooltip>
        <Input
          prefix={<SearchOutlined />}
          placeholder="Buscar por código, descrição, CFOP..."
          style={{ width: 280, marginLeft: 'auto' }}
          value={busca}
          onChange={e => setBusca(e.target.value)}
        />
      </div>
      {/* Mensagens */}
      <div style={{ maxWidth: 1400, margin: '0 auto', width: '100%' }}>
        <SimulacaoFaturaMensagens
          mensagensGerais={mockData.mensagensGerais}
          mensagensPorItem={mockData.mensagensPorItem}
        />
      </div>
      {/* Tabela de itens */}
      <div style={{ maxWidth: 1400, margin: '0 auto', width: '100%' }}>
        <SimulacaoFaturaTabelaItens
          itens={itensFiltrados}
          selectedItemKey={selectedItemKey}
          onSelectItem={setSelectedItemKey}
        />
      </div>
      {/* Detalhes do item selecionado */}
      <div style={{ maxWidth: 1400, margin: '0 auto', width: '100%', background: '#fff', marginTop: 0, borderTop: '1px solid #eee', padding: 24 }}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Valores" key="1">
            <Row gutter={24}>
              <Col span={12}>
                <h4>NF-e</h4>
                {campoTooltip('CFOP', 'Código Fiscal de Operações e Prestações', selectedItem.cfop, selectedItem.cfop !== selectedItem.simulacao.cfop)}
                {campoTooltip('Descrição', 'Descrição do produto conforme NF-e', selectedItem.descricao, selectedItem.descricao !== selectedItem.simulacao.descricao)}
                {campoTooltip('Quantidade', 'Quantidade informada na NF-e', selectedItem.quantidade, selectedItem.quantidade !== selectedItem.simulacao.quantidade)}
                {campoTooltip('Frete', 'Valor do frete informado na NF-e', selectedItem.frete, selectedItem.frete !== selectedItem.simulacao.frete)}
                {campoTooltip('Valor total produto', 'Valor total do produto na NF-e', selectedItem.simulacao.valorTotal, selectedItem.simulacao.valorTotal !== selectedItem.simulacao.valorTotal)}
                {campoTooltip('Valor seguro', 'Valor do seguro informado na NF-e', selectedItem.valorSeguro, selectedItem.valorSeguro !== selectedItem.simulacao.valorSeguro)}
                {campoTooltip('Origem', 'Origem do material conforme NF-e', selectedItem.origem, selectedItem.origem !== selectedItem.simulacao.origem)}
                {campoTooltip('NCM', 'Nomenclatura Comum do Mercosul', selectedItem.ncm, selectedItem.ncm !== selectedItem.simulacao.ncm)}
              </Col>
              <Col span={12}>
                <h4>Simulação</h4>
                {campoTooltip('CFOP', 'Código Fiscal de Operações e Prestações', selectedItem.simulacao.cfop, selectedItem.cfop !== selectedItem.simulacao.cfop)}
                {campoTooltip('Descrição', 'Descrição do produto conforme simulação', selectedItem.simulacao.descricao, selectedItem.descricao !== selectedItem.simulacao.descricao)}
                {campoTooltip('Quantidade', 'Quantidade informada na simulação', selectedItem.simulacao.quantidade, selectedItem.quantidade !== selectedItem.simulacao.quantidade)}
                {campoTooltip('Frete', 'Valor do frete informado na simulação', selectedItem.simulacao.frete, selectedItem.frete !== selectedItem.simulacao.frete)}
                {campoTooltip('Valor total produto', 'Valor total do produto na simulação', selectedItem.simulacao.valorTotal, selectedItem.simulacao.valorTotal !== selectedItem.simulacao.valorTotal)}
                {campoTooltip('Valor seguro', 'Valor do seguro informado na simulação', selectedItem.simulacao.valorSeguro, selectedItem.valorSeguro !== selectedItem.simulacao.valorSeguro)}
                {campoTooltip('Origem', 'Origem do material conforme simulação', selectedItem.simulacao.origem, selectedItem.origem !== selectedItem.simulacao.origem)}
                {campoTooltip('NCM', 'Nomenclatura Comum do Mercosul', selectedItem.simulacao.ncm, selectedItem.ncm !== selectedItem.simulacao.ncm)}
              </Col>
            </Row>
          </TabPane>
          <TabPane tab="Impostos" key="2">
            <Row gutter={24}>
              <Col span={24}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#f5f5f5' }}>
                      <th>Grupo de impostos</th>
                      <th>Situação fiscal</th>
                      <th>Montante básico</th>
                      <th>Tx. imposto</th>
                      <th>Valor fiscal</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>ICMS</td>
                      <td>00</td>
                      <td>3.429,08</td>
                      <td>12,00</td>
                      <td>411,49</td>
                    </tr>
                    <tr>
                      <td>IPI</td>
                      <td>51</td>
                      <td>0,00</td>
                      <td>0,00</td>
                      <td>0,00</td>
                    </tr>
                    <tr>
                      <td>PIS</td>
                      <td>51</td>
                      <td>3.017,59</td>
                      <td>1,86</td>
                      <td>56,58</td>
                    </tr>
                    <tr>
                      <td>COFINS</td>
                      <td>01</td>
                      <td>3.017,59</td>
                      <td>7,00</td>
                      <td>260,61</td>
                    </tr>
                  </tbody>
                </table>
              </Col>
            </Row>
          </TabPane>
          <TabPane tab="Condições de imposto" key="3">
            <Row gutter={24}>
              <Col span={24}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#f5f5f5' }}>
                      <th>Nível</th>
                      <th>TpCo</th>
                      <th>Regra</th>
                      <th>NºSq</th>
                      <th>Montante</th>
                      <th>por</th>
                      <th>Moeda</th>
                      <th>Valor da condição</th>
                      <th>Est.</th>
                      <th>ClCond.</th>
                      <th>ChvCt</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>381</td><td>BXB3</td><td>B</td><td>10</td><td>0,00</td><td>0</td><td>BRL</td><td>56,58</td><td>x</td><td>A</td><td>ICM</td>
                    </tr>
                    <tr>
                      <td>382</td><td>BXBR</td><td>B</td><td>10</td><td>1,00</td><td>0</td><td>BRL</td><td>3.429,08</td><td>x</td><td>A</td><td>ICM</td>
                    </tr>
                    <tr>
                      <td>415</td><td>ICMI</td><td>A</td><td>10</td><td>1,00</td><td>0</td><td>BRL</td><td>411,49</td><td>x</td><td>A</td><td>ICM</td>
                    </tr>
                  </tbody>
                </table>
              </Col>
            </Row>
          </TabPane>
          <TabPane tab="Histórico/Auditoria" key="4">
            <Row gutter={24}>
              <Col span={24}>
                <ul>
                  <li>10/06/2024 14:32 - Simulação realizada por João</li>
                  <li>10/06/2024 14:35 - Divergência justificada por João: "Preço negociado diferente do pedido"</li>
                  <li>09/06/2024 17:10 - Item aprovado por Maria</li>
                </ul>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default SimulacaoFaturaMain; 