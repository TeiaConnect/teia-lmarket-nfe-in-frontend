// Script para inserir pedidos específicos compatíveis com os XMLs de notas fiscais existentes
// Conectar ao MongoDB Atlas
const uri = "mongodb+srv://simplificaadmmktec:Simplifica@2025@appinbound.asdti8s.mongodb.net/test?retryWrites=true&w=majority";
db = connect(uri);

// Função para inserir um pedido específico
function inserirPedidoEspecifico(numeroPedido, cnpjCpf, dataPedido, itens) {
  // Inserir cabeçalho do pedido (EKKO)
  db.ekko.insertOne({
    numero_pedido: numeroPedido,
    cnpj_cpf: cnpjCpf,
    org_compras: "1000",
    grup_compras: "1000",
    data_pedido: new Date(dataPedido)
  });
  
  // Inserir itens do pedido (EKPO)
  for (const item of itens) {
    try {
      const resultado = db.ekpo.insertOne({
        numero_pedido: numeroPedido,
        numero_item: item.numero_item,
        cod_material_erp: item.cod_material_erp,
        cod_material_fornecedor: item.cod_material_fornecedor,
        quantidade: item.quantidade,
        preco_unitario: item.preco_unitario,
        valor_total: item.valor_total,
        icms: item.icms,
        aliquota_icms: item.aliquota_icms,
        ipi: item.ipi,
        aliquota_ipi: item.aliquota_ipi,
        cod_ncm: item.cod_ncm,
        data_pedido: new Date(dataPedido)
      });
      print(`Item ${item.numero_item} do pedido ${numeroPedido} inserido com sucesso. ID: ${resultado.insertedId}`);
    } catch (error) {
      print(`Erro ao inserir item ${item.numero_item} do pedido ${numeroPedido}: ${error}`);
    }
  }
  
  print(`Pedido ${numeroPedido} inserido com sucesso.`);
}

// Pedido 1 - Compatível com NF-e de exemplo
const pedido1 = {
  numeroPedido: "4500210636",
  cnpjCpf: "11663724000131", // CNPJ do emissor da NF-e de exemplo
  dataPedido: "2023-01-15",
  itens: [
    {
      numero_item: "00010",
      cod_material_erp: "0290-B-2315-06 B",
      cod_material_fornecedor: "PETROCHEMICAL NAPHTHA PUMP-B",
      quantidade: 36,
      preco_unitario: 75.60,
      valor_total: 2721.60,
      icms: 489.89,
      aliquota_icms: 18.0,
      ipi: 136.08,
      aliquota_ipi: 5.0,
      cod_ncm: "84133090"
    }
  ]
};

// Pedido 2 - Compatível com outra NF-e
const pedido2 = {
  numeroPedido: "4500210637",
  cnpjCpf: "11663724000131",
  dataPedido: "2023-01-20",
  itens: [
    {
      numero_item: "00010",
      cod_material_erp: "0290-B-2315-07 C",
      cod_material_fornecedor: "PETROCHEMICAL NAPHTHA PUMP-C",
      quantidade: 24,
      preco_unitario: 85.75,
      valor_total: 2058.00,
      icms: 370.44,
      aliquota_icms: 18.0,
      ipi: 102.90,
      aliquota_ipi: 5.0,
      cod_ncm: "84133090"
    },
    {
      numero_item: "00020",
      cod_material_erp: "0290-B-2315-08 D",
      cod_material_fornecedor: "PETROCHEMICAL NAPHTHA PUMP-D",
      quantidade: 12,
      preco_unitario: 95.50,
      valor_total: 1146.00,
      icms: 206.28,
      aliquota_icms: 18.0,
      ipi: 57.30,
      aliquota_ipi: 5.0,
      cod_ncm: "84133090"
    }
  ]
};

// Pedido 3 - Compatível com outra NF-e
const pedido3 = {
  numeroPedido: "4500210638",
  cnpjCpf: "99999999000191", // CNPJ do destinatário da NF-e de exemplo
  dataPedido: "2023-02-01",
  itens: [
    {
      numero_item: "00010",
      cod_material_erp: "A1234",
      cod_material_fornecedor: "MATERIAL DE CONSTRUÇÃO A",
      quantidade: 50,
      preco_unitario: 120.00,
      valor_total: 6000.00,
      icms: 1080.00,
      aliquota_icms: 18.0,
      ipi: 300.00,
      aliquota_ipi: 5.0,
      cod_ncm: "39269090"
    },
    {
      numero_item: "00020",
      cod_material_erp: "B5678",
      cod_material_fornecedor: "FERRAMENTAS INDUSTRIAIS B",
      quantidade: 30,
      preco_unitario: 85.00,
      valor_total: 2550.00,
      icms: 459.00,
      aliquota_icms: 18.0,
      ipi: 127.50,
      aliquota_ipi: 5.0,
      cod_ncm: "82055990"
    }
  ]
};

// Pedido 4 - Compatível com outra NF-e
const pedido4 = {
  numeroPedido: "4500210639",
  cnpjCpf: "99999999000191",
  dataPedido: "2023-02-10",
  itens: [
    {
      numero_item: "00010",
      cod_material_erp: "C9012",
      cod_material_fornecedor: "EQUIPAMENTOS ELÉTRICOS C",
      quantidade: 15,
      preco_unitario: 350.00,
      valor_total: 5250.00,
      icms: 945.00,
      aliquota_icms: 18.0,
      ipi: 262.50,
      aliquota_ipi: 5.0,
      cod_ncm: "85044099"
    }
  ]
};

// Pedido 5 - Compatível com outra NF-e
const pedido5 = {
  numeroPedido: "4500210640",
  cnpjCpf: "11663724000131",
  dataPedido: "2023-02-15",
  itens: [
    {
      numero_item: "00010",
      cod_material_erp: "D3456",
      cod_material_fornecedor: "COMPONENTES MECÂNICOS D",
      quantidade: 40,
      preco_unitario: 75.00,
      valor_total: 3000.00,
      icms: 540.00,
      aliquota_icms: 18.0,
      ipi: 150.00,
      aliquota_ipi: 5.0,
      cod_ncm: "84833099"
    },
    {
      numero_item: "00020",
      cod_material_erp: "E7890",
      cod_material_fornecedor: "MATERIAIS HIDRÁULICOS E",
      quantidade: 25,
      preco_unitario: 120.00,
      valor_total: 3000.00,
      icms: 540.00,
      aliquota_icms: 18.0,
      ipi: 150.00,
      aliquota_ipi: 5.0,
      cod_ncm: "84122990"
    }
  ]
};

// Inserir os pedidos
try {
  inserirPedidoEspecifico(
    pedido1.numeroPedido,
    pedido1.cnpjCpf,
    pedido1.dataPedido,
    pedido1.itens
  );
  print(`Pedido ${pedido1.numeroPedido} inserido com sucesso.`);
} catch (error) {
  print(`Erro ao inserir pedido ${pedido1.numeroPedido}: ${error}`);
}

try {
  inserirPedidoEspecifico(
    pedido2.numeroPedido,
    pedido2.cnpjCpf,
    pedido2.dataPedido,
    pedido2.itens
  );
  print(`Pedido ${pedido2.numeroPedido} inserido com sucesso.`);
} catch (error) {
  print(`Erro ao inserir pedido ${pedido2.numeroPedido}: ${error}`);
}

try {
  inserirPedidoEspecifico(
    pedido3.numeroPedido,
    pedido3.cnpjCpf,
    pedido3.dataPedido,
    pedido3.itens
  );
  print(`Pedido ${pedido3.numeroPedido} inserido com sucesso.`);
} catch (error) {
  print(`Erro ao inserir pedido ${pedido3.numeroPedido}: ${error}`);
}

try {
  inserirPedidoEspecifico(
    pedido4.numeroPedido,
    pedido4.cnpjCpf,
    pedido4.dataPedido,
    pedido4.itens
  );
  print(`Pedido ${pedido4.numeroPedido} inserido com sucesso.`);
} catch (error) {
  print(`Erro ao inserir pedido ${pedido4.numeroPedido}: ${error}`);
}

try {
  inserirPedidoEspecifico(
    pedido5.numeroPedido,
    pedido5.cnpjCpf,
    pedido5.dataPedido,
    pedido5.itens
  );
  print(`Pedido ${pedido5.numeroPedido} inserido com sucesso.`);
} catch (error) {
  print(`Erro ao inserir pedido ${pedido5.numeroPedido}: ${error}`);
}

print("Todos os pedidos foram inseridos com sucesso.");

// Verificar quantidade de documentos inseridos
print("\nQuantidade de documentos nas collections:");
print(`EKKO: ${db.ekko.count()}`);
print(`EKPO: ${db.ekpo.count()}`);

// Exemplo de consulta para verificar os pedidos inseridos
print("\nExemplo de consulta para verificar os pedidos inseridos:");
print("db.ekko.find({numero_pedido: {$in: ['4500210636', '4500210637', '4500210638', '4500210639', '4500210640']}}).pretty()");
print("db.ekpo.find({numero_pedido: {$in: ['4500210636', '4500210637', '4500210638', '4500210639', '4500210640']}}).pretty()"); 