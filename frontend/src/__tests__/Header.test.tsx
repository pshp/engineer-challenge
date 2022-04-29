import { render, waitFor } from "@testing-library/react";
import Header from '../Header';

describe("<Header />", () => {
  it("Header text renders", async () => {
    const { getByText } = render(
      <Header />
    );
    await waitFor(() => expect(getByText('Policies')).toBeInTheDocument());
  });
});