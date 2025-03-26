import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { XMLParser } from 'fast-xml-parser';

export async function GET(request: Request) {
  try {
    console.log('Iniciando requisição GET /api/nfe/inbound');
    
    const { db } = await connectToDatabase();
    const collection = db.collection('xml_inbound');
    
    // Contar total de documentos
    const totalDocs = await collection.countDocuments();
    console.log(`Total de documentos na collection: ${totalDocs}`);
    
    // Buscar todos os documentos
    const nfes = await collection.find({}).toArray();
    console.log(`Retornando ${nfes.length} documentos`);
    
    // Processar documentos que ainda não foram processados
    const nfesProcessadas = nfes.map(doc => {
      if (doc.xml_content && !doc.nfeProc) {
        try {
          const parser = new XMLParser({
            ignoreAttributes: false,
            attributeNamePrefix: '@_'
          });
          const xmlData = parser.parse(doc.xml_content);
          return xmlData;
        } catch (error) {
          console.error('Erro ao processar XML:', error);
          return null;
        }
      }
      return doc;
    }).filter(Boolean);
    
    console.log(`Documentos processados com sucesso: ${nfesProcessadas.length}`);
    
    if (nfesProcessadas.length > 0) {
      console.log('Estrutura do primeiro documento:', JSON.stringify(nfesProcessadas[0], null, 2));
    }
    
    return NextResponse.json(nfesProcessadas);
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar dados do MongoDB' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { db } = await connectToDatabase();
    const collection = db.collection('xml_inbound');
    
    const data = await request.json();
    
    // Processar o XML
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
      parseAttributeValue: false, // Mantém os valores como string
      parseTagValue: false, // Mantém os valores como string
      trimValues: false // Mantém os espaços em branco
    });
    
    const xmlData = parser.parse(data.xml_content);
    
    // Verificar se é um evento ou uma NFe
    if (xmlData.evento) {
      // Se for um evento, salvar como está
      const result = await collection.insertOne({
        ...data,
        tipo: 'evento'
      });
      return NextResponse.json({ success: true, id: result.insertedId });
    } else if (xmlData.nfeProc) {
      // Se for uma NFe, salvar processada
      const result = await collection.insertOne({
        ...xmlData,
        created_at: data.created_at,
        tipo: 'nfe',
        xml_content: data.xml_content // Manter o XML original
      });
      return NextResponse.json({ success: true, id: result.insertedId });
    } else {
      throw new Error('XML inválido - não é uma NFe nem um evento');
    }
  } catch (error) {
    console.error('Erro ao processar XML:', error);
    return NextResponse.json(
      { error: 'Erro ao processar XML' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    const { db } = await connectToDatabase();
    const collection = db.collection('xml_inbound');
    
    const result = await collection.deleteMany({});
    return NextResponse.json({ 
      success: true, 
      deletedCount: result.deletedCount 
    });
  } catch (error) {
    console.error('Erro ao limpar documentos:', error);
    return NextResponse.json(
      { error: 'Erro ao limpar documentos' },
      { status: 500 }
    );
  }
} 