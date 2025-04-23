"use client"

import { useEffect, useRef } from "react"

export default function DataVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = 300
    canvas.height = 300

    // Create data points
    const dataPoints = 50
    const radius = 120
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2

    // Animation variables
    let angle = 0
    const speed = 0.005

    // Create an array of nodes
    const nodes = Array.from({ length: dataPoints }, (_, i) => {
      const a = (i / dataPoints) * Math.PI * 2
      const x = centerX + Math.cos(a) * radius * (0.8 + Math.random() * 0.4)
      const y = centerY + Math.sin(a) * radius * (0.8 + Math.random() * 0.4)
      const size = 2 + Math.random() * 4
      return { x, y, size, angle: a }
    })

    // Create connections between nodes
    const connections: { from: number; to: number; strength: number }[] = []
    for (let i = 0; i < dataPoints; i++) {
      const numConnections = 1 + Math.floor(Math.random() * 3)
      for (let j = 0; j < numConnections; j++) {
        const target = Math.floor(Math.random() * dataPoints)
        if (target !== i) {
          connections.push({
            from: i,
            to: target,
            strength: 0.1 + Math.random() * 0.9,
          })
        }
      }
    }

    // Animation function
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update angle
      angle += speed

      // Draw connections
      connections.forEach((conn) => {
        const fromNode = nodes[conn.from]
        const toNode = nodes[conn.to]

        ctx.beginPath()
        ctx.moveTo(fromNode.x, fromNode.y)
        ctx.lineTo(toNode.x, toNode.y)
        ctx.strokeStyle = `rgba(255, 255, 255, ${conn.strength * 0.2})`
        ctx.lineWidth = conn.strength * 1.5
        ctx.stroke()
      })

      // Draw nodes
      nodes.forEach((node, i) => {
        // Update position with a slight wobble
        node.x = centerX + Math.cos(node.angle + angle) * radius * (0.8 + Math.sin(angle * 2 + i) * 0.1)
        node.y = centerY + Math.sin(node.angle + angle) * radius * (0.8 + Math.cos(angle * 2 + i) * 0.1)

        ctx.beginPath()
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2)

        // Create gradient for nodes
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.size * 2)
        gradient.addColorStop(0, "rgba(72, 209, 204, 1)")
        gradient.addColorStop(1, "rgba(72, 209, 204, 0)")

        ctx.fillStyle = gradient
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      // Cleanup if needed
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ opacity: 0.8 }} />
}
