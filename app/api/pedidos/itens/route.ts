import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const numeroPedido = searchParams.get('numeroPedido');

    if (!numeroPedido) {
      return NextResponse.json(
        { error: 'Número do pedido é obrigatório' },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();
    
    // Buscar itens do pedido na coleção EKPO
    const itens = await db.collection('ekpo')
      .find({ numero_pedido: numeroPedido })
      .toArray();

    return NextResponse.json(itens);
  } catch (error) {
    console.error('Erro ao buscar itens do pedido:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar itens do pedido' },
      { status: 500 }
    );
  }
} 