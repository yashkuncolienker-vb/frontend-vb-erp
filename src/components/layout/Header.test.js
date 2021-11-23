import Header from "./Header";
import App from "../../App";
import { BrowserRouter } from "react-router-dom";
import { shallow, mount } from "enzyme";
import { Provider } from "react-redux";
import store from "../../store/index";
import React from "react";

describe("Testing Header Component", () => {
  it("Check if Header Renders correctly", () => {
    shallow(<Header />);
  });
  it("Check if App component contains Header", () => {
    const wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
    expect(wrapper.containsMatchingElement(<Header />)).toBe(true);
  });
  it("Testing Header component for logo, dropdown & button", () => {
    const header = mount(<Header />);
    expect(
      header.containsMatchingElement(<img src="vb_logo.svg" alt="vb-logo" />)
    ).toBe(true);
    expect(header.find("#profile-menu")).toBeTruthy();
    header.find("button").simulate("click");
  });
});
