import React from "react"
import { useAssets } from "expo-asset"
import { Image } from "react-native"

export type IconName = "share" | "profile-active" | "profile" | "explore-active" | "explore" | "home-active" | "home"

export function Icon({ name, ...props }: { name: IconName; fill: string; style?: any; width: number; height: number }) {
  // const [icons, error] = useAssets([require("../assets/icons")])
  // const Comp = React.useMemo(() => {
  //   const imp = icons.find((value) => value.name === `./${name}.svg`)
  //   if (!imp) {
  //     throw new Error(`Icon not found: ${name}. Options: ${icons.map((value) => value.name).join(", ")}}`)
  //   }
  //   return <Image source={require(imp.uri)} style={props.style} width={props.width} height={props.height} />
  // }, [name])
  // return <Comp {...props} color={props.fill} />
  return null
}
