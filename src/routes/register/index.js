import React, { Component, Fragment } from "react";
import IntlMessages from "Util/IntlMessages";
import { Row, Card, CardTitle, Form, Label, Input, Button } from "reactstrap";
import { NavLink } from "react-router-dom";

import { Colxx } from "Components/CustomBootstrap";

import { connect } from "react-redux";
import { registerUser } from "Redux/actions";

class RegisterLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      password_repeat: ""
    };
  }
  onUserRegister() {
    console.log(this.state)
    if (this.state.name !== "" && this.state.email !== "" && this.state.password !== "" && this.state.password_repeat !== "") {
      // This is for adding user to Firebase. Commented out for demo purpose.  
      this.props.registerUser(this.state, this.props.history);
      this.props.history.push("/");
    }
  }

  componentDidMount() {
    document.body.classList.add("background");
  }
  componentWillUnmount() {
    document.body.classList.remove("background");
  }
  setName = (e) => {
    this.setState({ name: e.nativeEvent.target.value })
  }
  setEmail = (e) => {
    this.setState({ email: e.nativeEvent.target.value })
  }
  setPassword = (e) => {
    this.setState({ password: e.nativeEvent.target.value })
  }
  setPasswordRepeat = (e) => {
    this.setState({ password_repeat: e.nativeEvent.target.value })
  }
  render() {
    return (
      <Fragment>
        <div className="fixed-background" />
        <main>
          <div className="container">
            <Row className="h-100">
              <Colxx xxs="12" md="10" className="mx-auto my-auto">
                <Card className="auth-card">
                  <div className="position-relative image-side ">
                    <p className="text-white h2">MAGIC IS IN THE DETAILS</p>
                    <p className="white">
                      Please use this form to register. <br />
                      If you are a member, please{" "}
                      <NavLink to={`/login`} className="white">
                        login
                      </NavLink>
                      .
                    </p>
                  </div>
                  <div className="form-side">
                    <NavLink to={`/`} className="white">
                      <span className="logo-single" />
                    </NavLink>
                    <CardTitle className="mb-4">
                      <IntlMessages id="user.register" />
                    </CardTitle>
                    <Form>
                      <Label className="form-group has-float-label mb-4">
                        <Input type="name" defaultValue={this.state.name} onChange={this.setName} />
                        <IntlMessages id="user.fullname" />
                      </Label>
                      <Label className="form-group has-float-label mb-4">
                        <Input type="email" defaultValue={this.state.email} onChange={this.setEmail} />
                        <IntlMessages id="user.email" />
                      </Label>
                      <Label className="form-group has-float-label mb-4">
                        <Input type="password" onChange={this.setPassword} />
                        <IntlMessages
                          id="user.password"
                          defaultValue={this.state.password}
                        />
                      </Label>
                      <Label className="form-group has-float-label mb-4">
                        <Input type="password" onChange={this.setPasswordRepeat} />
                        <IntlMessages
                          id="user.password_repeat"
                          defaultValue={this.state.password_repeat}
                        />
                      </Label>
                      <div className="d-flex justify-content-end align-items-center">
                        <Button
                          color="primary"
                          className="btn-shadow"
                          size="lg"
                          onClick={() => this.onUserRegister()}
                        >
                          <IntlMessages id="user.register-button" />
                        </Button>
                      </div>
                    </Form>
                  </div>
                </Card>
              </Colxx>
            </Row>
          </div>
        </main>
      </Fragment>
    );
  }
}
const mapStateToProps = ({ authUser }) => {
  const { user, loading } = authUser;
  return { user, loading };
};

export default connect(
  mapStateToProps,
  {
    registerUser
  }
)(RegisterLayout);
