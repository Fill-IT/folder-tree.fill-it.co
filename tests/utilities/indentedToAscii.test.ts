import { indentedToAscii } from "@/utilities/indentedToAscii";

describe("indentedToAscii", () => {
  it("should convert single root folder", () => {
    const input = "root-folder";
    const expected = ".\n└── root-folder";
    expect(indentedToAscii(input)).toBe(expected);
  });

  it("should convert root with one child", () => {
    const input = "root-folder\n\ta";
    const expected = ".\n└── root-folder/\n    └── a";
    expect(indentedToAscii(input)).toBe(expected);
  });

  it("should convert root with one child and a sibling", () => {
    const input = "root-folder\n\ta\nb";
    const expected = ".\n├── root-folder/\n│   └── a\n└── b";
    expect(indentedToAscii(input)).toBe(expected);
  });
});
