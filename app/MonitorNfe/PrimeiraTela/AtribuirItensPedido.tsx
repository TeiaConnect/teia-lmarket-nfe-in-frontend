'use client';

import React, { useState, useEffect } from 'react';
import { Button, Table, Space, message, Dropdown, Modal, Tabs, Input } from 'antd';
import { EyeOutlined, FileTextOutlined, DownOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { FaFileCode, FaFileInvoice, FaCheck, FaTimes, FaSync, FaPlayCircle, FaBalanceScale, FaRegistered, FaSearch, FaFilter, FaCog } from 'react-icons/fa';
import type { ColumnsType } from 'antd/es/table';
import type { MenuProps } from 'antd';
import './AtribuirItensPedido.css';
import type { RowSelectMethod } from 'antd/es/table/interface';

interface ItemNFe {
  key: string;
  numero: string;
  categoria: string;
  quantidade: number;
  unidade: string;
  codigoMaterial: string;
  descricao: string;
  npedido: string;
  itempedido: string;
}

interface ItemPedido {
  key: string;
  numeroPedido: string;
  itemPedido: string;
  codigoMaterialERP: string;
  descricaoMaterialERP: string;
  quantidadePedido: number;
  unidadeMedidaERP: string;
}

interface ItemAtribuido {
  key: string;
  categoria: string;
  quantidadeNFe: number;
  unidadeMedida: string;
  codigoMaterialNFe: string;
  descricaoProduto: string;
  numeroPedido: string;
  itemPedido: string;
  quantidadeConvertida: number;
  unidadeMedidaERP: string;
  codigoMaterialERP: string;
  descricaoMaterialERP: string;
}

interface ItemPedidoDetalhado {
  key: string;
  numeroItem: string;
  materialERP: string;
  descricaoMaterial: string;
  quantidade: number;
  unidadeMedida: string;
  valorUnitario: number;
  valorTotal: number;
}

export interface AtribuirItensPedidoProps {
  chaveAcesso?: string;
}

interface SearchParams {
  numeroPedido: string;
  itemPedido: string;
  codMaterial: string;
  orgCompras: string;
  grpCompras: string;
  cnpjCpf: string;
  cnpjDest: string;
  nMatErp: string;
  nMatForn: string;
  ncmCodigo: string;
  dataCriacaoDe: string;
  dataCriacaoAte: string;
  dataRecebimentoDe: string;
  dataRecebimentoAte: string;
}

interface PesquisaModalProps {
  visible: boolean;
  onCancel: () => void;
  onSearch: (type: string) => void;
  tipoPesquisa: string;
  searchParams: SearchParams;
  setSearchParams: (params: SearchParams) => void;
}

interface TabItem {
  key: string;
  label: string;
  children: React.ReactNode;
}

const AtribuirItensPedido: React.FC<AtribuirItensPedidoProps> = ({ chaveAcesso }) => {
  const [activeTab, setActiveTab] = useState('1');
  const [modalActiveTab, setModalActiveTab] = useState('1');
  const [itensNFe, setItensNFe] = useState<ItemNFe[]>([]);
  const [itensPedido, setItensPedido] = useState<ItemPedido[]>([]);
  const [itensAtribuidos, setItensAtribuidos] = useState<ItemAtribuido[]>([]);
  const [detalhesNFe, setDetalhesNFe] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSimulacaoXmlVisible, setIsSimulacaoXmlVisible] = useState(false);
  const [isPesquisaModalVisible, setIsPesquisaModalVisible] = useState(false);
  const [tipoPesquisa, setTipoPesquisa] = useState('1'); // 1: Pedido, 2: Pedido e Item, 3: Ampliada

  const [searchParams, setSearchParams] = useState<SearchParams>({
    numeroPedido: '',
    itemPedido: '',
    codMaterial: '',
    orgCompras: '',
    grpCompras: '',
    cnpjCpf: '',
    cnpjDest: '',
    nMatErp: '',
    nMatForn: '',
    ncmCodigo: '',
    dataCriacaoDe: '',
    dataCriacaoAte: '',
    dataRecebimentoDe: '',
    dataRecebimentoAte: ''
  });

  const [selectedNFeItem, setSelectedNFeItem] = useState<ItemNFe | null>(null);
  const [selectedPedidoItem, setSelectedPedidoItem] = useState<ItemPedido | null>(null);

  const [itensPedidoDetalhado, setItensPedidoDetalhado] = useState<ItemPedidoDetalhado[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState<ItemPedidoDetalhado[]>([]);

  useEffect(() => {
    if (chaveAcesso) {
      const carregarDadosNFe = async () => {
        try {
          console.log('Buscando dados da NF-e com chave:', chaveAcesso);
          const response = await fetch(`/api/nfe/inbound?chNFe=${chaveAcesso}`);
          const data = await response.json();
          
          console.log('Dados recebidos:', data);
          
          if (data && data.length > 0) {
            const nfe = data.find((item: any) => 
              item.nfeProc?.protNFe?.infProt?.chNFe === chaveAcesso
            );
            
            console.log('NF-e encontrada:', nfe);
            
            if (nfe?.nfeProc?.NFe?.infNFe?.det) {
              const itens = Array.isArray(nfe.nfeProc.NFe.infNFe.det) 
                ? nfe.nfeProc.NFe.infNFe.det 
                : [nfe.nfeProc.NFe.infNFe.det];

              const itensFormatados: ItemNFe[] = itens.map((item: any, index: number) => ({
                key: String(index + 1),
                numero: item.nItem || String(index + 1),
                // categoria: item.prod.xProd || '',
                quantidade: Number(item.prod.qCom) || 0,
                unidade: item.prod.uCom || '',
                codigoMaterial: item.prod.cProd || '',
                descricao: item.prod.xProd || '',
                npedido: item.prod.xPed || '',
                itempedido: item.prod.nItemPed || ''
              }));

              console.log('Itens formatados:', itensFormatados);
              setItensNFe(itensFormatados);
            } else {
              console.log('Nenhum item encontrado na NF-e');
              setItensNFe([]);
            }
          } else {
            console.log('Nenhuma NF-e encontrada');
            setItensNFe([]);
          }
        } catch (error) {
          console.error('Erro ao carregar dados da NF-e:', error);
          setItensNFe([]);
        }
      };

      carregarDadosNFe();
    }
  }, [chaveAcesso]);

  const handleSearch = async (type: string) => {
    try {
      let queryParams = new URLSearchParams();
      
      switch (type) {
        case '1': // Procurar Pedido
          if (searchParams.numeroPedido) {
            queryParams.append('numeroPedido', searchParams.numeroPedido);
          }
          break;
        case '2': // Procurar Pedido e Item
          if (searchParams.numeroPedido) {
            queryParams.append('numeroPedido', searchParams.numeroPedido);
          }
          if (searchParams.itemPedido) {
            queryParams.append('itemPedido', searchParams.itemPedido);
          }
          break;
        case '3': // Pesquisa Ampliada
          if (searchParams.numeroPedido) {
            queryParams.append('numeroPedido', searchParams.numeroPedido);
          }
          if (searchParams.itemPedido) {
            queryParams.append('itemPedido', searchParams.itemPedido);
          }
          if (searchParams.codMaterial) {
            queryParams.append('codMaterial', searchParams.codMaterial);
          }
          break;
      }

      const response = await fetch(`/api/pedidos?${queryParams.toString()}`);
      const data = await response.json();

      if (data && Array.isArray(data)) {
        const itensFormatados: ItemPedido[] = data.map((item: any, index: number) => ({
          key: String(index + 1),
          numeroPedido: item.numero_pedido || '',
          itemPedido: item.numero_item || '',
          codigoMaterialERP: item.cod_material_erp || '',
          descricaoMaterialERP: item.descricao_material || '',
          quantidadePedido: Number(item.quantidade) || 0,
          unidadeMedidaERP: item.unidade_medida || ''
        }));

        setItensPedido(itensFormatados);
      } else {
        setItensPedido([]);
        message.warning('Nenhum pedido encontrado');
      }
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error);
      message.error('Erro ao buscar pedidos');
      setItensPedido([]);
    }
  };

  const handleMenuItemClick = (key: string) => {
    setTipoPesquisa(key);
    setIsPesquisaModalVisible(true);
  };

  const colunasNFe: ColumnsType<ItemNFe> = [
    {
      title: 'Nº do item',
      dataIndex: 'numero',
      key: 'numero',
      width: 60,
      align: 'center',
    },
    // {
    //   title: 'Ctg. do item',
    //   dataIndex: 'categoria',
    //   key: 'categoria',
    //   width: 20,
    // },
    {
      title: 'Qtd.NF-e',
      dataIndex: 'quantidade',
      key: 'quantidade',
      width: 80,
      align: 'center',
    },
    {
      title: 'Unidade',
      dataIndex: 'unidade',
      key: 'unidade',
      width: 50,
      align: 'center',
    },
    {
      title: 'Nº de material',
      dataIndex: 'codigoMaterial',
      key: 'codigoMaterial',
      width: 120,
    },
    {
      title: 'Descrição',
      dataIndex: 'descricao',
      key: 'descricao',
      width: 240,
    },
    {
      title: 'Nº do pedido',
      dataIndex: 'npedido',
      key: 'npedido',
      width: 120,
    },
    {
      title: 'Item do pedido',
      dataIndex: 'itempedido',
      key: 'itempedido',
      width: 100,
    }
  ];

  const colunasPedido: ColumnsType<ItemPedido> = [
    {
      title: 'Nº do pedido',
      dataIndex: 'numeroPedido',
      key: 'numeroPedido',
      width: 100,
      align: 'center',
    },
    {
      title: 'Item do pedido',
      dataIndex: 'itemPedido',
      key: 'itemPedido',
      width: 60,
      align: 'center',
    },
    {
      title: 'Nº Material ERP',
      dataIndex: 'codigoMaterialERP',
      key: 'codigoMaterialERP',
      width: 150,
      align: 'center',
    },
    {
      title: 'ERP texto breve material',
      dataIndex: 'descricaoMaterialERP',
      key: 'descricaoMaterialERP',
      width: 300,
    },
    {
      title: 'Qtd.Pedido',
      dataIndex: 'quantidadePedido',
      key: 'quantidadePedido',
      width: 60,
      align: 'center',
    },
    {
      title: 'UMD ERP',
      dataIndex: 'unidadeMedidaERP',
      key: 'unidadeMedidaERP',
      width: 60,
      align: 'center',
    }
  ];

  const colunasAtribuidos: ColumnsType<ItemAtribuido> = [
    {
      title: 'Categoria do item',
      dataIndex: 'categoria',
      key: 'categoria',
      width: 120,
    },
    {
      title: 'Quantidade NF-e',
      dataIndex: 'quantidadeNFe',
      key: 'quantidadeNFe',
      width: 120,
      align: 'right',
    },
    {
      title: 'Unidade de medida',
      dataIndex: 'unidadeMedida',
      key: 'unidadeMedida',
      width: 130,
    },
    {
      title: 'Nº de material NF-e',
      dataIndex: 'codigoMaterialNFe',
      key: 'codigoMaterialNFe',
      width: 140,
    },
    {
      title: 'Descrição do produto',
      dataIndex: 'descricaoProduto',
      key: 'descricaoProduto',
      width: 300,
    },
    {
      title: 'Nº do pedido',
      dataIndex: 'numeroPedido',
      key: 'numeroPedido',
      width: 120,
    },
    {
      title: 'Item do pedido',
      dataIndex: 'itemPedido',
      key: 'itemPedido',
      width: 100,
    },
    {
      title: 'Qtd.NF-e convertida',
      dataIndex: 'quantidadeConvertida',
      key: 'quantidadeConvertida',
      width: 140,
      align: 'right',
    },
    {
      title: 'ERP unidade de medida',
      dataIndex: 'unidadeMedidaERP',
      key: 'unidadeMedidaERP',
      width: 150,
    },
    {
      title: 'ERP nº de material',
      dataIndex: 'codigoMaterialERP',
      key: 'codigoMaterialERP',
      width: 140,
    },
    {
      title: 'ERP texto breve do material',
      dataIndex: 'descricaoMaterialERP',
      key: 'descricaoMaterialERP',
      width: 300,
    }
  ];

  const buttonStyle = {
    color: '#6e99cc',
    backgroundColor: '#F8F7FF',
    borderColor: '#6e99cc',
    borderRadius: 0,
    margin: 0,
    padding: '0 6px',
    height: '26px',
    display: 'flex',
    alignItems: 'center',
    gap: '2px',
    transition: 'all 0.3s ease',
    ':hover': {
      backgroundColor: '#e6f0ff',
      borderColor: '#4a7ab0'
    }
  };

  const buttonGroupStyle = {
    display: 'flex',
    gap: '0',
    border: '1px solid #6e99cc',
    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    overflow: 'hidden',
    backgroundColor: '#ffffff'
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'Procurar Pedido',
      icon: <FaSearch />,
      onClick: () => handleMenuItemClick('1')
    },
    {
      key: '2',
      label: 'Procurar Pedido e Item',
      icon: <FaSearch />,
      onClick: () => handleMenuItemClick('2')
    },
    {
      key: '3',
      label: 'Pesquisa Ampliada',
      icon: <FaSearch />,
      onClick: () => handleMenuItemClick('3')
    }
  ];

  const handleChaveAcessoClick = async (chaveAcesso: string) => {
    try {
      const response = await fetch(`/api/nfe/inbound?chNFe=${chaveAcesso}`);
      const data = await response.json();
      
      if (data && data.length > 0) {
        const nfe = data.find((item: any) => 
          item.nfeProc?.protNFe?.infProt?.chNFe === chaveAcesso
        );
        
        if (nfe) {
          setDetalhesNFe(nfe);
          setIsModalVisible(true);
        } else {
          message.error('NF-e não encontrada');
        }
      }
    } catch (error) {
      console.error('Erro ao carregar detalhes da NF-e:', error);
      message.error('Erro ao carregar detalhes da NF-e');
    }
  };

  const handleSimularXml = () => {
    setIsSimulacaoXmlVisible(true);
  };

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  const handleModalTabChange = (key: string) => {
    setModalActiveTab(key);
  };

  const handleNFeItemSelect = (selectedRowKeys: React.Key[], selectedRows: ItemNFe[], info: { type: RowSelectMethod }) => {
    if (selectedRows.length > 0) {
      setSelectedNFeItem(selectedRows[0]);
    } else {
      setSelectedNFeItem(null);
    }
  };

  const handlePedidoItemSelect = (selectedRowKeys: React.Key[], selectedRows: ItemPedido[], info: { type: RowSelectMethod }) => {
    if (selectedRows.length > 0) {
      setSelectedPedidoItem(selectedRows[0]);
    } else {
      setSelectedPedidoItem(null);
    }
  };

  const handleAtribuirItem = () => {
    if (!selectedNFeItem || !selectedPedidoItem) {
      message.warning('Selecione um item da NF-e e um item do pedido');
      return;
    }

    // Verificar se o item já foi atribuído
    const itemJaAtribuido = itensAtribuidos.some(
      item => item.numeroPedido === selectedPedidoItem.numeroPedido && 
              item.itemPedido === selectedPedidoItem.itemPedido
    );

    if (itemJaAtribuido) {
      message.warning('Este item do pedido já foi atribuído');
      return;
    }

    // Criar novo item atribuído
    const novoItemAtribuido: ItemAtribuido = {
      key: String(itensAtribuidos.length + 1),
      categoria: selectedNFeItem.categoria || '',
      quantidadeNFe: selectedNFeItem.quantidade,
      unidadeMedida: selectedNFeItem.unidade,
      codigoMaterialNFe: selectedNFeItem.codigoMaterial,
      descricaoProduto: selectedNFeItem.descricao,
      numeroPedido: selectedPedidoItem.numeroPedido,
      itemPedido: selectedPedidoItem.itemPedido,
      quantidadeConvertida: selectedNFeItem.quantidade, // Aqui você pode implementar a lógica de conversão
      unidadeMedidaERP: selectedPedidoItem.unidadeMedidaERP,
      codigoMaterialERP: selectedPedidoItem.codigoMaterialERP,
      descricaoMaterialERP: selectedPedidoItem.descricaoMaterialERP
    };

    setItensAtribuidos([...itensAtribuidos, novoItemAtribuido]);
    message.success('Item atribuído com sucesso');

    // Limpar seleções
    setSelectedNFeItem(null);
    setSelectedPedidoItem(null);
  };

  const handleAnularAtribuicao = (record: ItemAtribuido) => {
    setItensAtribuidos(itensAtribuidos.filter(item => item.key !== record.key));
    message.success('Atribuição anulada com sucesso');
  };

  const handleGravarAtribuicoes = async () => {
    if (itensAtribuidos.length === 0) {
      message.warning('Não há atribuições para gravar');
      return;
    }

    try {
      // Preparar dados para salvar
      const atribuicoesParaSalvar = itensAtribuidos.map(item => ({
        chave_acesso: chaveAcesso,
        categoria: item.categoria,
        quantidade_nfe: item.quantidadeNFe,
        unidade_medida: item.unidadeMedida,
        codigo_material_nfe: item.codigoMaterialNFe,
        descricao_produto: item.descricaoProduto,
        numero_pedido: item.numeroPedido,
        item_pedido: item.itemPedido,
        quantidade_convertida: item.quantidadeConvertida,
        unidade_medida_erp: item.unidadeMedidaERP,
        codigo_material_erp: item.codigoMaterialERP,
        descricao_material_erp: item.descricaoMaterialERP,
        data_atribuicao: new Date().toISOString()
      }));

      const response = await fetch('/api/atribuicoes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(atribuicoesParaSalvar)
      });

      const data = await response.json();

      if (response.ok) {
        message.success(`Atribuições salvas com sucesso. ${data.insertedCount} registros inseridos.`);
        // Limpar as atribuições após salvar
        setItensAtribuidos([]);
      } else {
        throw new Error(data.error || 'Erro ao salvar atribuições');
      }
    } catch (error) {
      console.error('Erro ao gravar atribuições:', error);
      message.error('Erro ao gravar atribuições');
    }
  };

  const ValoresContent = () => (
    <div className="sap-values-section">
      <div className="sap-values-row">
        <div className="sap-values-field">
          <span className="sap-values-label">Valor Total:</span>
          <span className="sap-values-value">R$ 1.234,56</span>
        </div>
        <div className="sap-values-field">
          <span className="sap-values-label">Base ICMS:</span>
          <span className="sap-values-value">R$ 1.000,00</span>
        </div>
        <div className="sap-values-field">
          <span className="sap-values-label">Valor ICMS:</span>
          <span className="sap-values-value">R$ 180,00</span>
        </div>
      </div>
      <div className="sap-values-row">
        <div className="sap-values-field">
          <span className="sap-values-label">Valor Produtos:</span>
          <span className="sap-values-value">R$ 1.200,00</span>
        </div>
        <div className="sap-values-field">
          <span className="sap-values-label">Valor Frete:</span>
          <span className="sap-values-value">R$ 34,56</span>
        </div>
        <div className="sap-values-field">
          <span className="sap-values-label">Valor Seguro:</span>
          <span className="sap-values-value">R$ 0,00</span>
        </div>
      </div>
    </div>
  );

  const ImpostosContent = () => (
    <div className="sap-taxes-section">
      <div className="sap-taxes-row">
        <div className="sap-taxes-field">
          <span className="sap-taxes-label">ICMS:</span>
          <span className="sap-taxes-value">18%</span>
        </div>
        <div className="sap-taxes-field">
          <span className="sap-taxes-label">IPI:</span>
          <span className="sap-taxes-value">5%</span>
        </div>
        <div className="sap-taxes-field">
          <span className="sap-taxes-label">PIS:</span>
          <span className="sap-taxes-value">1,65%</span>
        </div>
        <div className="sap-taxes-field">
          <span className="sap-taxes-label">COFINS:</span>
          <span className="sap-taxes-value">7,6%</span>
        </div>
      </div>
      <div className="sap-taxes-row">
        <div className="sap-taxes-field">
          <span className="sap-taxes-label">CST ICMS:</span>
          <span className="sap-taxes-value">00</span>
        </div>
        <div className="sap-taxes-field">
          <span className="sap-taxes-label">CST IPI:</span>
          <span className="sap-taxes-value">50</span>
        </div>
        <div className="sap-taxes-field">
          <span className="sap-taxes-label">CST PIS:</span>
          <span className="sap-taxes-value">01</span>
        </div>
        <div className="sap-taxes-field">
          <span className="sap-taxes-label">CST COFINS:</span>
          <span className="sap-taxes-value">01</span>
        </div>
      </div>
    </div>
  );

  const tableProps = {
    dataSource: [],
    columns: [],
    pagination: false as const,
    scroll: { y: 'calc(100% - 8px)', x: 'max-content' },
    size: 'small' as const
  };

  const mainTabItems: TabItem[] = [
    {
      key: '1',
      label: 'Itens NF-e Pendentes',
      children: (
        <div className="sap-tab-content">
          <Table
            columns={colunasNFe}
            dataSource={itensNFe}
            rowSelection={{
              type: 'radio',
              onChange: handleNFeItemSelect
            }}
            pagination={false}
          />
        </div>
      )
    },
    {
      key: '2',
      label: 'Itens do Pedido Disponíveis',
      children: (
        <div className="sap-tab-content">
          <Table
            columns={colunasPedido}
            dataSource={itensPedido}
            rowSelection={{
              type: 'radio',
              onChange: handlePedidoItemSelect
            }}
            pagination={false}
          />
        </div>
      )
    },
    {
      key: '3',
      label: 'Itens NF-e Atribuídos',
      children: (
        <div className="sap-tab-content">
          <Table
            columns={colunasAtribuidos}
            dataSource={itensAtribuidos}
            pagination={false}
          />
        </div>
      )
    }
  ];

  const modalTabItems = [
    {
      label: 'Valores',
      key: '1',
      children: <ValoresContent />
    },
    {
      label: 'Impostos',
      key: '2',
      children: <ImpostosContent />
    }
  ];

  const colunasItensPedido: ColumnsType<ItemPedidoDetalhado> = [
    {
      title: 'Nº Item',
      dataIndex: 'numeroItem',
      key: 'numeroItem',
      width: 80,
      align: 'center',
    },
    {
      title: 'Material ERP',
      dataIndex: 'materialERP',
      key: 'materialERP',
      width: 120,
    },
    {
      title: 'Descrição',
      dataIndex: 'descricaoMaterial',
      key: 'descricaoMaterial',
      width: 200,
    },
    {
      title: 'Quantidade',
      dataIndex: 'quantidade',
      key: 'quantidade',
      width: 100,
      align: 'right',
    },
    {
      title: 'Unidade',
      dataIndex: 'unidadeMedida',
      key: 'unidadeMedida',
      width: 80,
      align: 'center',
    },
    {
      title: 'Valor Unitário',
      dataIndex: 'valorUnitario',
      key: 'valorUnitario',
      width: 120,
      align: 'right',
      render: (value) => `R$ ${value.toFixed(2)}`,
    },
    {
      title: 'Valor Total',
      dataIndex: 'valorTotal',
      key: 'valorTotal',
      width: 120,
      align: 'right',
      render: (value) => `R$ ${value.toFixed(2)}`,
    },
  ];

  const carregarItensPedido = async (numeroPedido: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/pedidos/itens?numeroPedido=${numeroPedido}`);
      const data = await response.json();

      if (data && Array.isArray(data)) {
        const itensFormatados: ItemPedidoDetalhado[] = data.map((item: any, index: number) => ({
          key: String(index + 1),
          numeroItem: item.numero_item || '',
          materialERP: item.cod_material_erp || '',
          descricaoMaterial: item.cod_material_fornecedor || '',
          quantidade: Number(item.quantidade) || 0,
          unidadeMedida: 'UN',
          valorUnitario: Number(item.preco_unitario) || 0,
          valorTotal: Number(item.valor_total) || 0,
        }));

        setItensPedidoDetalhado(itensFormatados);
      } else {
        setItensPedidoDetalhado([]);
        message.warning('Nenhum item encontrado para este pedido');
      }
    } catch (error) {
      console.error('Erro ao carregar itens do pedido:', error);
      message.error('Erro ao carregar itens do pedido');
      setItensPedidoDetalhado([]);
    } finally {
      setLoading(false);
    }
  };

  const PesquisaModal: React.FC<PesquisaModalProps> = ({ 
    visible, 
    onCancel, 
    onSearch, 
    tipoPesquisa, 
    searchParams, 
    setSearchParams 
  }) => {
    const [itensPedidoDetalhado, setItensPedidoDetalhado] = useState<ItemPedidoDetalhado[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedItems, setSelectedItems] = useState<ItemPedidoDetalhado[]>([]);

    const handlePesquisar = async () => {
      if (searchParams.numeroPedido) {
        setLoading(true);
        try {
          const response = await fetch(`/api/pedidos/itens?numeroPedido=${searchParams.numeroPedido}`);
          const data = await response.json();

          if (data && Array.isArray(data)) {
            const itensFormatados: ItemPedidoDetalhado[] = data.map((item: any, index: number) => ({
              key: String(index + 1),
              numeroItem: item.numero_item || '',
              materialERP: item.cod_material_erp || '',
              descricaoMaterial: item.cod_material_fornecedor || '',
              quantidade: Number(item.quantidade) || 0,
              unidadeMedida: 'UN',
              valorUnitario: Number(item.preco_unitario) || 0,
              valorTotal: Number(item.valor_total) || 0,
            }));

            setItensPedidoDetalhado(itensFormatados);
          } else {
            setItensPedidoDetalhado([]);
            message.warning('Nenhum item encontrado para este pedido');
          }
        } catch (error) {
          console.error('Erro ao carregar itens do pedido:', error);
          message.error('Erro ao carregar itens do pedido');
          setItensPedidoDetalhado([]);
        } finally {
          setLoading(false);
        }
      }
    };

    const handleItemSelect = (selectedRowKeys: React.Key[], selectedRows: ItemPedidoDetalhado[]) => {
      setSelectedItems(selectedRows);
    };

    const handleAdicionarItens = () => {
      if (selectedItems.length === 0) {
        message.warning('Selecione pelo menos um item para adicionar');
        return;
      }

      const novosItensPedido: ItemPedido[] = selectedItems.map(item => ({
        key: String(itensPedido.length + 1),
        numeroPedido: searchParams.numeroPedido,
        itemPedido: item.numeroItem,
        codigoMaterialERP: item.materialERP,
        descricaoMaterialERP: item.descricaoMaterial,
        quantidadePedido: item.quantidade,
        unidadeMedidaERP: item.unidadeMedida
      }));

      setItensPedido([...itensPedido, ...novosItensPedido]);
      message.success(`${selectedItems.length} item(ns) adicionado(s) com sucesso`);
      setSelectedItems([]);
    };

    const getModalTitle = () => {
      switch (tipoPesquisa) {
        case '1':
          return 'Procurar Pedido';
        case '2':
          return 'Procurar Pedido e Item';
        case '3':
          return 'Pesquisa Ampliada';
        default:
          return '';
      }
    };

    return (
      <Modal
        title={
          <div className="sap-modal-title">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontFamily: 'Arial', fontWeight: 'normal' }}>
                {getModalTitle()}
              </span>
              <Button 
                size="small" 
                className="sap-help-button"
                icon={<QuestionCircleOutlined />}
              >
                Ajuda
              </Button>
            </div>
          </div>
        }
        open={visible}
        onCancel={onCancel}
        width={1000}
        className="sap-pesquisa-modal"
        footer={
          <div className="sap-modal-footer">
            <div className="sap-button-group">
              <Button 
                size="small" 
                className="sap-button" 
                icon={<FaSync style={{ fontSize: '11px' }} />}
                onClick={onCancel}
              >
                Voltar
              </Button>
              <Button 
                size="small" 
                className="sap-button" 
                icon={<FaSearch style={{ fontSize: '11px' }} />}
                onClick={handlePesquisar}
              >
                Pesquisar
              </Button>
              <Button 
                size="small" 
                className="sap-button" 
                icon={<FaCheck style={{ fontSize: '11px' }} />}
                onClick={handleAdicionarItens}
                disabled={selectedItems.length === 0}
              >
                Adicionar Selecionados
              </Button>
            </div>
          </div>
        }
      >
        <div className="sap-pesquisa-content">
          <div className="sap-form-section">
            {tipoPesquisa !== '3' && (
              <div className="sap-form-row">
                <div className="sap-form-field">
                  <label>Nº do pedido:</label>
                  <Input
                    value={searchParams.numeroPedido}
                    onChange={(e) => setSearchParams({ ...searchParams, numeroPedido: e.target.value })}
                    style={{ width: '200px' }}
                    placeholder="Digite o número do pedido"
                  />
                </div>
                {tipoPesquisa === '2' && (
                  <div className="sap-form-field">
                    <label>Item do pedido:</label>
                    <Input
                      value={searchParams.itemPedido}
                      onChange={(e) => setSearchParams({ ...searchParams, itemPedido: e.target.value })}
                      style={{ width: '100px' }}
                      placeholder="Digite o item"
                    />
                  </div>
                )}
              </div>
            )}

            {tipoPesquisa === '3' && (
              <>
                <div style={{ 
                  display: 'grid', 
                  gap: '12px',
                  padding: '16px'
                }}>
                  <div style={{ 
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '12px'
                  }}>
                    <div className="sap-form-field">
                      <label style={{ 
                        display: 'block', 
                        marginBottom: '4px',
                        fontSize: '12px',
                        color: '#666'
                      }}>
                        Org. compras:
                      </label>
                      <Input
                        value={searchParams.orgCompras}
                        onChange={(e) => setSearchParams({ ...searchParams, orgCompras: e.target.value })}
                        style={{ width: '100%' }}
                      />
                    </div>

                    <div className="sap-form-field">
                      <label style={{ 
                        display: 'block', 
                        marginBottom: '4px',
                        fontSize: '12px',
                        color: '#666'
                      }}>
                        Grp. compra:
                      </label>
                      <Input
                        value={searchParams.grpCompras}
                        onChange={(e) => setSearchParams({ ...searchParams, grpCompras: e.target.value })}
                        style={{ width: '100%' }}
                      />
                    </div>
                  </div>

                  <div style={{ 
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '12px'
                  }}>
                    <div className="sap-form-field">
                      <label style={{ 
                        display: 'block', 
                        marginBottom: '4px',
                        fontSize: '12px',
                        color: '#666'
                      }}>
                        CNPJ/CPF:
                      </label>
                      <Input
                        value={searchParams.cnpjCpf}
                        onChange={(e) => setSearchParams({ ...searchParams, cnpjCpf: e.target.value })}
                        style={{ width: '100%' }}
                        placeholder="07.352.128/0001-63"
                      />
                    </div>

                    <div className="sap-form-field">
                      <label style={{ 
                        display: 'block', 
                        marginBottom: '4px',
                        fontSize: '12px',
                        color: '#666'
                      }}>
                        CNPJ dest.:
                      </label>
                      <Input
                        value={searchParams.cnpjDest}
                        onChange={(e) => setSearchParams({ ...searchParams, cnpjDest: e.target.value })}
                        style={{ width: '100%' }}
                        placeholder="86.900.925/0001-04"
                      />
                    </div>
                  </div>

                  <div style={{ 
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '12px'
                  }}>
                    <div className="sap-form-field">
                      <label style={{ 
                        display: 'block', 
                        marginBottom: '4px',
                        fontSize: '12px',
                        color: '#666'
                      }}>
                        Nº mat.ERP:
                      </label>
                      <Input
                        value={searchParams.nMatErp}
                        onChange={(e) => setSearchParams({ ...searchParams, nMatErp: e.target.value })}
                        style={{ width: '100%' }}
                      />
                    </div>

                    <div className="sap-form-field">
                      <label style={{ 
                        display: 'block', 
                        marginBottom: '4px',
                        fontSize: '12px',
                        color: '#666'
                      }}>
                        Nº mat.forn.:
                      </label>
                      <Input
                        value={searchParams.nMatForn}
                        onChange={(e) => setSearchParams({ ...searchParams, nMatForn: e.target.value })}
                        style={{ width: '100%' }}
                        placeholder="CFOP6101"
                      />
                    </div>
                  </div>

                  <div style={{ 
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    gap: '12px'
                  }}>
                    <div className="sap-form-field">
                      <label style={{ 
                        display: 'block', 
                        marginBottom: '4px',
                        fontSize: '12px',
                        color: '#666'
                      }}>
                        NCM Código:
                      </label>
                      <Input
                        value={searchParams.ncmCodigo}
                        onChange={(e) => setSearchParams({ ...searchParams, ncmCodigo: e.target.value })}
                        style={{ width: '100%' }}
                        placeholder="64029990"
                      />
                    </div>
                  </div>

                  <div style={{ 
                    display: 'grid',
                    gap: '12px'
                  }}>
                    <div className="sap-form-field">
                      <label style={{ 
                        display: 'block', 
                        marginBottom: '4px',
                        fontSize: '12px',
                        color: '#666'
                      }}>
                        Data de cria.:
                      </label>
                      <div style={{ 
                        display: 'grid',
                        gridTemplateColumns: '1fr auto 1fr',
                        gap: '8px',
                        alignItems: 'center'
                      }}>
                        <Input
                          type="date"
                          value={searchParams.dataCriacaoDe}
                          onChange={(e) => setSearchParams({ ...searchParams, dataCriacaoDe: e.target.value })}
                          style={{ width: '100%' }}
                        />
                        <span style={{ color: '#666' }}>até</span>
                        <Input
                          type="date"
                          value={searchParams.dataCriacaoAte}
                          onChange={(e) => setSearchParams({ ...searchParams, dataCriacaoAte: e.target.value })}
                          style={{ width: '100%' }}
                        />
                      </div>
                    </div>

                    <div className="sap-form-field">
                      <label style={{ 
                        display: 'block', 
                        marginBottom: '4px',
                        fontSize: '12px',
                        color: '#666'
                      }}>
                        Data de re.:
                      </label>
                      <div style={{ 
                        display: 'grid',
                        gridTemplateColumns: '1fr auto 1fr',
                        gap: '8px',
                        alignItems: 'center'
                      }}>
                        <Input
                          type="date"
                          value={searchParams.dataRecebimentoDe}
                          onChange={(e) => setSearchParams({ ...searchParams, dataRecebimentoDe: e.target.value })}
                          style={{ width: '100%' }}
                        />
                        <span style={{ color: '#666' }}>até</span>
                        <Input
                          type="date"
                          value={searchParams.dataRecebimentoAte}
                          onChange={(e) => setSearchParams({ ...searchParams, dataRecebimentoAte: e.target.value })}
                          style={{ width: '100%' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {itensPedidoDetalhado.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <Table
                columns={colunasItensPedido}
                dataSource={itensPedidoDetalhado}
                loading={loading}
                size="small"
                pagination={false}
                scroll={{ y: 300 }}
                rowSelection={{
                  type: 'checkbox',
                  onChange: handleItemSelect,
                  selectedRowKeys: selectedItems.map(item => item.key)
                }}
              />
            </div>
          )}
        </div>
      </Modal>
    );
  };

  return (
    <div style={{ 
      width: '100%',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#f0f0f0',
      padding: '0',
      margin: '0'
    }}>
      <div style={{
        padding: '4px 8px',
        backgroundColor: '#fff',
        borderBottom: '1px solid #ccc',
        display: 'flex',
        gap: '4px',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', gap: '4px' }}>
          <Button 
            size="small"
            icon={<FaCheck style={{ fontSize: '11px' }} />}
            className="sap-button"
            onClick={handleGravarAtribuicoes}
            disabled={itensAtribuidos.length === 0}
          >
            Gravar atribuições
          </Button>
          <Button 
            size="small"
            icon={<FaSync style={{ fontSize: '11px' }} />}
            className="sap-button"
            onClick={() => {
              setItensAtribuidos([]);
              setSelectedNFeItem(null);
              setSelectedPedidoItem(null);
              message.success('Atribuições reinicializadas');
            }}
          >
            Reinicializar
          </Button>
          <Button 
            size="small"
            icon={<FaFileCode style={{ fontSize: '11px' }} />}
            className="sap-button"
            onClick={handleSimularXml}
          >
            Simular XML
          </Button>
        </div>
        <div>
          
          {/* <Button 
            size="small"
            icon={<FaFileInvoice style={{ fontSize: '11px' }} />}
            className="sap-button"
          >
            Simular Fatura
          </Button>
          <Button 
            size="small"
            icon={<FaBalanceScale style={{ fontSize: '11px' }} />}
            className="sap-button"
          >
            Contagem
          </Button> */}
        </div>
      </div> {/*botões de ação*/}

      <div className="sap-header">
        <div className="sap-header-row">
          <div>
            <span className="sap-header-label">CNPJ do emissor da NF-e: </span>
            <span className="sap-header-value">{detalhesNFe?.nfeProc?.NFe?.infNFe?.emit?.CNPJ}</span>
          </div>
          <div>
            <span className="sap-header-label">Nome do emissor da NF-e: </span>
            <span className="sap-header-value">{detalhesNFe?.nfeProc?.NFe?.infNFe?.emit?.xNome}</span>
          </div>
        </div>
        <div className="sap-header-row">
          <div>
            <span className="sap-header-label">CNPJ/CPF do destinatário da NF-e: </span>
            <span className="sap-header-value">{detalhesNFe?.nfeProc?.NFe?.infNFe?.dest?.CNPJ}</span>
          </div>
          <div>
            <span className="sap-header-label">Nome do destinatário NF-e: </span>
            <span className="sap-header-value">{detalhesNFe?.nfeProc?.NFe?.infNFe?.dest?.xNome}</span>
          </div>
        </div>
        <div className="sap-header-row">
          <div>
            <span className="sap-header-label">Valor total inclusive impostos: </span>
            <span className="sap-header-value">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(detalhesNFe?.nfeProc?.NFe?.infNFe?.total?.ICMSTot?.vNF) || 0)}
            </span>
          </div>
        </div>
      </div> {/*cabeçalho*/}

      <div style={{
        padding: '0',
        backgroundColor: '#fff',
        borderBottom: '1px solid #ccc',
        display: 'flex',
        gap: '1px',
        width: '100%'
      }}>
        <Tabs
          type="card"
          items={[
            { label: 'Pesquisa baseada no item', key: '1' },
            { label: 'Pesquisa global', key: '2' }
          ]}
          style={{
            marginBottom: 0,
            width: '100%'
          }}
          className="atribuir-itens-tabs"
          activeKey={activeTab}
          onChange={handleTabChange}
          destroyInactiveTabPane
        />
      </div> {/*abas de pesquisa*/}

      <div style={{ 
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '1px',
        backgroundColor: '#f0f0f0',
        overflow: 'hidden',
        minHeight: 0,
        position: 'relative',
        width: '100%'
      }}>
        <div style={{ 
          display: 'flex',
          gap: '1px',
          flex: 1,
          minHeight: 0,
          width: '100%'
        }}>
          <div style={{ 
            flex: '0 0 50%',
            backgroundColor: '#fff',
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
            maxWidth: '50%',
            width: '100%'
          }}>
            <div className="sap-section-title">
              <span>Itens NF-e pendentes</span>
              <div style={{ marginLeft: 'auto', display: 'flex', gap: '4px' }}>
                <Button 
                  size="small"
                  icon={<FaCheck style={{ fontSize: '11px' }} />}
                  className="sap-button-compact"
                  onClick={handleAtribuirItem}
                  disabled={!selectedNFeItem || !selectedPedidoItem}
                >
                  Atribuir
                </Button>
                <Button 
                  size="small"
                  icon={<EyeOutlined style={{ fontSize: '11px' }} />}
                  className="sap-button-compact"
                  onClick={() => chaveAcesso && handleChaveAcessoClick(chaveAcesso)}
                >
                  Exibir XML
                </Button>
              </div>
            </div>
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <Table
                columns={colunasNFe}
                dataSource={itensNFe}
                size="small"
                pagination={false}
                scroll={{ y: 'calc(100% - 8px)', x: 'max-content' }}
                rowSelection={{
                  type: 'radio',
                  onChange: handleNFeItemSelect
                }}
                className="atribuir-itens-table"
              />
            </div> {/*tabela de itens da NF-e*/}
          </div>
          <div style={{
            flex: '0 0 1px',
            backgroundColor: '#ccc',
            width: '1px',
            height: '100%'
          }}>
            </div> {/*divisor de colunas*/}

          <div style={{ 
            flex: '0 0 50%',
            backgroundColor: '#fff',
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
            maxWidth: '50%',
            width: '100%'
          }}>
            <div className="sap-section-title" style={{ justifyContent: 'space-between' }}>
              <span>Itens do pedido disponíveis</span>
              <Dropdown menu={{ items }} placement="bottomRight">
                <Button 
                  size="small"
                  icon={<FaSearch style={{ fontSize: '11px' }} />}
                  className="sap-dropdown-button"
                >
                  Procurar itens de Pedido <DownOutlined style={{ fontSize: '10px', marginLeft: '4px' }} />
                </Button>
              </Dropdown>
            </div>
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <Table
                columns={colunasPedido}
                dataSource={itensPedido}
                size="small"
                pagination={false}
                scroll={{ y: 'calc(100% - 8px)', x: 'max-content' }}
                rowSelection={{
                  type: 'radio',
                  onChange: handlePedidoItemSelect
                }}
                className="atribuir-itens-table"
              />
            </div>
          </div> {/*tabela de itens do pedido*/}
        </div>

        <div style={{ 
          backgroundColor: '#fff',
          display: 'flex',
          flexDirection: 'column',
          height: '35%',
          minHeight: '200px',
          maxHeight: '400px',
          position: 'relative'
        }}>
          <div className="sap-section-title" style={{ justifyContent: 'space-between' }}>
            <span>Itens NF-e atribuídos</span>
            <Button 
              size="small"
              icon={<FaTimes style={{ fontSize: '11px' }} />}
              className="sap-button"
              onClick={() => {
                if (selectedNFeItem) {
                  const itemAtribuido = itensAtribuidos.find(
                    item => item.codigoMaterialNFe === selectedNFeItem.codigoMaterial
                  );
                  if (itemAtribuido) {
                    handleAnularAtribuicao(itemAtribuido);
                  }
                }
              }}
              disabled={!selectedNFeItem}
            >
              Anular atribuição
            </Button>
          </div>
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <Table
              columns={colunasAtribuidos}
              dataSource={itensAtribuidos}
              size="small"
              pagination={false}
              scroll={{ y: 'calc(100% - 8px)', x: 'max-content' }}
              className="atribuir-itens-table"
            />
          </div>
        </div>
      </div> {/*tabela de itens atribuídos*/}

      <Modal
        title="Detalhes da NF-e"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        width={800}
        footer={null}
      >
        {detalhesNFe && (
          <div style={{ padding: '20px' }}>
            <h4>Informações Gerais</h4>
            <p><strong>Chave de Acesso:</strong> {detalhesNFe.nfeProc?.protNFe?.infProt?.chNFe}</p>
            <p><strong>Número:</strong> {detalhesNFe.nfeProc?.NFe?.infNFe?.ide?.nNF}</p>
            <p><strong>Série:</strong> {detalhesNFe.nfeProc?.NFe?.infNFe?.ide?.serie}</p>
            <p><strong>Data Emissão:</strong> {detalhesNFe.nfeProc?.NFe?.infNFe?.ide?.dhEmi}</p>
            
            <h4 style={{ marginTop: '20px' }}>Emitente</h4>
            <p><strong>CNPJ:</strong> {detalhesNFe.nfeProc?.NFe?.infNFe?.emit?.CNPJ}</p>
            <p><strong>Nome:</strong> {detalhesNFe.nfeProc?.NFe?.infNFe?.emit?.xNome}</p>
            <p><strong>Inscrição Estadual:</strong> {detalhesNFe.nfeProc?.NFe?.infNFe?.emit?.IE}</p>
            
            <h4 style={{ marginTop: '20px' }}>Destinatário</h4>
            <p><strong>CNPJ:</strong> {detalhesNFe.nfeProc?.NFe?.infNFe?.dest?.CNPJ}</p>
            <p><strong>Nome:</strong> {detalhesNFe.nfeProc?.NFe?.infNFe?.dest?.xNome}</p>
            
            <h4 style={{ marginTop: '20px' }}>Totais</h4>
            <p><strong>Valor Total:</strong> R$ {detalhesNFe.nfeProc?.NFe?.infNFe?.total?.ICMSTot?.vNF}</p>
            <p><strong>Base de Cálculo ICMS:</strong> R$ {detalhesNFe.nfeProc?.NFe?.infNFe?.total?.ICMSTot?.vBC}</p>
            <p><strong>Valor ICMS:</strong> R$ {detalhesNFe.nfeProc?.NFe?.infNFe?.total?.ICMSTot?.vICMS}</p>
          </div>
        )}
      </Modal>

      <PesquisaModal
        visible={isPesquisaModalVisible}
        onCancel={() => setIsPesquisaModalVisible(false)}
        onSearch={handleSearch}
        tipoPesquisa={tipoPesquisa}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />

      <Modal
        title={
          <div className="sap-modal-title">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontFamily: 'Arial', fontWeight: 'normal' }}>
                Simular itens do pedido: 33110811663724000131550010000200501271045599
              </span>
              <Button 
                size="small" 
                className="sap-help-button"
              >
                Ajuda
              </Button>
            </div>
          </div>
        }
        open={isSimulacaoXmlVisible}
        onCancel={() => setIsSimulacaoXmlVisible(false)}
        width={1200}
        className="sap-simulacao-modal"
        footer={
          <div className="sap-modal-footer">
            <div className="sap-button-group">
              <Button 
                size="small" 
                className="sap-button" 
                icon={<FaSync style={{ fontSize: '11px' }} />}
              >
                Voltar
              </Button>
              <Button 
                size="small" 
                className="sap-button" 
                icon={<FaSync style={{ fontSize: '11px' }} />}
              >
                Voltar para síntese
              </Button>
              <Button 
                size="small" 
                className="sap-button" 
                icon={<FaCheck style={{ fontSize: '11px' }} />}
              >
                Gravar parâmetros
              </Button>
              <Button 
                size="small" 
                className="sap-button" 
                icon={<FaPlayCircle style={{ fontSize: '11px' }} />}
              >
                Executar simulação
              </Button>
            </div>
          </div>
        }
      >
        <div className="sap-simulacao-content">
          <div className="sap-info-section">
            <div className="sap-info-row">
              <div className="sap-info-field">
                <span className="sap-info-label">Ctn proc.:</span>
                <span className="sap-info-value">NF-e para pedido normal</span>
              </div>
            </div>
            <div className="sap-info-row">
              <div className="sap-info-field">
                <span className="sap-info-label">Nº CNPJ do emissor da NF-e:</span>
                <span className="sap-info-value">11663724000131</span>
              </div>
              <div className="sap-info-field">
                <span className="sap-info-label">Nome do emissor da NF-e:</span>
                <span className="sap-info-value">Consorcio Techint-Andrade Gutierrez (TE-AG)</span>
              </div>
              <div className="sap-info-field">
                <span className="sap-info-label">Nº CNPJ/CPF do recebedor da NF-e:</span>
                <span className="sap-info-value">99999999000191</span>
              </div>
            </div>
            <div className="sap-info-row">
              <div className="sap-info-field">
                <span className="sap-info-label">Nome do destinat.NF-e:</span>
                <span className="sap-info-value">NF-E EMITIDA EM AMBIENTE DE HOMOLOGACAO - SEM VALOR FISCAL</span>
              </div>
              <div className="sap-info-field">
                <span className="sap-info-label">Valor total incl.impostos:</span>
                <span className="sap-info-value">2721.70</span>
              </div>
            </div>
            <div className="sap-warning">
              <span className="sap-warning-icon">⚠</span>
              <span className="sap-warning-text">Saldo não é igual a zero: 0,39- Débito: 2.722,09 Crédito: 2.721,70 - Exibir ajuda</span>
            </div>
          </div>

          <div className="sap-tabs-section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 8px' }}>
              <Tabs
                type="card"
                items={mainTabItems}
                className="atribuir-itens-tabs"
                activeKey={activeTab}
                onChange={handleTabChange}
                destroyInactiveTabPane
              />
              <div style={{ display: 'flex', gap: '4px', marginLeft: 'auto', marginRight: '4px' }}>
                <Button 
                  size="small" 
                  className="sap-icon-button"
                  icon={<FaFilter style={{ fontSize: '11px' }} />}
                />
                <Button 
                  size="small" 
                  className="sap-icon-button"
                  icon={<FaCog style={{ fontSize: '11px' }} />}
                />
              </div>
            </div>
          </div>

          <div className="sap-table-section">
            <Table
              columns={[
                { 
                  title: 'Nº do item', 
                  dataIndex: 'numero', 
                  width: 80,
                  render: (text) => <span style={{ fontFamily: 'Courier New, monospace' }}>{text}</span>
                },
                { 
                  title: 'Nº do pedido', 
                  dataIndex: 'pedido', 
                  width: 120,
                  render: (text) => <span style={{ fontFamily: 'Courier New, monospace' }}>{text}</span>
                },
                { 
                  title: 'Item do pedido', 
                  dataIndex: 'itemPedido', 
                  width: 100,
                  render: (text) => <span style={{ fontFamily: 'Courier New, monospace' }}>{text}</span>
                },
                { 
                  title: 'Qtd.NF-e convertida', 
                  dataIndex: 'quantidade', 
                  width: 120, 
                  align: 'right',
                  render: (text) => <span style={{ fontFamily: 'Courier New, monospace' }}>{text}</span>
                },
                { 
                  title: 'Unidade de pedido', 
                  dataIndex: 'unidade', 
                  width: 120 
                },
                { 
                  title: 'Pedido - nº de material', 
                  dataIndex: 'material', 
                  width: 150,
                  render: (text) => <span style={{ fontFamily: 'Courier New, monospace' }}>{text}</span>
                },
                { 
                  title: 'Pedido - texto breve', 
                  dataIndex: 'descricao', 
                  width: 300 
                },
                { 
                  title: 'CFOP', 
                  dataIndex: 'cfop', 
                  width: 80,
                  render: (text) => <span style={{ fontFamily: 'Courier New, monospace' }}>{text}</span>
                },
                { 
                  title: 'Cód.imposto', 
                  dataIndex: 'codImposto', 
                  width: 100,
                  render: (text) => <span style={{ fontFamily: 'Courier New, monospace' }}>{text}</span>
                }
              ]}
              dataSource={[
                {
                  key: '1',
                  numero: '1',
                  pedido: '4500210636',
                  itemPedido: '10',
                  quantidade: '36',
                  unidade: 'CDA',
                  material: '0290-B-2315-06 B',
                  descricao: 'PETROCHEMICAL NAPHTHA PUMP-B',
                  cfop: '2102AA',
                  codImposto: 'Z3'
                }
              ]}
              size="small"
              pagination={false}
              className="atribuir-itens-table"
              scroll={{ y: '200px', x: 'max-content' }}
              rowSelection={{
                type: 'radio',
                columnWidth: 28,
                selectedRowKeys: ['1']
              }}
            />
          </div>

          <div className="sap-bottom-tabs">
            <Tabs
              type="card"
              items={modalTabItems}
              className="modal-tabs"
              activeKey={modalActiveTab}
              onChange={handleModalTabChange}
              destroyInactiveTabPane
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AtribuirItensPedido;