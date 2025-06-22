import { useTheme } from "@heroui/use-theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useTheme();
  return children;
}
