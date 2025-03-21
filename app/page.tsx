'use client';
import React, {useState} from 'react';
import Image from 'next/image'
import { Breadcrumb, Layout, Menu, theme, MenuProps, Dropdown, Space } from 'antd';
import { DownOutlined, HomeOutlined, SearchOutlined, SettingOutlined, UserOutlined, } from '@ant-design/icons';
import GetJson from './getJson';
import MonitorNFe from './MonitorNfe/PrimeiraTela/MonitorNFe';
const { Header, Content, Sider } = Layout;

const icons = [
  { key: 'home', icon: HomeOutlined },
  { key: 'search', icon: SearchOutlined },
];

const menuItems = [
  { key: '1', label: 'My Account', disabled: true },
  { key: '2', label: 'Profile' },
  { key: '3', label: 'Billing' },
  { key: '4', label: 'Settings', icon: <SettingOutlined /> },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items1:MenuProps['items'] = icons.map(({key, icon}) => ({
  key,
  icon: React.createElement(icon, {style:{color: 'white'}}),
}))

const LegendaSideBar: Array<string> = ['Administração','Configuração','NFe - Outbound'];
const childrenConfig: { [key: string]: {count: number, titles: string[]} } = {
  'Administração': { count: 3, titles: ['Cadastro de usuário', 'Dashboard', 'Logs']},
  'Configuração': { count: 5, titles: ['Parâmetros de Empresa', 'Configuração de versão de XML', 'Configurações de Lote de  NFe', 'Intervalo de Numeração']},
  'NFe - Outbound': { count: 6, titles: ['Monitor de Notas Fiscais', 'Monitor de Lotes de Notas Fiscais', 'Monitor de Eventos', 'Monitor de Lotes de Eventos', 'Monitor de Status de Serviço', 'Monitor de Link de Comunicação']}
};

const items2: MenuProps['items'] = LegendaSideBar.map(
  (name, index) => {
    const key = String(index + 1);

    const { count, titles} = childrenConfig[name] || { count: 0, titles: [] };

    return {
      key: key,
      label: name,
      children: Array.from({ length: count }).map((_, j) => {
        const subKey = key + '-' + String(j + 1);
        return {
          key: subKey,
          label: titles[j],
        };
      }),
    };
  },
);
// fim layout

const App: React.FC = () => {
  const {
    token: { colorBgContainer }, 
  } = theme.useToken();

  const [selectedComponent, setSelectedComponent] = useState<React.ReactNode>(null);

  const [selectedText, setSelectedText] = useState<React.ReactNode>('');

  const handleMenuClick: MenuProps['onClick'] = (e) => {

    const componentMap: { [key:string]: React.ReactNode } = {
      '3-1': <MonitorNFe/>,
    }

    const componentText: { [key: string]: React.ReactNode } = {
      '1-1': 'Cadastro de Usuário',
      '1-2': 'Dashboard',
      '1-3': 'Logs',
      '2-1': 'Parâmetros de Empresa',
      '2-2': 'Configuração de versão de XML',
      '2-3': 'Configurações de Lote de NFe',
      '2-4': 'Intervalo de Numeração',
      '3-1': 'Monitor de Notas Fiscais',
      '3-2': 'Monitor de Lotes de Notas Fiscais',
      '3-3': 'Monitor de Eventos',
      '3-4': 'Monitor de Lotes de Eventos',
      '3-5': 'Monitor de Status de Serviço', 
      '3-6': 'Monitor de Link de Comunicação', 
    }
    
    setSelectedComponent(componentMap[e.key] || null);

    setSelectedText(componentText[e.key] || '');

  }

  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 50}}>
        <div style={{display: 'flex', alignItems: 'center'}}>
        <Image 
            src="/logo_teia_2222.png" 
            alt="LogoTeia"
            width={80} 
            height={35} 
            priority 
          />
        </div>
          <div style={{flex: 1, display: 'flex', justifyContent: 'center', fontSize: '17px'}}>
            <text style={{color: 'grey'}}>
              {selectedText}
            </text>
          </div>
          <div>
            <Dropdown menu={{ items: menuItems}} overlayStyle={{borderRadius: 0}}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <UserOutlined style={{color: 'white'}}/>
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </div>
      </Header>
      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            items={items2}
            onClick={handleMenuClick}
          />
        </Sider>
        <Layout style={{ padding: '0 24px 24px', backgroundColor: "#eaf0fa"}}>
          <Breadcrumb
            style={{ margin: '16px 0'}}
          />
          <Content
            style={{
              padding: 24,
              margin: 0,
              background: "#ffffff",
            }}
          >
            <GetJson></GetJson>
            {selectedComponent}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;