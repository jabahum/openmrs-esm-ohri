import { EmptyStateComingSoon } from '@ohri/openmrs-esm-ohri-commons-lib';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  EncounterTile,
  EncounterTileColumn,
  findObs,
  getEncounterValues,
  getObsFromEncounter,
} from '../../../../../esm-commons-lib/src/components/encounter-tile/encounter-tile.component';

import {
  artTherapyDateTime_UUID,
  art_Therapy_EncounterUUID,
  careAndTreatmentEncounterType,
  Cd4Count_UUID,
  Cd4LabResultDate_UUID,
  dateOfARtIniation,
  enrolmentDate,
  hivCD4Count_UUID,
  ViralLoadResultDate_UUID,
  ViralLoadResult_UUID,
} from '../../../constants';
interface OverviewListProps {
  patientUuid: string;
}

const ServiceSummaryOverviewList: React.FC<OverviewListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerHIV = t('hivStatus', 'HIV Status');
  const displayTextHIV = t('hivStatus', 'HIV Status');

  const headerARvRegiment = t('currentARV', 'Current ARV Regimen');
  const displayARvRegiment = t('currentARV', 'Current ARV Regimen');

  const columnsHIV: EncounterTileColumn[] = [
    {
      key: 'lastViralLoad',
      header: t('vlResult', 'Last viral Load'),
      getValue: encounter => {
        return getEncounterValues(encounter, ViralLoadResultDate_UUID, true);
      },
    },
    //TODO: Refactor to include in within VL above
    // {
    //   key: 'vlDate',
    //   header: t('vlDate', 'Recent VL Date'),
    //   getValue: encounter => {
    //     return getObsFromEncounter(encounter, ViralLoadResult_UUID);
    //   },
    // },
    {
      key: 'lastCD4Count',
      header: t('lastCD4Count', 'Last CD4 Count'),
      getValue: encounter => {
        return getObsFromEncounter(encounter, Cd4Count_UUID);
      },
    },
    //TODO: Refactor to include in within CD4 above
    // {
    //   key: 'cd4ResultDate',
    //   header: t('cd4ResultDate', 'Recent CD4 Date'),
    //   getValue: encounter => {
    //     return getObsFromEncounter(encounter, Cd4LabResultDate_UUID, true);
    //   },
    // },
    {
      key: 'enrolledInCare',
      header: 'Enrolled in care',
      getValue: latestEncounter => {
        return getObsFromEncounter(latestEncounter, enrolmentDate, true);
      },
    },
    {
      key: 'currentWHO',
      header: 'Current WHO stage',
      getValue: encounter => {
        return getObsFromEncounter(encounter, dateOfARtIniation, true);
      },
    },
  ];

  const columnsARV: EncounterTileColumn[] = [
    {
      key: 'regimen',
      header: t('arvRegimen', 'Current ARV regimen'),
      getValue: ({ latestEncounter }) => {
        return getObsFromEncounter(latestEncounter, ViralLoadResultDate_UUID, true);
      },
    },
    {
      key: 'lastCD4Count',
      header: t('drugAllergies', 'Drug Allergies'),
      getValue: ({ latestEncounter }) => {
        return getObsFromEncounter(latestEncounter, hivCD4Count_UUID);
      },
    },
    {
      key: 'eacSession',
      header: t('EAC', 'EAC Session'),
      getValue: ({ latestEncounter }) => {
        return getObsFromEncounter(latestEncounter, Cd4LabResultDate_UUID, true);
      },
    },
    {
      key: 'currentARV',
      header: 'ARV Initiation Date',
      getValue: latestEncounter => {
        return getObsFromEncounter(latestEncounter, artTherapyDateTime_UUID, true);
      },
    },
  ];
  return (
    <>
      <EncounterTile
        patientUuid={patientUuid}
        encounterUuid={careAndTreatmentEncounterType}
        columns={columnsHIV}
        description={displayTextHIV}
        headerTitle={headerHIV}
        tileStyle=""
      />

      <EncounterTile
        patientUuid={patientUuid}
        encounterUuid={art_Therapy_EncounterUUID}
        columns={columnsARV}
        description={headerARvRegiment}
        headerTitle={displayARvRegiment}
        dropdownText="Change "
        tileStyle="ARV"
      />
    </>
  );
};

export default ServiceSummaryOverviewList;
