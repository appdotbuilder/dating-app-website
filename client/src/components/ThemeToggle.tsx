import { Button } from '@/components/ui/button';
import { useTheme, type Theme } from './ThemeProvider';
import { Sun, Moon, Monitor } from 'lucide-react';

const themes: { value: Theme; label: string; icon: React.ReactNode }[] = [
  { value: 'light', label: 'Light', icon: <Sun className="h-4 w-4" /> },
  { value: 'dark', label: 'Dark', icon: <Moon className="h-4 w-4" /> },
  { value: 'system', label: 'System', icon: <Monitor className="h-4 w-4" /> },
];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = () => {
    // Cycle through themes: light -> dark -> system -> light
    const currentIndex = themes.findIndex(t => t.value === theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex].value);
  };

  const currentTheme = themes.find(t => t.value === theme) || themes[0];

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleThemeChange}
      className="h-9 w-9 px-0 hover:bg-gradient-to-r hover:from-pink-100 hover:to-purple-100 dark:hover:from-pink-900/20 dark:hover:to-purple-900/20 transition-all duration-200"
      aria-label={`Switch to ${themes[(themes.findIndex(t => t.value === theme) + 1) % themes.length].label.toLowerCase()} theme`}
    >
      {currentTheme.icon}
    </Button>
  );
}