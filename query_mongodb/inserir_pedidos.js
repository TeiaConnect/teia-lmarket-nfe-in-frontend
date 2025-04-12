// Script para inserir pedidos no MongoDB compatíveis com os XMLs de notas fiscais
use("test");

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
    db.ekpo.insertOne({
      numero_pedido: numeroPedido,
      numero_item: i.toString().padStart(5, '0'),
      cod_material_erp: codMaterialERP,
      cod_material_fornecedor: codMaterialFornecedor,
      quantidade: quantidade,
      preco_unitario: precoUnitario,
      valor_total: valorTotal,
      icms: icms,
      aliquota_icms: 18.0,
      ipi: ipi,
      aliquota_ipi: 5.0,
      cod_ncm: gerarNCM(),
      data_pedido: dataPedido
    });
    
    itens.push({
      numero_pedido: numeroPedido,
      numero_item: i.toString().padStart(5, '0'),
      cod_material_erp: codMaterialERP,
      cod_material_fornecedor: codMaterialFornecedor,
      quantidade: quantidade,
      preco_unitario: precoUnitario,
      valor_total: valorTotal,
      icms: icms,
      aliquota_icms: 18.0,
      ipi: ipi,
      aliquota_ipi: 5.0,
      cod_ncm: gerarNCM(),
      data_pedido: dataPedido
    });
  }
  
  return {
    numero_pedido: numeroPedido,
    cnpj_cpf: cnpjCpf,
    data_pedido: dataPedido,
    itens: itens
  };
}

// Gerar e inserir 20 pedidos
const pedidos = [];
for (let i = 0; i < 20; i++) {
  const pedido = gerarPedido();
  pedidos.push(pedido);
  print(`Pedido ${pedido.numero_pedido} inserido com sucesso.`);
}

print(`Total de ${pedidos.length} pedidos inseridos.`);

// Exemplo de consulta para verificar os pedidos inseridos
print("\nExemplo de consulta para verificar os pedidos inseridos:");
print("db.ekko.find().limit(5).pretty()");
print("db.ekpo.find().limit(5).pretty()"); 