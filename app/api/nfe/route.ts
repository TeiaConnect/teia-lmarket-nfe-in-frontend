import { NextResponse } from 'next/server';
import { connectDB } from '@/app/lib/mongodb';
import { NFe } from '@/app/models/NFeModel';
import { parseString } from 'xml2js';
import { promisify } from 'util';

const parseXMLAsync = promisify(parseString);

export async function POST(request: Request) {
  try {
    await connectDB();
    const data = await request.json();
    const { xml_content } = data;

    // Processa o XML
    const result = await parseXMLAsync(xml_content);
    
    // Extrai os dados relevantes do XML
    const nfeData = {
      chave_acesso: result.nfeProc?.NFe?.[0]?.infNFe?.[0]?.$.Id || '',
      xml_content,
      tipo_documento: 'NF-e',
      cnpj_emissor: result.nfeProc?.NFe?.[0]?.infNFe?.[0]?.emit?.[0]?.CNPJ?.[0] || '',
      nome_emissor: result.nfeProc?.NFe?.[0]?.infNFe?.[0]?.emit?.[0]?.xNome?.[0] || '',
      numero_nfe: result.nfeProc?.NFe?.[0]?.infNFe?.[0]?.ide?.[0]?.nNF?.[0] || '',
      processed_data: {
        referencia_nfe: {
          chave_acesso: result.nfeProc?.NFe?.[0]?.infNFe?.[0]?.$.Id || ''
        },
        emissor: {
          cnpj: result.nfeProc?.NFe?.[0]?.infNFe?.[0]?.emit?.[0]?.CNPJ?.[0] || '',
          nome_emissor: result.nfeProc?.NFe?.[0]?.infNFe?.[0]?.emit?.[0]?.xNome?.[0] || '',
          // Adicione mais campos conforme necessário
        }
      }
    };

    // Salva no MongoDB
    const nfe = await NFe.create(nfeData);
    return NextResponse.json(nfe);
  } catch (error) {
    console.error('Erro ao processar XML:', error);
    return NextResponse.json({ error: 'Erro ao processar XML' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    
    // Constrói o filtro baseado nos parâmetros da URL
    const filter: any = {};
    
    if (searchParams.has('chave_acesso')) {
      filter.chave_acesso = searchParams.get('chave_acesso');
    }
    if (searchParams.has('cnpj_emissor')) {
      filter.cnpj_emissor = searchParams.get('cnpj_emissor');
    }
    if (searchParams.has('data_inicio') && searchParams.has('data_fim')) {
      filter.created_at = {
        $gte: new Date(searchParams.get('data_inicio')!),
        $lte: new Date(searchParams.get('data_fim')!)
      };
    }

    const nfes = await NFe.find(filter).sort({ created_at: -1 });
    return NextResponse.json(nfes);
  } catch (error) {
    console.error('Erro ao buscar NFes:', error);
    return NextResponse.json({ error: 'Erro ao buscar NFes' }, { status: 500 });
  }
} 