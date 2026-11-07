"use client"

/**
 * Splits the text content of a DOM element into individual word spans,
 * preserving any inner tags (like <em> or <span>), and provides a clean revert() function.
 * Keeps semantic text accessible to screen readers.
 */
export function splitWords(element: HTMLElement, wordClass = "split-word"): {
  words: HTMLElement[]
  revert: () => void
} {
  const originalHTML = element.innerHTML
  const words: HTMLElement[] = []

  // Recursive walker through text nodes
  function processNode(node: Node): Node {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent || ""
      const tokens = text.split(/(\s+)/)
      const fragment = document.createDocumentFragment()

      tokens.forEach((token) => {
        if (/^\s+$/.test(token)) {
          // Whitespace node preserved
          fragment.appendChild(document.createTextNode(token))
        } else if (token.length > 0) {
          const outer = document.createElement("span")
          outer.className = "inline-block overflow-hidden align-top pb-1 -mb-1"
          outer.setAttribute("aria-hidden", "true")

          const inner = document.createElement("span")
          inner.className = `${wordClass} inline-block`
          inner.textContent = token

          outer.appendChild(inner)
          fragment.appendChild(outer)
          words.push(inner)
        }
      })
      return fragment
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node as HTMLElement
      const cloned = el.cloneNode(false) as HTMLElement
      Array.from(el.childNodes).forEach((child) => {
        cloned.appendChild(processNode(child))
      })
      return cloned
    }
    return node.cloneNode(true)
  }

  // Create an accessible text copy hidden from visual layout but read by screen readers
  const accessibleLabel = element.textContent || ""
  element.setAttribute("aria-label", accessibleLabel)

  const fragment = document.createDocumentFragment()
  Array.from(element.childNodes).forEach((child) => {
    fragment.appendChild(processNode(child))
  })

  element.innerHTML = ""
  element.appendChild(fragment)

  return {
    words,
    revert: () => {
      element.innerHTML = originalHTML
      element.removeAttribute("aria-label")
    },
  }
}
