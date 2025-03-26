import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { NFe } from '@/app/models/NFe';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const chNFe = searchParams.get('chNFe');
    const cnpjEmissor = searchParams.get('cnpj_emissor');
    const dataInicio = searchParams.get('data_inicio');
    const dataFim = searchParams.get('data_fim');

    await connectToDatabase();

    let query: any = {};

    if (chNFe) {
      query.chaveAcesso = chNFe;
    }

    if (cnpjEmissor) {
      query['dadosProcessados.emissor.cnpj'] = cnpjEmissor;
    }

    if (dataInicio && dataFim) {
      query.dataCriacao = {
        $gte: new Date(dataInicio),
        $lte: new Date(dataFim)
      };
    }

    const notasFiscais = await NFe.find(query).sort({ dataCriacao: -1 });

    return NextResponse.json(notasFiscais);
  } catch (error) {
    console.error('Erro ao buscar notas fiscais:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar notas fiscais' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectToDatabase();

    const nfe = new NFe(body);
    await nfe.save();

    return NextResponse.json(nfe);
  } catch (error) {
    console.error('Erro ao criar nota fiscal:', error);
    return NextResponse.json(
      { error: 'Erro ao criar nota fiscal' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const chaveAcesso = searchParams.get('chaveAcesso');
    const body = await request.json();

    if (!chaveAcesso) {
      return NextResponse.json(
        { error: 'Chave de acesso é obrigatória' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const nfe = await NFe.findOneAndUpdate(
      { chaveAcesso },
      { $set: body },
      { new: true }
    );

    if (!nfe) {
      return NextResponse.json(
        { error: 'Nota fiscal não encontrada' },
        { status: 404 }
      );
    }

    return NextResponse.json(nfe);
  } catch (error) {
    console.error('Erro ao atualizar nota fiscal:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar nota fiscal' },
      { status: 500 }
    );
  }
} 