import { createContext, useContext, useMemo, useState } from 'react'
import { Icon } from '@iconify/react'

const ToastContext = createContext(null)

function ToastProvider({ children }) {
  const [toast, setToast] = useState(null)

  const value = useMemo(
    () => ({
      showToast(message, options = {}) {
        setToast({
          message,
          action: options.action || null,
        })
        window.clearTimeout(ToastProvider.timeoutId)
        ToastProvider.timeoutId = window.setTimeout(() => {
          setToast(null)
        }, options.duration || 1800)
      },
    }),
    [],
  )

  return (
    <ToastContext.Provider value={value}>
      {children}
      {toast && (
        <div className="toast-message" role="status">
          <span>{toast.message}</span>
          {toast.action && (
            <button
              type="button"
              className="toast-action-button"
              onClick={async () => {
                window.clearTimeout(ToastProvider.timeoutId)
                setToast(null)
                await toast.action.onClick()
              }}
              aria-label={toast.action.label}
            >
              <Icon className="app-icon--inline" icon={toast.action.icon} />
            </button>
          )}
        </div>
      )}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error('useToast must be used inside ToastProvider')
  }

  return context
}

export default ToastProvider
