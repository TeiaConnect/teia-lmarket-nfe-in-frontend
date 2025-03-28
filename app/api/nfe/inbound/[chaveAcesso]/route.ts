import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function DELETE(
  request: Request,
  { params }: { params: { chaveAcesso: string } }
) {
  try {
    const { chaveAcesso } = params;
    
    if (!chaveAcesso) {
      return NextResponse.json(
        { error: 'Chave de acesso não fornecida' },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();
    const collection = db.collection('xml_inbound');

    console.log('Buscando NF-e com chave de acesso:', chaveAcesso);

    // Primeiro, vamos verificar se o documento existe usando find()
    const docs = await collection.find({ 
      'nfeProc.protNFe.infProt.chNFe': chaveAcesso 
    }).toArray();

    console.log('Documentos encontrados:', docs.length);

    if (docs.length === 0) {
      return NextResponse.json(
        { error: 'NF-e não encontrada' },
        { status: 404 }
      );
    }

    // Se encontrou o documento, vamos excluí-lo
    const result = await collection.deleteOne({ 
      'nfeProc.protNFe.infProt.chNFe': chaveAcesso 
    });

    console.log('Resultado da exclusão:', result);

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Erro ao excluir NF-e' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'NF-e excluída com sucesso' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro ao excluir NF-e:', error);
    return NextResponse.json(
      { error: 'Erro ao excluir NF-e' },
      { status: 500 }
    );
  }
} 