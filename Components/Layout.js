export default function RootLayout({ children }) {
    return (
      <>
        <head>
          <title>Stereo Typefaces®</title>
        </head>
        <body>
          {children}
        </body>
      </>
    );
  }