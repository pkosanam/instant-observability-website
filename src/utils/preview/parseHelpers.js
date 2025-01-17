import * as yaml from 'js-yaml';
import { QUICKSTART_REPO_URL } from '@data/constants';

/**
 * @typedef {import('./fetchHelpers').FileMetadata} FileMetadata
 */

export const parseDocs = (docs) => {
  const parsedDocs = docs.map((doc) => {
    doc.description = doc.description?.trim();
    return doc;
  });

  return parsedDocs;
};

export const parseInstallPlans = (installPlans) => {
  const parsedInstallPlans = installPlans.map((planId) => {
    const installPlan = {
      id: planId,
      name: '',
    };
    return installPlan;
  });
  return parsedInstallPlans;
};

/**
 * Parses quickstart files
 * @param {FileMetadata[]} - quickstartFiles
 * @returns {Object} A quickstart object to be rendered by QuickstartDetails
 */
export const parseQuickstartFiles = (quickstartFiles) => {
  const quickstartContent = {};

  const config = quickstartFiles.find(
    (file) => file.type === 'yaml' && file.fileName.includes('config')
  );

  // build the packUrl since it is not part of the raw github file contents
  // assumes the filePath is always directly under 'quickstarts/'
  const packUrl = `${QUICKSTART_REPO_URL}/${
    config.filePath.split('/config')[0]
  }`;

  const loadYaml = yaml.load(config.content);

  // iterate through the array of documentation objects to trim new lines
  quickstartFiles.forEach((file) => {
    if (file.type === 'image' && file.fileName === loadYaml.icon) {
      quickstartContent.logoUrl = file.content;
    }
  });

  const parsedQuickstartDocs =
    loadYaml?.documentation?.length > 0
      ? parseDocs(loadYaml.documentation)
      : [];
  const parsedInstallPlans =
    loadYaml?.installPlans?.length > 0
      ? parseInstallPlans(loadYaml.installPlans)
      : [];

  quickstartContent.authors = loadYaml?.authors ?? ['Placeholder author'];
  quickstartContent.description =
    loadYaml?.description?.trim() ?? 'Placeholder description';
  quickstartContent.documentation = parsedQuickstartDocs;
  quickstartContent.id = loadYaml?.id ?? '';
  quickstartContent.installPlans = parsedInstallPlans;
  quickstartContent.keywords = loadYaml?.keywords ?? ['Placeholder keyword'];
  quickstartContent.level =
    loadYaml?.level?.replace(' ', '_').toUpperCase() ?? 'COMMUNITY';
  quickstartContent.name = loadYaml?.slug ?? '';
  quickstartContent.packUrl = packUrl ?? '';
  quickstartContent.relatedResources = []; // we don't get these from the config.yml
  quickstartContent.summary =
    loadYaml?.summary?.trim() ?? 'Placeholder summary';
  quickstartContent.title = loadYaml?.title ?? 'Placeholder title';

  return quickstartContent;
};

/**
 * Parses dashboard configuration files and screenshots
 * @param {FileMetadata[]}
 * @returns {Object[]} An array of quickstart dashboard objects, Ex: { name: '', description: '', screenshots: [''] }
 */
export const parseDashboardFiles = (files) => {
  const configs = files.filter((d) => d.filePath.includes('.json'));
  const screenshots = files.filter((d) => !d.filePath.includes('.json'));
  return configs.map((dashFileMetadata) => {
    const parentDir = dashFileMetadata.filePath.split(
      dashFileMetadata.fileName
    )[0];

    let dashboard = {};
    try {
      dashboard = JSON.parse(dashFileMetadata.content);
    } catch (err) {
      console.error(err); // eslint-disable-line no-console
    }

    return {
      name: dashboard?.name ?? 'Placeholder name',
      description: dashboard?.description ?? 'Placeholder description',
      screenshots: screenshots
        .filter((s) => s.filePath.includes(parentDir))
        .map(({ content }) => ({ publicURL: content })),
    };
  });
};

/**
 * Parses the details, name, and type fields out of an alert config
 * @param {FileContent[]} alertFiles - alert config files
 * @returns {Object[]} Ex: { details: '', name: '', type: '' }
 */
export const parseAlertFiles = (alertFiles) => {
  return alertFiles.map((file) => {
    const loadYaml = yaml.loadAll(file.content)[0];

    // parse and build alert object and add it to the array
    return {
      details: loadYaml?.description?.trim() ?? 'Placeholder description',
      name: loadYaml?.name?.trim() ?? 'Placeholder name',
      type: loadYaml?.type?.trim() ?? 'Placeholder type',
    };
  });
};

/**
 * Parses quickstart files to build an object similar to the quickstart definition in `src/data/quickstarts.json`
 * @param {FileMetadata[]} rawFiles - An array of FileContents for a particular quickstart
 * @returns {Object} A quickstart object ready for display within the `QuickstartDetails` component.
 */
export const parseRawQuickstartFiles = (rawFiles) => {
  const dashboardFiles = [];
  const alertFiles = [];
  const quickstartDirs = {};
  const quickstartFiles = [];

  for (const file of rawFiles) {
    if (file.filePath.includes('dashboards/')) {
      dashboardFiles.push(file);
    } else if (file.filePath.includes('alert-policies/')) {
      alertFiles.push(file);
    } else {
      quickstartFiles.push(file);
    }
  }

  const dashboardsDirs =
    dashboardFiles.length > 0 ? parseDashboardFiles(dashboardFiles) : [];
  const alertsDir = alertFiles.length > 0 ? parseAlertFiles(alertFiles) : [];
  quickstartDirs.dashboards = dashboardsDirs;
  quickstartDirs.alerts = alertsDir;
  const quickstart = parseQuickstartFiles(quickstartFiles);

  // merge together the parsed quickstart content and the alerts/dashboard arrrays
  return { ...quickstartDirs, ...quickstart };
};
