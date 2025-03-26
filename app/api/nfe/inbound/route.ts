import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET(request: Request) {
  try {
    console.log('Iniciando requisição GET /api/nfe/inbound');
    const { searchParams } = new URL(request.url);
    const chNFe = searchParams.get('chNFe');
    const cnpjEmissor = searchParams.get('cnpj_emissor');
    const dataInicio = searchParams.get('data_inicio');
    const dataFim = searchParams.get('data_fim');

    console.log('Parâmetros recebidos:', { chNFe, cnpjEmissor, dataInicio, dataFim });
    console.log('Conectando ao MongoDB...');
    
    const { db } = await connectToDatabase();
    console.log('Conexão estabelecida com sucesso');
    
    console.log('Acessando collection xml_inbound...');
    const collection = db.collection('xml_inbound');
    console.log('Collection acessada com sucesso');

    // Construir query baseada nos parâmetros
    const query: any = {};
    
    if (chNFe) {
      query['nfeProc.protNFe.infProt.chNFe'] = chNFe;
    }
    
    if (cnpjEmissor) {
      query['nfeProc.NFe.infNFe.emit.CNPJ'] = cnpjEmissor;
    }
    
    if (dataInicio && dataFim) {
      query.created_at = {
        $gte: new Date(dataInicio),
        $lte: new Date(dataFim)
      };
    }

    console.log('Query construída:', JSON.stringify(query, null, 2));
    
    try {
      const nfes = await collection.find(query).toArray();
      console.log(`Encontrados ${nfes.length} documentos`);
      
      if (nfes.length > 0) {
        console.log('Estrutura do primeiro documento:', JSON.stringify(nfes[0], null, 2));
        console.log('Campos disponíveis:', Object.keys(nfes[0]));
      }
      
      return NextResponse.json(nfes);
    } catch (dbError) {
      console.error('Erro ao executar query no MongoDB:', dbError);
      throw dbError;
    }
  } catch (error) {
    console.error('Erro detalhado ao buscar dados:', error);
    return NextResponse.json(
      { 
        error: 'Erro ao buscar dados do MongoDB',
        details: error instanceof Error ? error.message : 'Erro desconhecido',
        stack: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
} 