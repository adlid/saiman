
import './style.css'
import { LaptopOutlined, NotificationOutlined, UserOutlined, MenuOutlined, BarChartOutlined, DeploymentUnitOutlined, FileOutlined} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import {useState} from "react";
import TableCounter from "./pages/Table";
const { Header, Content, Sider } = Layout;
import { Avatar, Image } from 'antd';
import { Dropdown, Space } from 'antd';
import Input from "antd/es/input/Input";
type MenuItem = Required<MenuProps>['items'][number];
import { ConfigProvider } from 'antd';
import enUS from 'antd/lib/locale/ru_RU';
function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}
export const App = () =>{


    const asideMenu: MenuProps['items'] = ['Абоненты'].map((key) => ({
        key,
        label: `${key}`,
    }));
    const avatarMenu: MenuProps['items'] = ['Профиль', "Выход"].map((key) => ({
        key,
        label: `${key}`,
    }));

    const mainMenu: MenuItem[] = [getItem('Статистика', '1', <BarChartOutlined />),getItem('API', '2',  <DeploymentUnitOutlined />) ]
    const dropdownMenu = {
        items: mainMenu
    }
    const dropdownAvatarMenu = {
        items: avatarMenu
    }
    return<ConfigProvider locale={enUS}>
        <Layout style={{height:"100vh"}}>
            <Header className="header">
                <div className="logo" >
                    <img src={"https://www.saiman.kz/images/logo.png"}/>
                </div>
                <div className={"header-right"}>

                    <div className={"header-menu"}>
                        <FileOutlined style={{ fontSize: '16px', color:"#fff"}} />
                        <span style={{fontSize:18, marginLeft:5,color:"#fff"}}>
                                Отчеты
                        </span>
                    </div>
                    <Dropdown menu={dropdownMenu} trigger={['click']}>
                        <div className={"header-menu"}>
                            <MenuOutlined style={{ fontSize: '16px', color:"#fff"}} />
                            <span style={{fontSize:18, marginLeft:5,color:"#fff"}}>
                                Меню
                            </span>
                        </div>
                    </Dropdown>

                    <Dropdown menu={dropdownAvatarMenu} trigger={['click']}>
                        <Avatar size={35} className={"avatar"} style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                    </Dropdown>
                </div>

                {/*<Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} />*/}
            </Header>
            <Layout>
                <Sider width={300} style={{ fontSize:"18px" , padding: 10, background:"#fff"}}>
                    <Input placeholder="Модем или объект"  />
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0  }}
                        items={asideMenu}
                    />
                </Sider>
                <Layout style={{ padding: '0 24px 24px', overflow: "overlay" }}>
                    <Content
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,

                        }}
                    >
                       <div className={"page"}>
                           <TableCounter/>
                       </div>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
        </ConfigProvider>


}