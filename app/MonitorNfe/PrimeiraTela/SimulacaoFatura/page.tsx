'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import SimulacaoFatura from '../SimulacaoFatura';

// Exemplo de dados fictícios (substituir por dados reais via query ou props)
const nfeSimulacaoData = {
  emitente: { nome: 'ATTA INDUSTRIAL LTDA' },
  destinatario: { nome: 'USAFLEX - INDUSTRIA & COMERCIO S/A' },
  valorTotal: '30.861,72',
  mensagens: [
    'Existem mensagens no nível de item',
    'Preço abaixo do limite: limite tolerância de 10,00 % não será atingido',
    'Elem.NF-e 000010: valor produto 3.429,08 em NF-e diverge de valor calculado 3.840,57'
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
      valores: { cfop: '6101', descricao: 'CHINELO EVA AT608 POOFY 6 AL4401 AZUL CEU - 34', quantidade: 167, valorTotal: 3429.08 },
      impostos: { ICMS: 411.49, IPI: 0, PIS: 56.58, COFINS: 260.61 },
      condicoesImposto: { ICMS: 'A', IPI: 'A', PIS: 'A', COFINS: 'A' }
    },
    // ... outros itens ...
  ]
};

const SimulacaoFaturaPage: React.FC = () => {
  const router = useRouter();
  return (
    <SimulacaoFatura nfeData={nfeSimulacaoData} onVoltar={() => router.back()} />
  );
};

export default SimulacaoFaturaPage; 