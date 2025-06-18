"use client"

import { useState, useEffect } from "react"
import IndentFormatBox from "@/components/IndentFormatBox"
import AsciiFormatBox from "@/components/AsciiFormatBox"
import { indentedToAscii } from "@/utilities/indentedToAscii"
import { asciiToIndented } from "@/utilities/asciiToIndented"

export default function FolderTreeGenerator() {
  const [leftInput, setLeftInput] = useState("")
  const [rightInput, setRightInput] = useState("")
  const [activeInput, setActiveInput] = useState<"left" | "right" | null>(null)

  const handleTabKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault()
      const textarea = e.target as HTMLTextAreaElement
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const value = textarea.value

      const newValue = value.substring(0, start) + "\t" + value.substring(end)
      setLeftInput(newValue)

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 1
      }, 0)
    }
  }

  useEffect(() => {
    if (activeInput === "left") {
      const ascii = indentedToAscii(leftInput)
      setRightInput(ascii)
    } else if (activeInput === "right") {
      const indented = asciiToIndented(rightInput)
      setLeftInput(indented)
    }
  }, [leftInput, rightInput, activeInput])

  const handleLeftChange = (value: string) => {
    setActiveInput("left")
    setLeftInput(value)
  }

  const handleRightChange = (value: string) => {
    setActiveInput("right")
    setRightInput(value)
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Folder Tree Generator</h1>
          <p className="text-muted-foreground">Convert between indented folder structure and ASCII tree format</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <IndentFormatBox
            value={leftInput}
            onChange={handleLeftChange}
            onKeyDown={handleTabKey}
          />

          <AsciiFormatBox
            value={rightInput}
            onChange={handleRightChange}
          />
        </div>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>Paste content into either field to see the conversion in the other format</p>
        </div>
      </div>
    </div>
  )
}
