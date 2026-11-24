import { NativeTabs } from "expo-router/native-tabs";

import { COLORS } from "@/constants/balora-theme";

export default function AppTabs() {
  return (
    <NativeTabs
      backgroundColor={COLORS.secondary}
      indicatorColor="#E3DCC6"
      tintColor={COLORS.primary}
      labelStyle={{ selected: { color: COLORS.primary } }}
    >
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Beranda</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require("@/assets/images/tabIcons/home.png")}
          renderingMode="template"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="explore">
        <NativeTabs.Trigger.Label>Jelajah</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require("@/assets/images/tabIcons/explore.png")}
          renderingMode="template"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="favorit">
        <NativeTabs.Trigger.Label>Favorit</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="heart.fill" md="favorite" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="profil">
        <NativeTabs.Trigger.Label>Profil</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="person.fill" md="person" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
