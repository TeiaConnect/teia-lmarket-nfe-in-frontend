'use client';
import React, {useState} from 'react';
import Image from 'next/image'
import { Breadcrumb, Layout, Menu, theme, MenuProps, Dropdown, Space, Typography, Button, Cascader } from 'antd';
import { DownOutlined, HomeOutlined, SearchOutlined, SettingOutlined, UserOutlined, MenuFoldOutlined, MenuUnfoldOutlined, ToolOutlined, SendOutlined, InboxOutlined } from '@ant-design/icons';
import GetJson from './getJson';
import MonitorNFe from './MonitorNfe/PrimeiraTela/MonitorNFe';
import MonitorNFeInbound from './MonitorNfe/PrimeiraTela/MonitorNFeInbound';

const { Header, Content, Sider } = Layout;
const { Text } = Typography;

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

const options = [
  {
    value: 'visao1',
    label: 'Visão 1',
  },
  {
    value: 'visao2',
    label: 'Visão 2',
  },
];

const dropdownItems = [
  {
    key: '1',
    label: 'Item 1',
  },
  {
    key: '2',
    label: 'Item 2',
  },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items1:MenuProps['items'] = icons.map(({key, icon}) => ({
  key,
  icon: React.createElement(icon, {style:{color: 'white'}}),
}))

const LegendaSideBar: Array<string> = ['Administração','Configuração','NFe - Outbound','NFe - Inbound'];
const childrenConfig: { [key: string]: {count: number, titles: string[]} } = {
  'Administração': { count: 3, titles: ['Cadastro de usuário', 'Dashboard', 'Logs']},
  'Configuração': { count: 5, titles: ['Parâmetros de Empresa', 'Configuração de versão de XML', 'Configurações de Lote de  NFe', 'Intervalo de Numeração']},
  'NFe - Outbound': { count: 6, titles: ['Monitor de Notas Fiscais', 'Monitor de Lotes de Notas Fiscais', 'Monitor de Eventos', 'Monitor de Lotes de Eventos', 'Monitor de Status de Serviço', 'Monitor de Link de Comunicação']},
  'NFe - Inbound': { count: 6, titles: ['Monitor de Notas Fiscais', 'Monitor de Lotes de Notas Fiscais', 'Monitor de Eventos', 'Monitor de Lotes de Eventos', 'Monitor de Status de Serviço', 'Monitor de Link de Comunicação']},
};

const items2: MenuProps['items'] = LegendaSideBar.map(
  (name, index) => {
    const key = String(index + 1);
    const { count, titles} = childrenConfig[name] || { count: 0, titles: [] };

    // Adicionando ícones baseado no nome do item
    let icon = null;
    switch(name) {
      case 'Configuração':
        icon = <ToolOutlined />;
        break;
      case 'NFe - Outbound':
        icon = <SendOutlined />;
        break;
      case 'NFe - Inbound':
        icon = <InboxOutlined />;
        break;
    }

    return {
      key: key,
      label: name,
      icon: icon,
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

const App: React.FC = () => {
  const {
    token: { colorBgContainer }, 
  } = theme.useToken();

  const [selectedComponent, setSelectedComponent] = useState<React.ReactNode>(<MonitorNFeInbound />);
  const [selectedText, setSelectedText] = useState<string>("Monitor NFe Inbound");
  const [collapsed, setCollapsed] = useState(false);

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    const componentMap: { [key:string]: React.ReactNode } = {
      '3-1': <MonitorNFe/>,
      '4-1': <MonitorNFeInbound/>,
    }

    const componentText: { [key: string]: string } = {
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
      '4-1': 'Monitor de Notas Fiscais',
      '4-2': 'Monitor de Lotes de Notas Fiscais',
      '4-3': 'Monitor de Eventos',
      '4-4': 'Monitor de Lotes de Eventos',
      '4-5': 'Monitor de Status de Serviço',
      '4-6': 'Monitor de Link de Comunicação',
    }
    
    setSelectedComponent(componentMap[e.key] || <MonitorNFeInbound />);
    setSelectedText(componentText[e.key] || 'Monitor NFe Inbound');
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
          <Text style={{color: 'grey'}}>
            {selectedText}
          </Text>
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
        <Sider 
          width={200} 
          style={{ background: colorBgContainer }}
          collapsible
          collapsed={collapsed}
          trigger={null}
        >
          <div style={{ padding: '16px', display: 'flex', justifyContent: 'flex-end' }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
              style: { fontSize: '18px', cursor: 'pointer' }
            })}
          </div>
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