import { asciiToIndented } from "@/utilities/asciiToIndented";

describe("asciiToIndented", () => {
  it("should convert ascii tree with root and two children", () => {
    const input = ".\n├── root-folder/\n│   └── a\n└── b";
    const expected = "root-folder\n\ta\nb";
    expect(asciiToIndented(input)).toBe(expected);
  });

  it("should convert ascii tree with only root", () => {
    const input = ".\n└── root-folder";
    const expected = "root-folder";
    expect(asciiToIndented(input)).toBe(expected);
  });

  it("should convert ascii tree with root and one child", () => {
    const input = ".\n└── root-folder/\n    └── a";
    const expected = "root-folder\n\ta";
    expect(asciiToIndented(input)).toBe(expected);
  });
});
