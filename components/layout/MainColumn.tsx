import { ReactNode } from 'react';

export function MainColumn({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="w-full md:w-5/6 bg-white bg-opacity-75 rounded-lg p-4">{children}</div>
    </>
  );
}
