import React from "react";


// Toast component
const Toast = React.forwardRef(({ className, variant, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`
        fixed top-4 right-4 z-50 p-4 rounded-md shadow-lg
        ${
          variant === "destructive"
            ? "bg-red-500 text-white"
            : "bg-white border"
        }
        ${className || ""}
      `}
      {...props}
    />
  );
});
Toast.displayName = "Toast";

// ToastProvider component
const ToastProvider = ({ children }) => {
  return (
    <>
      {children}
      <ToastViewport />
    </>
  );
};

// ToastViewport component
const ToastViewport = () => {
  return (
    <div className="fixed top-0 right-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]" />
  );
};

// ToastAction component
const ToastAction = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={`
        inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium
        ${className || ""}
      `}
      {...props}
    />
  );
});
ToastAction.displayName = "ToastAction";

// ToastClose component
const ToastClose = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={`
        absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100
        ${className || ""}
      `}
      {...props}
    >
      ×
    </button>
  );
});
ToastClose.displayName = "ToastClose";

// ToastTitle component
const ToastTitle = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`text-sm font-semibold ${className || ""}`}
      {...props}
    />
  );
});
ToastTitle.displayName = "ToastTitle";

// ToastDescription component
const ToastDescription = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`text-sm opacity-90 ${className || ""}`}
      {...props}
    />
  );
});
ToastDescription.displayName = "ToastDescription";

// Export the toast component (this is what your use-toast.js is looking for)
export const toast = Toast;

// Export all components
export {
  Toast,
  ToastProvider,
  ToastViewport,
  ToastAction,
  ToastClose,
  ToastTitle,
  ToastDescription,
};

// Default export
export default Toast;
