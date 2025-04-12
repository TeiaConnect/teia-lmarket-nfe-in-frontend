// Script para inserir itens na coleção EKPO um por um
// Conectar ao MongoDB Atlas
const uri = "mongodb+srv://simplificaadmmktec:Simplifica@2025@appinbound.asdti8s.mongodb.net/test?retryWrites=true&w=majority";
db = connect(uri);

// Item 1
try {
  const resultado = db.ekpo.insertOne({
    numero_pedido: "4500210636",
    numero_item: "00010",
    cod_material_erp: "0290-B-2315-06 B",
    cod_material_fornecedor: "PETROCHEMICAL NAPHTHA PUMP-B",
    quantidade: 36.0,
    preco_unitario: 75.60,
    valor_total: 2721.60,
    icms: 489.89,
    aliquota_icms: 18.0,
    ipi: 136.08,
    aliquota_ipi: 5.0,
    cod_ncm: "84133090",
    data_pedido: new Date("2023-01-15")
  });
  print(`Item 1 inserido com sucesso. ID: ${resultado.insertedId}`);
} catch (error) {
  print(`Erro ao inserir item 1: ${error}`);
}

// Item 2
try {
  const resultado = db.ekpo.insertOne({
    numero_pedido: "4500210637",
    numero_item: "00010",
    cod_material_erp: "0290-B-2315-07 C",
    cod_material_fornecedor: "PETROCHEMICAL NAPHTHA PUMP-C",
    quantidade: 24.0,
    preco_unitario: 85.75,
    valor_total: 2058.00,
    icms: 370.44,
    aliquota_icms: 18.0,
    ipi: 102.90,
    aliquota_ipi: 5.0,
    cod_ncm: "84133090",
    data_pedido: new Date("2023-01-20")
  });
  print(`Item 2 inserido com sucesso. ID: ${resultado.insertedId}`);
} catch (error) {
  print(`Erro ao inserir item 2: ${error}`);
}

// Item 3
try {
  const resultado = db.ekpo.insertOne({
    numero_pedido: "4500210637",
    numero_item: "00020",
    cod_material_erp: "0290-B-2315-08 D",
    cod_material_fornecedor: "PETROCHEMICAL NAPHTHA PUMP-D",
    quantidade: 12.0,
    preco_unitario: 95.50,
    valor_total: 1146.00,
    icms: 206.28,
    aliquota_icms: 18.0,
    ipi: 57.30,
    aliquota_ipi: 5.0,
    cod_ncm: "84133090",
    data_pedido: new Date("2023-01-20")
  });
  print(`Item 3 inserido com sucesso. ID: ${resultado.insertedId}`);
} catch (error) {
  print(`Erro ao inserir item 3: ${error}`);
}

print("Processo de inserção concluído.");
print(`EKPO: ${db.ekpo.count()}`); 