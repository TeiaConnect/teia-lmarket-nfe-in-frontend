'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import AtribuirItensPedido from '../AtribuirItensPedido';

export default function AtribuirItensPedidoPage() {
  const searchParams = useSearchParams();
  const chaveAcesso = searchParams.get('chaveAcesso');

  return (
    <div className="flex-1 p-4">
      <AtribuirItensPedido chaveAcesso={chaveAcesso || ''} />
    </div>
  );
} 