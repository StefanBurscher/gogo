import React, { Component, Fragment } from "react";
import IntlMessages from "Util/IntlMessages";
import { Row, Card, CardBody, CardTitle, Button, Jumbotron } from "reactstrap";

import { Colxx, Separator } from "Components/CustomBootstrap";
import BreadcrumbContainer from "Components/BreadcrumbContainer";
import ReactSiemaCarousel from "Components/ReactSiema/ReactSiemaCarousel";
import { social_network } from "../../../firebase";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sleeves: []
    };
  }
  componentDidMount = async () => {
    await social_network.getSleeves(1)
      .then((res) => {
        this.setState({ sleeves: res.data.data.items })
      })
      .catch(error => error);
  }
  render() {
    console.log(this.state.sleeves)
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <BreadcrumbContainer
              heading={<IntlMessages id="menu.start" />}
              match={this.props.match}
            />
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx md="3" xs="12">
            <div className="icon-cards-row">
              <div className="icon-row-item">
                <Card className="mb-4">
                  <CardBody className="text-center">
                    <i className="iconsmind-Facebook" />
                    <p className="card-text font-weight-semibold mb-0">
                      <IntlMessages id="dashboards.facebook" />
                    </p>
                    <Button outline color="primary" className="mb-2">
                      <IntlMessages id="button.connect" />
                    </Button>{" "}
                    <Button outline color="primary" className="mb-2">
                      <IntlMessages id="button.manage" />
                    </Button>{" "}
                  </CardBody>
                </Card>
              </div>
            </div>
          </Colxx>
          <Colxx md="3" xs="12">
            <div className="icon-cards-row">
              <div className="icon-row-item">
                <Card className="mb-4">
                  <CardBody className="text-center">
                    <i className="iconsmind-Instagram" />
                    <p className="card-text font-weight-semibold mb-0">
                      <IntlMessages id="dashboards.instagram" />
                    </p>
                    <p className="lead text-center">32</p>
                  </CardBody>
                </Card>
              </div>
            </div>
          </Colxx>
          <Colxx md="3" xs="12">
            <div className="icon-cards-row">
              <div className="icon-row-item">
                <Card className="mb-4">
                  <CardBody className="text-center">
                    <i className="iconsmind-Twitter" />
                    <p className="card-text font-weight-semibold mb-0">
                      <IntlMessages id="dashboards.twitter" />
                    </p>
                    <p className="lead text-center">74</p>
                  </CardBody>
                </Card>
              </div>
            </div>
          </Colxx>
          <Colxx md="3" xs="12">
            <div className="icon-cards-row">
              <div className="icon-row-item">
                <Card className="mb-4">
                  <CardBody className="text-center">
                    <i className="iconsmind-Linkedin" />
                    <p className="card-text font-weight-semibold mb-0">
                      <IntlMessages id="dashboards.linkedin" />
                    </p>
                    <p className="lead text-center">25</p>
                  </CardBody>
                </Card>
              </div>
            </div>
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}
