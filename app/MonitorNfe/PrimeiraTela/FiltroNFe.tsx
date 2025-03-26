import React, { useState } from 'react';
import { Button, Divider, Form, Input, Typography, Select } from 'antd';

const { Text } = Typography;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

interface FiltroNFeProps{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onButtonClick?: (json: any) => void;
}

const FiltroNFe: React.FC<FiltroNFeProps> = ({ onButtonClick }) => {
  const [form] = Form.useForm();

  const [formData, setFormData] = useState({}); // Estado para armazenar os dados

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinish = (values: Record<string, any>) => {
    console.log('Dados do formulário:', values);
    setFormData(values); 
  };

  return (
    <div>
      <Text style={{ fontSize: '20px' }}>Síntese</Text>
      <Divider />

      <Form
        {...layout}
        form={form} 
        name="nest-messages"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
        labelAlign="right"
        size="small"
      >
        <Form.Item name="chaveAcesso" label="Chave de acesso:" style={{ marginBottom: 0 }}>
          <Select
            mode="tags"
            style={{ fontSize: '12px' }}
            placeholder="Digite as chaves de acesso"
            tokenSeparators={[',']}
            allowClear
          />
        </Form.Item>
        <Form.Item name="codigoStatusSefaz" label="Código status SEFAZ:" style={{ marginBottom: 0 }}>
          <Input style={{ fontSize: '12px', borderRadius: 0 }} />
        </Form.Item>
        <Form.Item name="statusGlobal" label="Status Global:" style={{ marginBottom: 0 }}>
          <Input style={{ fontSize: '12px', borderRadius: 0 }} />
        </Form.Item>
        <Form.Item name="statusB2B" label="Status B2B:" style={{ marginBottom: 0 }}>
          <Input style={{ fontSize: '12px', borderRadius: 0 }} />
        </Form.Item>
        <Form.Item name="numeroDocumento" label="Nº do documento:" style={{ marginBottom: 0 }}>
          <Input style={{ fontSize: '12px', borderRadius: 0 }} />
        </Form.Item>
        <Form.Item name="tipoNFe" label="Tipo NF-e:" style={{ marginBottom: 0 }}>
          <Input style={{ fontSize: '12px', borderRadius: 0 }} />
        </Form.Item>
        <Form.Item name="numeroNFe" label="Nº NF-e:" style={{ marginBottom: 0 }}>
          <Input style={{ fontSize: '12px', borderRadius: 0 }} />
        </Form.Item>
        <Form.Item name="serie" label="Série:" style={{ marginBottom: 0 }}>
          <Input style={{ fontSize: '12px', borderRadius: 0 }} />
        </Form.Item>
        <Form.Item name="cnpjEmissor" label="CNPJ do Emissor:" style={{ marginBottom: 0 }}>
          <Input style={{ fontSize: '12px', borderRadius: 0 }} />
        </Form.Item>
        <Form.Item name="cnpjDestinatario" label="CNPJ Destinatário:" style={{ marginBottom: 0 }}>
          <Input style={{ fontSize: '12px', borderRadius: 0 }} />
        </Form.Item>
        <Form.Item name="dataCriacao" label="Data de criação:" style={{ marginBottom: 0 }}>
          <Input style={{ fontSize: '12px', borderRadius: 0 }} />
        </Form.Item>
        <Form.Item name="horaCriacao" label="Hora de criação:" style={{ marginBottom: 0 }}>
          <Input style={{ fontSize: '12px', borderRadius: 0 }} />
        </Form.Item>

        <Form.Item label={null}>
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => onButtonClick?.({formData})}
            style={{ color: '#6e99cc', backgroundColor: '#F8F7FF', borderColor: '#6e99cc', borderRadius: 0 }}
          >
            Filtrar
          </Button>
          <Button
            type="default"
            onClick={() => form.resetFields()} 
            style={{ color: '#6e99cc', backgroundColor: '#F8F7FF', borderColor: '#6e99cc', borderRadius: 0, marginLeft: 10 }}
          >
            Reinicializar
          </Button>
        </Form.Item>
      </Form>

      {/* console.log({JSON.stringify(formData, null, 2)}); */}
    </div>
  );
};

export default FiltroNFe;
