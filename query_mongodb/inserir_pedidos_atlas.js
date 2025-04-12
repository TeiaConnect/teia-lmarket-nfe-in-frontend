// Script para inserir pedidos no MongoDB Atlas compatíveis com os XMLs de notas fiscais
// Conectar ao MongoDB Atlas
const uri = "mongodb+srv://simplificaadmmktec:Simplifica@2025@appinbound.asdti8s.mongodb.net/test?retryWrites=true&w=majority";
db = connect(uri);

// Função para gerar um número de pedido aleatório
function gerarNumeroPedido() {
  return Math.floor(1000000000 + Math.random() * 9000000000).toString();
}

// Função para gerar um código de material aleatório
function gerarCodigoMaterial() {
  const prefixos = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  const prefixo = prefixos[Math.floor(Math.random() * prefixos.length)];
  const numero = Math.floor(1000 + Math.random() * 9000);
  return `${prefixo}${numero}`;
}

// Função para gerar uma descrição de material aleatória
function gerarDescricaoMaterial() {
  const descricoes = [
    'Material de Construção',
    'Ferramentas Industriais',
    'Equipamentos Elétricos',
    'Componentes Mecânicos',
    'Materiais Hidráulicos',
    'Peças Automotivas',
    'Ferramentas Manuais',
    'Equipamentos de Segurança',
    'Materiais de Escritório',
    'Componentes Eletrônicos'
  ];
  return descricoes[Math.floor(Math.random() * descricoes.length)];
}

// Função para gerar uma unidade de medida aleatória
function gerarUnidadeMedida() {
  const unidades = ['UN', 'KG', 'MT', 'LT', 'PC', 'CX', 'RL', 'CDA', 'SC', 'FD'];
  return unidades[Math.floor(Math.random() * unidades.length)];
}

// Função para gerar um CNPJ aleatório
function gerarCNPJ() {
  const cnpj = Math.floor(10000000000000 + Math.random() * 90000000000000).toString();
  return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
}

// Função para gerar uma data aleatória nos últimos 30 dias
function gerarDataAleatoria() {
  const hoje = new Date();
  const diasAtras = Math.floor(Math.random() * 30);
  const data = new Date(hoje);
  data.setDate(hoje.getDate() - diasAtras);
  return data;
}

// Função para gerar um preço aleatório
function gerarPreco() {
  return Math.floor(100 + Math.random() * 9000) / 100;
}

// Função para gerar uma quantidade aleatória
function gerarQuantidade() {
  return Math.floor(1 + Math.random() * 100);
}

// Função para gerar um código NCM aleatório
function gerarNCM() {
  return Math.floor(10000000 + Math.random() * 90000000).toString();
}

// Função para gerar um pedido completo com itens
function gerarPedido() {
  const numeroPedido = gerarNumeroPedido();
  const cnpjCpf = gerarCNPJ();
  const dataPedido = gerarDataAleatoria();
  
  // Inserir cabeçalho do pedido (EKKO)
  db.ekko.insertOne({
    numero_pedido: numeroPedido,
    cnpj_cpf: cnpjCpf,
    org_compras: "1000",
    grup_compras: "1000",
    data_pedido: dataPedido
  });
  
  // Gerar entre 1 e 5 itens para o pedido
  const numItens = Math.floor(1 + Math.random() * 5);
  const itens = [];
  
  for (let i = 1; i <= numItens; i++) {
    const codMaterialERP = gerarCodigoMaterial();
    const codMaterialFornecedor = gerarCodigoMaterial();
    const quantidade = gerarQuantidade();
    const precoUnitario = gerarPreco();
    const valorTotal = quantidade * precoUnitario;
    const icms = valorTotal * 0.18; // 18% de ICMS
    const ipi = valorTotal * 0.05; // 5% de IPI
    
    // Inserir item do pedido (EKPO)
    const resultado = db.ekpo.insertOne({
      numero_pedido: numeroPedido,
      numero_item: i.toString().padStart(5, '0'),
      cod_material_erp: codMaterialERP,
      cod_material_fornecedor: codMaterialFornecedor,
      descricao: gerarDescricaoMaterial(),
      quantidade: quantidade,
      unidade_medida: gerarUnidadeMedida(),
      preco_unitario: precoUnitario,
      valor_total: valorTotal,
      icms: icms,
      ipi: ipi,
      ncm: gerarNCM()
    });
    
    print(`Item ${i} do pedido ${numeroPedido} inserido com sucesso. ID: ${resultado.insertedId}`);
  }
}

// Gerar 10 pedidos
for (let i = 0; i < 10; i++) {
  gerarPedido();
}

print("Pedidos inseridos com sucesso!");

// Verificar quantidade de documentos inseridos
print("\nQuantidade de documentos nas collections:");
print(`EKKO: ${db.ekko.count()}`);
print(`EKPO: ${db.ekpo.count()}`);

// Mostrar alguns exemplos dos dados inseridos
print("\nExemplos de pedidos inseridos:");
print("EKKO:");
db.ekko.find().limit(2).pretty();
print("\nEKPO:");
db.ekpo.find().limit(2).pretty();

// Ver todos os pedidos
db.ekko.find().pretty()

// Ver todos os itens
db.ekpo.find().pretty()

// Ver quantidade de documentos
db.ekko.count()
db.ekpo.count()

// Verificar um pedido específico por número
db.ekko.findOne({ numero_pedido: "1234567890" })

// Ver itens de um pedido específico
db.ekpo.find({ numero_pedido: "1234567890" }).pretty()

// Ver pedidos por CNPJ/CPF
db.ekko.find({ cnpj_cpf: "12.345.678/0001-90" }).pretty()

// Ver itens por código de material
db.ekpo.find({ cod_material_erp: "A1234" }).pretty()

// Ver pedidos por data
db.ekko.find({ data_pedido: { $gte: new Date("2023-01-01"), $lte: new Date("2023-12-31") } }).pretty()

// Ver itens por NCM
db.ekpo.find({ ncm: "12345678" }).pretty()

load("query_mongodb/inserir_pedidos_compatíveis.js")

// Script para inserir itens na coleção EKPO
const pedidos = [
  {
    numero_pedido: "4500210636",
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
        cod_ncm: "84133090",
        data_pedido: new Date("2023-01-15")
      }
    ]
  },
  {
    numero_pedido: "4500210637",
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
        cod_ncm: "84133090",
        data_pedido: new Date("2023-01-20")
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
        cod_ncm: "84133090",
        data_pedido: new Date("2023-01-20")
      }
    ]
  }
];

// Inserir itens na coleção EKPO
for (const pedido of pedidos) {
  for (const item of pedido.itens) {
    try {
      const resultado = db.ekpo.insertOne({
        numero_pedido: pedido.numero_pedido,
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
        data_pedido: item.data_pedido
      });
      print(`Item ${item.numero_item} do pedido ${pedido.numero_pedido} inserido com sucesso. ID: ${resultado.insertedId}`);
    } catch (error) {
      print(`Erro ao inserir item ${item.numero_item} do pedido ${pedido.numero_pedido}: ${error}`);
    }
  }
}

print("Itens inseridos com sucesso.");
print(`EKPO: ${db.ekpo.count()}`);

db.getCollectionInfos({name: "ekpo"})

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
])

load("query_mongodb/inserir_itens_ekpo_um_por_um.js") 