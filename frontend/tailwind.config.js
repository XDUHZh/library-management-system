/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--border))",
        ring: "hsl(var(--ring, var(--accent-border)))",
        background: "hsl(var(--background, 0 0% 100%))",
        foreground: "hsl(var(--foreground, 224 71.4% 4.1%))",
        primary: "hsl(var(--primary, 262 83% 58%))",
        "primary-foreground":
          "hsl(var(--primary-foreground, 210 40% 98%))",
        secondary: "hsl(var(--secondary, 210 40% 96.1%))",
        "secondary-foreground":
          "hsl(var(--secondary-foreground, 222.2 47.4% 11.2%))",
        muted: "hsl(var(--muted, 210 40% 96.1%))",
        "muted-foreground":
          "hsl(var(--muted-foreground, 215.4 16.3% 46.9%))",
        accent: "hsl(var(--accent, 262 83% 58%))",
        "accent-foreground":
          "hsl(var(--accent-foreground, 210 40% 98%))",
        destructive: "hsl(var(--destructive, 0 84.2% 60.2%))",
        "destructive-foreground":
          "hsl(var(--destructive-foreground, 210 40% 98%))",
        card: "hsl(var(--card, 0 0% 100%))",
        "card-foreground":
          "hsl(var(--card-foreground, 222.2 47.4% 11.2%))",
      },
    },
  },
  plugins: [],
}

