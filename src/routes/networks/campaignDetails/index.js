import React, { Component, Fragment } from "react";
import IntlMessages from "Util/IntlMessages";
import { Row, Card, CardBody, CardTitle, Button, Jumbotron } from "reactstrap";
import { connect } from 'react-redux';
import TagsInput from "react-tagsinput";

import { Colxx, Separator } from "Components/CustomBootstrap";
import axios from 'axios';
import "react-tagsinput/react-tagsinput.css";


class CampaignDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sleeves: [],
      selectedFile: null,
      tags: []
    };
  }
  handleTagChange = (tags) => {
    this.setState({ tags });
  }
  fileChangedHandler = (event) => {
    this.setState({selectedFile: event.target.files})
  }
  uploadHandler = () => {
    const formData = new FormData()
    let files = [];
    formData.append('files', this.state.selectedFile);
    for (let index = 0; index < this.state.selectedFile.length; index++) {
      const file = this.state.selectedFile[index];
      files.push(files);
      formData.append('files-'+index, file, file.name);
    }
    axios.post('http://207.180.216.94/api/v1/users/image', formData)
  }
  render() {
    return (
      <Fragment>
        <Row className="mb-4">
          <Colxx xxs="12">
            <Card>
              <CardBody>
                <CardTitle>
                  <IntlMessages id="form-components.tags" />
                </CardTitle>
                <TagsInput
                  value={this.state.tags}
                  onChange={this.handleTagChange}
                  inputProps={{ placeholder: "Tags" }}
                />
              </CardBody>
            </Card>
          </Colxx>
        </Row>
        <Row className="mb-4">
          <Colxx xxs="12">
            <Card>
              <CardBody>
                <CardTitle>
                  <IntlMessages id="form-components.fine-uploader" />
                </CardTitle>
                {/* <Gallery
                  animationsDisabled={true}
                  uploader={uploader}
                  deleteButton-children={<span>Delete</span>}
                  fileInput-children={<span />}
                >
                  <span className="react-fine-uploader-gallery-dropzone-content">
                    <IntlMessages id="form-components.drop-files-here" />
                  </span>
                </Gallery> */}
                <label class="fileContainer">
                {this.state.selectedFile && this.state.selectedFile.length ? this.state.selectedFile.length + " files selected" : "Drag or Click here to trigger the file uploader!"}
                  <input type="file" onChange={this.fileChangedHandler} multiple />
                </label> <br /> <br />
                <button onClick={this.uploadHandler}>Upload!</button>
              </CardBody>
            </Card>
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ authUser }) => {
  const { user } = authUser;
  return { user };
};
export default connect(
  mapStateToProps
)(CampaignDetails);
