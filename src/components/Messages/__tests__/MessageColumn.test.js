import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MessagesProvider } from "../messagesContext";
import MessageColumn from "../MessageColumn";

const renderComponent = (data) =>
  render(
    <MessagesProvider>
      <MessageColumn title="Test" data={data} />
    </MessagesProvider>
  );


it("MessageColumn: Works and show title", () => {
  const data = [];
  const { getByText } = renderComponent(data);
  expect(getByText("Test")).toBeInTheDocument();
});

it("MessageColumn: Works and show message", () => {
  const data = [{
      id: 1,
      message: "Lorem Ipsum",
      status: 1
  }];
  const { getByText } = renderComponent(data);
  expect(getByText("Lorem Ipsum")).toBeInTheDocument();
});
