// Script para executar todos os scripts em sequência
print("Iniciando execução dos scripts...");

// Executar script para criar as coleções
print("\n=== Executando script para criar as coleções ===");
load("query_mongodb/playground-2.mongodb.js");

// Executar script para inserir pedidos aleatórios
print("\n=== Executando script para inserir pedidos aleatórios ===");
load("query_mongodb/inserir_pedidos.js");

// Executar script para inserir pedidos específicos
print("\n=== Executando script para inserir pedidos específicos ===");
load("query_mongodb/inserir_pedidos_compatíveis.js");

// Executar script para buscar pedidos
print("\n=== Executando script para buscar pedidos ===");
load("query_mongodb/buscar_pedidos.js");

print("\nTodos os scripts foram executados com sucesso.");
print("Agora você pode usar a interface de busca de pedidos na página AtribuirItensPedido.tsx."); 