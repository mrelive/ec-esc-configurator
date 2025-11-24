import React, {
  useCallback,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import {
  FaDiscord,
  FaGithub,
  FaMicrochip,
  FaExclamationTriangle,
  FaHeart,
  FaCode,
  FaInfoCircle,
  FaRocket,
  FaDownload,
} from 'react-icons/fa';

import bluejay from './images/bluejay_logo.png';
import './style.scss';

function Install() {
  const { t } = useTranslation('common');

  const deferredPrompt = useRef(null);
  const [showInstall, setShowInstall]  = useState(false);

  window.addEventListener('beforeinstallprompt', (e) => {
    deferredPrompt.current = e;
    setShowInstall(true);
  });

  const handleInstallToHomescreen = useCallback(() => {
    if(deferredPrompt.current) {
      deferredPrompt.current.prompt();
    }
  }, [deferredPrompt]);

  return(
    <div className={`install-wrapper ${showInstall ? 'active' : ''}`}>
      <button
        className="install-btn"
        onClick={handleInstallToHomescreen}
        type="button"
      >
        <FaDownload className="icon" />
        {t('addToHomeScreen')}
      </button>
    </div>
  );
}

function Hero() {
  return (
    <div className="hero-section">
      <div className="hero-content">
        <div className="hero-icon">
          <FaRocket />
        </div>
        <h1>EC ESC CONFIGURATOR</h1>
        <p className="hero-subtitle">
          Advanced configuration tool for BLHeli_S, Bluejay, and AM32 ESCs
        </p>
        <div className="hero-stats">
          <div className="stat-item">
            <FaMicrochip />
            <span>Multi-Firmware Support</span>
          </div>
          <div className="stat-item">
            <FaCode />
            <span>Open Source</span>
          </div>
        </div>
      </div>
      <Install />
    </div>
  );
}

function AlertSection() {
  return (
    <div className="alert-banner">
      <div className="alert-icon">
        <FaExclamationTriangle />
      </div>
      <div className="alert-content">
        <strong>Attention Bluejay users!</strong>
        <p>
          If you are still on 0.20.0, please upgrade to version 0.21.0 - there have been issues with stall detection and motor protection which might result in broken ESCs and/or motors.
        </p>
      </div>
    </div>
  );
}

function FirmwareCard({
  title,
  icon,
  children,
  link,
}) {
  return (
    <div className="feature-card">
      <div className="card-header">
        {icon}
        <h3>
          {title}
        </h3>
      </div>
      <div className="card-body">
        {children}
      </div>
      {link && (
        <a
          className="card-link"
          href={link}
          rel="noreferrer"
          target="_blank"
        >
          Learn More
          {' '}
          <FaGithub />
        </a>
      )}
    </div>
  );
}

FirmwareCard.propTypes = {
  children: PropTypes.node.isRequired,
  icon: PropTypes.node.isRequired,
  link: PropTypes.string,
  title: PropTypes.string.isRequired,
};

FirmwareCard.defaultProps = {
  link: null,
};

function FirmwareSection() {
  const { t } = useTranslation('common');

  return (
    <div className="section-container">
      <h2 className="section-title">Supported Firmware</h2>
      <div className="cards-grid">
        <FirmwareCard
          icon={<FaMicrochip />}
          link="https://github.com/bitdump/BLHeli"
          title="BLHeli_S"
        >
          <ReactMarkdown>{t('blhelisTextLine1')}</ReactMarkdown>
          <ReactMarkdown>{t('blhelisTextLine2')}</ReactMarkdown>
        </FirmwareCard>

        <FirmwareCard
          icon={<img alt="Bluejay" className="card-icon-img" src={bluejay} />}
          link="https://github.com/bird-sanctuary/bluejay"
          title="Bluejay"
        >
          <ReactMarkdown>{t('bluejayTextLine1')}</ReactMarkdown>
          <div className="highlight-box">
            <ReactMarkdown>{t('bluejaySupportedHardwareLine1')}</ReactMarkdown>
          </div>
        </FirmwareCard>

        <FirmwareCard
          icon={<FaMicrochip />}
          link="https://github.com/am32-firmware/AM32"
          title="AM32"
        >
          <ReactMarkdown>{t('blheli32ToAM32Line1')}</ReactMarkdown>
          <ReactMarkdown>{t('blheli32ToAM32Line2')}</ReactMarkdown>
        </FirmwareCard>
      </div>
    </div>
  );
}

function CommunitySection() {
  const { t } = useTranslation('common');
  
  const contributionItems = [1, 2, 3, 4, 5].map((index) => {
    const line = `homeContributionItem${index}`;
    return (
      <li key={line}>
        <ReactMarkdown components={{ p: 'span' }}>{t(line)}</ReactMarkdown>
      </li>
    );
  });

  return (
    <div className="section-container">
      <h2 className="section-title">Community & Support</h2>
      <div className="cards-grid two-col">
        <div className="feature-card discord-card">
          <div className="card-header">
            <FaDiscord />
            <h3>Join the Community</h3>
          </div>
          <div className="card-body">
            <p>{t('homeDiscordText')}</p>
            <a
              className="discord-button"
              href="https://discord.gg/QvSS5dk23C"
              rel="noreferrer"
              target="_blank"
            >
              <FaDiscord /> Join Discord Server
            </a>
          </div>
        </div>

        <div className="feature-card">
          <div className="card-header">
            <FaHeart />
            <h3>{t('homeContributionHeader')}</h3>
          </div>
          <div className="card-body">
            <ReactMarkdown components={{ p: 'div' }}>
              {t('homeContributionText')}
            </ReactMarkdown>
            <ul className="contribution-list">
              {contributionItems}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoFooter() {
  const { t } = useTranslation('common');
  
  const disclaimerLines = [1, 2, 3, 4, 5, 6].map((index) => (
    <ReactMarkdown key={`disclaimer-${index}`}>
      {t(`homeDisclaimerTextLine${index}`)}
    </ReactMarkdown>
  ));

  return (
    <div className="info-footer">
      <div className="footer-column">
        <h3><FaExclamationTriangle /> {t('homeDisclaimerHeader')}</h3>
        <div className="disclaimer-text">
          {disclaimerLines}
        </div>
      </div>
      <div className="footer-column">
        <h3><FaInfoCircle /> {t('homeAttributionHeader')}</h3>
        <ReactMarkdown>{t('homeAttributionText')}</ReactMarkdown>
        <div className="china-text">
          <ReactMarkdown components={{ p: 'div' }}>
            {t('homeChinaText')}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

function CreditSection() {
  return (
    <div className="credit-section">
      <div className="credit-content">
        <p>
          This project is a fork of{' '}
          <a
            href="https://github.com/stylesuxx/esc-configurator"
            rel="noreferrer"
            target="_blank"
          >
            ESC Configurator
          </a>
          {' '}by Chris Landa (stylesuxx) and contributors.
        </p>
        <p>
          Originally based on{' '}
          <a
            href="https://github.com/blheli-configurator/blheli-configurator"
            rel="noreferrer"
            target="_blank"
          >
            BLHeli Configurator
          </a>
          {' '}by Andrey Mironov (DieHertz) and Michael Keller (mikeller),
          which itself was derived from{' '}
          <a
            href="https://github.com/cleanflight/cleanflight-configurator"
            rel="noreferrer"
            target="_blank"
          >
            Cleanflight Configurator
          </a>
          {' '}
          and
          {' '}
          <a
            href="https://github.com/multiwii/baseflight-configurator"
            rel="noreferrer"
            target="_blank"
          >
            Baseflight Configurator
          </a>
          .
        </p>
        <p>
          Special thanks to all the developers and contributors who made this project possible.
        </p>
      </div>
    </div>
  );
}

function Home() {
  return (
    <section id="tab-landing">
      <div className="landing-container">
        <Hero />
        <AlertSection />
        <FirmwareSection />
        <CommunitySection />
        <InfoFooter />
        <CreditSection />
      </div>
    </section>
  );
}
export default Home;
