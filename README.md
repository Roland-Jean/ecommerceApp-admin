# ecommerce-admin

<div align="center" style="margin: 30px;">
    <a href="https://refine.dev">
    <img alt="refine logo" src="https://refine.ams3.cdn.digitaloceanspaces.com/readme/refine-readme-banner.png">
    </a>
</div>
<br/>

This [Refine](https://github.com/refinedev/refine) project was generated with [create refine-app](https://github.com/refinedev/refine/tree/master/packages/create-refine-app).

## About This Project

An ecommerce admin dashboard built with:
- ⚛️ **Refine** - A React Framework for building internal tools and admin panels
- 🎨 **Ant Design** - Enterprise-class UI design language and React UI library
- 🎨 **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- 🔐 **Keycloak** - Open-source Identity and Access Management
- 📡 **REST API** - Simple REST Data Provider

## Getting Started

A React Framework for building internal tools, admin panels, dashboards & B2B apps with unmatched flexibility ✨

Refine's hooks and components simplifies the development process and eliminates the repetitive tasks by providing industry-standard solutions for crucial aspects of a project, including authentication, access control, routing, networking, state management, and i18n.

## Available Scripts

### Running the development server.

```bash
    npm run dev
```

### Building for production.

```bash
    npm run build
```

### Running the production server.

```bash
    npm run start
```

## Configuration

### Keycloak Setup

The application is pre-configured to use a demo Keycloak instance. To use your own Keycloak server, update the configuration in `src/index.tsx`:

```typescript
const keycloak = new Keycloak({
  clientId: "your-client-id",
  url: "your-keycloak-url",
  realm: "your-realm",
});
```

### Tailwind CSS

Tailwind CSS is configured with `preflight: false` to avoid conflicts with Ant Design styles. You can customize Tailwind in `tailwind.config.js`.

## Learn More

To learn more about **Refine**, please check out the [Documentation](https://refine.dev/docs)

- **REST Data Provider** [Docs](https://refine.dev/docs/core/providers/data-provider/#overview)
- **Ant Design** [Docs](https://refine.dev/docs/ui-frameworks/antd/tutorial/)
- **Tailwind CSS** [Docs](https://tailwindcss.com/docs)
- **React Router** [Docs](https://refine.dev/docs/core/providers/router-provider/)
- **Keycloak Auth Provider** [Docs](https://refine.dev/docs/guides-and-concepts/auth/auth0/)

## License

MIT
