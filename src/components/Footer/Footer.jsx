import React from 'react'
import './Footer.scss'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__logo">
          <span className="footer__logo-text">rekindle</span>
          <div className="footer__fire">
            {[...Array(7)].map((_, i) => (
              <span key={i} className="footer__flame">🔥</span>
            ))}
          </div>
        </div>

        <p className="footer__copyright">
          © {currentYear} Rekindle. Made with 💝
        </p>

        <div className="footer__social">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__social-link"
          >
            Twitter
          </a>
          <span className="footer__divider">·</span>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__social-link"
          >
            Instagram
          </a>
          <span className="footer__divider">·</span>
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__social-link"
          >
            TikTok
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
