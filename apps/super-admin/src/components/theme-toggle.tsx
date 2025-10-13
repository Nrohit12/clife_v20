import { Moon, Sun } from "lucide-react";
import { Button } from "@clife/ui/components/button";
import { useTheme } from "@clife/theme/ThemeProvider";


export function ThemeToggle() {
  const { setMode, mode } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      onClick={() =>
        setMode(
          mode === "dark" ? "light" : "dark"
        )
      }
      className="cursor-pointer"
    >
      {mode === "dark" ? (
        <Moon className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4" />
      )}
    </Button>
  );
}
