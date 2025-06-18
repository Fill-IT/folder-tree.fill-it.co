import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

type IndentFormatBoxProps = {
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
};

const IndentFormatBox: React.FC<IndentFormatBoxProps> = ({
  value,
  onChange,
  onKeyDown,
}) => (
  <Card className="h-full">
    <CardHeader>
      <CardTitle>Indented Format</CardTitle>
      <p className="text-sm text-muted-foreground">
        Use Tab key for each indentation level
      </p>
    </CardHeader>
    <CardContent>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={`root-folder\n\tfolder-1\n\t\tfolder-2\nfolder-3\n\tfolder-4\n\t\tfolder-5`}
        className="min-h-[400px] font-mono text-sm resize-none"
        spellCheck={false}
      />
    </CardContent>
  </Card>
);

export default IndentFormatBox;
