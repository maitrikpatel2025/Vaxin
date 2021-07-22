import './NotFound.scss';
import svg from '../../assets/svg/404.svg';
import { Col, Container, Row } from 'react-bootstrap';
import {withRouter} from "react-router";
import {Button} from "bootstrap";

const NotFound =(props)=>{
    return(
        <Container className="notfound">
            <Row>
                <Col lg="12">
                    <img alt={404} src={svg} className="image" />
                    <h1>Page Not Found</h1>
                    <p>Sorry, we could't found the page you are looking for</p>
                    <div className="btns">
                        <Button onClick={()=>{
                        }}>Go To Home Page</Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
export default withRouter(NotFound);