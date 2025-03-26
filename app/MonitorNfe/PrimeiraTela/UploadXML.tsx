import React, { useState } from 'react';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';

const { Dragger } = Upload;

export default function UploadXML() {
  const [fileList, setFileList] = useState<any[]>([]);

  const processXMLFile = async (file: File): Promise<boolean> => {
    try {
      const reader = new FileReader();
      
      const xmlContent = await new Promise<string>((resolve, reject) => {
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.onerror = (e) => reject(e);
        reader.readAsText(file);
      });

      const response = await fetch('/api/nfe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ xml_content: xmlContent }),
      });

      if (!response.ok) throw new Error('Erro ao processar XML');
      
      message.success(`${file.name} processado com sucesso!`);
      return true;
    } catch (error) {
      message.error(`Erro ao processar ${file.name}`);
      return false;
    }
  };

  const props: UploadProps = {
    name: 'file',
    multiple: true,
    fileList,
    beforeUpload: async (file) => {
      if (!file.name.toLowerCase().endsWith('.xml')) {
        message.error(`${file.name} não é um arquivo XML`);
        return false;
      }
      await processXMLFile(file);
      return false;
    },
    onChange(info) {
      setFileList(info.fileList.filter(file => file.status !== 'done'));
    },
    onDrop(e) {
      console.log('Arquivos soltos:', e.dataTransfer.files);
    },
  };

  return (
    <div style={{ padding: '10px', maxWidth: '600px', margin: '0 auto' }}>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text" style={{ fontSize: '14px' }}>
          Clique ou arraste arquivos XML
        </p>
      </Dragger>
    </div>
  );
} 