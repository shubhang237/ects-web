import React from 'react';
import { Layout, Menu } from 'antd';
import { HomeFilled, InfoCircleFilled, ToolFilled, ShoppingCartOutlined, PhoneFilled } from '@ant-design/icons';
import { Map, Marker, Popup, TileLayer } from "react-leaflet";

class Template extends React.Component {
    constructor(props){
        super(props);
    }

    render(){

        const { Header, Content, Footer } = Layout;
        return (
            <Layout> 
                <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                    <Title style={{ color:'#fff',margin : '10px'}}>Electro-Comp Total Services</Title>
                </Header>
                
                <Content className="site-layout" style={{ padding: '0 50px', marginTop: 80 }}>
                    <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
                        <Menu.Item key="home">
                            <HomeFilled /> Home
                        </Menu.Item>
                        <Menu.Item key="about">
                            <InfoCircleFilled /> About
                        </Menu.Item>
                        <Menu.Item key="services">
                            <ToolFilled /> Services
                        </Menu.Item>
                        <Menu.Item key="products">
                            <ShoppingCartOutlined /> Products
                        </Menu.Item>
                        <Menu.Item key="contact">
                            <PhoneFilled/> Contact
                        </Menu.Item>
                    </Menu>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 520 }}>
                        {props.content}
                    </div>
                </Content>

                <Footer style={{ textAlign: 'center'}}>
                        <Map center={position} zoom={this.state.zoom} style={{width : 400, height:400}}>
                            <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={position}>
                            <Popup>
                                Electro-Comp Total Services <br /> 12/102, Eastend Apartment, Mayur Vihar Phase-1 Extn, Near New Ashok Nagar Metro Station
                            </Popup>
                            </Marker>
                        </Map>
                        <div>
                            Electro-Comp Total Services ©2020
                        </div>
                    </Footer>
            </Layout>
        );
    }



}

export default Template;