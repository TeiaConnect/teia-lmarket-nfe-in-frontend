import { NextResponse } from 'next/server';
import { XMLParser } from 'fast-xml-parser';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb+srv://bruno:bruno123@cluster0.mongodb.net/simplifica?retryWrites=true&w=majority';
const dbName = 'simplifica';

export async function POST(request: Request) {
  let client;
  try {
    const { xml_content, created_at } = await request.json();
    
    if (!xml_content) {
      return NextResponse.json({ success: false, error: 'Conteúdo XML não fornecido' }, { status: 400 });
    }

    const parser = new XMLParser({
      ignoreAttributes: false,
      parseAttributeValue: false,
      parseTagValue: false,
      trimValues: false
    });

    const result = parser.parse(xml_content);
    const nfeProc = result.nfeProc;
    
    if (!nfeProc?.NFe?.infNFe || !nfeProc?.protNFe?.infProt) {
      return NextResponse.json({ success: false, error: 'XML inválido ou incompleto' }, { status: 400 });
    }

    console.log('Conectando ao MongoDB com URI:', uri);
    client = await MongoClient.connect(uri);
    console.log('Conectado ao MongoDB');
    
    const db = client.db(dbName);
    const collection = db.collection('xml_inbound');
    
    // Verificar documentos existentes
    const countBefore = await collection.countDocuments();
    console.log('Documentos existentes antes:', countBefore);

    const document = {
      nfeProc,
      created_at,
      processed: false
    };

    console.log('Tentando inserir documento...');
    const resultInsert = await collection.insertOne(document);
    console.log('Resultado da inserção:', resultInsert);

    // Verificar documentos após inserção
    const countAfter = await collection.countDocuments();
    console.log('Documentos existentes depois:', countAfter);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro detalhado:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Erro ao processar XML' 
    }, { status: 500 });
  } finally {
    if (client) {
      await client.close();
      console.log('Conexão fechada');
    }
  }
} 