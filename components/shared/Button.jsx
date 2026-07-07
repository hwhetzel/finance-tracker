import styles from './Button.module.css'

// Reusable button with variant support so we don't rewrite button styles
// everywhere. variant controls color scheme, rest of props pass through
// (onClick, type, disabled, etc.)
export default function Button({ children, variant = 'primary', onClick, type = 'button', disabled = false, ...props }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${styles.button} ${styles[variant]}`}
      {...props}
    >
      {children}
    </button>
  )
}