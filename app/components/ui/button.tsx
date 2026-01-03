import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', children, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
    
    const variantClasses = 
      variant === 'default' ? 'bg-blue-600 text-white hover:bg-blue-700' :
      variant === 'outline' ? 'border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800' :
      variant === 'ghost' ? 'hover:bg-zinc-100 dark:hover:bg-zinc-800' :
      'text-blue-600 hover:underline';
    
    const sizeClasses = 
      size === 'sm' ? 'h-9 px-3' :
      size === 'lg' ? 'h-11 px-8' :
      'h-10 px-4';
    
    const classes = `${baseClasses} ${variantClasses} ${sizeClasses} ${className || ''}`;
    
    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';

export { Button };