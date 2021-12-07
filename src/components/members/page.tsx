import * as React from "react";
import { memberAPI } from "../../api/member";

interface State {
  queueTypes: any;
  clients: any;
  applicationGroup: any;
  clientsData: any;
  showClient: any;
}

export class MembersPage extends React.Component<{}, State> {
  constructor(props) {
    super(props);
    this.state = {
      queueTypes: [],
      clients: [],
      applicationGroup: [],
      clientsData: [],
      showClient: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  public componentDidMount() {
    memberAPI.fetchMembersAsync().then((members) => {
      this.setState({
        queueTypes: members[0]["queueTypes"],
        clients: members[0]["clients"],
        applicationGroup: members[0]["applicationGroup"],
      });
    });

    memberAPI.fetchClientAsync().then((clientsData) => {
      this.setState({
        clientsData,
      });
    });
  }

  handleChange() {
    this.setState({ showClient: true });
  }

  public render() {
    return (
      <div className="row">
        <div className="container">
          <div className="row justify-content-center">
            <div
              className="form-group col-md-4 col-md-offset-5 align-center"
              style={{
                border: "2px solid black",
                "background-color": "#e3e3e3",
              }}
            >
              <h2> Client Onboarding</h2>
              <form>
                <div className="form-group">
                  <label id="exampleFormControlSelect1">
                    Queue Types select
                  </label>
                  <select
                    className="form-control"
                    id="exampleFormControlSelect1"
                  >
                    {this.state.queueTypes.map((d) => (
                      <option>{d}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label id="exampleFormControlSelect1">Select Clients</label>
                  <select
                    className="form-control"
                    id="exampleFormControlSelect1"
                    onChange={this.handleChange}
                  >
                    {this.state.clients.map((d) => (
                      <option>{d}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label id="exampleFormControlSelect1">
                    Select ApplicationGroup
                  </label>
                  <select
                    className="form-control"
                    id="exampleFormControlSelect1"
                  >
                    {this.state.applicationGroup.map((d) => (
                      <option>{d}</option>
                    ))}
                  </select>
                </div>
                {this.state.showClient === true && (
                  <div className="form-group">
                    <label id="exampleFormControlSelect1">
                      Select Clients Options
                    </label>
                    <select
                      className="form-control"
                      id="exampleFormControlSelect1"
                    >
                      {this.state.clientsData.map((d) => (
                        <option>{d}</option>
                      ))}
                    </select>
                  </div>
                )}
                <div className="form-group">
                  <button id="Submit" className="btn-primary">
                    Submit Form
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
