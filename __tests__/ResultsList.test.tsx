import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ResultsList from "../src/components/ResultsList";

// Mock the Pagination component
jest.mock("../src/components/Pagination", () => {
  return function MockPagination() {
    return <div data-testid="pagination">Pagination</div>;
  };
});

describe("ResultsList", () => {
  const mockPaginationHandler = jest.fn();
  const mockHandleDetailSelect = jest.fn();

  const mockResult = [
    {
      id: "1",
      attributes: {
        name: "Harry Potter",
        species: "Human",
        gender: "Male",
        image: "https://example.com/harry.jpg",
      },
      links: {
        self: "",
      },
      type: "",
    },
    {
      id: "2",
      attributes: {
        name: "Hermione Granger",
        species: "Human",
        gender: "Female",
        image: null,
      },
      links: {
        self: "",
      },
      type: "",
    },
  ];

  const mockPagination = {
    currentNumber: 1,
    currentLink: "",
    count: 5,
  };

  it("renders the list of characters when result is not empty", () => {
    render(
      <ResultsList
        // @ts-expect-error type
        result={mockResult}
        pagination={mockPagination}
        paginationHandler={mockPaginationHandler}
        handleDetailSelect={mockHandleDetailSelect}
      />,
    );

    expect(screen.getByText("Harry Potter")).toBeInTheDocument();
    expect(screen.getByText("Hermione Granger")).toBeInTheDocument();
    expect(screen.getByText("Human")).toBeInTheDocument();
    expect(screen.getByText("Male")).toBeInTheDocument();
    expect(screen.getByText("Female")).toBeInTheDocument();
    expect(screen.getAllByText("View Character")).toHaveLength(2);
    expect(screen.getByTestId("pagination")).toBeInTheDocument();
  });

  it("renders the correct image for characters", () => {
    render(
      <ResultsList
        // @ts-expect-error type
        result={mockResult}
        pagination={mockPagination}
        paginationHandler={mockPaginationHandler}
        handleDetailSelect={mockHandleDetailSelect}
      />,
    );

    const images = screen.getAllByRole("img");
    expect(images[0]).toHaveAttribute("src", "https://example.com/harry.jpg");
    expect(images[0]).toHaveAttribute("alt", "Harry Potter");
    expect(images[1]).toHaveAttribute(
      "src",
      "https://potterdb.com/images/missing_character.svg",
    );
    expect(images[1]).toHaveAttribute("alt", "missing_character");
  });

  it("calls handleDetailSelect with correct id when View Character button is clicked", () => {
    render(
      <ResultsList
        // @ts-expect-error type
        result={mockResult}
        pagination={mockPagination}
        paginationHandler={mockPaginationHandler}
        handleDetailSelect={mockHandleDetailSelect}
      />,
    );

    const viewButtons = screen.getAllByText("View Character");
    fireEvent.click(viewButtons[0]);
    expect(mockHandleDetailSelect).toHaveBeenCalledWith("1");

    fireEvent.click(viewButtons[1]);
    expect(mockHandleDetailSelect).toHaveBeenCalledWith("2");
  });

  it('renders "No results" when result is empty', () => {
    render(
      <ResultsList
        result={[]}
        pagination={mockPagination}
        paginationHandler={mockPaginationHandler}
        handleDetailSelect={mockHandleDetailSelect}
      />,
    );

    expect(screen.getByText("No results")).toBeInTheDocument();
    expect(screen.queryByTestId("pagination")).not.toBeInTheDocument();
  });
});
