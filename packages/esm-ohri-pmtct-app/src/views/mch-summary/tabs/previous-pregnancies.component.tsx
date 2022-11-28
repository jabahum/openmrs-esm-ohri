import React from 'react';
import { useTranslation } from 'react-i18next';
import { EmptyStateComingSoon, PatientChartProps } from '@ohri/openmrs-esm-ohri-commons-lib';

const PreviousPregnancies: React.FC<PatientChartProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const headerTitle = t('previousPregnancies', 'Previous Pregnancies');

  return (
    <>
      <EmptyStateComingSoon displayText={headerTitle} headerTitle={headerTitle} />
    </>
  );
};

export default PreviousPregnancies;
