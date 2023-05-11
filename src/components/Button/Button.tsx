import { cva, VariantProps } from "class-variance-authority";

const buttonStyles = cva(
  "items-center justify-center font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-70",
  {
    variants: {
      /**
       * The variant of the Button
       */
      variant: {
        primary: ["bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-white"],
        secondary: [
          "bg-background-light dark:bg-background hover:bg-border-light dark:hover:bg-border text-black dark:text-white",
        ],
        success: ["bg-success-500 hover:bg-success-600 active:bg-success-700 text-white"],
        warning: ["bg-warning-500 hover:bg-warning-600 active:bg-warning-700 text-white"],
        danger: ["bg-error-500 hover:bg-error-600 active:bg-error-700 text-white"],
      },
      /**
       * The size of the Button
       */
      size: {
        sm: "h-6.5 min-w-8 ps-3 pe-3 text-sm",
        md: "h-8 min-w-9.5 ps-4 pe-4 text-md",
        lg: "h-10 min-w-12 ps-6 pe-6 text-lg",
      },
      /**
       * If true, the Button will expand to fit the width of its parent element.
       */
      fullWidth: {
        true: "w-full",
      },
      /**
       * If true, the Button will expand to fit the height of its parent element.
       */
      fullHeight: {
        true: "h-full",
      },
      /**
       * If true, the Button will have a border.
       */
      bordered: {
        // TODO: Set up compound variants for border color
        true: "border border-black",
      },
      /**
       * If true, the Button will have rounded corners.
       */
      rounded: {
        true: "rounded-md",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullHeight: false,
      fullWidth: false,
      bordered: false,
      rounded: false,
    },
    compoundVariants: [
      {
        variant: "primary",
        bordered: true,
        class: "border-primary-300",
      },
    ],
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonStyles> {
  children?: React.ReactNode;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

export const Button = ({
  type = "button",
  variant,
  size,
  fullWidth,
  fullHeight,
  bordered,
  rounded,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={buttonStyles({ variant, size, fullWidth, fullHeight, bordered, rounded })}
      type={type}
      {...props}
    >
      {props.children}
    </button>
  );
};
