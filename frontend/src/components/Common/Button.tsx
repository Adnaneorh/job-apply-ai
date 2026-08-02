import clsx from 'clsx';

export function Button({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={clsx('rounded-md bg-primary px-4 py-2 text-white transition hover:opacity-90 disabled:opacity-60', className)}
      {...props}
    >
      {children}
    </button>
  );
}
