// Importar o módulo mongodb
const { MongoClient } = require('mongodb');

// Conectar ao MongoDB Atlas
const uri = "mongodb+srv://simplificaadmmktec:Simplifica%402025@appinbound.asdti8s.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function inserirItensEKPO() {
    try {
        // Conectar ao MongoDB
        await client.connect();
        console.log("Conectado ao MongoDB Atlas com sucesso!");

        // Selecionar o banco de dados e a coleção
        const database = client.db("test");
        const collection = database.collection("ekpo");

        // Primeiro, vamos dropar a coleção existente
        try {
            await collection.drop();
            console.log("Coleção EKPO excluída com sucesso!");
        } catch (error) {
            console.log("Coleção EKPO não existia ou erro ao excluir:", error.message);
        }

        // Inserir os itens na coleção EKPO
        const itens = [
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
        ];

        try {
            const result = await collection.insertMany(itens);
            console.log(`${result.insertedCount} itens inseridos com sucesso na coleção EKPO!`);
            console.log("IDs dos itens inseridos:", result.insertedIds);
        } catch (error) {
            console.error("Erro ao inserir itens na coleção EKPO:");
            console.error("Detalhes do erro:", JSON.stringify(error, null, 2));
        }

        // Contar o número total de documentos na coleção EKPO
        const count = await collection.countDocuments();
        console.log(`Total de documentos na coleção EKPO: ${count}`);

    } catch (error) {
        console.error("Erro geral:", error);
    } finally {
        // Fechar a conexão com o MongoDB
        await client.close();
        console.log("Conexão com o MongoDB Atlas fechada.");
    }
}

// Executar a função
inserirItensEKPO(); 