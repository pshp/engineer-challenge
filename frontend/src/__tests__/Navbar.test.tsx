import { render, waitFor, screen} from "@testing-library/react";
import Navbar from '../Navbar';

describe("<Navbar />", () => {
  it("Navbar text renders", async () => {
    const { getByText } = render(<Navbar />);
    await waitFor(async () => {
      expect(getByText('Workflow')).toBeInTheDocument();
      expect(getByText('Open menu')).toBeInTheDocument();
      expect(getByText('Close menu')).toBeInTheDocument();
      expect(await screen.findAllByText('Sign up')).toHaveLength(2)
      expect(await screen.findAllByText('Policies')).toHaveLength(2)
    })
  });
});