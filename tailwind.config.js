/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: [
  				'var(--font-poppins)'
  			]
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			blue: {
  				DEFAULT: 'hsl(var(--blue))',
  				solid: '#2D67F0'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
      keyframes: {
        'ripple-1': {
          '0%': { transform: 'scale(0.7)', opacity: 0.7 },
          '50%': { opacity: 0.5 },
          '100%': { transform: 'scale(2.5)', opacity: 0 }
        },
        'ripple-2': {
          '0%': { transform: 'scale(0.7)', opacity: 0.6 },
          '50%': { opacity: 0.4 },
          '100%': { transform: 'scale(3)', opacity: 0 }
        },
        'ripple-3': {
          '0%': { transform: 'scale(0.7)', opacity: 0.5 },
          '50%': { opacity: 0.3 },
          '100%': { transform: 'scale(3.5)', opacity: 0 }
        }
      },
      animation: {
        'ripple-1': 'ripple-1 2s ease-out infinite',
        'ripple-2': 'ripple-2 2.5s ease-out infinite 0.5s',
        'ripple-3': 'ripple-3 3s ease-out infinite 1s'
      }
  	}
  },
  plugins: [require("tailwindcss-animate")],
} 