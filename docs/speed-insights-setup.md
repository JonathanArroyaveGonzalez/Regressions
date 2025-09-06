# Get Started with Vercel Speed Insights

To start collecting performance metrics, follow these steps.

## Astro Setup

### 1. Install our package

Start by installing `@vercel/speed-insights` in your existing project.

#### npm
```bash
npm i @vercel/speed-insights
```

#### yarn
```bash
yarn add @vercel/speed-insights
```

#### pnpm
```bash
pnpm add @vercel/speed-insights
```

### 2. Add the Astro component

Import and use the `<SpeedInsights/>` Astro component into one of your Astro layout.

```astro
import { SpeedInsights } from "@vercel/speed-insights/astro"
```

Add the component to your layout file (e.g., `src/layouts/Layout.astro`):

```astro
---
interface Props {
	title: string;
}

const { title } = Astro.props;
import { SpeedInsights } from "@vercel/speed-insights/astro";
---

<!doctype html>
<html lang="en">
	<head>
		<!-- your head content -->
	</head>
	<body>
		<!-- your body content -->
		<SpeedInsights />
	</body>
</html>
```

For full examples and further reference, please refer to our [documentation](https://vercel.com/docs/speed-insights).

### 3. Deploy & Visit your Site

Deploy your changes and visit the deployment to collect your first data points.

If you don't see data after 30 seconds, please check for content blockers and try to navigate between pages on your site.

---

## Implementation Notes

- The `SpeedInsights` component should be added to your main layout file to track all pages
- Make sure your site is deployed on Vercel to see the analytics data
- Data may take a few minutes to appear in your Vercel dashboard
- The component automatically tracks Core Web Vitals and other performance metrics

## Vercel Dashboard

After implementation, you can view your performance metrics in:
1. Your Vercel project dashboard
2. Go to the "Speed Insights" tab
3. View Core Web Vitals, page load times, and other performance metrics
