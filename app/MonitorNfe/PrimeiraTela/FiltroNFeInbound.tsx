import React, { useState } from 'react';
import { Button, Divider, Form, Select, Input, Typography, Space, DatePicker } from 'antd';

const { Text } = Typography;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

interface FiltroNFeInboundProps {
  onButtonClick?: (filtros: any) => void;
}

const FiltroNFeInbound: React.FC<FiltroNFeInboundProps> = ({ onButtonClick }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: Record<string, any>) => {
    setLoading(true);
    try {
      await onButtonClick?.(values);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    form.resetFields();
    onButtonClick?.({});
  };

  return (
    <div style={{ width: '100%'}}>
      <Text style={{ fontSize: '20px' }}>Síntese</Text>
      <Divider />

      <Form
        {...layout}
        form={form}
        name="nest-messages"
        onFinish={onFinish}
        style={{maxHeight: '20vh', maxWidth: '80%', display: 'flex', flexDirection: 'column', flexWrap: 'wrap', alignContent: 'space-around', alignItems: 'stretch'}}
        labelAlign="right"
        size="small"
      >
        <Form.Item name="chaveAcesso" label="Chave de acesso:" style={{ marginBottom: 3 }}>
          <Select
            mode="tags"
            style={{ fontSize: '11px' }}
            placeholder="Digite as chaves de acesso"
            tokenSeparators={[',']}
            allowClear
          />
        </Form.Item>
        {/* <Form.Item name="codigoTipoEvento" label="Tipo de evento:" style={{ marginBottom: 3 }}>
          {/* <Select
            mode="tags"
            style={{ fontSize: '12px', width: '10vh' }}
            dropdownStyle={{ width: 'auto', minWidth: '50vh' }}
            listHeight={400}
            placeholder=""
            options={[
              { value: '110110', label: '110110 - Carta de Correção (CC-e)' },
              { value: '110111', label: '110111 - Cancelamento' },
              { value: '110112', label: '110112 - Encerramento' },
              { value: '110114', label: '110114 - Inclusão de condutor' },
              { value: '110140', label: '110140 - Evento anterior à contingência (EPEC)' },
              { value: '111500', label: '111500 - Prorrogação 1º prazo (EPP1)' },
              { value: '111501', label: '111501 - Prorrogação 2º prazo (EPP2)' },
              { value: '111502', label: '111502 - Cancelamento Prorrogação 1º prazo (ECPP1)' },
              { value: '111503', label: '111503 - Cancelamento Prorrogação 2º prazo (ECPP2)' },
              { value: '210200', label: '210200 - Confirmação de operação' },
              { value: '210210', label: '210210 - Ciência da operação' },
              { value: '210220', label: '210220 - Desconhecimento da operação' },
              { value: '210240', label: '210240 - Operação não realizada' },
              { value: '310620', label: '310620 - Registro de passagem (MDF-e)' },
              { value: '411500', label: '411500 - Resposta Prorrogação 1º prazo (EFPP1)' },
              { value: '411501', label: '411501 - Resposta Prorrogação 2º prazo (EFPP2)' },
              { value: '411502', label: '411502 - Resp. Canc. Prorrogação 1º prazo (EFCPP1)' },
              { value: '411503', label: '411503 - Resp. Canc. Prorrogação 2º prazo (EFCPP2)' },
              { value: '610110', label: '610110 - Desacordo de Entrega de Serviço' },
              { value: '610500', label: '610500 - Registro de passagem (NF-e)' },
              { value: '990900', label: '990900 - Vistoria SUFRAMA' },
              { value: '990910', label: '990910 - Confirmacao de internacionalizacao de mercadoria na SUFRAMA' }
            ]}
            allowClear
          /> *</Form.Item> */}

        <Form.Item name="tipoDocumento" label="Tipo de Documento:" style={{ marginBottom: 3 }}>
          <Select
            mode="tags"
            style={{ fontSize: '12px', width: '10vh' }}
            dropdownStyle={{ width: 'auto', minWidth: '15vh' }}
            placeholder=""
            options={[{ value: 'NF-e', label: 'NF-e' }, 
                      { value: 'CT-e', label: 'CT-e' }, 
                      { value: 'MDF-e', label: 'MDF-e' }]}
            allowClear
          />
        </Form.Item>
        <Form.Item name="codigoUF" label="Codigo UF:" style={{ marginBottom: 3 }}>
          <Select
            mode="tags"
            style={{ fontSize: '12px', width: '10vh' }}
            dropdownStyle={{ width: 'auto', minWidth: '30vh' }}
            listHeight={400}
            placeholder=""
            options={[{ value: '11', label: '11 - Rondônia' }, 
                      { value: '12', label: '12 - Acre' }, 
                      { value: '13', label: '13 - Amazonas' }, 
                      { value: '14', label: '14 - Roraima' }, 
                      { value: '15', label: '15 - Pará' }, 
                      { value: '16', label: '16 - Amapá' }, 
                      { value: '17', label: '17 - Tocantins' },
                      { value: '21', label: '21 - Maranhão' },
                      { value: '22', label: '22 - Piauí' },
                      { value: '23', label: '23 - Ceará' },
                      { value: '24', label: '24 - Rio Grande do Norte' },
                      { value: '25', label: '25 - Paraíba' },
                      { value: '26', label: '26 - Pernambuco' },
                      { value: '27', label: '27 - Alagoas' },
                      { value: '28', label: '28 - Sergipe' },
                      { value: '29', label: '29 - Bahia' },
                      { value: '31', label: '31 - Minas Gerais' },
                      { value: '32', label: '32 - Espírito Santo' },
                      { value: '33', label: '33 - Rio de Janeiro' },
                      { value: '35', label: '35 - São Paulo' },
                      { value: '41', label: '41 - Paraná' },
                      { value: '42', label: '42 - Santa Catarina' },
                      { value: '43', label: '43 - Rio Grande do Sul' },
                      { value: '50', label: '50 - Mato Grosso do Sul' },
                      { value: '51', label: '51 - Mato Grosso' },
                      { value: '52', label: '52 - Goiás' },
                      { value: '53', label: '53 - Distrito Federal' },
                      { value: '91', label: '91 - Ambiente Nacional' }]}
            allowClear
          />
        </Form.Item>
        <Form.Item label="CNPJ Emissor:" style={{ marginBottom: 3 }}>
          <Space>
            <Form.Item name="cnpjEmissorDe" noStyle>
              <Select
                mode="tags"
                style={{ fontSize: '12px', width: '18vh' }}
                placeholder=""
                allowClear
              />
            </Form.Item>
            {/* <Divider type="vertical" style={{ height: '100%'}} /> */}
            <Form.Item label="até:" name="cnpjEmissorAte" style={{ marginBottom: 0 }} >
              <Select
                mode="tags"
                style={{ fontSize: '12px', width: '18vh' }}
                placeholder=""
                allowClear
              />
            </Form.Item>
          </Space>
        </Form.Item>
        <Form.Item name="cnpjDestinatario" label="CNPJ Destinatario:" style={{ marginBottom: 3 }}>
          <Space>
            <Form.Item name="cnpjDestinatarioDe" noStyle>
              <Select
                mode="tags"
                style={{ fontSize: '12px', width: '18vh' }}
                placeholder=""
                allowClear
              />
            </Form.Item>
            <Form.Item label="até:" name="cnpjDestinatarioAte" style={{ marginBottom: 0 }} >
              <Select
                mode="tags"
                style={{ fontSize: '12px', width: '18vh' }}
                placeholder=""
                allowClear
              />
            </Form.Item>
          </Space>
        </Form.Item>
        <Form.Item name="statusDocumento" label="Status do Documento:" style={{ marginBottom: 3 }}>
          <Select
            mode="tags"
            style={{ fontSize: '12px', width: '10vh' }}
            dropdownStyle={{ width: 'auto', minWidth: '30vh' }}
            listHeight={400}
            placeholder=""
            allowClear
            options={[{ value: '1', label: '1 - Processo espera por acao do usuário' }, 
                      { value: '2', label: '2 - Erro na última etapa do processo' }, 
                      { value: '3', label: '3 - Erro tecnico na ultima etapa do processo' }, 
                      { value: '4', label: '4 - Erro temporario na ultima etapa do processo' }, 
                      { value: '11', label: '11 - Processo espera por resposta assíncrona' }, 
                      { value: '21', label: '21 - Documento sem atribuição de processo empresarial' }, 
                      { value: '22', label: '22 - Documento sem sistema logico para execucao do processo' }, 
                      { value: '88', label: '88 - Documento rejeitado, pode ser sobregravado' }, 
                      { value: '89', label: '89 - Processo concluído, documento rejeitado' }, 
                      { value: '98', label: '98 - Processo concluído, documento processado manualmente' }, 
                      { value: '99', label: '99 - Processo concluído, documento processado corretamente' }]}
          />
        </Form.Item>
        <Form.Item name="numeroNFe" label="Nº NF-e:" style={{ marginBottom: 3 }}>
          <Space>
            <Form.Item name="numeroNFeDe" noStyle>
              <Select
                mode="tags"
                style={{ fontSize: '12px', width: '15vh' }}
                placeholder=""
                allowClear
              />
            </Form.Item>
            {/* <Divider type="vertical" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} /> */}
            <Form.Item label="até:" name="numeroNFeAte" style={{ marginBottom: 0}} >
              <Select
                mode="tags"
                style={{ fontSize: '12px', width: '15vh' }}
                placeholder=""
                allowClear
              />
            </Form.Item>
          </Space>
        </Form.Item>
        <Form.Item name="serie" label="Série:" style={{ marginBottom: 3 }}>
          <Select
            mode="tags"
            style={{ fontSize: '12px', width: '6vh' }}
            placeholder=""
            allowClear
          />
        </Form.Item>
        <Form.Item name="tipoEmissao" label="Tipo da Emissão:" style={{ marginBottom: 3 }}>
          <Select
            mode="tags"
            style={{ fontSize: '12px', width: '10vh' }}
            placeholder=""
            dropdownStyle={{ width: 'auto', minWidth: '30vh' }}
            listHeight={400}
            options={[{ value: '1', label: '1 - Normal' }, 
                      { value: '2', label: '2 - Contingência' }, 
                      { value: '3', label: '3 - Contingência off-line' }, 
                      { value: '4', label: '4 - Contingência on-line' }, 
                      { value: '5', label: '5 - Contingência off-line' }, 
                      { value: '6', label: '6 - Contingência on-line' }, 
                      { value: '7', label: '7 - Contingência off-line' }, 
                      { value: '8', label: '8 - Contingência on-line' }]}
            allowClear
          />
        </Form.Item>
        <Form.Item name="processo" label="Processo:" style={{ marginBottom: 3 }}>
              <Select
                mode="tags"
                labelInValue={true}
                style={{ fontSize: '12px', width: '24vh' }}
                dropdownStyle={{ width: 'auto', minWidth: '30vh' }}
                listHeight={400}
                placeholder=""
                allowClear
                options={[
                        { value: 'BUPRODET', label: 'NF-e sem atrib.processo empresarial' },
                        { value: 'CANCELOO', label: 'Cancelamento de uma NF-e' },
                        { value: 'CANCEL01', label: 'Cancelamento de uma NF-e, processo geral' },
                        { value: 'CANCEL02', label: 'Cancelamento de uma NF-e, se evento anterior a NF-e' },
                        { value: 'CONSIGGR', label: 'Consignação - entrada de mercadorias' },
                        { value: 'CONSIGIV', label: 'Consignação - fatura' },
                        { value: 'DANWOXML', label: 'DANFE chega antes de XML' },
                        { value: 'FLEXPR01', label: 'Proc.empresarial espec.cliente c/DANFE' },
                        { value: 'FUTDELGR', label: 'Fornecimento futuro - entrada mercadoria' },
                        { value: 'FUTDELIV', label: 'Fornecimento futuro - fatura' },
                        { value: 'NORMPRCH', label: 'NF-e para pedido normal' },
                        { value: 'PPSUMDEN', label: 'Resumo da NF-e rejeitada' },
                        { value: 'PREPEPEC', label: 'Proc.preliminar p/NF-e com evento EPEC' },
                        { value: 'PREPRSUM', label: 'Resumo processo preliminar para NF-e' },
                        { value: 'SIGNAUT2', label: 'NF-e para outros processos com DANFE' },
                        { value: 'SIGNAUTH', label: 'NF-e para outros processos sem DANFE' },
                        { value: 'STOCKTRF', label: 'NF-e para transferência de estoque' },
                        { value: 'SUBCON1A', label: 'NF-e para subcontrataçāo' },
                        { value: 'SUBCON2C', label: 'Devolucao simbolica compons.subcontrat.' },
                        { value: 'SUBCON2D', label: 'Devolucao de componentes subcontratacão' }]}
                  />
        </Form.Item>
        <Form.Item name="ultimaEtapaProcesso  " label="Etapa do Processo:" style={{ marginBottom: 3 }}>
          <Select
            mode="tags"
            style={{ fontSize: '12px', width: '24vh' }}
            placeholder=""
            allowClear
            options={[
              { value: 'SIGNATUR', label: 'Verificar assinatura do PN' },
              { value: 'AUTHORIZ', label: 'Verificar autorizacao apos entrada NF-e' },
              { value: 'NPURVALD', label: 'Validação para pedido normal' },
              { value: 'POASSIGN', label: 'Atribuir itens do pedido' },
              { value: 'NFESIMUL', label: 'Simular fatura e NF-e' },
              { value: 'DELCREAT', label: 'Gerar recebimento' },
              { value: 'ACCNOTIF', label: 'Notificação XML aceita' },
              { value: 'RECDANFE', label: 'Entrada DANFE' },
              { value: 'AUTHGRPT', label: 'Verificar autorizaçao após entrada DANFE' },
              { value: 'GRCONFQU', label: 'Entrar quantidades EM' },
              { value: 'GRFICHCK', label: 'Verificar quantidades EM' },
              { value: 'GRMMCHCK', label: 'Preparar registro EM' },
              { value: 'GRPOSTNG', label: 'Registrar entrada de mercadorias' },
              { value: 'IVPOSTNG', label: 'Lançar fatura e NF-e' },
              { value: 'SENDOPCO', label: 'Criar confirmação operaçao evento' }]}
          />
        </Form.Item>
        <Form.Item name="dataCriacao" label="Data de criação:" style={{ marginBottom: 3 }}>
          <Space>
            <Form.Item name="dataCriacaoDe" noStyle>
              <DatePicker placeholder="Data Início" style={{ fontSize: '12px', borderRadius: 4, height: 26, width: 110 }} />
            </Form.Item>
            <Form.Item label="até:" name="dataCriacaoAte" style={{ marginBottom: 0 }} >
              <DatePicker placeholder="Data Fim" style={{ fontSize: '12px', borderRadius: 4, height: 26, width: 110 }} />
            </Form.Item>
          </Space>
        </Form.Item>
        <Form.Item name="horaCriacao" label="Hora de criação:" style={{ marginBottom: 3 }}>
          <Space>
            <Form.Item name="horaCriacaoDe" noStyle>
              <DatePicker.TimePicker placeholder="Hora Início" style={{ fontSize: '12px', borderRadius: 4, height: 26, width: 110 }} /> 
            </Form.Item>
            <Form.Item label="até:" name="horaCriacaoAte" style={{ marginBottom: 0 }} >
              <DatePicker.TimePicker placeholder="Hora Fim" style={{ fontSize: '12px', borderRadius: 4, height: 26, width: 110 }} />
            </Form.Item>
          </Space>
        </Form.Item>
        </Form>
      <Form.Item wrapperCol={{ offset: 10, span: 16 }} style={{ width: '100%', marginTop: 16 }}>
          <Space>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              style={{ 
                backgroundColor: '#F8F7FF', 
                color: '#6e99cc', 
                borderColor: '#6e99cc' 
              }}
            >
              Buscar
            </Button>
            <Button 
              onClick={handleReset}
              style={{ 
                backgroundColor: '#F8F7FF', 
                color: '#6e99cc', 
                borderColor: '#6e99cc' 
              }}
            >
              Reinicializar
            </Button>
          </Space>
        </Form.Item>
    </div>
  );
};

export default FiltroNFeInbound; 