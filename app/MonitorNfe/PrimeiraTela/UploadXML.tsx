import React, { useState } from 'react';
import { Upload, Button, Card, List, Typography, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';

const { Text } = Typography;

interface UploadXMLProps {
  onProcessXML: (xmlData: any) => void;
}

const UploadXML: React.FC<UploadXMLProps> = ({ onProcessXML }) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [processedFiles, setProcessedFiles] = useState<string[]>([]);

  const processXMLFile = async (file: File) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const xmlContent = e.target?.result as string;
      
      try {
        // Envia o XML para a API
        const response = await fetch('/api/nfe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ xml_content: xmlContent }),
        });

        if (!response.ok) {
          throw new Error('Erro ao processar XML');
        }

        const data = await response.json();
        onProcessXML(data);
        setProcessedFiles(prev => [...prev, file.name]);
        message.success(`XML ${file.name} processado com sucesso!`);
      } catch (error) {
        console.error('Erro ao processar XML:', error);
        message.error(`Erro ao processar XML ${file.name}`);
      }
    };
    reader.readAsText(file);
  };

  const handleUpload = async (file: File) => {
    try {
      await processXMLFile(file);
      return false; // Impede o upload automático
    } catch (error) {
      console.error('Erro no upload:', error);
      return false;
    }
  };

  return (
    <Card title="Upload de XMLs" style={{ marginBottom: 16 }}>
      <Upload
        beforeUpload={handleUpload}
        fileList={fileList}
        onChange={({ fileList }) => setFileList(fileList)}
        accept=".xml"
        multiple
      >
        <Button icon={<UploadOutlined />}>Selecionar XMLs</Button>
      </Upload>
      
      {processedFiles.length > 0 && (
        <List
          size="small"
          header={<Text strong>XMLs Processados:</Text>}
          bordered
          dataSource={processedFiles}
          renderItem={item => <List.Item>{item}</List.Item>}
          style={{ marginTop: 16 }}
        />
      )}
    </Card>
  );
};

export default UploadXML; 