import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../components/SearchBar";

describe("SearchBar Component", () => {
  
    test("onSearch function is triggered when typing in the search bar", () => {
      const onSearchMock = jest.fn();
      render(<SearchBar searchQuery="" onSearch={onSearchMock} />);
      const input = screen.getByRole("textbox");
      fireEvent.change(input, { target: { value: "Maumita" } });
      expect(onSearchMock).toHaveBeenCalledWith("Maumita");
    });
  });