import { ExportData } from '../types/tracking';

export const exportToJSON = (data: ExportData): string => {
  return JSON.stringify(data, null, 2);
};

export const downloadData = (data: ExportData, format: 'json'): void => {
  const content = exportToJSON(data);
  const blob = new Blob([content], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `activity-data-${new Date().toISOString()}.${format}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};