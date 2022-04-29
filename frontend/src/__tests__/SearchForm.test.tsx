import { render, waitFor} from "@testing-library/react";
import SearchForm from '../SearchForm';

describe("<SearchForm />", () => {

  it("SearchForm text input renders", async () => {
    const { queryByPlaceholderText } = render(<SearchForm />);
    await waitFor(async () => {
      expect(queryByPlaceholderText('search')).toBeTruthy();
    })
  });

  it("Navbar text renders", async () => {
    const { queryByPlaceholderText } = render(<SearchForm />);
    await waitFor(async () => {
      expect(queryByPlaceholderText('Click me')).toBeTruthy();
    })
  });
});