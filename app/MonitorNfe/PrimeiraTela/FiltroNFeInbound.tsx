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
    <div style={{ width: '90%' }}>
      <Text style={{ fontSize: '20px' }}>Síntese</Text>
      <Divider />

      <Form
        {...layout}
        form={form}
        name="nest-messages"
        onFinish={onFinish}
        style={{maxHeight: '20vh', maxWidth: '100%', display: 'flex', flexDirection: 'column', flexWrap: 'wrap', alignContent: 'space-around', alignItems: 'stretch'}}
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
        <Form.Item name="codigoTipoEvento" label="Tipo de evento:" style={{ marginBottom: 3 }}>
          <Select
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
          />
        </Form.Item>
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
        <Form.Item name="statusDocumento" label="Status do Documento:" style={{ marginBottom: 3 }}>
          <Select
            mode="tags"
            style={{ fontSize: '12px', width: '10vh' }}
            placeholder=""
            allowClear
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
        <Form.Item name="dataCriacao" label="Data de criação:" style={{ marginBottom: 3 }}>
          <Space>
            <Form.Item name="dataCriacaoDe" noStyle>
              <DatePicker placeholder="Data Início" style={{ fontSize: '12px', borderRadius: 4, marginTop: 0, height: 26 }} />
            </Form.Item>
            {/* <Divider type="vertical" style={{ height: '100%', width: 54 }} /> */}
            <Form.Item label="até:" name="dataCriacaoAte" style={{ marginBottom: 0 }} >
              <DatePicker placeholder="Data Fim" style={{ fontSize: '12px', borderRadius: 4, marginTop: 0, height: 26 }} />
            </Form.Item>
          </Space>
        </Form.Item>
        <Form.Item name="horaCriacao" label="Hora de criação:" style={{ marginBottom: 3 }}>
          <Space>
            <Form.Item name="horaCriacaoDe" noStyle>
              <Input style={{ fontSize: '12px', borderRadius: 4, height: 26, width: 100 }} /> 
            </Form.Item>
            {/* <Divider type="vertical" style={{ height: '100%', width: 94 }} /> */}
            <Form.Item label="até:" name="horaCriacaoAte" style={{ marginBottom: 0 }} >
              <Input style={{ fontSize: '12px', borderRadius: 4, height: 26, width: 100 }} />
            </Form.Item>
          </Space>
        </Form.Item>
      </Form>
      <Form.Item wrapperCol={{ offset: 12, span: 16 }} style={{ width: '100%', marginTop: 16 }}>
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