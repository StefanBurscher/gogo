import React, { Component, Fragment } from "react";
import IntlMessages from "Util/IntlMessages";
import { Row, Card, CardBody, CardTitle, Button, Jumbotron } from "reactstrap";
import { connect } from 'react-redux';

import { Colxx, Separator } from "Components/CustomBootstrap";
import BreadcrumbContainer from "Components/BreadcrumbContainer";
import ReactSiemaCarousel from "Components/ReactSiema/ReactSiemaCarousel";
import { social_network } from "../../../firebase";
import {
  setCurrentSocialNetwork
} from "Redux/actions";


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
  openLink = url => {
    window.open(url);
  }
  selectPage = socialNetwork => {
    this.props.setCurrentSocialNetwork(socialNetwork)
    this.props.history.push('/app/gogo/page');
  }
  ButtonAction = (props) => {
    let connected = 0;
    const { sleeves } = this.state;
    for (let index = 0; index < sleeves.length; index++) {
      const sleeve = sleeves[index];
      if (sleeve.SocialNetwork.name === props.socialNetwork) connected = 1;
    }
    let getAccessTokenUrl = "";
    switch (props.socialNetwork) {
      case "INSTAGRAM":
        getAccessTokenUrl = "https://www.instagram.com/accounts/login/?next=/oauth/authorize/%3Fclient_id%3D5df48e0684bc4e349f2f093cd9cf953c%26redirect_uri%3Dhttp%3A//207.180.216.94/api/v1/users/register_access_token/%26response_type%3Dtoken"
        break;

      default:
        break;
    }
    return (
      connected ?
        <Button outline color="primary" className={"mb-2 " + connect} onClick={() => this.selectPage(props.socialNetwork)}>
          <IntlMessages id={"button.manage"} />
        </Button> :
        <Button outline color="primary" className={"mb-2 " + connect} onClick={() => this.openLink(getAccessTokenUrl)}>
          <IntlMessages id={"button.connect"} />
        </Button>
    )
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
                    <this.ButtonAction socialNetwork="FACEBOOK" />
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
                    <this.ButtonAction socialNetwork="INSTAGRAM" />
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
                    <this.ButtonAction socialNetwork="TWITTER" />
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
                    <this.ButtonAction socialNetwork="LINKEDIN" />
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
  mapStateToProps,
  { setCurrentSocialNetwork }
)(Start);
