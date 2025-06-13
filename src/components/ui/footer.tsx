const footer = () => {
  const APP_VERSION = process.env.NEXT_PUBLIC_APP_VERSION;
  return (
    <footer className="absolute bottom-4 left-0 right-0 text-center">
      <p className="text-white/70 text-xs">
        &#169; {new Date().getFullYear()} Vimedika. All rights reserved | App V
        {APP_VERSION}
      </p>
    </footer>
  );
};

export default footer;
