import React, { Component, Fragment } from "react";
import IntlMessages from "Util/IntlMessages";
import { Row, Card, CardBody, CardTitle, Button, Jumbotron } from "reactstrap";
import { connect } from 'react-redux';

import { Colxx, Separator } from "Components/CustomBootstrap";
import BreadcrumbContainer from "Components/BreadcrumbContainer";
import ReactSiemaCarousel from "Components/ReactSiema/ReactSiemaCarousel";
import { social_network } from "../../../auth";


class Start extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sleeves: []
    };
  }
  componentDidMount = async () => {
    const user = JSON.parse(this.props.user);
    await social_network.getSleeves(user.id)
      .then((res) => {
        this.setState({ sleeves: res.data.data.items })
      })
      .catch(error => error);
  }
  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <BreadcrumbContainer
              heading={<IntlMessages id="menu.page" />}
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
                    {/* <this.ButtonAction socialNetwork="FACEBOOK" /> */}
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

const mapStateToProps = ({ authUser, flow }) => {
  const { user } = authUser;
  const { socialNetwork } = flow;
  return {
    user,
    socialNetwork
  };
};
export default connect(
  mapStateToProps
)(Start);
