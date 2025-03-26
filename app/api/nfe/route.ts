import { NextResponse } from 'next/server';
import { connectDB } from '@/app/lib/mongodb';
import { XMLInbound } from '@/app/models/NFeModel';
import { parseString, ParserOptions } from 'xml2js';
import { promisify } from 'util';

const parseXMLAsync = promisify<string, ParserOptions, any>(parseString);

export async function POST(request: Request) {
  try {
    await connectDB();
    const data = await request.json();
    const { xml_content } = data;

    // Processa o XML
    const result = await parseXMLAsync(xml_content, {
      explicitArray: false,
      mergeAttrs: true
    });
    
    // Cria o documento com a estrutura completa do XML
    const xmlDocument = {
      ...result,
      xml_content, // Mantém o XML original
      created_at: new Date()
    };

    // Salva no MongoDB
    const savedXML = await XMLInbound.create(xmlDocument);
    return NextResponse.json(savedXML);
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
    
    if (searchParams.has('chNFe')) {
      filter['nfeProc.protNFe.infProt.chNFe'] = searchParams.get('chNFe');
    }
    if (searchParams.has('cnpj_emissor')) {
      filter['nfeProc.NFe.infNFe.emit.CNPJ'] = searchParams.get('cnpj_emissor');
    }
    if (searchParams.has('data_inicio') && searchParams.has('data_fim')) {
      filter.created_at = {
        $gte: new Date(searchParams.get('data_inicio')!),
        $lte: new Date(searchParams.get('data_fim')!)
      };
    }

    const xmls = await XMLInbound.find(filter).sort({ created_at: -1 });
    return NextResponse.json(xmls);
  } catch (error) {
    console.error('Erro ao buscar XMLs:', error);
    return NextResponse.json({ error: 'Erro ao buscar XMLs' }, { status: 500 });
  }
} 