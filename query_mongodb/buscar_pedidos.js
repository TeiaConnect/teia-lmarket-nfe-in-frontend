// Script para buscar pedidos no MongoDB compatível com a interface de busca de pedidos
use("test");

// Função para buscar pedidos por número de pedido
function buscarPedidoPorNumero(numeroPedido) {
  // Buscar cabeçalho do pedido
  const pedido = db.ekko.findOne({ numero_pedido: numeroPedido });
  
  if (!pedido) {
    return { success: false, message: "Pedido não encontrado" };
  }
  
  // Buscar itens do pedido
  const itens = db.ekpo.find({ numero_pedido: numeroPedido }).toArray();
  
  return {
    success: true,
    pedido: pedido,
    itens: itens
  };
}

// Função para buscar pedidos por CNPJ/CPF do fornecedor
function buscarPedidosPorCNPJ(cnpjCpf) {
  // Buscar cabeçalhos dos pedidos
  const pedidos = db.ekko.find({ cnpj_cpf: cnpjCpf }).toArray();
  
  if (pedidos.length === 0) {
    return { success: false, message: "Nenhum pedido encontrado para o CNPJ/CPF informado" };
  }
  
  // Buscar itens para cada pedido
  const resultados = pedidos.map(pedido => {
    const itens = db.ekpo.find({ numero_pedido: pedido.numero_pedido }).toArray();
    return {
      pedido: pedido,
      itens: itens
    };
  });
  
  return {
    success: true,
    resultados: resultados
  };
}

// Função para buscar pedidos por código de material
function buscarPedidosPorMaterial(codMaterial) {
  // Buscar itens que contenham o código de material
  const itens = db.ekpo.find({
    $or: [
      { cod_material_erp: codMaterial },
      { cod_material_fornecedor: codMaterial }
    ]
  }).toArray();
  
  if (itens.length === 0) {
    return { success: false, message: "Nenhum pedido encontrado para o material informado" };
  }
  
  // Agrupar itens por número de pedido
  const pedidosMap = new Map();
  
  for (const item of itens) {
    if (!pedidosMap.has(item.numero_pedido)) {
      const pedido = db.ekko.findOne({ numero_pedido: item.numero_pedido });
      pedidosMap.set(item.numero_pedido, {
        pedido: pedido,
        itens: []
      });
    }
    
    pedidosMap.get(item.numero_pedido).itens.push(item);
  }
  
  return {
    success: true,
    resultados: Array.from(pedidosMap.values())
  };
}

// Função para buscar pedidos por data
function buscarPedidosPorData(dataInicio, dataFim) {
  // Buscar cabeçalhos dos pedidos dentro do intervalo de datas
  const pedidos = db.ekko.find({
    data_pedido: {
      $gte: new Date(dataInicio),
      $lte: new Date(dataFim)
    }
  }).toArray();
  
  if (pedidos.length === 0) {
    return { success: false, message: "Nenhum pedido encontrado no período informado" };
  }
  
  // Buscar itens para cada pedido
  const resultados = pedidos.map(pedido => {
    const itens = db.ekpo.find({ numero_pedido: pedido.numero_pedido }).toArray();
    return {
      pedido: pedido,
      itens: itens
    };
  });
  
  return {
    success: true,
    resultados: resultados
  };
}

// Exemplo de uso das funções de busca
print("Exemplo de busca por número de pedido:");
const resultadoNumero = buscarPedidoPorNumero("4500210636");
print(JSON.stringify(resultadoNumero, null, 2));

print("\nExemplo de busca por CNPJ/CPF:");
const resultadoCNPJ = buscarPedidosPorCNPJ("12.345.678/0001-90");
print(JSON.stringify(resultadoCNPJ, null, 2));

print("\nExemplo de busca por código de material:");
const resultadoMaterial = buscarPedidosPorMaterial("A1234");
print(JSON.stringify(resultadoMaterial, null, 2));

print("\nExemplo de busca por data:");
const hoje = new Date();
const trintaDiasAtras = new Date(hoje);
trintaDiasAtras.setDate(hoje.getDate() - 30);
const resultadoData = buscarPedidosPorData(trintaDiasAtras, hoje);
print(JSON.stringify(resultadoData, null, 2)); 