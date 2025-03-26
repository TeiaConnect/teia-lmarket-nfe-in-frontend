import mongoose from 'mongoose';

const NFeSchema = new mongoose.Schema({
  chaveAcesso: {
    type: String,
    required: true,
    unique: true
  },
  xmlOriginal: {
    type: String,
    required: true
  },
  dadosProcessados: {
    identificacao_nfe: {
      tipo_emissao: String,
      codigo_status: String,
      numero_nfe: String,
      serie: String
    },
    emissor: {
      cnpj: String,
      codigo_uf: String,
      inscricao_estadual: String,
      nome_emissor: String,
      nome_empresa: String,
      nome_comercio: String,
      rua: String,
      complemento: String,
      bairro: String,
      numero: String,
      codigo_postal: String,
      codigo_cidade: String,
      nome_cidade: String,
      uf: String,
      chave_pais: String,
      nome_pais: String,
      telefone: String,
      codigo_tributacao: String,
      inscricao_municipal: String,
      codigo_atividade: String
    },
    destinatario: {
      cnpj: String,
      nome: String,
      inscricao_estadual: String,
      endereco: {
        rua: String,
        numero: String,
        complemento: String,
        bairro: String,
        codigo_postal: String,
        codigo_cidade: String,
        nome_cidade: String,
        uf: String
      }
    },
    itens: [{
      codigo: String,
      descricao: String,
      quantidade: Number,
      valor_unitario: Number,
      valor_total: Number,
      ncm: String,
      cfop: String
    }],
    totais: {
      valor_produtos: Number,
      valor_frete: Number,
      valor_desconto: Number,
      valor_total: Number,
      valor_pis: Number,
      valor_cofins: Number,
      valor_ipi: Number,
      valor_icms: Number
    }
  },
  statusProcesso: {
    type: String,
    enum: ['PENDENTE', 'EM_PROCESSAMENTO', 'PROCESSADO', 'ERRO'],
    default: 'PENDENTE'
  },
  etapasProcesso: [{
    nome: String,
    status: {
      type: String,
      enum: ['PENDENTE', 'EM_PROCESSAMENTO', 'CONCLUIDO', 'ERRO'],
      default: 'PENDENTE'
    },
    dataInicio: Date,
    dataFim: Date,
    observacao: String
  }],
  dataCriacao: {
    type: Date,
    default: Date.now
  },
  dataAtualizacao: {
    type: Date,
    default: Date.now
  }
});

// Atualiza o campo dataAtualizacao antes de salvar
NFeSchema.pre('save', function(next) {
  this.dataAtualizacao = new Date();
  next();
});

export const NFe = mongoose.models.NFe || mongoose.model('NFe', NFeSchema); 