import { Image } from "expo-image";
import { StyleSheet, type ImageStyle, type StyleProp } from "react-native";

import type { Destination } from "@/data/destinations";

type Props = {
  item: Pick<Destination, "image" | "tint" | "name">;
  style?: StyleProp<ImageStyle>;
};

export function DestinationImage({ item, style }: Props) {
  return (
    <Image
      source={item.image}
      style={[StyleSheet.absoluteFill, style]}
      contentFit="cover"
      transition={200}
      accessibilityLabel={`Foto ${item.name}`}
    />
  );
}