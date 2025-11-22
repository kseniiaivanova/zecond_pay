// This page will be rendered when an error makes it all the way to the top of the
// application without being handled by a Javascript catch statement or React error
// boundary.
//
// You can modify this page as you wish, but it is important to keep things simple to
// avoid the possibility that it will cause its own error. If it does, Redwood will
// still render a generic error page, but your users will prefer something a bit more
// thoughtful :)

// This import will be automatically removed when building for production
import { DevFatalErrorPage } from '@redwoodjs/web/dist/components/DevFatalErrorPage'

export default DevFatalErrorPage ||
  (() => (
    <main
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#f4f6f8',
        height: '100vh',
        padding: '1rem',
      }}
    >
      <section
        style={{
          width: '100%',
          maxWidth: '480px',
          background: 'white',
          borderRadius: '12px',
          padding: '2rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          textAlign: 'center',
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Raleway", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        }}
      >
        <h1
          style={{
            margin: '0 0 1rem 0',
            fontSize: '1.75rem',
            color: '#1a202c',
            fontWeight: 600,
          }}
        >
          Oops... Something unexpected happened
        </h1>

        <p
          style={{
            margin: '0 0 1.5rem 0',
            color: '#4a5568',
            fontSize: '1rem',
            lineHeight: 1.5,
          }}
        >
          Our system hit a snag and could not complete your request. This is not your fault. You can try again in a
          moment or return to the start.
        </p>

        <a
          href="/"
          style={{
            display: 'inline-block',
            padding: '0.75rem 1.25rem',
            background: '#6B46C1',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            fontSize: '1rem',
            textTransform: 'uppercase',
          }}
        >
          Go back to Eventura
        </a>
      </section>
    </main>
  ))
