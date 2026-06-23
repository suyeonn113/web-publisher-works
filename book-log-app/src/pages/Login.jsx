import { useState } from 'react'
import { signInWithGoogle } from '../services/authService'

function Login() {
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleGoogleLogin = async () => {
    setErrorMessage('')
    setIsSubmitting(true)

    try {
      await signInWithGoogle()
    } catch (error) {
      setErrorMessage('Google 로그인에 실패했습니다. 다시 시도해 주세요.')
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="auth-page">
      <section className="login-panel">
        <p className="eyebrow">Book Log</p>
        <h1>Login</h1>
        <p className="lead">Google 계정으로 로그인하고 내 서재를 이어서 기록하세요.</p>

        <button
          type="button"
          className="google-login-button"
          onClick={handleGoogleLogin}
          disabled={isSubmitting}
        >
          <span className="google-mark" aria-hidden="true">
            G
          </span>
          {isSubmitting ? '로그인 중...' : 'Google로 로그인'}
        </button>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </section>
    </main>
  )
}

export default Login
