import { TemplateStructure } from '../../components/TemplateStructure';
import { colors } from '../../utils/colors';
import { Template } from '../../utils/types';

type AddEditionTemplateCardProps = {
  template: Template;
  isChosen: boolean;
  handleTemplatePress: () => void;
};

export const AddEditionTemplateCard = ({
  template,
  isChosen,
  handleTemplatePress
}: AddEditionTemplateCardProps) => {
  return (
    <div
      style={{
        backgroundColor: colors.grey,
        padding: 24,
        height: 320,
        width: 300,
        borderRadius: 20,
        opacity: isChosen ? 1 : 0.6,
        boxShadow: isChosen ? '5px 5px 5px ' + colors.darkblue : ''
      }}
      onClick={handleTemplatePress}>
      <TemplateStructure template={template} />
    </div>
  );
};
