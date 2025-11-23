import React, { useCallback } from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import CompatibilityWarning from './CompatibilityWarning';

import {
  selectConnected,
  selectHasSerial,
  selectOpen,
  selectPortNames,
  setBaudRate,
} from '../../Containers/App/serialSlice';

import './style.scss';

function BaudRates({
  handleChange,
  disabled,
}) {
  const { t } = useTranslation('common');
  const baudRates = [115200, 57600, 38400, 28800, 19200, 14400, 9600, 4800, 2400, 1200];

  const rateElements = baudRates.map((rate) => (
    <option
      key={rate}
      value={rate}
    >
      {rate}
    </option>
  ));

  return (
    <div
      className="port-select-wrapper"
      style={{ width: '120px' }}
    >
      <select
        defaultValue="115200"
        disabled={disabled}
        id="baud"
        name={t('baudRate')}
        onChange={handleChange}
        title={t('baudRate')}
      >
        {rateElements}
      </select>
    </div>
  );
}

BaudRates.propTypes = {
  disabled: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
};

function Ports({
  disabled,
  ports,
  handleChange,
}) {
  const { t } = useTranslation('common');

  const portOptions = ports.map((name, index) => (
    <option
      key={name}
      value={index}
    >
      {name}
    </option>
  ));

  return(
    <div className="port-select-wrapper">
      <select
        disabled={disabled}
        id="port"
        name={t('port')}
        onChange={handleChange}
        title={t('port')}
      >
        {portOptions}
      </select>
    </div>
  );
}

Ports.propTypes = {
  disabled: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  ports: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

function PortPicker({
  isIdle,
  onSetPort,
  onConnect,
  onDisconnect,
  onChangePort,
}) {
  const { t } = useTranslation('common');

  const dispatch = useDispatch();

  const hasPort = useSelector(selectConnected);
  const hasSerial = useSelector(selectHasSerial);
  const open = useSelector(selectOpen);
  const ports = useSelector(selectPortNames);

  const handleBaudRateChange = useCallback((e) => {
    dispatch(setBaudRate(e.target.value));
  }, [dispatch]);

  const handlePortChange = useCallback((e) => {
    onChangePort(e.target.value);
  }, [onChangePort]);

  if(!hasSerial) {
    return <CompatibilityWarning />;
  }

  return (
    <div className="port-picker">
      {!hasPort && (
        <button
          className="refresh-btn"
          onClick={onSetPort}
          title={t('openPortSelection')}
          type="button"
        >
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M23 4v6h-6" />
            <path d="M1 20v-6h6" />
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 1 20.49 15" />
          </svg>
        </button>
      )}

      <Ports
        disabled={open}
        handleChange={handlePortChange}
        ports={ports}
      />

      <BaudRates
        disabled={open}
        handleChange={handleBaudRateChange}
      />

      <button
        className={`connect-btn ${open ? 'connected' : ''}`}
        disabled={!isIdle}
        onClick={open ? onDisconnect : onConnect}
        type="button"
      >
        {open ? t('disconnect') : t('connect')}
      </button>
    </div>
  );
}

PortPicker.defaultProps = { isIdle: false };
PortPicker.propTypes = {
  isIdle: PropTypes.bool,
  onChangePort: PropTypes.func.isRequired,
  onConnect: PropTypes.func.isRequired,
  onDisconnect: PropTypes.func.isRequired,
  onSetPort: PropTypes.func.isRequired,
};

export default React.memo(PortPicker);
