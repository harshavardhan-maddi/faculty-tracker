// frontend/src/services/backupService.js
// Client service for secure Admin Data Export and Data Import (MySQL Migration)

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

/**
 * Trigger export of overall database as attendance-system-backup-YYYY-MM-DD.zip
 */
export const exportOverallData = async () => {
  const response = await fetch(`${API_BASE_URL}/backup/export`, {
    method: 'GET',
    headers: {
      ...getAuthHeaders()
    }
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Export failed with status ${response.status}`);
  }

  // Extract filename from header or fallback
  const contentDisposition = response.headers.get('content-disposition');
  let filename = `attendance-system-backup-${new Date().toISOString().slice(0, 10)}.zip`;
  if (contentDisposition) {
    const match = contentDisposition.match(/filename="?([^";]+)"?/);
    if (match && match[1]) filename = match[1];
  }

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);

  return { filename, size: blob.size };
};

/**
 * Validate an uploaded backup ZIP archive without importing
 */
export const validateBackupFile = async (file) => {
  const formData = new FormData();
  formData.append('backupFile', file);

  const response = await fetch(`${API_BASE_URL}/backup/validate`, {
    method: 'POST',
    headers: {
      ...getAuthHeaders()
    },
    body: formData
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Backup validation failed.');
  }

  return data.report;
};

/**
 * Execute import of previous data into target MySQL
 */
export const executeImport = async (file, mysqlConfig = null) => {
  const formData = new FormData();
  formData.append('backupFile', file);
  if (mysqlConfig) {
    formData.append('mysqlConfig', JSON.stringify(mysqlConfig));
  }

  const response = await fetch(`${API_BASE_URL}/backup/execute`, {
    method: 'POST',
    headers: {
      ...getAuthHeaders()
    },
    body: formData
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Import execution failed.');
  }

  return data.summary;
};

/**
 * Generate and download pure MySQL migration SQL script from backup ZIP
 */
export const downloadMySQLDump = async (file) => {
  const formData = new FormData();
  formData.append('backupFile', file);

  const response = await fetch(`${API_BASE_URL}/backup/generate-sql`, {
    method: 'POST',
    headers: {
      ...getAuthHeaders()
    },
    body: formData
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message || 'Failed to generate MySQL migration script.');
  }

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'attendance-system-mysql-import.sql';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
};

/**
 * Fetch migration and backup history logs
 */
export const getMigrationHistory = async () => {
  const response = await fetch(`${API_BASE_URL}/backup/history`, {
    method: 'GET',
    headers: {
      ...getAuthHeaders()
    }
  });

  if (!response.ok) {
    throw new Error('Failed to retrieve migration audit history.');
  }

  const data = await response.json();
  return data.history || [];
};
