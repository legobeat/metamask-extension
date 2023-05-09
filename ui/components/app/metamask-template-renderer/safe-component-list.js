import ConfirmationNetworkSwitch from '../../../pages/confirmation/components/confirmation-network-switch';
import Box from '../../ui/box';
import Button from '../../ui/button';
import Chip from '../../ui/chip';
import DefinitionList from '../../ui/definition-list';
import Popover from '../../ui/popover';
import Spinner from '../../ui/spinner';
import TextField from '../../ui/text-field';
import TextArea from '../../ui/textarea/textarea';
import Tooltip from '../../ui/tooltip/tooltip';
import TruncatedDefinitionList from '../../ui/truncated-definition-list';
import Typography from '../../ui/typography';
import UrlIcon from '../../ui/url-icon';
import MetaMaskTranslation from '../metamask-translation';
import NetworkDisplay from '../network-display';
///: BEGIN:ONLY_INCLUDE_IN(snaps)
import { Copyable } from '../snaps/copyable';
import { SnapDelineator } from '../snaps/snap-delineator';
import { SnapUIMarkdown } from '../snaps/snap-ui-markdown';
///: END:ONLY_INCLUDE_IN

export const safeComponentList = {
  a: 'a',
  b: 'b',
  i: 'i',
  p: 'p',
  div: 'div',
  span: 'span',
  Box,
  Button,
  Chip,
  ConfirmationNetworkSwitch,
  DefinitionList,
  MetaMaskTranslation,
  NetworkDisplay,
  Popover,
  TextArea,
  TextField,
  Tooltip,
  TruncatedDefinitionList,
  Typography,
  UrlIcon,
  ///: BEGIN:ONLY_INCLUDE_IN(snaps)
  SnapDelineator,
  Copyable,
  Spinner,
  hr: 'hr',
  SnapUIMarkdown,
  ///: END:ONLY_INCLUDE_IN
};
