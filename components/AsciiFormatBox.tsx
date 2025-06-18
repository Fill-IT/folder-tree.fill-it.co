import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

type AsciiFormatBoxProps = {
  value: string;
  onChange: (value: string) => void;
};

const AsciiFormatBox: React.FC<AsciiFormatBoxProps> = ({ value, onChange }) => (
  <Card className="h-full">
    <CardHeader>
      <CardTitle>ASCII Tree Format</CardTitle>
      <p className="text-sm text-muted-foreground">
        Standard tree structure with ASCII characters
      </p>
    </CardHeader>
    <CardContent>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`.\n├── root-folder/\n│   └── folder-1/\n│       └── folder-2\n└── folder-3/\n    └── folder-4/\n        └── folder-5`}
        className="min-h-[400px] font-mono text-sm resize-none"
        spellCheck={false}
      />
    </CardContent>
  </Card>
);

export default AsciiFormatBox;
