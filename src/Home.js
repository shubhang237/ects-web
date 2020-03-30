import React,{Component} from 'react';
import { Layout, Menu, Typography, Carousel, Row, Col, Card, Descriptions, Button, Spin} from 'antd';
import { HomeFilled, InfoCircleFilled, ToolFilled, ShoppingCartOutlined, PhoneFilled, LinkedinFilled,
    InstagramFilled, GoogleCircleFilled, FacebookFilled} from '@ant-design/icons';
import RemoveFromQueueIcon from '@material-ui/icons/RemoveFromQueue';
import ComputerIcon from '@material-ui/icons/Computer';
import VideocamIcon from '@material-ui/icons/Videocam';
import PrintIcon from '@material-ui/icons/Print';
import TuneIcon from '@material-ui/icons/Tune';
import RssFeedIcon from '@material-ui/icons/RssFeed';
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import {ProductCard} from 'react-ui-cards';
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
        };
        
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
          current: e.key,
        });
    };

    render(){

        const { Header, Content, Footer } = Layout;
        const { Meta } = Card;
        const {Title} = Typography;
        const position = [this.state.lat, this.state.lng]
        let content = null;
        const curr = this.state.current;
        const gridStyle = {
            textAlign: 'center',
          };
          

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
            let items = this.state.isLoaded ? this.state.products : null; 
            console.log(items);
            
            if(items != null){
                content = <div>{items.map((el,index) => <ProductCard key={index} photos={[el.image]} price={'₹ '+el.price} productName={el.name} description={el.description} />)}</div> 
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

export default Home;