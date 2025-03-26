import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    
    // Tenta listar as collections
    const collections = await db.listCollections().toArray();
    
    // Tenta buscar um documento da collection xml_inbound
    const testDoc = await db.collection('xml_inbound').findOne();
    
    return NextResponse.json({
      status: 'success',
      message: 'Conexão com MongoDB estabelecida com sucesso',
      collections: collections.map((c: { name: string }) => c.name),
      testDocument: testDoc
    });
  } catch (error) {
    console.error('Erro na conexão:', error);
    return NextResponse.json(
      { 
        status: 'error',
        message: 'Erro ao conectar com MongoDB',
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    );
  }
} 