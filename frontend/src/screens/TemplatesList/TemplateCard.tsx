import { Button } from 'semantic-ui-react';
import { colors } from '../../utils/colors';
import { Template } from '../../utils/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { subtitleFontSize } from '../../utils/sizes';
import { TemplateStructure } from '../../components/TemplateStructure';
import ConfiramtionModal from '../../components/ConfirmationModal';
import { useState } from 'react';

interface TemplateCardProps {
  template: Template;
  handleDelete: () => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({
  template,
  handleDelete
}: TemplateCardProps) => {
  const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);

  return (
    <>
      <div
        style={{
          padding: 20,
          minWidth: 340,
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
          <div style={{ fontSize: subtitleFontSize }}>{template.name}</div>
          <Button
            onClick={() => setShowConfirmationModal(true)}
            style={{ backgroundColor: colors.orange, padding: '8px 12px' }}>
            <FontAwesomeIcon icon={faTrash} color={colors.darkblue} fontSize={12} />
          </Button>
        </div>

        <div>
          <TemplateStructure template={template} />
        </div>
      </div>

      <ConfiramtionModal
        open={showConfirmationModal}
        onCloseClick={() => setShowConfirmationModal(false)}
        onConfirmClick={async () => {
          setShowConfirmationModal(false);
          handleDelete();
        }}
      />
    </>
  );
};

export default TemplateCard;
