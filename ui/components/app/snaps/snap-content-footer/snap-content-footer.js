import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';

import {
  TypographyVariant,
  JustifyContent,
  AlignItems,
  TextColor,
  Size,
  IconColor,
} from '../../../../helpers/constants/design-system';
import { SNAPS_VIEW_ROUTE } from '../../../../helpers/constants/routes';
import { useI18nContext } from '../../../../hooks/useI18nContext';
import { Icon, IconName } from '../../../component-library';
import Box from '../../../ui/box/box';
import Button from '../../../ui/button';
import Typography from '../../../ui/typography/typography';

export default function SnapContentFooter({ snapName, snapId }) {
  const t = useI18nContext();
  const history = useHistory();

  const handleNameClick = (e) => {
    e.stopPropagation();
    history.push(`${SNAPS_VIEW_ROUTE}/${encodeURIComponent(snapId)}`);
  };
  // TODO: add truncation to the snap name, need to pick a character length at which to cut off
  return (
    <Box
      justifyContent={JustifyContent.center}
      alignItems={AlignItems.center}
      paddingTop={4}
      paddingBottom={4}
      className="snap-content-footer"
    >
      <Icon
        name={IconName.Warning}
        size={Size.SM}
        color={IconColor.iconMuted}
        paddingRight={1}
      />
      <Typography color={TextColor.textMuted} variant={TypographyVariant.H7}>
        {t('snapContent', [
          <Button type="inline" onClick={handleNameClick} key="button">
            {snapName}
          </Button>,
        ])}
      </Typography>
    </Box>
  );
}

SnapContentFooter.propTypes = {
  /**
   * The name of the snap who's content is displayed
   */
  snapName: PropTypes.string,
  /**
   * The id of the snap
   */
  snapId: PropTypes.string,
};
