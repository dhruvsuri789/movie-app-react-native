import { Tabs } from "expo-router";
import React from "react";

const Layout = () => {
  return (
    // Tabs allow you to modify how your bottom tab navigator looks like
    // This does not create tabs but allows you to modify the look of the tabs
    // Tabs are created in the (tabs) group
    <Tabs>
      {/* Hides header of particular screen */}
      <Tabs.Screen
        name="index"
        options={{ title: "Home", headerShown: false }}
      />
      <Tabs.Screen
        name="search"
        options={{ title: "Search", headerShown: false }}
      />
      <Tabs.Screen
        name="saved"
        options={{ title: "Saved", headerShown: false }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: "Profile", headerShown: false }}
      />
    </Tabs>
  );
};

export default Layout;
