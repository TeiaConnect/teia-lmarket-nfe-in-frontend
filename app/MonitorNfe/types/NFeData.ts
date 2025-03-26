export interface NFeData {
  notas_fiscais: Array<{
    identificacao_nfe: {
      tipo_emissao: string;
      codigo_status: string;
      numero_nfe: string;
      serie: string;
    };
    emissor: {
      cnpj: string;
      codigo_uf: string;
      status: string;
      ultima_atividade: string;
      status_atividade: string;
      codigo_status: string;
      descricao_status: string;
      codigo_mensagem: string;
      mensagem_sefaz: string;
      inscricao_estadual: string;
      nome_emissor: string;
      nome_empresa: string;
      nome_comercio: string;
      rua: string;
      complemento: string;
      bairro: string;
      numero: string;
      codigo_postal: string;
      codigo_cidade: string;
      nome_cidade: string;
      uf: string;
      chave_pais: string;
      nome_pais: string;
      telefone: string;
      codigo_tributacao: string;
      inscricao_municipal: string;
      codigo_atividade: string;
    };
    destinatario: {
      cnpj: string;
    };
    referencia_nfe: {
      chave_acesso: string;
    };
    ambiente: string;
    codigo_mensagem: string;
    mensagem_sefaz: string;
    inscricao_estadual: string;
    nome_emissor: string;
    nome_empresa: string;
    nome_comercio: string;
    rua: string;
    complemento: string;
    bairro: string;
    numero: string;
    codigo_postal: string;
    codigo_cidade: string;
    nome_cidade: string;
    uf: string;
    chave_pais: string;
    nome_pais: string;
    telefone: string;
    codigo_tributacao: string;
    inscricao_municipal: string;
    codigo_atividade: string;
    codigo_status: string;
    descricao_status: string;
    ultima_atividade: string;
    status_atividade: string;
  }>;
} 