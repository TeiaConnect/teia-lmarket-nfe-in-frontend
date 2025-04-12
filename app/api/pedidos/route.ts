import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || "mongodb+srv://brunomkt:brunomkt@cluster0.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const numeroPedido = searchParams.get('numeroPedido');
    const itemPedido = searchParams.get('itemPedido');
    const codMaterial = searchParams.get('codMaterial');

    await client.connect();
    const database = client.db("simplifica");
    const collection = database.collection("EKPO");

    let query: any = {};
    
    if (numeroPedido) {
      query.numero_pedido = numeroPedido;
    }
    if (itemPedido) {
      query.numero_item = itemPedido;
    }
    if (codMaterial) {
      query.cod_material_erp = codMaterial;
    }

    const pedidos = await collection.find(query).toArray();
    
    return NextResponse.json(pedidos);
  } catch (error) {
    console.error('Erro ao buscar pedidos:', error);
    return NextResponse.json({ error: 'Erro ao buscar pedidos' }, { status: 500 });
  } finally {
    await client.close();
  }
} 