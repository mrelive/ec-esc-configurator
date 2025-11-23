import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';
import {
  FaCog,
  FaHome,
  FaMusic,
  FaTachometerAlt,
} from 'react-icons/fa';

import AppSettings from '../AppSettings';
import CookieConsent from '../CookieConsent';
import LanguageSelection from '../LanguageSelection';
import Log from '../Log';
import MainContent from '../MainContent';
import MelodyEditor from '../../Components/MelodyEditor';
import PortPicker from '../PortPicker';
import Statusbar from '../Statusbar';

import { selectState } from '../../Containers/App/stateSlice';
import { show as showAppSettings } from '../AppSettings/settingsSlice';
import {
  dummy as melodyEditorDummy,
  selectShow as selectShowMelodyEditor,
  show as showMelodyEditor,
} from '../MelodyEditor/melodiesSlice';

import './style.scss';

function App({
  getBatteryState,
  getUtilization,
  onAllMotorSpeed,
  onEscDump,
  onEscsFlashFile,
  onEscsFlashUrl,
  onEscsRead,
  onEscsWriteDefaults,
  onEscsWriteSettings,
  onMelodyWrite,
  onSerialConnect,
  onSerialDisconnect,
  onSerialPortChange,
  onSerialSetPort,
  onSingleMotorSpeed,
  progressReferences,
}) {
  const { t } = useTranslation('common');
  const dispatch = useDispatch();

  const showMelodyEditorState = useSelector(selectShowMelodyEditor);
  const actions = useSelector(selectState);

  const isIdle = !Object.values(actions).some((element) => element);

  const onAppSettingsShow = useCallback((e) => {
    dispatch(showAppSettings());
  }, [dispatch]);

  const handleOpenMelodyEditor = useCallback(() => {
    dispatch(melodyEditorDummy());
    dispatch(showMelodyEditor());
  }, [dispatch]);

  return (
    <div className="app-layout">
      <aside className="app-sidebar">
        <div className="sidebar-logo">
          <div className="logo-icon" />
          <div className="logo-text">
            <span>
              EC ESC
            </span>
            <span className="highlight">
              CONFIGURATOR
            </span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className={`nav-item ${!actions.open ? 'active' : ''}`}>
            <FaHome className="icon" />
            <span className="label">
              {t('home')}
            </span>
          </div>
          <div className={`nav-item ${actions.open ? 'active' : ''}`}>
            <FaTachometerAlt className="icon" />
            <span className="label">
              {t('dashboard')}
            </span>
          </div>
          <div
            className="nav-item"
            onClick={handleOpenMelodyEditor}
          >
            <FaMusic className="icon" />
            <span className="label">
              {t('openMelodyEditor')}
            </span>
          </div>
        </nav>

        <div className="sidebar-status">
          <Statusbar getUtilization={getUtilization} />
        </div>

        <div className="sidebar-footer">
          <div
            className="settings-trigger"
            onClick={onAppSettingsShow}
          >
            <FaCog className="icon" />
            <span>
              {t('settings')}
            </span>
          </div>
          <LanguageSelection />
        </div>
      </aside>

      <div className="app-main">
        <header className="app-topbar">
          <div className="topbar-actions">
            <PortPicker
              isIdle={isIdle}
              onChangePort={onSerialPortChange}
              onConnect={onSerialConnect}
              onDisconnect={onSerialDisconnect}
              onSetPort={onSerialSetPort}
            />
          </div>
          <div className="topbar-log">
            <Log />
          </div>
        </header>

        <main className="app-content">
          <MainContent
            getBatteryState={getBatteryState}
            onAllMotorSpeed={onAllMotorSpeed}
            onFirmwareDump={onEscDump}
            onFlashUrl={onEscsFlashUrl}
            onLocalSubmit={onEscsFlashFile}
            onReadEscs={onEscsRead}
            onResetDefaultls={onEscsWriteDefaults}
            onSingleMotorSpeed={onSingleMotorSpeed}
            onWriteSetup={onEscsWriteSettings}
            progressReferences={progressReferences}
          />
        </main>
      </div>

      <AppSettings />

      {showMelodyEditorState && (
        <MelodyEditor onWrite={onMelodyWrite} />
      )}

      <CookieConsent />

      <ToastContainer />
    </div>
  );
}

App.defaultProps = {
  getBatteryState: null,
  getUtilization: null,
};

App.propTypes = {
  getBatteryState: PropTypes.func,
  getUtilization: PropTypes.func,
  onAllMotorSpeed: PropTypes.func.isRequired,
  onEscDump: PropTypes.func.isRequired,
  onEscsFlashFile: PropTypes.func.isRequired,
  onEscsFlashUrl: PropTypes.func.isRequired,
  onEscsRead: PropTypes.func.isRequired,
  onEscsWriteDefaults: PropTypes.func.isRequired,
  onEscsWriteSettings: PropTypes.func.isRequired,
  onMelodyWrite: PropTypes.func.isRequired,
  onSerialConnect: PropTypes.func.isRequired,
  onSerialDisconnect: PropTypes.func.isRequired,
  onSerialPortChange: PropTypes.func.isRequired,
  onSerialSetPort: PropTypes.func.isRequired,
  onSingleMotorSpeed: PropTypes.func.isRequired,
  progressReferences: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default App;
