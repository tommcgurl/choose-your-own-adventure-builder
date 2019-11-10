import React from 'react';
import { Stack } from '../../../shared/components';
import AdventureListItem from '../AdventureListItem';

const AdventureList = ({ adventures }) => {
  return (
    <Stack id="adventure-list" align="justified" padding="none">
      {adventures.map(adventure => (
        <AdventureListItem key={adventure.id} adventure={adventure} />
      ))}
    </Stack>
  );
};

export default AdventureList;
