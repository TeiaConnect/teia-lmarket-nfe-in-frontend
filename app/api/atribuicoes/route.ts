import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || "mongodb+srv://brunomkt:brunomkt@cluster0.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

export async function POST(request: Request) {
  try {
    const atribuicoes = await request.json();
    
    await client.connect();
    const database = client.db("simplifica");
    const collection = database.collection("atribuicoes");

    // Inserir todas as atribuições
    const result = await collection.insertMany(atribuicoes);
    
    return NextResponse.json({ 
      message: 'Atribuições salvas com sucesso',
      insertedCount: result.insertedCount 
    });
  } catch (error) {
    console.error('Erro ao salvar atribuições:', error);
    return NextResponse.json({ error: 'Erro ao salvar atribuições' }, { status: 500 });
  } finally {
    await client.close();
  }
} 