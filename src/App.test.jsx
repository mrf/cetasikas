import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import CetasikasMandala from "./App.jsx";

describe("CetasikasMandala", () => {
  it("keeps category filters selected until another category is chosen", () => {
    render(<CetasikasMandala />);

    const universal = screen.getByRole("button", { name: "Universal (7)" });
    const occasional = screen.getByRole("button", { name: "Occasional (6)" });

    expect(universal.getAttribute("aria-pressed")).toBe("false");
    expect(occasional.getAttribute("aria-pressed")).toBe("false");

    fireEvent.click(universal);

    expect(universal.getAttribute("aria-pressed")).toBe("true");
    expect(occasional.getAttribute("aria-pressed")).toBe("false");

    fireEvent.click(occasional);

    expect(universal.getAttribute("aria-pressed")).toBe("false");
    expect(occasional.getAttribute("aria-pressed")).toBe("true");
  });
});
