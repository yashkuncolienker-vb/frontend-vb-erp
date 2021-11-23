import Header from "./Header";
import App from "../../App";
import Layout from "./Layout";
import SidebarNavigation from "./SidebarNavigation";
import { BrowserRouter } from "react-router-dom";
import { shallow, mount } from "enzyme";
import { Provider } from "react-redux";
import store from "../../store/index";
import React from "react";

describe("Testing Layout Component", () => {
  it("Check if Layout Renders correctly", () => {
    shallow(<Layout />);
  });
  it("Check if App component contains Layout", () => {
    const wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
    expect(wrapper.find(Layout).length).toBe(1);
  });
  it("Check if Layout component contains Header, Sidebar & main", () => {
    const wrapper = shallow(<Layout />);
    expect(wrapper.containsMatchingElement(<Header />)).toBe(true);
    expect(wrapper.containsMatchingElement(<SidebarNavigation />)).toBe(true);
    expect(wrapper.find("main").length).toBe(1);
  });
});
