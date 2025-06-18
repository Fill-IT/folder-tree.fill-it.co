"use client"

import type React from "react"
import { useState, useEffect } from "react"
import IndentFormatBox from "@/components/IndentFormatBox"
import AsciiFormatBox from "@/components/AsciiFormatBox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface TreeNode {
  name: string
  level: number
  children: TreeNode[]
}

export default function FolderTreeGenerator() {
  const [leftInput, setLeftInput] = useState("")
  const [rightInput, setRightInput] = useState("")
  const [activeInput, setActiveInput] = useState<"left" | "right" | null>(null)

  const indentedToAscii = (text: string): string => {
    if (!text.trim()) return ""

    const lines = text.split("\n").filter((line) => line.trim())
    const nodes: TreeNode[] = []

    lines.forEach((line) => {
      const trimmed = line.trim()
      if (!trimmed) return

      // Count leading tabs
      const level = line.length - line.replace(/^\t*/, "").length
      nodes.push({
        name: trimmed,
        level,
        children: [],
      })
    })

    const buildTree = (startIndex: number, parentLevel: number): TreeNode[] => {
      const result: TreeNode[] = []
      let i = startIndex

      while (i < nodes.length && nodes[i].level > parentLevel) {
        if (nodes[i].level === parentLevel + 1) {
          const node = nodes[i]
          result.push(node)
          i++

          const childStartIndex = i
          while (i < nodes.length && nodes[i].level > node.level) {
            i++
          }

          if (childStartIndex < i) {
            node.children = buildTree(childStartIndex, node.level)
          }
        } else {
          i++
        }
      }

      return result
    }

    const tree = buildTree(0, -1)

    const generateAscii = (nodes: TreeNode[], prefix = "", isRoot = true): string => {
      let result = ""

      if (isRoot && nodes.length > 0) {
        result += ".\n"
      }

      nodes.forEach((node, index) => {
        const isLast = index === nodes.length - 1
        const currentPrefix = isRoot ? "" : prefix
        const connector = isLast ? "└── " : "├── "
        const folderSuffix = node.children.length > 0 ? "/" : ""

        result += currentPrefix + connector + node.name + folderSuffix + "\n"

        if (node.children.length > 0) {
          const childPrefix = currentPrefix + (isLast ? "    " : "│   ")
          result += generateAscii(node.children, childPrefix, false)
        }
      })

      return result
    }

    return generateAscii(tree).trim()
  }

  const asciiToIndented = (text: string): string => {
    if (!text.trim()) return ""

    const lines = text.split("\n").filter((line) => line.trim())
    let result = ""

    lines.forEach((line) => {
      if (line.trim() === "." || !line.trim()) return

      const match = line.match(/^(.*?)(├──|└──)\s*(.*)$/)
      if (match) {
        const [ , prefix, , name ] = match
        const depth = (prefix.match(/(│ {3}| {4})/g) || []).length
        const cleanLine = name.replace(/\/$/, "")
        const indentation = "\t".repeat(depth)
        result += indentation + cleanLine + "\n"
      }
    })

    return result.trim()
  }

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
