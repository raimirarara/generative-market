import { Icon, IconName } from "@/components/icon"
import { Tabs } from "expo-router"
import Head from "expo-router/head"
import { ClerkProvider, SignedIn, SignedOut, useAuth } from "@clerk/clerk-expo"
import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native"
import SignUpScreen from "@/components/SignUpScreen"
import SignInScreen from "@/components/SignInScreen"
import SignInWithOAuth from "@/components/SignInWith0Auth"
import * as SecureStore from "expo-secure-store"

function makeIcon(icon: IconName, activeIcon: IconName) {
  return function (props: { size: number; color: string; focused: boolean }) {
    return <Icon width={props.size} height={props.size} name={props.focused ? activeIcon : icon} fill={props.color} />
  }
}

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key)
    } catch (err) {
      return null
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value)
    } catch (err) {
      return
    }
  },
}

const SignOut = () => {
  const { isLoaded, signOut } = useAuth()
  if (!isLoaded) {
    return null
  }
  return (
    <View>
      <Button
        title="Sign Out"
        onPress={() => {
          signOut()
        }}
      />
    </View>
  )
}

export default function RootLayout() {
  const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY
  return (
    <>
      <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY} tokenCache={tokenCache}>
        <SafeAreaView style={styles.container}>
          <SignedIn>
            <Head>
              <title>画像生成市場</title>
              <meta name="description" content="A Twitter clone built with Expo Router" />
              <meta property="og:description" content="A Twitter clone built with Expo Router" />
              <meta property="og:image" content="/og-image.jpg" />
              <meta property="expo:handoff" content="true" />
              <meta property="expo:spotlight" content="true" />
            </Head>
            <SignOut />
            <Tabs
              screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarActiveTintColor: "rgb(29, 155, 240)",
              }}
            >
              <Tabs.Screen
                name="(index)"
                options={{
                  title: "Home",
                  tabBarIcon: makeIcon("home", "home-active"),
                }}
              />
              <Tabs.Screen
                name="(search)"
                options={{
                  title: "Search",
                  tabBarIcon: makeIcon("explore", "explore-active"),
                }}
              />
              <Tabs.Screen
                name="(profile)"
                options={{
                  title: "Profile",
                  tabBarIcon: makeIcon("profile", "profile-active"),
                }}
              />
            </Tabs>
          </SignedIn>
          <SignedOut>
            <SignUpScreen />
            <View style={styles.spacer}></View>
            <SignInScreen />
            <View style={styles.spacer}></View>
            <SignInWithOAuth />
          </SignedOut>
        </SafeAreaView>
      </ClerkProvider>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  spacer: {
    height: 30,
  },
})
