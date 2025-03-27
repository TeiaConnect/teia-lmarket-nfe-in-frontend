'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import AtribuirItensPedido, { AtribuirItensPedidoProps } from '../AtribuirItensPedido';

export default function AtribuirItensPedidoPage() {
  const searchParams = useSearchParams();
  const chaveAcesso = searchParams.get('chaveAcesso');

  return (
    <div style={{ padding: '20px' }}>
      <AtribuirItensPedido chaveAcesso={chaveAcesso || undefined} />
    </div>
  );
} 