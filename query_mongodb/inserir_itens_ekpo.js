// Script para inserir itens na coleção EKPO
// Conectar ao MongoDB Atlas
const uri = "mongodb+srv://simplificaadmmktec:Simplifica@2025@appinbound.asdti8s.mongodb.net/test?retryWrites=true&w=majority";
db = connect(uri);

// Inserir itens na coleção EKPO
db.ekpo.insertMany([
  {
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
  },
  {
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
  },
  {
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
  }
]);

print("Itens inseridos com sucesso.");
print(`EKPO: ${db.ekpo.count()}`); 