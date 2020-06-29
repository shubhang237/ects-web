import React,{Component} from 'react';
import { Layout, Menu, Typography, Carousel, Row, Col, Card, Descriptions, Button, Spin, Form, Input, Select, Checkbox, Divider} from 'antd';
import { HomeFilled, InfoCircleFilled, ToolFilled, ShoppingCartOutlined, PhoneFilled, LinkedinFilled,
    InstagramFilled, GoogleCircleFilled, FacebookFilled} from '@ant-design/icons';
import RemoveFromQueueIcon from '@material-ui/icons/RemoveFromQueue';
import ComputerIcon from '@material-ui/icons/Computer';
import VideocamIcon from '@material-ui/icons/Videocam';
import PrintIcon from '@material-ui/icons/Print';
import TuneIcon from '@material-ui/icons/Tune';
import RssFeedIcon from '@material-ui/icons/RssFeed';
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import apple from './images/apple.jpg';
import cctv from './images/cctv.png';
import desktop from './images/desktop.png';
import laptop from './images/laptop.png';
import peripheral from './images/peripheral.jpg';
import printer from './images/printer.png';
import no_image from './images/no_image.png';
import ProductCard from './ProductCard';
import getProducts from './service';
import './App.css';

class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            current : "home",
            isLoaded : false,
            products : null,
            lat: 28.587581,
            lng: 77.303374,
            zoom: 16,
            productType : 'Desktops',
        };
        this.setProductType = this.setProductType.bind(this);
    }

    componentDidMount(){
        getProducts()
        .then(res => {
            this.setState({
                isLoaded : true,
                products : res.products
            });
            this.props.history.push(this.state.current);
            return res;
        });
    }

    handleClick = e => {
        this.setState({
          current : e.key,
        });
    };

    setProductType(type){
        this.setState({
            productType : type
        });
    }

    render(){

        const { Option } = Select;
        const { Header, Content, Footer } = Layout;
        const { Meta } = Card;
        const {Title} = Typography;
        const position = [this.state.lat, this.state.lng]
        let content = null;
        const curr = this.state.current;
        const gridStyle = {
            textAlign: 'center',
        };

        const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
        };  
          
        const onFinish = values => {
            console.log('Success:', values);
        };
          
        const onFinishFailed = errorInfo => {
            console.log('Failed:', errorInfo);
        };
          
        const prefixSelector = (
            <Form.Item name="prefix" noStyle>
                <Select style={{ width: 70 }}>
                <Option value="86">+91</Option>
                <Option value="87">+92</Option>
                </Select>
            </Form.Item>
        );
          

        if(curr === 'home'){
            content = <div>
                        <Carousel autoplay>
                            {['1','2','3'].map(el => 
                                <div key={el}>
                                    <img src={"http://ects.co.in/wp-content/uploads/2016/09/banner"+el+".jpg"} alt="" style={{ margin : "0 auto", marginTop : 20, marginBottom : 20}}/>
                                </div>  )}
                        </Carousel>
                    </div>;
        }
        else if(curr === 'about'){
           content = <div>
                        <Card title="Our Offerings">
                            {['Desktop and Laptop Solutions','Server and Workstation Solutions','Other Peripherals',
                              'Networking for Organizations','Wireless Solutions','CCTV & Access control Solutions',
                              'Apple Products','Computer Repair solutions','Tally Accounting Software Solutions', 
                              'Nurse calling systems for Hospitals','Home Security Solutions']
                              .map((el,index) => <Card.Grid key={index} style={gridStyle}>{el}</Card.Grid>)}
                        </Card> 
                     </div>;
        }
        else if(curr === 'services'){
            content = <Row style={{paddingTop : 30}}>  
            {[
             {  title :"Computer Repair", 
                icon : <RemoveFromQueueIcon style={{width : 80 , height : 80, marginLeft : 60, marginTop : 20}} />,
                description : "You don’t have to worry when your computer stops working, bring it to us and we will provide the best service." },
             {  title :"Laptop Repair", 
                icon : <ComputerIcon style={{width : 80 , height : 80, marginLeft : 60, marginTop : 20}} />,
                description : "You feel very hopeless when you laptop stops working. you will never feel hopeless with ECTS. We provide on-site repairing." },
             {  title :"CCTV Installation", 
                icon : <VideocamIcon style={{width : 80 , height : 80, marginLeft : 60, marginTop : 20}} />,
                description : "We Provide CCTV installation services with repair services. Our expert and experienced engineers install CCTV Cameras." },
             {  title :"Printer Repair", 
                icon : <PrintIcon style={{width : 80 , height : 80, marginLeft : 60, marginTop : 20}} />,
                description : "Printer is also important part of your offices. You can’t do some important job, without printer. That’s where we come in." },
             {  title :"Networking", 
                icon : <RssFeedIcon style={{width : 80 , height : 80, marginLeft : 60, marginTop : 20}} />,
                description : "We configure your computer network to share printers, files, and folders to each other.We install and configure networking for offices." },
             {  title:"Computer Optimization",
                icon : <TuneIcon style={{width : 80 , height : 80, marginLeft : 60, marginTop : 20}} />,
                description:"You will never face problem of slow computer and repairing it again & again when we will Optimize your computer."}].map((el,index) => 
                    <Col key={index}>
                    <Card 
                        hoverable style={{ width: 200, margin : 5 }} 
                        cover={el.icon}>
                        <Meta title={el.title} description={el.description} />
                    </Card>
                </Col>)}
            </Row>;
        }
        else if(curr === 'products'){
            let items = this.state.isLoaded ? this.state.products.desktops : null; 
            if(this.state.productType === 'Desktops'){
                items = this.state.products.desktops;
            }
            else if(this.state.productType === 'Laptops'){
                items = this.state.products.laptops;
            }
            else if(this.state.productType === 'Printers'){
                items = this.state.products.printers;
            }
            else if(this.state.productType === 'Peripherals'){
                items = this.state.products.peripherals;
            }
            else if(this.state.productType === 'Apple Products'){
                items = this.state.products.apple;
            }
            else if(this.state.productType === 'CCTV Cameras'){
                items = this.state.products.cctv;
            }
            
            if(items != null){
                content = <div>
                            <Row gutter={8} style={{ backgroundColor : '#01579B', padding : 20}}>
                            {[{title : 'Desktops',image : desktop},
                              {title : 'Laptops',image : laptop},
                              {title : 'Printers',image : printer},
                              {title : 'Peripherals',image : peripheral},
                              {title : 'Apple Products',image : apple},
                              {title : 'CCTV Cameras',image : cctv}].map((el,index) => 
                                <Col span={4}>
                                    <Card key={index}>
                                        <Title 
                                            level={4} style={{ textAlign : 'center'}}>
                                            {el.title}
                                        </Title>
                                        <img src={el.image} alt={no_image} style={{margin : 4, width : 150, height : 120}}/>
                                        <Button type="primary" block onClick={() => this.setProductType(el.title)}>View Products</Button>
                                    </Card>
                                </Col>)}
                            </Row>
                            <Divider/>
                            <Title level={2}>{'Showing Results for '+this.state.productType}</Title>
                            <Row>
                                {items !== null && items.length > 0 ? items.map((el,index) => 
                                <Col style={{ margin : '5dp'}}>
                                    <ProductCard 
                                        index={index} 
                                        image={'http://127.0.0.1:8000'+el.image} 
                                        title={el.name} 
                                        price={el.price} 
                                        oprice={el.original_price} 
                                        description={el.description}/> 
                                </Col>) : <Title level={4}>No results available</Title>}
                            </Row> 
                         </div>;
            }
            else {
                content = <Spin/>;
            }
        }
        else if(curr === 'contact'){
            content = <div>
            <div>    
               <Descriptions title="Contact Information" bordered>
                {[{ label :'Email', value : 'skssinghal@hotmail.com'},
                  { label :'Phone', value : '+91-9810952116, +91-9810195265'},
                  { label : 'Pincode', value : '110096'},
                  { label : 'Address', value : '12/102, EastEnd Appartments, Mayur Vihar Phase-1 Ext., New Delhi'},
                  { label : 'Business Days', value : 'Monday to Saturday'},
                  { label : 'Business Hours', value : '10 AM to 7PM'}].map(
                      (el,index) => <Descriptions.Item key={index} label={el.label}>{el.value}</Descriptions.Item>)}
            </Descriptions>
          </div>
            <div style={{position : "absolute", left : "40%", marginTop : "50px"}}>
                <Button type="link" href="https://www.facebook.com/ects2007"><FacebookFilled  style={{fontSize : 50, color:"#3b5998"}}/></Button>
                <Button type="link" href="http://www.google.com"><LinkedinFilled style={{fontSize : 50, color:"#0e76a8"}}/></Button>
                <Button type="link" href="http://www.google.com"><InstagramFilled style={{fontSize : 50, color:"#fb3958"}}/></Button>
                <Button type="link" href="http://www.google.com"><GoogleCircleFilled style={{fontSize : 50, color:"#de5246"}}/></Button>
            </div>
          </div>;
        }
        
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
                        {content}
                    </div>
                </Content>

                <Footer style={{ textAlign: 'center'}}>
                        <Row gutter={16}>
                            <Col span={10}>
                                <Map center={position} zoom={this.state.zoom} style={{width : 400, height:400, marginLeft : 50, marginRight : 50}}>
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
                            </Col>

                            <Col span={12}>
                            <Card title="Contact Information">
      
                                <Form
                                name="basic"
                                initialValues={{ remember: true }}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                >
                                <Form.Item
                                    label="Name"
                                    name="name"
                                    rules={[{ required: true, message: 'Please input your name!' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Email"
                                    name="email"
                                    rules={[{ required: true, type: 'email', message: 'Please input your email!' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    name="phone"
                                    label="Phone Number"
                                    rules={[{ required: true, message: 'Please input your phone number!' }]}>
                                    <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                                </Form.Item>
                                <Form.Item name="checkbox-group" label="Requirements">
                                    <Checkbox.Group>
                                        <Row>
                                            <Col span={8}>
                                            <Checkbox value="Computer Repair" style={{ lineHeight: '32px' }}>
                                            Computer Repair
                                            </Checkbox>
                                            </Col>
                                            <Col span={8}>
                                            <Checkbox value="Laptop Repair" style={{ lineHeight: '32px' }} >
                                            Laptop Repair
                                            </Checkbox>
                                            </Col>
                                            <Col span={8}>
                                            <Checkbox value="CCTV Installation" style={{ lineHeight: '32px' }}>
                                            CCTV Installation
                                            </Checkbox>
                                            </Col>
                                            <Col span={8}>
                                            <Checkbox value="Printer Repair" style={{ lineHeight: '32px' }}>
                                            Printer Repair
                                            </Checkbox>
                                            </Col>
                                            <Col span={8}>
                                            <Checkbox value="Networking" style={{ lineHeight: '32px' }}>
                                            Networking
                                            </Checkbox>
                                            </Col>
                                            <Col span={8}>
                                            <Checkbox value="Computer Optimization" style={{ lineHeight: '32px' }}>
                                            Computer Optimization
                                            </Checkbox>
                                            </Col>
                                        </Row>
                                    </Checkbox.Group>
                                </Form.Item>
                                <Form.Item {...tailLayout}>
                                    <Button type="primary" htmlType="submit">
                                    Submit
                                    </Button>
                                </Form.Item>
                            </Form>
                            </Card>
                            </Col>
                        </Row>


                        <div style={{ marginTop : 20}}>
                            Electro-Comp Total Services ©2020
                        </div>
                    </Footer>
            </Layout>
        );
    }
}

export default Home;