// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use("test");
// Criar coleção de cabeçalho do pedido (EKKO)
db.createCollection("ekko", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["numero_pedido", "cnpj_cpf", "org_compras", "grup_compras", "data_pedido"],
        properties: {
          numero_pedido: {
            bsonType: "string",
            description: "Número do pedido - obrigatório e único"
          },
          cnpj_cpf: {
            bsonType: "string",
            description: "CNPJ ou CPF do fornecedor - obrigatório"
          },
          org_compras: {
            bsonType: "string",
            description: "Organização de compras - obrigatório"
          },
          grup_compras: {
            bsonType: "string",
            description: "Grupo de compras - obrigatório"
          },
          data_pedido: {
            bsonType: "date",
            description: "Data do pedido - obrigatório"
          }
        }
      }
    }
  });
  
  // Criar índice único para número do pedido
  db.ekko.createIndex({ "numero_pedido": 1 }, { unique: true });
  
  // Criar coleção de itens do pedido (EKPO)
  db.createCollection("ekpo", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: [
          "numero_pedido",
          "numero_item",
          "cod_material_erp",
          "cod_material_fornecedor",
          "quantidade",
          "preco_unitario",
          "valor_total",
          "cod_ncm",
          "data_pedido"
        ],
        properties: {
          numero_pedido: {
            bsonType: "string",
            description: "Número do pedido - obrigatório"
          },
          numero_item: {
            bsonType: "string",
            description: "Número do item - obrigatório"
          },
          cod_material_erp: {
            bsonType: "string",
            description: "Código do material no ERP - obrigatório"
          },
          cod_material_fornecedor: {
            bsonType: "string",
            description: "Código do material do fornecedor - obrigatório"
          },
          quantidade: {
            bsonType: "double",
            description: "Quantidade - obrigatório"
          },
          preco_unitario: {
            bsonType: "double",
            description: "Preço unitário - obrigatório"
          },
          valor_total: {
            bsonType: "double",
            description: "Valor total - obrigatório"
          },
          icms: {
            bsonType: "double",
            description: "Valor do ICMS"
          },
          aliquota_icms: {
            bsonType: "double",
            description: "Alíquota do ICMS"
          },
          ipi: {
            bsonType: "double",
            description: "Valor do IPI"
          },
          aliquota_ipi: {
            bsonType: "double",
            description: "Alíquota do IPI"
          },
          cod_ncm: {
            bsonType: "string",
            description: "Código NCM - obrigatório"
          },
          data_pedido: {
            bsonType: "date",
            description: "Data do pedido - obrigatório"
          }
        }
      }
    }
  });
  
  // Criar índice composto para número do pedido e número do item
  db.ekpo.createIndex({ "numero_pedido": 1, "numero_item": 1 }, { unique: true });
  
  // Criar índice para melhorar performance de consultas por número do pedido
  db.ekpo.createIndex({ "numero_pedido": 1 });
