import { TemplateStructure } from '../../components/TemplateStructure';
import { colors } from '../../utils/colors';
import { Template } from '../../utils/types';

type AddEditionTemplateCardProps = {
  template: Template;
};

export const AddEditionTemplateCard = ({ template }: AddEditionTemplateCardProps) => {
  return (
    <div
      style={{
        backgroundColor: colors.grey,
        padding: 24,
        height: 320,
        width: 300,
        borderRadius: 20
      }}>
      <TemplateStructure template={template} />
    </div>
  );
};
