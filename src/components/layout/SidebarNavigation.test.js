import App from "../../App";
import SidebarNavigation from "./SidebarNavigation";
import { BrowserRouter } from "react-router-dom";
import { shallow, mount } from "enzyme";
import { Provider } from "react-redux";
import store from "../../store/index";
import React from "react";

describe("Testing Sidebar Component", () => {
  it("Check if Layout Renders correctly", () => {
    shallow(<SidebarNavigation />);
  });
  it("Check if App component contains Sidebar", () => {
    const wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
    expect(wrapper.containsMatchingElement(<SidebarNavigation />)).toBe(true);
  });
});
