import React from "react"
import { useAssets } from "expo-asset"
import { Image } from "react-native"

export type IconName = "share" | "profile-active" | "profile" | "explore-active" | "explore" | "home-active" | "home"

export function Icon({ name, ...props }: { name: IconName; fill: string; style?: any; width: number; height: number }) {
  const icons = [
    { name: "home", uri: require("../assets/icons/home.svg") },
    { name: "home-active", uri: require("../assets/icons/home-active.svg") },
    { name: "explore", uri: require("../assets/icons/explore.svg") },
    { name: "explore-active", uri: require("../assets/icons/explore-active.svg") },
    { name: "profile", uri: require("../assets/icons/profile.svg") },
    { name: "profile-active", uri: require("../assets/icons/profile-active.svg") },
    { name: "share", uri: require("../assets/icons/share.svg") },
  ]
  const uri = icons.find((icon) => icon.name === name)?.uri
  return <Image source={uri} style={props.style} width={props.width} height={props.height} />
}
