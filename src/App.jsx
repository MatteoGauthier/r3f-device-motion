import * as THREE from 'three'
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { useThree } from "@react-three/fiber"
import React from "react"
import { useSpring } from "react-spring"

import useDeviceOrientation from "./hooks/useDeviceOrientation"
import { useFrame } from "@react-three/fiber"

export default function App() {
  // const { alpha, beta, gamma, absolute } = useDeviceOrientation()
  // console.log(beta)
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[0, 0, 0]} />
      <Controls />
    </Canvas>
  )
}

function Box(props) {
  const myMesh = React.useRef()
  const { alpha, beta, gamma, absolute } = useDeviceOrientation()
  console.log(beta)

  useFrame((state, delta) => {
    // const a = clock.getElapsedTime();

    myMesh.current.rotation.x = THREE.MathUtils.damp(
      myMesh.current.rotation.x,
      beta / 10,
      4,
      delta
    )

    myMesh.current.rotation.y = THREE.MathUtils.damp(
      myMesh.current.rotation.y,
      gamma / 10,
      4,
      delta
    )
  })

  return (
    <mesh  ref={myMesh}>
      <boxBufferGeometry />
      <meshPhongMaterial color="royalblue" />
    </mesh>
  )
}

function Controls() {
  return <OrbitControls autoRotate={false} />
}
