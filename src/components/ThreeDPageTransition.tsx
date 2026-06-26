'use client';

interface ThreeDPageTransitionProps {
  children: React.ReactNode;
}

export default function ThreeDPageTransition({ children }: ThreeDPageTransitionProps) {
  return (
    <main className="page-content min-h-screen relative w-full">
      {children}
    </main>
  );
}

