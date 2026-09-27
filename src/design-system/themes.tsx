import { createContext, useState } from "react";
import styled from "styled-components";
const cndUrl = (process.env.CDN_URL as string) || "";
export const ThemeRoot = styled.div`
  display: contents;
  @font-face {
    font-family: font-0b7a2140-babb-11f1-991a-3b7217c3df55;
    src: url("assets/fonts/5959be1a-d574-4f8d-a601-89acd72d08a0.woff2")
      format("woff2");
    font-weight: 400;
    font-style: normal;
  }
  @font-face {
    font-family: font-0b7a2140-babb-11f1-991a-3b7217c3df55;
    src: url("assets/fonts/a3fd2857-3bb8-4588-b146-0f8f28c37a0c.woff2")
      format("woff2");
    font-weight: 500;
    font-style: normal;
  }
  @font-face {
    font-family: font-0b7a2140-babb-11f1-991a-3b7217c3df55;
    src: url("assets/fonts/861c9e05-7f30-4fa3-a82e-970fbae7f015.woff2")
      format("woff2");
    font-weight: 600;
    font-style: normal;
  }
  @font-face {
    font-family: font-0b7a2140-babb-11f1-991a-3b7217c3df55;
    src: url("assets/fonts/0f9df486-6850-4c56-8374-59f3b9857047.woff2")
      format("woff2");
    font-weight: 700;
    font-style: normal;
  }
  --colors-primitive-blue: #0147ffff;
  --colors-primitive-grey: #dedee0ff;
  --colors-primitive-dark: #1c1a1aff;
  --colors-primitive-white: #ffffffff;
  --colors-primitive-surface: #1a1a1aff;
  --colors-primitive-muted: #7e7e7eff;
  --colors-primitive-black: #000000ff;
  &.default_1 {
  }
  &.default_2 {
  }
  &.default_3 {
  }
  &.default_4 {
  }
`;
export const Themes = { default: "default" };
export type ThemeType = keyof typeof Themes;
export type Layer = 1 | 2 | 3 | 4;

export const ComponentFileContext = createContext<{
  type: ThemeType;
  layer: Layer;
  setTheme: (type: ThemeType) => void;
  setLayer: (layer: Layer) => void;
}>({
  layer: 1,
  type: "default",
  setTheme: () => {},
  setLayer: () => {},
});

export const ThemesLayer = ({
  defaultType,
  children,
  defaultLayer,
}: {
  defaultType: ThemeType;
  defaultLayer: 1 | 2 | 3 | 4;
  children: React.JSX.Element;
}) => {
  const [currentTheme, setTheme] = useState(defaultType);
  const [currentLayer, setLayer] = useState(defaultLayer);
  return (
    <ComponentFileContext.Provider
      value={{
        layer: currentLayer,
        type: currentTheme,
        setTheme: (type) => setTheme(type),
        setLayer: (layer) => setLayer(layer),
      }}
    >
      <ThemeRoot className={`${currentTheme}_${currentLayer}`}>
        {children}
      </ThemeRoot>
    </ComponentFileContext.Provider>
  );
};
