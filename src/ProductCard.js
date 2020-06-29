import React,{Component} from 'react';
import {Card, Divider, Button, Typography} from 'antd';
import no_image from './images/no_image.png';


class ProductCard extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render() {

        const {Paragraph} = Typography;
        
        const percentOff = ((1 - parseFloat(this.props.price)/parseFloat(this.props.oprice))*100).toFixed(1); 
        return(
            <Card key={this.props.index} style={{ width : 300, margin : 5}}>
                <img src={this.props.image} alt={no_image} style={{ width : 200, height : 200}}/>
                <Divider orientation="left">{this.props.title}</Divider>
                <div>
                <span style={{ color : '#000', margin : 2}}>{'₹'+this.props.price}</span> <span style={{ color: '#E0E0E0', 'text-decoration': 'line-through', margin : 2}}>  {'₹' + this.props.oprice} </span> <Button type="primary" style={{ margin : 5}}>{percentOff+' % off'}</Button>
                </div>
                <Paragraph ellipsis={{ rows: 2, expandable: true }}>
                    {this.props.description}
                </Paragraph>
            </Card>
        );
    }
}

export default ProductCard;