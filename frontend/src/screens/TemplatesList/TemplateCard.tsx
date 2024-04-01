import { Button } from 'semantic-ui-react';
import { colors } from '../../utils/colors';
import { Template } from '../../utils/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { subtitleFontSize } from '../../utils/sizes';

interface TemplateCardProps {
  template: Template;
}

const TemplateCard = ({ template }: TemplateCardProps) => {
  const handleDelete = () => {
    console.log('delete');
  };
  return (
    <div
      style={{
        padding: 20,
        width: 340,
        height: 400,
        borderRadius: 15,
        backgroundColor: colors.white,
        color: colors.darkblue
      }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: 20,
          borderBottom: '1px solid ' + colors.grey,
          marginBottom: 20
        }}>
        <div style={{ fontSize: subtitleFontSize }}>{template.title}</div>
        <Button
          onClick={handleDelete}
          style={{ backgroundColor: colors.orange, padding: '8px 12px' }}>
          <FontAwesomeIcon icon={faTrash} color={colors.darkblue} fontSize={12} />
        </Button>
      </div>
    </div>
  );
};

export default TemplateCard;
