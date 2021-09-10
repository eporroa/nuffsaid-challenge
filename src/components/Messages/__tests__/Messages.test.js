import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import MessageList from "../MessageList";
import { MessagesProvider } from "../messagesContext";

const renderComponent = () =>
  render(
    <MessagesProvider>
      <MessageList />
    </MessagesProvider>
  );

it("MessageList: Renders and Show Stop Button", () => {
  renderComponent();
  expect(screen.getByText("Stop Messages")).toBeInTheDocument();
});

it("MessageList: Can Stop Messages", () => {
  renderComponent();
  fireEvent.click(screen.getByText("Stop Messages"));
  expect(screen.getByText("Start Messages")).toBeInTheDocument();
});

it("MessageList: Clear All Messages", () => {
  renderComponent();
  fireEvent.click(screen.getByText("Clear all"));
  expect(screen.getByTestId("clear_all")).toBeDisabled();
});
